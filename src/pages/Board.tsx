import { useState, useEffect, useCallback, useMemo } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { v4 as uuidv4 } from "uuid";
import Column from "../components/Column";
import TaskModal from "../Modals/TaskModal";


//interface for task
interface TaskT {
  id: string;
  name: string;
  subtitle: string;
  date: string;
}

//interface for column
interface ColumnT {
  id: string;
  title: string;
  tasks: TaskT[];
}

const KanbanBoard = () => {
  //dummy dataa
  const DUMMY_COLUMNS: ColumnT[] = [
    {
      id: "1",
      title: "New",
      tasks: [
        {
          id: uuidv4(),
          name: "Design Homepage",
          subtitle: "Create a modern homepage design",
          date: "2024-11-30",
        },
        {
          id: uuidv4(),
          name: "Write Blog Post",
          subtitle: "Write about Kanban Board features",
          date: "2024-12-01",
        },
      ],
    },
    {
      id: "2",
      title: "In Progress",
      tasks: [
        {
          id: uuidv4(),
          name: "Implement Drag & Drop",
          subtitle: "Enable task reordering across columns",
          date: "2024-12-02",
        },
        {
          id: uuidv4(),
          name: "Add Task Search",
          subtitle: "Implement search functionality for tasks",
          date: "2024-12-03",
        },
      ],
    },
    {
      id: "3",
      title: "Closed",
      tasks: [
        {
          id: uuidv4(),
          name: "Setup Project",
          subtitle: "Initialize the React project",
          date: "2024-11-28",
        },
        {
          id: uuidv4(),
          name: "Create Kanban Layout",
          subtitle: "Build initial Kanban board UI",
          date: "2024-11-29",
        },
      ],
    },
  ];

  const [columns, setColumns] = useState<ColumnT[]>(() => {
    //dummy data store for showcase at first if local storage not present
    const savedData = localStorage.getItem("kanbanColumns");
    if (savedData) {
      return JSON.parse(savedData);
    } else {
      localStorage.setItem("kanbanColumns", JSON.stringify(DUMMY_COLUMNS));
      return DUMMY_COLUMNS;
    }
  });

  const [history, setHistory] = useState<ColumnT[][]>([columns]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentColumnId, setCurrentColumnId] = useState<string | null>(null);
  const [newColumnTitle, setNewColumnTitle] = useState("");

  useEffect(() => {
    localStorage.setItem("kanbanColumns", JSON.stringify(columns));
  }, [columns]);

  const saveToHistory = useCallback(
    (newColumns: ColumnT[]) => {
      const updatedHistory = [
        ...history.slice(0, historyIndex + 1),
        newColumns,
      ];
      setHistory(updatedHistory);
      setHistoryIndex(updatedHistory.length - 1);
      setColumns(newColumns);
    },
    [history, historyIndex]
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;

      const sourceColumn = columns.find((col) =>
        col.tasks.some((task) => task.id === active.id)
      );
      const destinationColumn = columns.find((col) => col.id === over.id);

      if (sourceColumn && destinationColumn) {
        const task = sourceColumn.tasks.find((task) => task.id === active.id);
        if (task) {
          const updatedSourceTasks = sourceColumn.tasks.filter(
            (task) => task.id !== active.id
          );
          const updatedDestinationTasks = [...destinationColumn.tasks, task];

          saveToHistory(
            columns.map((col) => {
              if (col.id === sourceColumn.id) {
                return { ...col, tasks: updatedSourceTasks };
              } else if (col.id === destinationColumn.id) {
                return { ...col, tasks: updatedDestinationTasks };
              }
              return col;
            })
          );
        }
      }
    },
    [columns, saveToHistory]
  );


  //open popup modal function
  const openModal = useCallback((columnId: string) => {
    setCurrentColumnId(columnId);
    setIsModalOpen(true);
  }, []);

  //add the task 
  const addTask = useCallback(
    (task: TaskT) => {
      const updatedColumns = columns.map((column) => {
        if (column.id === currentColumnId) {
          return { ...column, tasks: [...column.tasks, task] };
        }
        return column;
      });
      saveToHistory(updatedColumns);
      setIsModalOpen(false);
    },
    [columns, currentColumnId, saveToHistory]
  );


  //add new column
  const addColumn = useCallback(() => {
    if (newColumnTitle.trim() === "") {alert('Column Name is required'); return;}
    saveToHistory([
      ...columns,
      { id: uuidv4(), title: newColumnTitle.trim(), tasks: [] },
    ]);
    setNewColumnTitle("");
  }, [newColumnTitle, columns, saveToHistory]);

  const deleteColumn = useCallback(
    (columnId: string) => {
      saveToHistory(columns.filter((col) => col.id !== columnId));
    },
    [columns, saveToHistory]
  );

  //undo changes
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setColumns(history[historyIndex - 1]);
    }
  }, [historyIndex, history]);


  //redo changes
  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setColumns(history[historyIndex + 1]);
    }
  }, [historyIndex, history]);

  const filteredColumns = useMemo(() => {
    return columns
      .map((column) => ({
        ...column,
        tasks: column.tasks.filter((task) =>
          task.name.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      }))
      .filter((column) => column.tasks.length > 0 || searchQuery === "");
  }, [columns, searchQuery]);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="p-6 space-y-6 min-h-screen">
        {/* Header Section */}
        <header className="flex justify-between items-center py-4 border-b">
          <h1 className="text-3xl font-bold text-gray-700">Kanban Board</h1>
          <div className="flex items-center space-x-2">
            {/* Search Bar */}
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Search tasks by title . . ."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 border rounded shadow-sm text-sm"
              />
            </div>
            {/* undo button */}
            <button
              onClick={undo}
              disabled={historyIndex === 0}
              className={`px-2 py-1 rounded ${
                historyIndex === 0
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 text-white"
              }`}
              aria-label="Undo last action"
            >
              ⟲
            </button>
            {/* redo button */}
            <button
              onClick={redo}
              disabled={historyIndex === history.length - 1}
              className={`px-2 py-1 rounded ${
                historyIndex === history.length - 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 text-white"
              }`}
              aria-label="Redo last undone action"
            >
              ⟳
            </button>
          </div>
        </header>

        {/* Add Column */}
        <div className="flex items-center space-x-4 justify-end">
          <input
            type="text"
            placeholder="New column title"
            value={newColumnTitle}
            onChange={(e) => setNewColumnTitle(e.target.value)}
            className="w-50 text-sm px-3 py-2 border rounded shadow-sm"
          />
          <button
            onClick={addColumn}
            className="bg-green-500 text-sm text-white px-4 py-2 rounded shadow hover:bg-green-600"
          >
            Add Column
          </button>
        </div>

        {/* Columns Section */}
        <div className="flex space-x-6 overflow-x-auto">
          {(searchQuery ? filteredColumns : columns).map((column) => (
            <SortableContext
              key={column.id}
              items={column.tasks.map((task) => task.id)}
              strategy={rectSortingStrategy}
            >
              <Column
                key={column.id}
                column={column}
                onAddTask={() => openModal(column.id)}
                onDeleteColumn={() => deleteColumn(column.id)}
              />
            </SortableContext>
          ))}
        </div>

        {/* Task Modal for adding tasks */}
        {isModalOpen && (
          <TaskModal
            onClose={() => setIsModalOpen(false)}
            onSave={(taskDetails) => addTask({ id: uuidv4(), ...taskDetails })}
          />
        )}
      </div>
    </DndContext>
  );
};

export default KanbanBoard;
