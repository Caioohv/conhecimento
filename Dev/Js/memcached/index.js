var Memcached = require('memcached');
var memcached = new Memcached('127.0.0.1:11211');

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
          resolve();
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
          resolve();
        }
      });
    });
  }
}


const cache = new Cache(memcached);

(async () => {
  const myEmail = 'my-email@gmail.com';

  await cache.set('email', myEmail);

  const fromCache = await cache.get('email');

  console.log('From cache:', fromCache);

  await cache.delete('email');

  const fromCacheAfterDelete = await cache.get('email');

  console.log('From cache after delete:', fromCacheAfterDelete);
})();

