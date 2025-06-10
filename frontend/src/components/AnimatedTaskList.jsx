import React from 'react';
import PropTypes from 'prop-types';
import TaskItem from './TaskItem.jsx';

// Simple task component without animations
const SimpleTask = ({ task, onDelete, colSize }) => {
  return (
    <div className={colSize || "col-md-6 col-lg-4"}>
      <TaskItem task={task} onDelete={onDelete} />
    </div>
  );
};

const AnimatedTaskList = ({ tasks, onDelete, colSize }) => {
  // Group tasks by priority if they exist
  const highPriorityTasks = tasks.filter(task => task.priority === 'high');
  const mediumPriorityTasks = tasks.filter(task => task.priority === 'medium');
  const lowPriorityTasks = tasks.filter(task => task.priority === 'low');

  // Function to render a section of tasks with a heading
  const renderTaskSection = (taskList, title, priorityClass) => {
    if (taskList.length === 0) return null;
    
    return (
      <div className={`mb-4 priority-section ${priorityClass}`}>
        <h3 className="priority-heading mb-3">{title}</h3>
        <div className="row g-4">
          {taskList.map((task) => (
            <SimpleTask
              key={task._id}
              task={task}
              onDelete={onDelete}
              colSize={colSize}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      {renderTaskSection(highPriorityTasks, 'High Priority', 'high-priority-section')}
      {renderTaskSection(mediumPriorityTasks, 'Medium Priority', 'medium-priority-section')}
      {renderTaskSection(lowPriorityTasks, 'Low Priority', 'low-priority-section')}
      
      {/* If there are no tasks in any category, show all tasks without grouping */}
      {highPriorityTasks.length === 0 && mediumPriorityTasks.length === 0 && lowPriorityTasks.length === 0 && (
        <div className="row g-4">
          {tasks.map((task) => (
            <SimpleTask
              key={task._id}
              task={task}
              onDelete={onDelete}
              colSize={colSize}
            />
          ))}
        </div>
      )}
    </>
  );
};

SimpleTask.propTypes = {
  task: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  colSize: PropTypes.string
};

AnimatedTaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  colSize: PropTypes.string
};

export default AnimatedTaskList;
