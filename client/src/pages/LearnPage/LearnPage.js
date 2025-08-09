import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";

import config from "~/config";

// import "./Content";
import { TodayVocabularies, InsertVocabulary, AllVocabularies } from "./Content";

import style from "./LearnPage.module.scss";

const cx = classNames.bind(style);

function LearnPage({ routerPath }) {
  const body = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (routerPath === config.routes.learn || window.location.pathname === config.routes.learn)
      navigate(config.routes.todayVocabularies);
    // eslint-disable-next-line
  }, [window.location.pathname]);

  switch (routerPath) {
    case config.routes.learn:
      break;
    case config.routes.todayVocabularies:
      body.title = "Reviews Vocabularies Today";
      body.content = <TodayVocabularies />;
      break;
    case config.routes.insertVocabulary:
      body.content = <InsertVocabulary />;
      break;
    case config.routes.allVocabularies:
      body.title = "Reviews All Vocabularies";
      body.content = <AllVocabularies />;
      break;
    default:
      throw new Error("Invalid router path in learn page!");
  }

  const learnPageClassName = `col l-9 m-9 c-12 ${cx("learn-page-wrapper")}`;

  return <div className={learnPageClassName}>{body.content}</div>;
}

export default LearnPage;
