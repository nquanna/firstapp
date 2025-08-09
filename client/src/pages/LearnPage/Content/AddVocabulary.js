import { useState } from "react";
import classNames from "classnames/bind";
import style from "./Content.module.scss";

const cx = classNames.bind(style);
function AddVocabulary() {
  const [newWord, setNewWord] = useState({
    word: "",
    partsOfSpeech: "",
    enMean: "",
    viMean: "",
    pronounce: "",
  });

  return (
    <div className={cx("content-wrapper")}>
      <div className={cx("title")}>Add New Vocabulary</div>

      <div className={cx("add-vocabulary-wrapper")}>
        <div className={cx("input-group", "word-and-parts")}>
          <input
            name="word"
            value={newWord.word}
            placeholder="New word"
            onChange={(event) =>
              setNewWord((prev) => {
                return { ...prev, [event.target.name]: event.target.value };
              })
            }
          />

          <input
            name="partsOfSpeech"
            value={newWord.partsOfSpeech}
            placeholder="Parts of speech"
            onChange={(event) =>
              setNewWord((prev) => {
                return { ...prev, [event.target.name]: event.target.value };
              })
            }
          />
        </div>

        <div className={cx("input-group")}>
          <textarea
            name="enMean"
            value={newWord.enMean}
            rows={3}
            placeholder="English meaning"
            onChange={(event) =>
              setNewWord((prev) => {
                return { ...prev, [event.target.name]: event.target.value };
              })
            }
          />
        </div>
        <div className={cx("input-group")}>
          <textarea
            name="viMean"
            value={newWord.viMean}
            rows={3}
            placeholder="Vietnamese meaning"
            onChange={(event) =>
              setNewWord((prev) => {
                return { ...prev, [event.target.name]: event.target.value };
              })
            }
          />
        </div>
        <div className={cx("input-group")}>
          <input
            name="pronounce"
            value={newWord.pronounce}
            placeholder="pronounce"
            onChange={(event) =>
              setNewWord((prev) => {
                return { ...prev, [event.target.name]: event.target.value };
              })
            }
          />
        </div>

        <input type="submit" value="Add" />
      </div>
    </div>
  );
}

export default AddVocabulary;
