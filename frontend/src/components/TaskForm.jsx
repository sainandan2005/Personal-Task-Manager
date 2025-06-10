import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Card, Alert, Row, Col, Badge } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { createTask, getTaskById, updateTask } from '../services/taskService';

const TaskForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const [formData, setFormData] = useState({
    title: '',
    priority: 'medium',
    dueDate: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditMode) {
      fetchTask();
    }
  }, [id]);
  const fetchTask = async () => {
    try {
      setLoading(true);
      const task = await getTaskById(id);
      
      // Format due date for the form
      const formattedDueDate = task.dueDate 
        ? new Date(task.dueDate).toISOString().split('T')[0]
        : '';
      
      setFormData({
        title: task.title,
        priority: task.priority,
        dueDate: formattedDueDate,
      });
      
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch task');
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      if (isEditMode) {
        await updateTask(id, formData);
      } else {
        await createTask(formData);
      }
      
      navigate('/');
    } catch (error) {
      setError('Failed to save task');
      setLoading(false);
    }
  };  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={8} xl={7}>
          <Card className="shadow-lg" style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 95%, 95% 100%, 0 100%)',
            position: 'relative',
            overflow: 'visible'
          }}>
            {/* Decorative geometric shapes */}
            <div style={{
              position: 'absolute',
              top: '-15px',
              right: '30px',
              width: '30px',
              height: '30px',
              background: isEditMode ? 'rgba(255, 186, 76, 0.15)' : 'rgba(100, 160, 255, 0.15)',
              clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
              transform: 'rotate(15deg)',
              zIndex: 1
            }}></div>
            
            <Card.Header as="h4" className="p-4 d-flex align-items-center" style={{
              position: 'relative',
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 95% 100%, 0 100%)',
            }}>
              <div className="me-3" style={{
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: isEditMode ? 'rgba(255, 186, 76, 0.15)' : 'rgba(100, 160, 255, 0.15)',
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              }}>
                <i className={`bi ${isEditMode ? 'bi-pencil-square' : 'bi-plus-circle'} fs-4`} style={{
                  color: isEditMode ? 'var(--priority-medium)' : 'var(--accent-blue)'
                }}></i>
              </div>
              <span style={{ color: 'var(--text-primary)' }}>
                {isEditMode ? 'Edit Task' : 'Create New Task'}
              </span>
            </Card.Header>
            <Card.Body className="p-4">
              {error && <Alert variant="danger" className="border-0 shadow-sm">{error}</Alert>}
                <Form onSubmit={handleSubmit} className="mt-3">
                <Form.Group className="mb-4 position-relative">
                  <Form.Label className="d-flex align-items-center">
                    <div style={{
                      width: '24px',
                      height: '24px',
                      background: 'rgba(100, 160, 255, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '10px',
                      clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
                    }}>
                      <i className="bi bi-list-task text-primary" style={{ fontSize: '0.8rem' }}></i>
                    </div>
                    Task Title
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="What needs to be done?"
                    required
                    className="form-control-lg"
                    autoFocus
                    style={{
                      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 98% 100%, 0 100%)',
                      borderLeft: '3px solid var(--accent-blue)'
                    }}
                  />
                </Form.Group>                <Row className="mb-4 g-4">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="d-flex align-items-center">
                        <div style={{
                          width: '24px',
                          height: '24px',
                          background: 'rgba(255, 90, 101, 0.15)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: '10px',
                          clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)'
                        }}>
                          <i className="bi bi-flag" style={{ 
                            color: 'var(--priority-high)',
                            fontSize: '0.8rem'
                          }}></i>
                        </div>
                        Priority
                      </Form.Label>
                      <div style={{ position: 'relative' }}>
                        <Form.Select 
                          name="priority" 
                          value={formData.priority} 
                          onChange={handleChange}
                          className="form-select-lg"
                          style={{
                            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 95% 100%, 0 100%)',
                            borderLeft: formData.priority === 'high' 
                              ? '3px solid var(--priority-high)'
                              : formData.priority === 'medium'
                                ? '3px solid var(--priority-medium)'
                                : '3px solid var(--priority-low)'
                          }}
                        >
                          <option value="low">Low Priority</option>
                          <option value="medium">Medium Priority</option>
                          <option value="high">High Priority</option>
                        </Form.Select>
                        <div style={{
                          position: 'absolute',
                          right: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          width: '8px',
                          height: '8px',
                          clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                          background: formData.priority === 'high' 
                            ? 'var(--priority-high)'
                            : formData.priority === 'medium'
                              ? 'var(--priority-medium)'
                              : 'var(--priority-low)',
                          opacity: 0.5,
                          pointerEvents: 'none'
                        }}></div>
                      </div>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="d-flex align-items-center">
                        <div style={{
                          width: '24px',
                          height: '24px',
                          background: 'rgba(255, 186, 76, 0.15)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: '10px',
                          clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'
                        }}>
                          <i className="bi bi-calendar-event" style={{ 
                            color: 'var(--priority-medium)',
                            fontSize: '0.8rem' 
                          }}></i>
                        </div>
                        Due Date
                      </Form.Label>
                      <Form.Control
                        type="date"
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={handleChange}
                        className="form-control-lg"
                        style={{
                          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 98% 100%, 0 100%)',
                          borderLeft: '3px solid var(--priority-medium)'
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row><div className="d-grid gap-3 d-md-flex justify-content-md-end mt-5">
                  <Button 
                    variant="outline-secondary" 
                    onClick={() => navigate('/')}
                    className="px-4 py-2 btn-geo-action"
                  >
                    <i className="bi bi-x-lg me-2"></i>Cancel
                  </Button>
                  <Button 
                    variant={isEditMode ? "warning" : "primary"} 
                    type="submit" 
                    disabled={loading}
                    className={`btn-geometric px-4 py-2 ${loading ? 'opacity-75' : ''}`}
                    style={{
                      minWidth: 'auto',
                      marginTop: '0',
                      backgroundColor: isEditMode ? 'var(--priority-medium)' : 'var(--accent-blue)',
                    }}
                    onClick={(e) => {
                      if (loading) return;
                      
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
                  >                    {loading ? 
                      <><i className="bi bi-hourglass-split me-2"></i>Saving...</> : 
                      isEditMode ? 
                        <><i className="bi bi-check-lg me-2"></i>Update Task</> : 
                        <>Create Task</>
                    }
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TaskForm;
