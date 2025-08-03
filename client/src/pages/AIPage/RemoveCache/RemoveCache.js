import { useState, memo } from "react";
import classNames from "classnames/bind";

import { api } from "~/utils";

import style from "./RemoveCache.module.scss";

const cx = classNames.bind(style);

function RemoveCache({ audioStoreRef, setMessages }) {
  const [isShowing, setIsShowing] = useState(false);

  const handleRemoveCache = async (event) => {
    event.preventDefault();
    setIsShowing((prev) => !prev);

    if (!+event.target.name) return;
    const response = await api.request({ method: "get", path: "/ai/remove-cache" });
    if (response.success) {
      audioStoreRef.ai = [];
      audioStoreRef.user = [];

      setMessages([]);
    }
  };

  return (
    <div className={cx("remove-cache-wrapper")}>
      <div className={cx("remove-cache-btn")} onClick={handleRemoveCache}>
        <div className={cx("text")}>Remove Cache</div>
      </div>

      {isShowing && (
        <div className={cx("remove-cache-confirm-wrapper")}>
          <div className={cx("title")}>
            REMOVE CACHE.
            <br /> Are you sure?
          </div>
          <div className={cx("selections")}>
            <input
              type="submit"
              name={0}
              value="Cancel"
              onClick={(event) => {
                handleRemoveCache(event);
              }}
            />
            <input
              type="submit"
              name={1}
              value="Remove"
              onClick={(event) => {
                handleRemoveCache(event);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(RemoveCache);
