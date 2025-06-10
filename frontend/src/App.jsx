import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Styles
import './App.css';
import './enhanced-ui.css';
import './accessibility.css';

// Components
import Header from './components/Header.jsx';
import TaskList from './components/TaskList.jsx';
import TaskForm from './components/TaskForm.jsx';
import NotFound from './components/NotFound.jsx';

function App() {
  // For page transition animation
  const [pageLoaded, setPageLoaded] = useState(false);
  
  useEffect(() => {
    setPageLoaded(true);
  }, []);
  
  return (
    <Router>
      <div 
        className="App dark-theme"
        style={{ 
          opacity: pageLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out' 
        }}
      >
        <Header />
        <main className="py-3">
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/tasks/create" element={<TaskForm />} />
            <Route path="/tasks/edit/:id" element={<TaskForm />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
