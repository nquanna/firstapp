import classNames from "classnames/bind";
import style from "./Content.module.scss";

const cx = classNames.bind(style);

function AllVocabularies() {
  return (
    <div className={cx("content-wrapper")}>
      <div className={cx("title")}>All Vocabularies</div>
    </div>
  );
}

export default AllVocabularies;
