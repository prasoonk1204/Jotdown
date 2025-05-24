import { createPortal } from "react-dom";
import { useState, useEffect } from "react";

const NoteModal = ({ note, onClose, onSave, isNew }) => {
  const [isEditing, setIsEditing] = useState(isNew);
  const [editedNote, setEditedNote] = useState({ ...note });

  useEffect(() => {
    setEditedNote({ ...note });
    setIsEditing(isNew);
  }, [note, isNew]);

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    setEditedNote({ ...note });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedNote((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(editedNote);
    setIsEditing(false);
  };

  return createPortal(
    <div className="fixed top-0 left-0 w-screen h-screen z-50 bg-black/50 backdrop-blur-lg text-white p-20 flex justify-center">
      <div className="border-1 border-gray-500 p-8 rounded-xl bg-zinc-900/50 w-[70vw] h-[80vh] overflow-y-scroll scrollbar">
        <div className="flex justify-between items-center h-10 mb-4">
          {isEditing ? (
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={editedNote.title}
              onChange={handleChange}
              className="text-2xl font-bold bg-transparent border-b border-gray-600 focus:outline-none w-[80%]"
            />
          ) : (
            <h1 className="text-2xl font-bold">{note.title}</h1>
          )}

          <div className="flex gap-4 items-center">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="bg-emerald-500 px-4 py-2 border-[0.5px] border-emerald-600 rounded-lg cursor-pointer hover:bg-emerald-600 transition-all duration-200 hover:scale-95"
                >
                  Save
                </button>
                {!isNew && (
                  <button
                    onClick={handleCancel}
                    className="bg-gray-600 px-4 py-2 border-[0.5px] border-gray-600 rounded-lg cursor-pointer hover:bg-gray-700 transition-all duration-200 hover:scale-95"
                  >
                    Cancel
                  </button>
                )}
              </>
            ) : (
              <button
                onClick={handleEdit}
                className="bg-gray-600 px-4 py-2 border-[0.5px] border-gray-600 rounded-lg cursor-pointer hover:bg-gray-700 transition-all duration-200 hover:scale-95"
              >
                Edit
              </button>
            )}
            <button
              onClick={onClose}
              className="bg-black/25 px-4 py-2 border-[0.5px] border-gray-500 rounded-lg cursor-pointer hover:bg-gray-700 transition-all duration-200 hover:scale-95"
            >
              Close
            </button>
          </div>
        </div>

        {isEditing ? (
          <textarea
            name="content"
            value={editedNote.content}
            onChange={handleChange}
            className="w-full h-[88%] bg-zinc-800/40 p-4 rounded text-white border border-gray-600 focus:outline-none"
          />
        ) : (
          <p className="whitespace-pre-wrap">{note.content}</p>
        )}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default NoteModal;
