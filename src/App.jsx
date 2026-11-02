import { useState } from 'react'
import './App.css'
import Advice from "./Advice.jsx"

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true)

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('light-mode');
  };

  return (
    <div className="container">
      <button className="theme-toggle-btn" onClick={toggleTheme}>
        {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <h1>Day 01: Advice Generator</h1>
      <h2>Advice Slip</h2>
      <Advice isDarkMode={isDarkMode} />
    </div>
  );
}

export default App