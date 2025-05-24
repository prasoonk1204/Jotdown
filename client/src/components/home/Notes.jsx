import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import NoteModal from "../notes/NoteModal";

const Notes = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const noteId = searchParams.get("note");

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getToken = () => localStorage.getItem("jwtToken");

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:4001/notes", {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch notes");
        const data = await res.json();
        setNotes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  const selectedNote = notes.find((n) => (n._id ?? n.id) === noteId);

  const openNote = (note) => {
    setSearchParams({ note: note._id ?? note.id });
  };

  const closeNote = () => {
    const noteToClose = notes.find((n) => (n._id ?? n.id) === noteId);
    if (noteToClose?.id === "temp-id") {
      setNotes((prev) => prev.filter((n) => n.id !== "temp-id"));
    }
    setSearchParams({});
  };

  const handleNewNote = () => {
    const tempNote = {
      id: "temp-id",
      title: "",
      content: "",
    };
    setNotes((prev) => [...prev, tempNote]);
    setSearchParams({ note: "temp-id" });
  };

  const saveNote = async (updatedNote) => {
    try {
      const isNewNote = !updatedNote._id;

      let res;
      if (isNewNote) {
        res = await fetch("http://localhost:4001/notes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify({
            title: updatedNote.title,
            content: updatedNote.content,
          }),
        });
      } else {
        res = await fetch(`http://localhost:4001/notes/${updatedNote._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify({
            title: updatedNote.title,
            content: updatedNote.content,
          }),
        });
      }

      if (!res.ok) throw new Error("Failed to save note");

      const savedNote = await res.json();
      const newNoteData = savedNote.note || savedNote;

      setNotes((prevNotes) =>
        isNewNote
          ? [...prevNotes.filter((n) => n.id !== "temp-id"), newNoteData]
          : prevNotes.map((n) => (n._id === newNoteData._id ? newNoteData : n))
      );

      setSearchParams({ note: newNoteData._id });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:4001/notes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (!res.ok) throw new Error("Failed to delete note");
      setNotes((prev) => prev.filter((note) => (note._id ?? note.id) !== id));
      if (noteId === id) closeNote();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading notes...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="text-white bg-black/25 backdrop-blur-2xl w-[70vw] p-4 rounded-lg h-screen overflow-y-scroll scrollbar self-center">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Notes</h1>
        <button
          className="bg-black/35 px-4 py-2 border-[0.5px] border-emerald-500 rounded-lg cursor-pointer hover:bg-emerald-500 transition-all duration-200 hover:scale-95"
          onClick={handleNewNote}
        >
          New Note
        </button>
      </div>

      {notes.length === 0 ? (
        <p className="text-gray-400">No notes yet.</p>
      ) : (
      <div>
        {notes.map((note) => (
          <div
            key={note._id ?? note.id}
            className="bg-black/25 p-4 my-2 rounded-lg"
          >
            <div className="flex w-full justify-between items-center">
              <h2 className="text-xl font-bold">{note.title}</h2>
              <div className="flex gap-4">
                <button
                  className="bg-gray-600 px-4 py-2 border-[0.5px] border-gray-600 rounded-lg cursor-pointer hover:bg-gray-700 transition-all duration-200 hover:scale-95"
                  onClick={() => openNote(note)}
                >
                  View
                </button>
                <button
                  className="bg-black/25 px-4 py-2 border-[0.5px] border-gray-500 rounded-lg cursor-pointer hover:bg-gray-700 transition-all duration-200 hover:scale-95"
                  onClick={() => handleDelete(note._id ?? note.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      )}

      {selectedNote && (
        <NoteModal
          note={selectedNote}
          onClose={closeNote}
          onSave={saveNote}
          isNew={selectedNote._id === undefined}
        />
      )}
    </div>
  );
};

export default Notes;
