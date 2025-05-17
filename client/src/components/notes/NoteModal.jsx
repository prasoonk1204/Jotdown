import { createPortal } from "react-dom";

const NoteModal = ({ note, onClose }) => {
  if (!note) return null;

  return createPortal(
    <div className="fixed top-0 left-0 w-screen h-screen z-50 bg-black/50 backdrop-blur-lg text-white p-20">
      <div className="border-1 border-gray-500 p-8 rounded-xl bg-zinc-900">
        <div className="flex justify-between items-center h-10 mb-4 ">
          <h1 className="text-2xl font-bold mb-4">{note.title}</h1>
          <div className="flex gap-8 items-center">
            <button
              className="bg-gray-600 px-4 py-2 border-[0.5px] border-gray-600 rounded-lg cursor-pointer hover:bg-gray-700 transition-all duration-200 hover:scale-95 "
            >
              Edit
            </button>
            <button className="bg-black/25 px-4 py-2 border-[0.5px] border-gray-500 rounded-lg cursor-pointer hover:bg-gray-700 transition-all duration-200 hover:scale-95" onClick={onClose}>
              Close
            </button>
          </div>
        </div>

        <p>{note.content}</p>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default NoteModal;
