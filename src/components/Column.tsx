import { useDroppable } from "@dnd-kit/core";
import Task from "./Task";

interface TaskT {
  id: string;
  name: string;
  subtitle: string;
  date: string;
}

interface ColumnProps {
  column: {
    id: string;
    title: string;
    tasks: TaskT[];
  };
  onAddTask: () => void;
  onDeleteColumn: () => void;
}

const Column = ({ column, onAddTask, onDeleteColumn }: ColumnProps) => {
  const { setNodeRef } = useDroppable({ id: column.id });

  return (
    <div
      ref={setNodeRef}
      className="w-72 bg-gray-100 p-4 rounded-lg shadow-md space-y-4"
    >
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-lg">{column.title}</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={onAddTask}
            className="text-[#16a34a] text-lg font-bold cursor-pointer"
          >
            +
          </button>
          <button
            onClick={onDeleteColumn}
            className="text-red-700 text-lg font-bold cursor-pointer"
          >
            ×
          </button>
        </div>
      </div>
      <div className="space-y-3 text-start">
        {column.tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Column;
