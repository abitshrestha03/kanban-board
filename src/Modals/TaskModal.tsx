import  { useState } from "react";

interface TaskModalProps {
  onClose: () => void;
  onSave: (taskDetails: {
    name: string;
    subtitle: string;
    date: string;
  }) => void;
}


//popup modal for task
const TaskModal = ({ onClose, onSave }: TaskModalProps) => {
  const [name, setName] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [date, setDate] = useState("");

  const handleSave = () => {
    if (!name.trim() || !subtitle.trim() || !date.trim()) {
      alert("All fields are required!");
      return;
    }
    onSave({ name, subtitle, date });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Task Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Company"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
