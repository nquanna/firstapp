const { Pool } = require("pg");

const constanst = require("../../utils/constanst");

const getDate = require("../../utils/getDate");
const setNextRemind = require("../../utils/setNextRemind");

const tableName = {
  otps: "otps",
  users: "users",
  vocab: "vocabularies",
  subscriptions: "subscriptions ",
};

const remindLater = [1, 2, 4, 8, 15];

let pool;
if (!global.pgPool) {
  global.pgPool = new Pool({
    connectionString: constanst.neonUrl,
    ssl: { rejectUnauthorized: false },
  });
}
pool = global.pgPool;

const queries = {
  create: {
    otpsTable() {
      pool.query(
        `CREATE TABLE ${tableName.otps}
        (id SERIAL PRIMARY KEY,
        email TEXT NOT NULL,
        otp TEXT NOT NULL,
        role TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT now(),
        updated_at TIMESTAMP DEFAULT now(),
        UNIQUE(email))`,
        (err, res) => {
          console.log("err:", err);
          console.log(res);
        }
      );
    },

    userTable() {
      pool.query(
        `CREATE TABLE ${tableName.users}
        (id SERIAL PRIMARY KEY,
        username TEXT NOT NULL,
        email TEXT NOT NULL,
        pass TEXT NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT now(),
        updated_at TIMESTAMP DEFAULT now(),
        UNIQUE(username, email))`,
        (err, res) => {
          console.log("err:", err);
          console.log(res);
        }
      );
    },

    vocabTable() {
      pool.query(
        `CREATE TABLE ${tableName.vocab}
        (id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        word TEXT,
        parts_of_speech TEXT,
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

    subTable() {
      pool.query(
        `CREATE TABLE ${tableName.subscriptions}
        (id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        device_id TEXT NOT NULL,
        endpoint TEXT,
        auth TEXT,
        p256dh TEXT,
        created_at TIMESTAMP DEFAULT now(),
        updated_at TIMESTAMP DEFAULT now(),
        UNIQUE (user_id, device_id))`,
        (err, res) => {
          console.log("err:", err);
          console.log(res);
        }
      );
    },
  },

  insert: {
    async otp({ email, otp, role }) {
      try {
        const res = await pool.query(
          `INSERT INTO ${tableName.otps}
          (email, otp, role)
          VALUES ($1, $2, $3)
          ON CONFLICT (email)
          DO UPDATE SET otp = $2, updated_at = now()`,
          [email, otp, role]
        );

        return res.rowCount !== 0 ? res.rows[0] : null;
      } catch (error) {
        console.log("error:", error);
      }
    },

    async user({ username, email, pass, password }) {
      try {
        const res = await pool.query(
          `INSERT INTO ${tableName.users} (username, email, pass, password) VALUES ($1, $2 ,$3, $4)`,
          [username, email, pass, password]
        );
        return res.rowCount !== 0 ? res.rows : null;
      } catch (error) {
        console.log("error:", error);
      }
    },

    async word({ userId, word, partsOfSpeech, enMean, viMean, pronounce }) {
      const insertedAt = getDate();

      /* const current = new Date();
      current.setDate(current.getDate() + remindLater[0]);
      const remindAt = `${current.getDate()}-${current.getMonth() + 1}-${current.getFullYear()}`; */

      try {
        const res = await pool.query(
          `INSERT INTO ${tableName.vocab}
          (user_id, word, parts_of_speech, en_mean, vi_mean, pronounce, inserted_at, remind_at, remind_count, learning)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
          [
            +userId,
            word.trim(),
            partsOfSpeech,
            enMean,
            viMean,
            pronounce,
            insertedAt,
            insertedAt,
            0,
            true,
          ]
        );

        return res.rowCount !== 0 ? res.rows : null;
      } catch (error) {
        console.log("error:", error);
      }
    },

    async device({ userId, deviceId, endpoint, keys = {} }) {
      try {
        const res = await pool.query(
          `INSERT INTO ${tableName.subscriptions}
          (user_id, device_id, endpoint, p256dh, auth)
          VALUES ($1, $2, $3, $4, $5)`,
          [+userId, deviceId, endpoint, keys.p256dh, keys.auth]
        );
        return res.rowCount !== 0 ? res.rows : null;
      } catch (error) {
        console.log("error:", error);
      }
    },
  },

  get: {
    async otp(email) {
      try {
        const res = await pool.query(`SELECT * FROM ${tableName.otps} WHERE email = $1`, [email]);
        return res.rowCount !== 0 ? res.rows[0] : null;
      } catch (error) {
        console.log("error:", error);
      }
    },

    async allUsers() {
      try {
        const res = await pool.query(`SELECT id FROM ${tableName.users}`);
        return res.rowCount !== 0 ? res.rows : null;
      } catch (error) {
        console.log("error:", error);
      }
    },

    async user(email) {
      try {
        const res = await pool.query(`SELECT * FROM ${tableName.users} WHERE email = $1`, [email]);
        return res.rowCount !== 0 ? res.rows[0] : null;
      } catch (error) {
        console.log("error:", error);
      }
    },

    async allWords() {
      try {
        const res = await pool.query(
          `SELECT user_id, word, parts_of_speech, en_mean, vi_mean, pronounce, remind_at FROM ${tableName.vocab}`
        );
        return res.rowCount !== 0 ? res.rows : null;
      } catch (error) {
        console.log("error:", error);
      }
    },

    async userTodayWords(userId) {
      const nowDate = getDate();
      try {
        const res = await pool.query(
          `SELECT word, parts_of_speech, en_mean, vi_mean, pronounce, remind_at FROM ${tableName.vocab}
          WHERE user_id = $1 AND remind_at = $2 AND learning = $3`,
          [+userId, nowDate, true]
        );
        return res.rowCount !== 0 ? res.rows : null;
      } catch (error) {
        console.log("error:", error);
      }
    },

    async wordsToRemind(userIds) {
      const userIdString = `(${[...userIds]})`;

      const nowDate = getDate();

      try {
        const res = await pool.query(
          `SELECT * FROM ${tableName.vocab}
          WHERE user_id IN ${userIdString} AND remind_at = $1 AND learning = $2`,
          [nowDate, true]
        );
        return res.rowCount !== 0 ? res.rows : null;
      } catch (error) {
        console.log("error:", error);
      }
    },

    async wordsToUpdate() {
      // const nowDate = "24-8-2025";
      const nowDate = getDate();

      try {
        const res = await pool.query(
          `SELECT id, remind_count FROM ${tableName.vocab}
          WHERE remind_at = $1 AND learning = $2`,
          [nowDate, true]
        );
        return res.rowCount !== 0 ? res.rows : null;
      } catch (error) {
        console.log("error:", error);
      }
    },

    async devices() {
      try {
        const res = await pool.query(`SELECT * FROM ${tableName.subscriptions}`);
        return res.rowCount !== 0 ? res.rows : null;
      } catch (error) {
        console.log("error:", error);
      }
    },

    async deviecsToRemind(userIds) {
      const userIdString = `(${[...userIds]})`;

      try {
        const res = await pool.query(
          `SELECT user_id, endpoint, auth, p256dh FROM ${tableName.subscriptions} WHERE user_id IN ${userIdString}`
        );
        return res.rowCount !== 0 ? res.rows : null;
      } catch (error) {
        console.log("error:", error);
      }
    },

    async deviceId(deviceId) {
      try {
        const res = await pool.query(`SELECT * FROM ${tableName.subscriptions} WHERE device_id = $1`, [
          deviceId,
        ]);
        return res.rowCount !== 0 ? res.rows[0] : null;
      } catch (error) {
        console.log("error:", error);
      }
    },

    async deviceUserId(userId) {
      try {
        const res = await pool.query(`SELECT * FROM ${tableName.subscriptions} WHERE user_id = $1`, [
          userId,
        ]);
        return res.rowCount !== 0 && res.rows[0].endpoint ? res.rows[0] : null;
      } catch (error) {
        console.log("error:", error);
      }
    },
  },

  update: {
    async user({ email, newPass, newPassword }) {
      try {
        const res = await pool.query(
          `UPDATE ${tableName.users}
          SET pass = $2, password = $3
          WHERE email = $1`,
          [email, newPass, newPassword]
        );
        return res.rowCount !== 0 ? res.rows[0] : null;
      } catch (error) {
        console.log("error:", error);
      }
    },

    async word({ id, remind_count: remindCount }) {
      const nextRemind = setNextRemind(remindLater[remindCount]);

      try {
        if (remindCount === remindLater.length) {
          const res = await pool.query(
            `UPDATE ${tableName.vocab}
            SET remind_count = $2, learning = $3
            WHERE id = $1`,
            [id, remindCount + 1, false]
          );
          return res.rowCount !== 0 ? res.rows[0] : null;
        }

        const res = await pool.query(
          `UPDATE ${tableName.vocab}
          SET remind_at = $2, remind_count = $3
          WHERE id = $1`,
          [id, nextRemind, remindCount + 1]
        );
        return res.rowCount !== 0 ? res.rows[0] : null;
      } catch (error) {
        console.log("error:", error);
      }
    },

    async device({ deviceId, endpoint, keys }) {
      try {
        const res = await pool.query(
          `UPDATE ${tableName.subscriptions}
          SET p256dh = $1, auth = $2, endpoint = $3
          WHERE device_id = $4`,
          [keys.p256dh, keys.auth, endpoint, deviceId]
        );
        return res.rowCount !== 0 ? res.rows : null;
      } catch (error) {
        console.log("error:", error);
      }
    },
  },

  delete: {
    async device(deviceId) {
      try {
        const res = await pool.query(
          `DELETE FROM ${tableName.subscriptions}
          WHERE device_id = $1`,
          [deviceId]
        );
        return res.rowCount !== 0 ? res.rows[0] : null;
      } catch (error) {
        console.log("error:", error);
      }
    },
  },
};

module.exports = queries;
