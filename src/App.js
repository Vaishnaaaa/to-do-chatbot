import React, { useState } from 'react';
import ToDoList from './components/ToDoList';
import Chatbot from './components/Chatbot';

function App() {
  const [tasks, setTasks] = useState(['Buy groceries', 'Walk the dog', 'Finish homework']);
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask) {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  return (
    <div className="App">
      <h1>To-Do Chatbot</h1>
      <ToDoList tasks={tasks} />
      <div>
        <input
          type="text"
          value={newTask}
          onChange={handleInputChange}
          placeholder="Add a new task"
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <Chatbot />
    </div>
  );
}

export default App;
