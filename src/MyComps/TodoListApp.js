import { Link, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";

import { AllNotes } from "./AllNotes";
import { Done } from "./Done";
import { Notyet } from "./NotYet";

export default function TodoList() {
  const [inputValue, setInputValue] = useState("");

  const [notes, setNotes] = useState([]);
  const [notesDone, setNotesDone] = useState([]);
  const [notesNotYet, setNotesNotYet] = useState([]);

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
            <li onClick={() => moveNoteForDone(note.id)}>
              <DoneIcon />
            </li>
          </ul>
        </div>
      );
    });
  }

  useEffect(() => {
    moveNoteForNotYet();
  }, [notes, notesDone]);

  function addNewNote() {
    setNotes([...notes, { id: Date.now(), val: inputValue }]);
    setInputValue("");
  }

  function deleteNote(ID) {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== ID));
    setNotesDone((prevNotes) => prevNotes.filter((note) => note.id !== ID));
  }

  function moveNoteForDone(ID) {
    const notesListForDone = notes.find((note) => note.id === ID);
    setNotesDone([...notesDone, notesListForDone]);
  }

  function moveNoteForNotYet() {
    const returnedNotes = notes.filter((note) => {
      // returns a new arr with ele that pass test
      return !notesDone.some((noteDone) => {
        // some returns true if at least one ele passed the tset
        return noteDone.id === note.id;
      });
    });

    setNotesNotYet(returnedNotes);
  }

  return (
    <div className="todolist">
      <Link to={"/posts"}>
        <h1>TodoList</h1>
      </Link>

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
        <Route path="/lists">
          <Route path="allnotes" element={<AllNotes theNotes={notesList} />} />
          <Route
            path="done"
            element={<Done theNotes={notesDone} delNot={deleteNote} />}
          />
          <Route
            path="notyet"
            element={<Notyet theNotes={notesNotYet} delNot={deleteNote} />}
          />
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
