import React from 'react';
import { useDroppable } from '@dnd-kit/core';

const KanbanColumn = ({ id, title, color, children }) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`rounded-xl p-4 ${color} ${isOver ? 'ring-2 ring-blue-400' : ''}`}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
        <span className="bg-white text-gray-600 text-sm font-medium px-2.5 py-0.5 rounded-full">
          {React.Children.count(children)}
        </span>
      </div>
      <div className="min-h-[200px]">
        {children}
      </div>
    </div>
  );
};

export default KanbanColumn;