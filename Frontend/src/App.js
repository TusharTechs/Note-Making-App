import React, { useEffect, useState } from "react";

import NoteContainer from "./Components/NoteContainer/NoteContainer";
import Sidebar from "./Components/Sidebar/Sidebar";

import "./App.css";
const opt = {
  hour: "2-digit",
  hour12: true,
  minute: "2-digit",
  day: "2-digit",
  month: "short",
};
function App() {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes-app")) || []
  );

  const addNote = (color) => {
    setNotes([
      {
        id: Date.now() + "" + Math.floor(Math.random() * 78),
        text: "",
        time: new Intl.DateTimeFormat("en-IN", opt).format(new Date()),
        color,
      },
      ...notes,
    ]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const updateText = (text, id) => {
    const index = notes.findIndex((item) => item.id === id);

    setNotes([
      ...notes.slice(0, index),
      {
        ...notes[index],
        text,
      },
      ...notes.slice(index + 1),
    ]);
  };

  useEffect(() => {
    localStorage.setItem("notes-app", JSON.stringify(notes));
  }, [notes]);

  return (
    <div className="App">
      <Sidebar addNote={addNote} />
      <NoteContainer
        notes={notes}
        deleteNote={deleteNote}
        updateText={updateText}
      />
    </div>
  );
}

export default App;