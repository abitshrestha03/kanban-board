// import { render, screen, fireEvent } from "@testing-library/react";
// import KanbanBoard from "../pages/Board";

// describe("KanbanBoard Integration Tests", () => {
//   it("renders default columns and allows adding a column", () => {
//     render(<KanbanBoard />);

//     // Check if default columns are present
//     expect(screen.getByText("New")).toBeInTheDocument();
//     expect(screen.getByText("In Progress")).toBeInTheDocument();
//     expect(screen.getByText("Closed")).toBeInTheDocument();

//     // Add a new column
//     fireEvent.change(screen.getByPlaceholderText("New column title"), {
//       target: { value: "Test Column" },
//     });
//     fireEvent.click(screen.getByText("Add Column"));

//     // Verify the new column is added
//     expect(screen.getByText("Test Column")).toBeInTheDocument();
//   });

//   it("allows adding a task to a column", () => {
//     render(<KanbanBoard />);

//     // Open modal to add a task to the "New" column
//     fireEvent.click(screen.getAllByText("+")[0]);

//     // Fill in task details and save
//     fireEvent.change(screen.getByPlaceholderText("Task Name"), {
//       target: { value: "Test Task" },
//     });
//     fireEvent.click(screen.getByText("Save"));

//     // Verify the task appears in the "New" column
//     expect(screen.getByText("Test Task")).toBeInTheDocument();
//   });

//   it("filters tasks based on search query", () => {
//     render(<KanbanBoard />);

//     // Add a task
//     fireEvent.click(screen.getAllByText("+")[0]);
//     fireEvent.change(screen.getByPlaceholderText("Task Name"), {
//       target: { value: "Task 1" },
//     });
//     fireEvent.click(screen.getByText("Save"));

//     // Search for the task
//     fireEvent.change(screen.getByPlaceholderText("Search tasks by title..."), {
//       target: { value: "Task" },
//     });

//     // Verify the task appears
//     expect(screen.getByText("Task 1")).toBeInTheDocument();
//   });
// });
