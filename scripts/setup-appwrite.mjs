#!/usr/bin/env node
/**
 * Stan Creatives Appwrite setup
 *
 * Creates missing tables, columns and the private artwork bucket.
 * Safe to re-run: existing tables/columns/bucket are left untouched.
 *
 * Required API key scopes:
 * databases.read, tables.read, tables.write, columns.read, columns.write,
 * buckets.read, buckets.write
 *
 * Run locally:
 *   APPWRITE_API_KEY="your-new-key" node scripts/setup-appwrite.mjs
 *
 * Never put the API key in GitHub, Vite env variables, or browser code.
 */

import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const ENDPOINT = 'https://fra.cloud.appwrite.io/v1';
const PROJECT_ID = '6b059772002603ef9b31';
const DATABASE_ID = 'stan_creatives';
const BUCKET_ID = 'artwork';

const rl = readline.createInterface({ input, output });
let apiKey = process.env.APPWRITE_API_KEY;
if (!apiKey) {
  apiKey = await rl.question('Paste your NEW Appwrite API key (input is visible): ');
}
rl.close();

if (!apiKey?.trim()) {
  console.error('Missing APPWRITE_API_KEY. No changes were made.');
  process.exit(1);
}

async function request(method, path, body) {
  const response = await fetch(`${ENDPOINT}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-Appwrite-Project': PROJECT_ID,
      'X-Appwrite-Key': apiKey.trim(),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const text = await response.text();
  let data = {};
  try { data = text ? JSON.parse(text) : {}; } catch { data = { message: text }; }
  if (!response.ok) {
    const error = new Error(data.message || `HTTP ${response.status}`);
    error.code = data.code;
    error.status = response.status;
    throw error;
  }
  return data;
}

const tableDefinitions = [
  {
    id: 'order_items',
    name: 'Order Items',
    columns: [
      ['order_id', 'varchar', { size: 100, required: true }],
      ['product_id', 'varchar', { size: 100, required: true }],
      ['product_name', 'varchar', { size: 255, required: true }],
      ['colour', 'varchar', { size: 100, required: false }],
      ['size', 'varchar', { size: 50, required: false }],
      ['quantity', 'integer', { required: true, min: 1 }],
      ['unit_price', 'integer', { required: true, min: 0 }],
      ['personalization', 'text', { required: false }],
      ['artwork_file_id', 'varchar', { size: 100, required: false }],
    ],
  },
  {
    id: 'design_requests',
    name: 'Design Requests',
    columns: [
      ['customer_name', 'varchar', { size: 255, required: true }],
      ['email', 'varchar', { size: 255, required: true }],
      ['phone', 'varchar', { size: 50, required: true }],
      ['product_id', 'varchar', { size: 100, required: false }],
      ['product_name', 'varchar', { size: 255, required: true }],
      ['colour', 'varchar', { size: 100, required: false }],
      ['size', 'varchar', { size: 50, required: false }],
      ['placement', 'varchar', { size: 100, required: false }],
      ['design_text', 'text', { required: false }],
      ['artwork_file_id', 'varchar', { size: 100, required: false }],
      ['status', 'varchar', { size: 50, required: true }],
    ],
  },
  {
    id: 'payments',
    name: 'Payments',
    columns: [
      ['order_id', 'varchar', { size: 100, required: true }],
      ['provider', 'varchar', { size: 50, required: true }],
      ['provider_reference', 'varchar', { size: 150, required: false }],
      ['transaction_id', 'varchar', { size: 150, required: false }],
      ['amount', 'integer', { required: true, min: 0 }],
      ['currency', 'varchar', { size: 10, required: true }],
      ['status', 'varchar', { size: 50, required: true }],
    ],
  },
];

async function listTables() {
  const result = await request('GET', `/tablesdb/${DATABASE_ID}/tables?total=true&limit=100`);
  return result.tables || [];
}
async function listColumns(tableId) {
  const result = await request('GET', `/tablesdb/${DATABASE_ID}/tables/${tableId}/columns?total=true&limit=100`);
  return result.columns || [];
}

async function ensureTable(definition, existingTables) {
  let table = existingTables.find(item => item.$id === definition.id);
  if (!table) {
    console.log(`Creating table: ${definition.name}`);
    table = await request('POST', `/tablesdb/${DATABASE_ID}/tables`, {
      tableId: definition.id,
      name: definition.name,
      permissions: [],
      rowSecurity: true,
    });
  } else {
    console.log(`Table exists: ${definition.id}`);
  }

  const existingColumns = await listColumns(definition.id);
  for (const [key, type, options] of definition.columns) {
    if (existingColumns.some(column => column.key === key)) {
      console.log(`  Column exists: ${key}`);
      continue;
    }
    console.log(`  Adding column: ${key} (${type})`);
    await request('POST', `/tablesdb/${DATABASE_ID}/tables/${definition.id}/columns/${type}`, {
      key,
      ...options,
    });
  }
}

async function ensureBucket() {
  try {
    await request('GET', `/storage/buckets/${BUCKET_ID}`);
    console.log(`Storage bucket exists: ${BUCKET_ID}`);
  } catch (error) {
    if (error.status !== 404) throw error;
    console.log('Creating private artwork storage bucket...');
    await request('POST', '/storage/buckets', {
      bucketId: BUCKET_ID,
      name: 'Stan Creatives Artwork',
      permissions: [],
      fileSecurity: true,
      enabled: true,
      maximumFileSize: 10000000,
      allowedFileExtensions: ['jpg', 'jpeg', 'png', 'webp', 'pdf', 'svg'],
    });
  }
}

try {
  console.log('Checking existing Stan Creatives tables...');
  const tables = await listTables();

  // These two tables were created manually and are preserved.
  for (const id of ['products', 'orders']) {
    if (!tables.some(table => table.$id === id)) {
      throw new Error(`Expected existing table "${id}" was not found. Stop and check the Appwrite console first.`);
    }
    console.log(`Preserving existing table: ${id}`);
  }

  for (const definition of tableDefinitions) {
    await ensureTable(definition, tables);
  }
  await ensureBucket();

  console.log('\nSetup requests completed.');
  console.log('Appwrite may take a short time to finish creating new columns.');
  console.log('Keep all tables and the artwork bucket private until server-side access rules are implemented.');
} catch (error) {
  console.error('\nSetup stopped:', error.message);
  if (error.status === 401 || error.status === 403) {
    console.error('Check that the API key is active and has the required scopes listed at the top of this script.');
  }
  process.exitCode = 1;
}
