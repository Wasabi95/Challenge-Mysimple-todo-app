import React, { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([
    "shopping",
    "Walk my cat",
    "Do the laundry",
    "Clean the apartment",
    "Pay my bills",
  ]);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTask = () => {
    if (editIndex !== null) {
      // If an edit is in progress, update the task at the edit index
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = editValue;
      setTasks(updatedTasks);
      setEditIndex(null);
      setEditValue("");
    } else {
      // Otherwise, add a new task
      setTasks([...tasks, inputValue]);
      setInputValue("");
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    if (index === editIndex) {
      // If the deleted task was being edited, reset the edit state
      setEditIndex(null);
      setEditValue("");
    }
  };

  const handleStartEditTask = (index, value) => {
    setEditIndex(index);
    setEditValue(value);
    setInputValue(value);
  };

  const handleCancelEditTask = () => {
    setEditIndex(null);
    setEditValue("");
    setInputValue("");
  };

  const handleInputChangeDuringEdit = (event) => {
    setEditValue(event.target.value);
  };

  return (
    <div>
      <h1>Task List</h1>
      <input
        type="text"
        value={editIndex !== null ? editValue : inputValue}
        onChange={
          editIndex !== null ? handleInputChangeDuringEdit : handleInputChange
        }
        placeholder="Add a new task"
      />
      {editIndex !== null ? (
        <div>
          <button onClick={handleAddTask}>Save</button>
          <button onClick={handleCancelEditTask}>Cancel</button>
        </div>
      ) : (
        <button onClick={handleAddTask}>Add</button>
      )}
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {editIndex === index ? (
              <input
                type="text"
                value={editValue}
                onChange={handleInputChangeDuringEdit}
              />
            ) : (
              task
            )}
            {editIndex === index ? (
              <div>
                <button onClick={handleAddTask}>Save</button>
                <button onClick={handleCancelEditTask}>Cancel</button>
              </div>
            ) : (
              <div>
                <button onClick={() => handleStartEditTask(index, task)}>
                  Edit
                </button>
                <button onClick={() => handleDeleteTask(index)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
