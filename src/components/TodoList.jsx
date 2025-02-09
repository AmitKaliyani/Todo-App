import React, { useState } from 'react'

const TodoList = () => {
  const [text, setText] = useState('')
  const [todo, setTodo] = useState([])
  const [isEdited, setIsEdited] = useState(false)
  const [editTodoList, setEditTodoList] = useState(null)

  const addTodo = () => {
    setTodo((prev) => [...prev, { id: Date.now(), text: text, completed: false },])
    setText('')
  }

  const removeTodo = (id) => {
    let filterTodo = todo.filter((todos) => todos.id !== id)
    setTodo(filterTodo)
  }

  const handleEdit = (todo) => {
    setEditTodoList(todo)
    setText(todo.text)
    setIsEdited(true)
  }

  const editTodo = (id, text) => {
    const editedTodo = todo.map((todo) =>
      todo.id === id ? { ...todo, text: text } : todo
    )
    setTodo(editedTodo)
    setText('')
    setIsEdited(false)
    setEditTodoList(null)
  }

  const toggleComplete = (id) => {
    const updatedTodo = todo.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo)
    setTodo(updatedTodo)
  }

  return (
    <div className="flex justify-center min-h-screen bg-gray-100">
      <div className="w-full bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Todo List</h1>

        <div className="flex flex-col md:flex-row mb-6 justify-center mt-5">
          <input
            type="text"
            placeholder=" Add Todo"
            className="w-full md:w-3/4 lg:w-1/2 px-6 py-2 border-2 border-gray-300 rounded-xl focus:outline-none transition-all duration-200 shadow-md hover:shadow-lg"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            className="w-full sm:w-[40%] sm:ms-48 md:w-42 md:ml-4 mt-4 md:mt-0 px-8 py-2 bg-blue-500 text-white rounded-xl shadow-lg transition-all duration-200 hover:bg-blue-600 cursor-pointer"
            onClick={isEdited ? () => editTodo(editTodoList.id, text) : addTodo}
          >
            {isEdited ? 'Update ' : 'Add'} Todo
          </button>
        </div>
        <ul className="space-y-4 sm:w-[80%] md:w-[60%] mx-auto">
          {todo.map((todoItem) => (
            <li
              key={todoItem.id}
              className={`flex items-center justify-between p-4 rounded-lg shadow-md ${
                todoItem.completed ? 'bg-green-100' : 'bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={todoItem.completed}
                  onChange={() => toggleComplete(todoItem.id)}
                  className="cursor-pointer"
                />
                <span
                  className={`text-gray-800 font-medium ${
                    todoItem.completed ? 'line-through text-gray-500' : ''
                  }`}
                >
                  {todoItem.text}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  className="px-4 py-2 text-white bg-amber-500 rounded-md hover:bg-amber-600 cursor-pointer"
                  onClick={() => handleEdit(todoItem)}
                  disabled={todoItem.completed} 
                >
                  Edit
                </button>
                <button
                  className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 cursor-pointer"
                  onClick={() => removeTodo(todoItem.id)}
                >
                  X
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TodoList

