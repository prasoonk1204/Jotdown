import NoteModal from "../notes/NoteModal";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";

const Notes = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const noteId = searchParams.get("note");
  //sample notes
  const notes = [
    {
      id: 1,
      title: "Note 1",
      content:
        "This is the content of note 1 This is the content of note 1 This is the content of note 1This is the content of note 1 This is the content of note 1 This is the content of note 1This is the content of note 1 This is the content of note 1 This is the content of note 1 1This is the content of note 1 This is the content of note 1 This is the content of note 11This is the content of note 1 This is the content of note 1 This is the content of note 11This is the content of note 1 This is the content of note 1 This is the content of note 11This is the content of note 1 This is the content of note 1 This is the content of note 11This is the content of note 1 This is the content of note 1 This is the content of note 11This is the content of note 1 This is the content of note 1 This is the content of note 11This is the content of note 1 This is the content of note 1 This is the content of note 11This is the content of note 1 This is the content of note 1 This is the content of note 1",
    },
    {
      id: 2,
      title: "Note 2",
      content: "This is the content of note 2",
    },
    {
      id: 3,
      title: "Note 3",
      content: "This is the content of note 3",
    },
  ];

  const selectedNote = notes.find((n) => n.id ===  Number(noteId));

  const openNote = (note) => {
    setSearchParams({ note: note.id });
  };

  const closeNote = () => {
    setSearchParams({});
  };

  return (
    <div className="text-white bg-black/25 backdrop-blur-2xl w-full p-4 rounded-lg ">
      <div className="flex justify-between mb-4">
        <h1>Notes</h1>
        <button className="bg-black/35 px-4 py-2 border-[0.5px] border-emerald-500 rounded-lg cursor-pointer hover:bg-emerald-500 transition-all duration-200 hover:scale-95">
          New Note
        </button>
      </div>
      <div>
        {notes.map((note, index) => {
          return (
            <div key={index} className="bg-black/25 p-4 my-2 rounded-lg">
              <div className="flex w-full justify-between items-center">
                <h2 className="text-xl font-bold">{note.title}</h2>
                <div className="flex gap-4">
                  <button
                    className="bg-gray-600 px-4 py-2 border-[0.5px] border-gray-600 rounded-lg cursor-pointer hover:bg-gray-700 transition-all duration-200 hover:scale-95"
                    onClick={() => openNote(note)}
                  >
                    View
                  </button>
                  <button className="bg-black/25 px-4 py-2 border-[0.5px] border-gray-500 rounded-lg cursor-pointer hover:bg-gray-700 transition-all duration-200 hover:scale-95">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {selectedNote && <NoteModal note={selectedNote} onClose={closeNote} />}
    </div>
  );
}

export default Notes