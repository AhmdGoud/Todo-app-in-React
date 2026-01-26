import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export function Notyet({ theNotes, delNot }) {
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

            <li>
              <EditIcon />
            </li>
          </ul>
        </div>
      );
    });
  }

  return (
    <div>
      <p>Notes Not Finished Yet</p>
      {notesList}
    </div>
  );
}
