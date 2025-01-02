import React, { useState, useEffect } from 'react';
import './ToDoChatBot.css';

const ToDoChatBot = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [messages, setMessages] = useState([
    { text: 'Hi! How can I assist you with your tasks today?', sender: 'bot' },
  ]);

  // Load saved tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('data');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks are updated
  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskText) => {
    if (taskText.trim() === '') {
      alert('You must write something!');
    } else {
      const newTask = { text: taskText, completed: false };
      setTasks((prevTasks) => [...prevTasks, newTask]);
    }
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleUserInput = (e) => {
    e.preventDefault();
    const userMessage = e.target.elements.userInput.value.trim();
    if (userMessage === '') return;

    const updatedMessages = [...messages, { text: userMessage, sender: 'user' }];
    setMessages(updatedMessages);
    e.target.elements.userInput.value = '';

    // Generate bot response based on user input
    setTimeout(() => {
      const botReply = processCommand(userMessage);
      setMessages((prevMessages) => [...prevMessages, { text: botReply, sender: 'bot' }]);
    }, 1000);
  };

  const processCommand = (message) => {
    const lowerMessage = message.toLowerCase();

    // Add Task
    if (lowerMessage.startsWith('add')) {
      const match = message.match(/add ['"](.+?)['"]/);
      if (match) {
        addTask(match[1]);
        return `Added "${match[1]}" to your to-do list.`;
      } else {
        return 'Please specify the task to add in quotes, like: Add "Buy groceries".';
      }
    }

    // List Tasks
    if (lowerMessage.includes('what are my tasks')) {
      if (tasks.length === 0) {
        return 'Your to-do list is empty.';
      }
      const taskList = tasks
        .map((t, i) => `${i + 1}. ${t.text} (${t.completed ? 'Done' : 'Pending'})`)
        .join('\n');
      return `Here are your tasks:\n${taskList}`;
    }

    // Mark Task as Done
    if (lowerMessage.startsWith('mark')) {
      const match = message.match(/mark ['"](.+?)['"] as done/);
      if (match) {
        const taskIndex = tasks.findIndex((t) => t.text === match[1]);
        if (taskIndex !== -1) {
          toggleTaskCompletion(taskIndex);
          return `Marked "${match[1]}" as done.`;
        } else {
          return `Task "${match[1]}" not found in your to-do list.`;
        }
      } else {
        return 'Please specify the task to mark as done, like: Mark "Buy groceries" as done.';
      }
    }

    // Default response
    return "I'm here to help! Try commands like:\n- Add 'Task Name'\n- What are my tasks?\n- Mark 'Task Name' as done.";
  };

  return (
    <div className="todo-chatbot">
      <div className="chatbox">
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <form onSubmit={handleUserInput}>
          <input type="text" name="userInput" placeholder="Ask me anything!" required />
          <button type="submit">Send</button>
        </form>
      </div>

      <div className="todo-app">
        <h2>To-Do List</h2>
        <div className="row">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Add your text"
          />
          <button onClick={() => addTask(task)}>Add</button>
        </div>
        <ul id="list-container">
          {tasks.map((task, index) => (
            <li
              key={index}
              className={task.completed ? 'checked' : ''}
              onClick={() => toggleTaskCompletion(index)}
            >
              {task.text}
              <span onClick={(e) => { e.stopPropagation(); deleteTask(index); }}>&#10005;</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ToDoChatBot;
