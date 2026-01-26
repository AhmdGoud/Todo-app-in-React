import DeleteIcon from "@mui/icons-material/Delete";

export function Done({ theNotes, delNot }) {
  let notesList;
  if (theNotes.length !== 0) {
    notesList = theNotes.map((note) => {
      return (
        <div className="thenote" key={note.id}>
          <p>{note.val}</p>

          <ul>
            <li onClick={() => delNot(note.id)}>
              <DeleteIcon />
            </li>
          </ul>
        </div>
      );
    });
  }

  return (
    <div>
      <p>Notes Done</p>
      {notesList}
    </div>
  );
}
