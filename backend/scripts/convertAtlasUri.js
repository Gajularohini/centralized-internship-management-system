#!/usr/bin/env node
const dns = require('dns').promises;
const { URL } = require('url');

async function convert(uri) {
  if (!uri) {
    console.error('Usage: node convertAtlasUri.js "<mongodb+srv uri>"');
    process.exit(2);
  }

  try {
    const u = new URL(uri);
    if (u.protocol !== 'mongodb+srv:') {
      console.error('Provided URI is not mongodb+srv://');
      process.exit(2);
    }

    const hostname = u.hostname; // e.g. cluster0.xxxxx.mongodb.net
    const db = u.pathname ? u.pathname.replace(/^\//, '') : '';
    const options = u.search ? u.search.substring(1) : '';
    const user = u.username;
    const pass = u.password;

    const srvName = `_mongodb._tcp.${hostname}`;
    const records = await dns.resolveSrv(srvName);

    if (!records || records.length === 0) {
      throw new Error('No SRV records found for ' + srvName);
    }

    // Map SRV records to host:port entries
    const hosts = records.map(r => `${r.name}:${r.port}`).join(',');

    const creds = user ? `${encodeURIComponent(user)}:${encodeURIComponent(pass)}@` : '';
    const seedUri = `mongodb://${creds}${hosts}/${db}${options ? '?' + options : ''}`;

    console.log(seedUri);
  } catch (err) {
    console.error('Error converting URI:', err.message || err);
    process.exit(1);
  }
}

const input = process.argv[2] || process.env.ATLAS_SRV_URI;
convert(input);
