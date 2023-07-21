import React, { useState } from "react";
import deleteIcon from "../../assets/delete.svg";
import "./note.css";

let timer = 500,
  timeout;

function Note(props) {
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [strike, setStrike] = useState(false);

  const debounce = (func) => {
    clearTimeout(timeout);
    timeout = setTimeout(func, timer);
  };

  const updateText = (text, id) => {
    debounce(() => props.updateText(text, id));
  };

  return (
    <div className="note" style={{ backgroundColor: props.note.color }}>
      <div className="formatting-buttons">
        <button onClick={() => setBold(!bold)} active={bold ? "true" : "false"}>
          <strong>B</strong>
        </button>
        <button
          onClick={() => setItalic(!italic)}
          active={italic ? "true" : "false"}
        >
          <em>I</em>
        </button>
        <button
          onClick={() => setUnderline(!underline)}
          active={underline ? "true" : "false"}
        >
          <u>U</u>
        </button>
        <button
          onClick={() => setStrike(!strike)}
          active={strike ? "true" : "false"}
        >
          <del>S</del>
        </button>
      </div>
      <textarea
        className={`note_text ${bold ? "bold" : ""} ${italic ? "italic" : ""} ${
          underline ? "underline" : ""
        } ${strike ? "strike" : ""}`}
        defaultValue={props.note.text}
        onChange={(event) => updateText(event.target.value, props.note.id)}
      />
      <div className="note_footer">
        <p>{props.note.time}</p>
        <img
          src={deleteIcon}
          alt="DELETE"
          onClick={() => props.deleteNote(props.note.id)}
        />
      </div>
    </div>
  );
}

export default Note;
