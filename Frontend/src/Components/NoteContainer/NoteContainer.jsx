import React, { useEffect, useState } from "react";

import Note from "../Note/Note";
import "./notecontainer.css";

function NoteContainer({ notes, deleteNote, updateText }) {
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const to = setTimeout(() => {
      setFilteredNotes(notes.filter((note) => note.text.includes(searchText)));
    }, 300);

    return () => {
      clearTimeout(to);
    };
    // eslint-disable-next-line
  }, [searchText]);

  return (
    <div className="note-container">
      <div className="search-container">
        <div className="head">Notes</div>
        <div className="search-container">
          <input
            type="text"
            value={searchText}
            onChange={handleChange}
            placeholder="Search notes..."
          />
        </div>
      </div>
      <div className="note-container_notes custom-scroll">
        {notes.length === 0 && <h3>No Notes present</h3>}
        {searchText !== ""
          ? filteredNotes?.map((item) => (
              <Note
                key={item.id}
                note={item}
                deleteNote={deleteNote}
                updateText={updateText}
              />
            ))
          : notes?.map((item) => (
              <Note
                key={item.id}
                note={item}
                deleteNote={deleteNote}
                updateText={updateText}
              />
            ))}
      </div>
    </div>
  );
}

export default NoteContainer;
