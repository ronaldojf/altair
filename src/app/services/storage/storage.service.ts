import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { IQueryCollection } from 'app/reducers/collection/collection';
import * as initialCollection from 'app/autentique.collection.json';

@Injectable()
export class StorageService extends Dexie {
  queryCollections: Dexie.Table<IQueryCollection, number>;

  constructor() {
    new Dexie('AltairDB').delete().catch(() => {}); // To be easily able to go back to the set defaults
    super('AltairDB');
    this.schema();
    this.queryCollections.add(initialCollection.default);
  }

  schema() {
    this.version(1).stores({
      queryCollections: '++id, title'
    });
  }

  now() {
    return +(new Date());
  }

  clearAllLocalData() {
    // Clear indexedDb
    Dexie.getDatabaseNames()
      .then(names => {
        names.forEach(name => {
          const db = new Dexie(name);
          db.delete().catch(() => {});
        });
      });

    localStorage.clear();
  }

}

