import React from 'react';
import ToDoChatBot from './components/ToDoChatBot';
import './components/ToDoChatBot.css'; // Import the CSS file for styling

function App() {
  return (
    <div className="App">
      <header>
        <h1>To-Do Chatbot</h1>
      </header>
      <main>
        <ToDoChatBot />
      </main>
    </div>
  );
}

export default App;
