import { Link, Route, Routes } from "react-router-dom";
import { useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";

import { TheList } from "./TheList";
import { AllNotes } from "./AllNotes";
import { Done } from "./Don";
import { Notyet } from "./NotYet";

export default function TodoList() {
  const [inputValue, setInputValue] = useState("");
  const [notes, setNotes] = useState([]);
  const [notesDone, setNotesDone] = useState([]);
  // const [notesNotYet, setNotesNotYet] = useState([]);

  let notesList;
  if (notes.length !== 0) {
    notesList = notes.map((note) => {
      return (
        <div className="thenote" key={note.id}>
          <p>{note.val}</p>
          <ul>
            <li onClick={() => deleteNote(note.id)}>
              <DeleteIcon />
            </li>
            <li>
              <EditIcon />
            </li>
            <li onClick={() => moveNote(note.id)}>
              <DoneIcon />
            </li>
          </ul>
        </div>
      );
    });
  }

  function addNewNote() {
    setNotes([...notes, { id: Date.now(), val: inputValue }]);
    setInputValue("");
  }

  function deleteNote(ID) {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== ID));
  }

  function moveNote(ID) {
    const notesListForDone = notes.find((note) => note.id === ID);
    setNotesDone([...notesDone, notesListForDone]);
  }

  return (
    <div className="todolist">
      <h1>TodoList</h1>

      <ul className="navbar">
        <Link className="nav-link" to={"/lists/allnotes"}>
          <li>All notes</li>
        </Link>

        <Link className="nav-link" to={"/lists/done"}>
          <li>Done</li>
        </Link>

        <Link className="nav-link" to={"/lists/notyet"}>
          <li>Not yet</li>
        </Link>
      </ul>

      <Routes>
        <Route path="/lists" element={<TheList />}>
          <Route path="allnotes" element={<AllNotes theNotes={notesList} />} />
          <Route
            path="done"
            element={<Done theNotes={notesDone} delNot={deleteNote} />}
          />
          <Route path="notyet" element={<Notyet theNotes={notesList} />} />
        </Route>
      </Routes>

      <div className="addFeature">
        <div className="addBtn" onClick={() => addNewNote()}>
          Add new one
        </div>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
    </div>
  );
}

// ! important Note
// we should keep our data in states not variables cause every time react renders the component
// it will assign the variable the first value for example "" empty one
// but react keeps the states data in it's components
