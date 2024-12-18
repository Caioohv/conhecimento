/* RODAR COM npm run mocha */

import { expect } from "chai";
import { describe, it } from "mocha";

import Memcached from 'memcached';

class Cache {
  constructor(memcached) {
    this.memcached = memcached;
    this.default_ttl = 300; // Tempo de expiração padrão em segundos
  }

  set(key, value) {
    return new Promise((resolve, reject) => {
      this.memcached.set(key, value, this.default_ttl, (err) => {
        if (err) {
          console.error(`Error setting cache: ${err}`);
          reject(err);
        } else {
          console.log(`Set cache for key "${key}"`);
          resolve(true);
        }
      });
    });
  }

  get(key) {
    return new Promise((resolve, reject) => {
      this.memcached.get(key, (err, data) => {
        if (err) {
          console.error(`Error getting cache: ${err}`);
          reject(err);
        } else if (data) {
          console.log(`Get cache for key "${key}"`);
          resolve(data);
        } else {
          console.log(`No cache found for key "${key}"`);
          resolve(null);
        }
      });
    });
  }

  delete(key) {
    return new Promise((resolve, reject) => {
      this.memcached.del(key, (err) => {
        if (err) {
          console.error(`Error deleting cache: ${err}`);
          reject(err);
        } else {
          console.log(`Deleted cache for key "${key}"`);
          resolve(true);
        }
      });
    });
  }
}



describe('Tests with memcached', () => {
  let cache;
  
  before(() => {
    let memcached = new Memcached('127.0.0.1:11211');
    cache = new Cache(memcached);
  })

  it('should set cache', async () => {
    let setted = await cache.set('foo', 'bar')
    expect(setted).to.be.true;
  })

  it('should get the cached value', async () => {
    let value = await cache.get('foo')
    expect(value).to.be.equal('bar');
  })

  it('should delete the cached value', async () => {
    let deleted = await cache.delete('foo')
    expect(deleted).to.be.true;
  })

  it('should not get deleted value', async () => {
    let value = await cache.get('foo')
    expect(value).to.be.null;
  })

})
