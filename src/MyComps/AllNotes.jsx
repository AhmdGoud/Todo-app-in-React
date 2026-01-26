export function AllNotes({ theNotes, notesNum }) {
  return (
    <div>
      <p>
        All Notes <span>{notesNum}</span>
      </p>
      {theNotes}
    </div>
  );
}
