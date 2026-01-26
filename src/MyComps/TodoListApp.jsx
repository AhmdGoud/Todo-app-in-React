import { Link, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";

import { AllNotes } from "./AllNotes";
import { Done } from "./Done";
import { Notyet } from "./NotYet";
import { Lists } from "./ListsRouter";

export default function TodoList() {
  const [inputValue, setInputValue] = useState("");

  const [notes, setNotes] = useState([]);
  const [notesNumber, setNotesNumber] = useState("");

  const [notesDone, setNotesDone] = useState([]);
  const [notesNotYet, setNotesNotYet] = useState([]);

  // render notes
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
            <li onClick={() => editNote(note.id)}>
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
    const returnedNotes = notes.filter((note) => {
      // returns a new arr with ele that pass test
      return !notesDone.some((noteDone) => {
        // some returns true if at least one ele passed the tset
        return noteDone.id === note.id;
      });
    });

    setNotesNotYet(returnedNotes);
  }, [notes, notesDone]);

  useEffect(() => {
    setNotesNumber(notes.length);
  }, [notes]);

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

  // edit and save feature
  const [editDisplay, setEditDisplay] = useState("none");
  const [editInputValue, setEditInputValue] = useState("");
  const [idForEditednote, setIdForEditednote] = useState("");

  const editInputDisplay = {
    display: editDisplay,
  };

  function editNote(noteId) {
    setEditDisplay("block");

    const noteForEdit = notes.find((note) => {
      return note.id === noteId;
    });

    setIdForEditednote(noteForEdit.id);
    setEditInputValue(noteForEdit.val);
  }

  function saveEdited() {
    const notesForMutation = [...notes];
    const noteToSaveEdited = notesForMutation.find((note) => {
      return note.id === idForEditednote;
    });

    noteToSaveEdited.val = editInputValue;
    setNotes(notesForMutation);
  }

  return (
    <div className="todolist">
      <Link to={"/lists"}>
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
        <Route path="/lists" element={<Lists />}>
          <Route
            path="allnotes"
            element={<AllNotes theNotes={notesList} notesNum={notesNumber} />}
          />
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

      {/* add feature  */}
      <div className="addFeature">
        <div className="addBtn" onClick={() => addNewNote()}>
          Add new one
        </div>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addNewNote();
            }
          }}
        />
      </div>

      {/* edit input  */}
      <div className="theEditInput" style={editInputDisplay}>
        <input
          value={editInputValue}
          onChange={(e) => setEditInputValue(e.target.value)}
        />
        <button
          className="saveBtn"
          onClick={() => {
            setEditDisplay("none");
            saveEdited();
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}

// ! important Note
// we should keep our data in states not variables cause every time react renders the component
// it will assign the variable the first value for example "" empty one
// but react keeps the states data in it's components
