import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { format, isPast, isFuture } from 'date-fns';

const TaskItem = ({ task, onDelete }) => {
  // Helper function to determine badge color based on status
  const getStatusBadge = (status) => {
    switch (status) {
      case 'todo':
        return 'secondary';
      case 'in-progress':
        return 'primary';
      case 'completed':
        return 'success';
      default:
        return 'secondary';
    }
  };

  // Helper function to determine badge color based on priority
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high':
        return 'danger';
      case 'medium':
        return 'warning';
      case 'low':
        return 'info';
      default:
        return 'warning';
    }
  };
  
  // Helper function to check if task is overdue
  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    return isPast(new Date(dueDate)) && new Date(dueDate).setHours(0,0,0,0) < new Date().setHours(0,0,0,0);
  };
  
  // Helper function to determine due date color
  const getDueDateColor = (dueDate) => {
    if (!dueDate) return '';
    
    if (isOverdue(dueDate)) {
      return 'text-danger';
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const taskDate = new Date(dueDate);
    taskDate.setHours(0, 0, 0, 0);
    
    if (taskDate.getTime() === today.getTime()) {
      return 'text-warning';
    }
    
    return '';
  };
    return (
    <Card className="mb-4 task-card" data-priority={task.priority}>
      <Card.Body className="p-4">
        {/* Small decorative geometric element - top left */}
        <div 
          style={{
            position: 'absolute',
            top: '-5px',
            left: '15px',
            width: '10px',
            height: '10px',
            background: `var(--priority-${task.priority})`,
            opacity: 0.3,
            clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
            transform: 'rotate(45deg)'
          }}
        />
        
        <div className="d-flex justify-content-between align-items-start mb-3">
          <h5 className="card-title mb-0">{task.title}</h5>
          <Badge 
            bg={getPriorityBadge(task.priority)} 
            className="badge-geometric px-3 py-2 ms-2 text-uppercase" 
            style={{ 
              fontSize: '0.65rem', 
              letterSpacing: '0.05em',
              fontWeight: 'bold'
            }}
          >
            {task.priority}
          </Badge>
        </div>
        
        {task.dueDate && (
          <div className={`${getDueDateColor(task.dueDate)} mb-4 d-flex align-items-center`}
               style={{ 
                 position: 'relative',
                 paddingLeft: '5px'
               }}>
            {/* Small date indicator with geometric styling */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '10px',
              position: 'relative'
            }}>
              <div style={{
                width: '28px',
                height: '28px',
                background: isOverdue(task.dueDate) ? 'rgba(255, 90, 101, 0.15)' : 'rgba(100, 160, 255, 0.1)',
                clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <i className={`bi ${isOverdue(task.dueDate) ? 'bi-exclamation-circle' : 'bi-calendar3'}`} 
                   style={{ fontSize: '0.9rem' }}></i>
              </div>
            </div>
            <span>
              {format(new Date(task.dueDate), 'MMM dd, yyyy')}
              {isOverdue(task.dueDate) && <span className="ms-2">(Overdue)</span>}
            </span>
          </div>
        )}
        
        <div className="d-flex mt-3">
          <Link 
            to={`/tasks/edit/${task._id}`} 
            className="btn btn-outline-light btn-sm btn-geo-action me-2 px-3"
          >
            <i className="bi bi-pencil me-2"></i> Edit
          </Link>
          <Button 
            variant="outline-danger" 
            size="sm" 
            className="btn-geo-action px-3"
            onClick={() => onDelete(task._id)}
          >
            <i className="bi bi-trash me-2"></i> Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TaskItem;
