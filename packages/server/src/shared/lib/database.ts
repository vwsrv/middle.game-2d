import { Client } from 'pg';
import { dbConfig } from '@/shared/config';

export const createClientAndConnect = async (): Promise<Client | null> => {
  try {
    const client = new Client(dbConfig);
    await client.connect();

    const res = await client.query('SELECT NOW()');
    console.log('Connected to the database at:', res?.rows?.[0].now);

    return client;
  } catch (e) {
    console.error('Database connection error:', e);
    return null;
  }
};

export const initializeDatabase = async (): Promise<void> => {
  const client = await createClientAndConnect();
  if (!client) return;

  try {
    const fs = await import('fs');
    const path = await import('path');
    const migrationPath = path.join(
      __dirname,
      '../../../migrations',
      'create-tables.sql',
    );
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

    await client.query(migrationSQL);
    console.log('Database tables created successfully');
  } catch (error) {
    console.error('Migration error:', error);
  } finally {
    await client.end();
  }
};
