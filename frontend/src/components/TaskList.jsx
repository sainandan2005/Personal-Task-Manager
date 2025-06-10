import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Alert, Card, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AnimatedTaskList from './AnimatedTaskList.jsx';
import { getTasks, deleteTask } from '../services/taskService';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState({
    status: 'all',
    priority: 'all',
    search: '',
  });

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // Apply filters whenever filter state or tasks change
  useEffect(() => {
    applyFilters();
  }, [filter, tasks]);  // Fetch tasks from the API
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch tasks');
      setLoading(false);
    }
  };
  // Handle delete task with optimistic UI update
  const handleDelete = async (id) => {
    // Store the task in case we need to rollback
    const taskToDelete = tasks.find(task => task._id === id);
    
    // Optimistically remove the task from UI immediately for animation
    setTasks(prevTasks => prevTasks.filter((task) => task._id !== id));
    
    try {
      // Call API to delete from backend
      await deleteTask(id);
    } catch (error) {
      // Rollback: add the task back if API call fails
      setTasks(prevTasks => [...prevTasks, taskToDelete]);
      setError('Failed to delete task');
    }
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };  // Apply filters to the tasks
  const applyFilters = () => {
    let result = [...tasks];

    // Filter by status
    if (filter.status !== 'all') {
      result = result.filter((task) => task.status === filter.status);
    }

    // Filter by priority
    if (filter.priority !== 'all') {
      result = result.filter((task) => task.priority === filter.priority);
    }

    // Filter by search term
    if (filter.search) {
      const searchTerm = filter.search.toLowerCase();
      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(searchTerm) ||
          (task.description && task.description.toLowerCase().includes(searchTerm))
      );
    }

    setFilteredTasks(result);
  };return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="m-0 fw-bold" style={{ color: 'var(--text-primary)' }}>
          <i className="bi bi-kanban me-2 text-primary"></i>
          My Tasks
        </h2>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}
      
      <Card className="mb-4">
        <Card.Body className="p-4">
          <Row className="g-3">
            <Col md={8}>
              <InputGroup className="shadow-sm">
                <InputGroup.Text>
                  <i className="bi bi-search"></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="search"
                  value={filter.search}
                  onChange={handleFilterChange}
                  placeholder="Search tasks by title..."
                  className="form-control-lg"
                />
              </InputGroup>
            </Col>
            <Col md={4}>
              <Form.Select
                name="priority"
                value={filter.priority}
                onChange={handleFilterChange}
                className="form-select-lg"
              >
                <option value="all">All Priorities</option>
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </Form.Select>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border" role="status" style={{ color: 'var(--accent-blue)' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3" style={{ color: 'var(--text-secondary)' }}>Loading your tasks...</p>
        </div>      ) : filteredTasks.length === 0 ? (        
        <Card className="text-center p-5 empty-state" style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)',
            background: `linear-gradient(135deg, var(--bg-secondary), var(--bg-tertiary))`,
            position: 'relative',
            overflow: 'visible'
          }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '100%',
            background: 'repeating-linear-gradient(135deg, rgba(100, 160, 255, 0.03), rgba(100, 160, 255, 0.03) 20px, transparent 20px, transparent 40px)',
            zIndex: 0
          }}></div>
          <Card.Body style={{ position: 'relative', zIndex: 1 }}>
            <div className="position-relative mb-4">
              <div style={{
                width: '120px',
                height: '120px',
                margin: '0 auto 1.5rem',
                position: 'relative'
              }}>
                {/* Hexagonal icon container with glowing border */}
                <div style={{
                  width: '100%',
                  height: '100%',
                  background: 'rgba(100, 160, 255, 0.1)',
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(100, 160, 255, 0.2)',
                  boxShadow: '0 0 20px rgba(100, 160, 255, 0.15)'
                }}>
                  <i className="bi bi-clipboard-check display-2" style={{ color: 'var(--accent-blue)' }}></i>
                </div>
                {/* Small decorative geometric shapes */}
                <div style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '-15px',
                  width: '30px',
                  height: '30px',
                  background: 'rgba(100, 160, 255, 0.15)',
                  clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                  transform: 'rotate(15deg)'
                }}></div>
                <div style={{
                  position: 'absolute',
                  bottom: '0px',
                  left: '-20px',
                  width: '25px',
                  height: '25px',
                  background: 'rgba(100, 160, 255, 0.1)',
                  clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
                  transform: 'rotate(-10deg)'
                }}></div>
              </div>
            </div>
            <h4 className="mb-3" style={{ 
              color: 'var(--text-primary)',
              fontWeight: '600',
              letterSpacing: '0.02em'
            }}>No tasks found</h4>
            <p style={{ 
              color: 'var(--text-secondary)',
              fontSize: '1.1rem',
              maxWidth: '500px',
              margin: '0 auto 2rem'
            }}>Create a new task to get started with your personal task manager!</p>
            <div className="d-flex justify-content-center mt-4">                <Link 
                to="/tasks/create" 
                className="btn-geometric"
                onClick={(e) => {
                  // Add ripple effect on click
                  const button = e.currentTarget;
                  const ripple = document.createElement('span');
                  const rect = button.getBoundingClientRect();
                  
                  ripple.className = 'ripple';
                  ripple.style.width = ripple.style.height = Math.max(rect.width, rect.height) + 'px';
                  ripple.style.left = e.clientX - rect.left - ripple.offsetWidth / 2 + 'px';
                  ripple.style.top = e.clientY - rect.top - ripple.offsetHeight / 2 + 'px';
                  
                  button.appendChild(ripple);
                  
                  setTimeout(() => ripple.remove(), 600);
                }}
              >
                Add Your First Task
              </Link>
            </div>
          </Card.Body>
        </Card>
      ) : (        <AnimatedTaskList tasks={filteredTasks} onDelete={handleDelete} />
      )}
    </Container>
  );
};

export default TaskList;
