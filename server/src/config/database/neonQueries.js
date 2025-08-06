const { Pool } = require("pg");

const constanst = require("../../utils/constanst");

const vocabTableName = "vocabularies";
const devicesTableName = "devices";

const remindLater = [1, 3, 7, 15, 30];

const pool = new Pool({
  connectionString: constanst.neonUrl,
  // serverless
  ssl: { rejectUnauthorized: false },
});

const queries = {
  createVocabTable() {
    pool.query(
      `CREATE TABLE ${vocabTableName}
        (id SERIAL PRIMARY KEY,
        word TEXT,
        en_mean TEXT,
        vi_mean TEXT,
        pronounce TEXT,
        inserted_at TEXT,
        remind_at TEXT,
        remind_count INTEGER,
        learning BOOLEAN)`,
      (err, res) => {
        console.log("err:", err);
        console.log(res);
      }
    );
  },

  createDeviceTable() {
    pool.query(
      `CREATE TABLE ${devicesTableName}
        (id SERIAL PRIMARY KEY,
        endpoint TEXT NOT NULL,
        expiration_time BIGINT,
        p256dh TEXT NOT NULL,
        auth TEXT NOT NULL)`,
      (err, res) => {
        console.log("err:", err);
        console.log(res);
      }
    );
  },

  async insertWord({ word, enMean, viMean, pronounce }) {
    const current = new Date();
    const insertedAt = `${current.getDate()}-${current.getMonth() + 1}-${current.getFullYear()}`;

    current.setDate(current.getDate() + remindLater[0]);
    const remindAt = `${current.getDate()}-${current.getMonth()}-${current.getFullYear()}`;

    try {
      const res = await pool.query(
        `INSERT INTO ${vocabTableName}
        (word, en_mean, vi_mean, pronounce, inserted_at, remind_at, remind_count, learning)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [word.trim(), enMean, viMean, pronounce, insertedAt, remindAt, 0, true]
      );

      return res;
    } catch (error) {
      console.log("error:", error);
    }
  },

  async getAllWords() {
    try {
      const res = await pool.query(`SELECT * FROM ${vocabTableName}`);
      return res;
    } catch (error) {
      console.log("error:", error);
    }
  },

  async getWordsToRemind(nowDate) {
    try {
      const res = await pool.query(`SELECT * FROM ${vocabTableName} WHERE remind_at = $1`, [nowDate]);
      return res;
    } catch (error) {
      console.log("error:", error);
    }
  },

  async insertDevice({ endpoint, expirationTime, keys }) {
    try {
      const res = await pool.query(
        `INSERT INTO ${devicesTableName}
        (endpoint, expiration_time, p256dh, auth)
        VALUES ($1, $2, $3, $4)`,
        [endpoint, expirationTime, keys.p256dh, keys.auth]
      );
      return res;
    } catch (error) {
      console.log("error:", error);
    }
  },

  async getDeviceThroughEndpoint(endpoint) {
    try {
      const res = await pool.query(`SELECT * FROM ${devicesTableName} WHERE endpoint=$1`, [endpoint]);
      return res.rows.length !== 0 ? res.rows : null;
    } catch (error) {
      console.log(error);
    }
  },

  async updateDevice({ endpoint, expirationTime, keys }) {
    try {
      const res = await pool.query(
        `UPDATE ${devicesTableName}
        SET expiration_time = $1, p256dh = $2, auth = $3
        WHERE endpoint = $4`,
        [expirationTime, keys.p256dh, keys.auth, endpoint]
      );
      return res;
    } catch (error) {
      console.log("error:", error);
    }
  },
};

module.exports = queries;
