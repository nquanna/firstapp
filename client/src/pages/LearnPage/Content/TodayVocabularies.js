import { useState, useEffect } from "react";
import classNames from "classnames/bind";

import { api } from "~/utils";

import style from "./Content.module.scss";

const cx = classNames.bind(style);

function TodayVocabularies() {
  const [todayVocabularies, setTodayVocabularies] = useState([]);

  useEffect(() => {
    const autoGetVocab = async () => {
      const response = await api.request({
        path: "/learn/user-today-words",
        method: "get",
      });

      response.success && setTodayVocabularies(response.userTodayWords);
    };

    autoGetVocab();
  }, []);

  return (
    <div className={cx("content-wrapper")}>
      <div className={cx("title")}>Today Vocabularies</div>

      <table className={cx("vocabularies-table")}>
        <tbody>
          <tr>
            <th>Word</th>
            <th>Parts of speech</th>
            <th>English</th>
            <th>Vietnamese</th>
            <th>Pronounce</th>
            <th>Remind at</th>
          </tr>
          {todayVocabularies.map((vocabObj, index) => (
            <tr key={index}>
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

export default TodayVocabularies;
