import Dexie, { Table } from 'dexie';
import { tProfile } from 'src/_models/profile.model';

// Define the Dexie database with nested structure
export class MemoryAppDB extends Dexie {
  users!: Table<tProfile, string>; // Store users with nested themes and cards

  constructor() {
    super('MemoryAppDB');
    this.version(1).stores({
      users: '++id, name, nextSession', // Auto-incrementing primary key
    });
  }
}

// Instantiate the database
export const db = new MemoryAppDB();
