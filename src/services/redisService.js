const redis = require('redis');
const client = redis.createClient({
  url: process.env.REDIS_URL,
});
client
  .connect()
  .then(async (res) => {
    console.log('connected');
  })
  .catch((err) => {
    console.log('err happened' + err);
  });

client.on('error', (err) => console.log('Redis Client Error', err));

const set = (key, value, expirationInSeconds) => {
  client.setEx(String(key), expirationInSeconds, value);
};

const get = async (key) => {
  return await client.get(String(key));
};

const del = (key) => {
  client.del(String(key));
};

module.exports = { set, get, del };
