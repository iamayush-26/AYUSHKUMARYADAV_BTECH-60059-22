import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import axios from 'axios';
import TaskModal from './TaskModal';

const TaskCard = ({ task, onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: task._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`/tasks/${task._id}`);
        onDelete(task._id);
        toast.success('Task deleted successfully');
      } catch (error) {
        toast.error('Failed to delete task');
      }
    }
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={`bg-white rounded-lg shadow-md p-4 mb-3 cursor-move hover:shadow-lg transition-shadow ${
          isDragging ? 'ring-2 ring-blue-500' : ''
        }`}
      >
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-gray-800 truncate">
            {task.title}
          </h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
            {task.status.replace('-', ' ')}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {task.description || 'No description'}
        </p>
        
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}</span>
          <div className="flex space-x-2">
            <button
              onClick={() => {
                setIsEditing(true);
                setShowModal(true);
              }}
              className="text-blue-600 hover:text-blue-800"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="text-red-600 hover:text-red-800"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <TaskModal
          task={isEditing ? task : null}
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setIsEditing(false);
          }}
          onTaskUpdated={() => {
            // Refresh tasks in parent component
            window.location.reload();
          }}
        />
      )}
    </>
  );
};

export default TaskCard;