import React from 'react';

const ToDoList = ({ tasks }) => {
  if (!tasks) return <p>Loading tasks...</p>;

  return (
    <div>
      <h2>To-Do List</h2>
      <ul>
        {tasks.length === 0 ? (
          <li>No tasks available</li>
        ) : (
          tasks.map((task, index) => <li key={index}>{task}</li>)
        )}
      </ul>
    </div>
  );
};

export default ToDoList;
