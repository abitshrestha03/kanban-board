import { useDraggable } from "@dnd-kit/core";
import { BiTrash } from "react-icons/bi";

interface TaskT {
  id: string;
  name: string;
  subtitle: string;
  date: string;
}

const Task = ({ task }: { task: TaskT }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: task.id,
  });

  return (
    //tasks shown in the columns
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`bg-white p-3 rounded shadow cursor-pointer ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <h3 className="mb-2 text-sm font-normal text-[#1d4ed8]">
        <span className="text-black font-semibold">Title: </span>
        {task.name}
      </h3>
      <p className="text-sm text-gray-500 mb-1">{task.subtitle}</p>
      <p className="text-sm text-red-500 flex gap-9">
        <span className="text-red-500 font-semibold">Deadline:</span>
        <span className="-ml-[28px]">{task.date}</span>
        <button className="ml-4"><BiTrash /></button>
      </p>
    </div>
  );
};

export default Task;
