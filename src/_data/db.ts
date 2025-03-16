import Dexie, { Table } from 'dexie';
import { iProfile } from 'src/_models/domains/profile.models';

// Define the Dexie database with nested structure
export class MemoryAppDB extends Dexie {
  users!: Table<iProfile, number>; // Store users with nested themes and cards

  constructor() {
    super('MemoryAppDB');
    this.version(1).stores({
      users: '++id, name, nextSession', // Auto-incrementing primary key
    });
  }
}

// Instantiate the database
export const db = new MemoryAppDB();
