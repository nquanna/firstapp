import { useReducer, useEffect, memo } from "react";
import classNames from "classnames/bind";

import style from "./Options.module.scss";

const cx = classNames.bind(style);

function Options({ setOptions, optionsRef }) {
  const [options, dispatch] = useReducer(
    (prevOptions, event) => {
      return { ...prevOptions, [event.target.name]: event.target.value };
    },
    {
      inputType: "text",
      outputType: "text",
      model: "gemini-2.0-flash",
    }
  );

  useEffect(() => {
    setOptions(options);
    // eslint-disable-next-line
  }, [options]);

  return (
    <div ref={optionsRef} className={cx("options-wrapper")}>
      <select name="inputType" defaultValue={options.inputType} onChange={dispatch}>
        <option value="text">Speech to text</option>
        <option value="audio">Audio</option>
      </select>
      <select name="outputType" defaultValue={options.outputType} onChange={dispatch}>
        <option value="text">Text</option>
        <option value="audio">Audio</option>
      </select>
      <select name="model" defaultValue={options.model} onChange={dispatch}>
        <option value="gemini-2.0-flash">Gemini-2.0-flash</option>
        <option value="gemini-2.5-flash">Gemini-2.5-flash</option>
      </select>
    </div>
  );
}

export default memo(Options);
