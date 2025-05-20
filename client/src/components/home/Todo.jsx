import React from 'react'

const Todo = () => {
  return (
    <div className="text-white bg-black/25 backdrop-blur-2xl w-[70vw] self-center p-4 rounded-lg h-screen">
      <div className="flex justify-between">
        <h1>Todo</h1>
        <button className="bg-black/35 px-4 py-2 border-[0.5px] border-emerald-500 rounded-lg cursor-pointer hover:bg-emerald-500 transition-all duration-200 hover:scale-95">
          New Task
        </button>
      </div>
    </div>
  );
}

export default Todo