import { useState, useEffect } from "react";
import classNames from "classnames/bind";

import { api } from "~/utils";

import style from "./Content.module.scss";
const cx = classNames.bind(style);

function AllVocabularies() {
  const [allWords, setAllWords] = useState([]);

  useEffect(() => {
    const autoGetVocab = async () => {
      const response = await api.request({
        path: "/learn/all-words",
        method: "get",
      });

      response.success && setAllWords(response.allWords);
    };

    autoGetVocab();
  }, []);

  return (
    <div className={cx("content-wrapper")}>
      <div className={cx("title")}>All Vocabularies</div>

      <table className={cx("vocabularies-table")}>
        <tbody>
          <tr>
            <th>User ID</th>
            <th>Word</th>
            <th>Parts of speech</th>
            <th>English</th>
            <th>Vietnamese</th>
            <th>Pronounce</th>
            <th>Remind at</th>
          </tr>
          {allWords.map((vocabObj, index) => (
            <tr key={index}>
              <td>{vocabObj.user_id}</td>
              <td>{vocabObj.word}</td>
              <td>{vocabObj.parts_of_speech}</td>
              <td>{vocabObj.en_mean}</td>
              <td>{vocabObj.vi_mean}</td>
              <td>{vocabObj.pronounce}</td>
              <td>{vocabObj.remind_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllVocabularies;
