const { Pool } = require("pg");

const constanst = require("../../utils/constanst");

const tableName = "Vocabularies";

const pool = new Pool({
  connectionString: constanst.neonUrl,
  // serverless
  ssl: { rejectUnauthorized: false },
});

const queries = {
  createTable() {
    pool.query(
      `CREATE TABLE ${tableName}
        (number_order INTEGER,
        word TEXT,
        en_mean TEXT,
        vi_mean TEXT,
        pronounce TEXT,
        inserted_at DATE,
        remind_at DATE,
        remind_count INTEGER,
        learning BOOLEAN)`,
      (err, res) => {
        console.log("err:", err);
        console.log(res);
      }
    );
  },

  getAllWords() {
    pool.query(`SELECT * FROM ${tableName}`, (error, res) => {
      error && console.log(error);
      console.log(res.rows);
    });
  },

  getWordsToRemind(nowDate) {
    pool.query(`SELECT * FROM ${tableName} WHERE remind_at = ${nowDate}`, (error, res) => {
      error && console.log(error);
      console.log(res.rows);
    });
  },

  insertWord({ order, word, enMean, viMean, pronounce }) {
    pool.query("", (error, res) => {
      error && console.log(error);
      console.log(res);
    });
  },
};

module.exports = queries;

// order, word, en_mean, vi_mean, pronounce, inserted_at, remind_at, remind_count, learning
