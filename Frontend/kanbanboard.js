import React, { useState, useEffect } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { toast } from 'react-toastify';
import axios from 'axios';
import KanbanColumn from './KanbanColumn';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const columns = [
    { id: 'pending', title: 'Pending', color: 'bg-yellow-50' },
    { id: 'in-progress', title: 'In Progress', color: 'bg-blue-50' },
    { id: 'completed', title: 'Completed', color: 'bg-green-50' }
  ];

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/tasks');
      setTasks(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeId = active.id;
    const newStatus = over.id;

    try {
      // Update task status in backend
      await axios.put(`/tasks/${activeId}`, { status: newStatus });
      
      // Update local state
      setTasks(tasks.map(task =>
        task._id === activeId ? { ...task, status: newStatus } : task
      ));
      
      toast.success('Task moved successfully');
    } catch (error) {
      toast.error('Failed to update task status');
      // Revert on error
      fetchTasks();
    }
  };

  const handleTaskDelete = (taskId) => {
    setTasks(tasks.filter(task => task._id !== taskId));
  };

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Task Board</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <span className="mr-2">+</span> Add Task
        </button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((column) => (
            <KanbanColumn
              key={column.id}
              id={column.id}
              title={column.title}
              color={column.color}
            >
              <SortableContext
                items={getTasksByStatus(column.id).map(task => task._id)}
                strategy={verticalListSortingStrategy}
              >
                {getTasksByStatus(column.id).map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onDelete={handleTaskDelete}
                  />
                ))}
              </SortableContext>
            </KanbanColumn>
          ))}
        </div>

        <DragOverlay>
          {activeId ? (
            <div className="bg-white rounded-lg shadow-xl p-4 w-64">
              <h3 className="font-semibold text-gray-800">
                {tasks.find(t => t._id === activeId)?.title}
              </h3>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {showModal && (
        <TaskModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onTaskUpdated={fetchTasks}
        />
      )}
    </div>
  );
};

export default KanbanBoard;