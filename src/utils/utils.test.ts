// import React from "react";
// import { render, screen, fireEvent } from "@testing-library/react";
// import Column from "../components/Column";

// describe("Column Component", () => {
//   const mockColumn = {
//     id: "1",
//     title: "Test Column",
//     tasks: [
//       { id: "1", name: "Test Task", subtitle: "Task subtitle", date: "2024-11-28", value: "High" },
//     ],
//   };

//   const mockOnAddTask = jest.fn();
//   const mockOnDeleteColumn = jest.fn();

//   it("renders column title and tasks", () => {
//     render(
//       <Column
//         column={mockColumn}
//         onAddTask={mockOnAddTask}
//         onDeleteColumn={mockOnDeleteColumn}
//       />
//     );

//     // Check if column title is rendered
//     expect(screen.getByText("Test Column")).toBeInTheDocument();

//     // Check if task name is rendered
//     expect(screen.getByText("Test Task")).toBeInTheDocument();
//   });

//   it("calls onAddTask when the add task button is clicked", () => {
//     render(
//       <Column
//         column={mockColumn}
//         onAddTask={mockOnAddTask}
//         onDeleteColumn={mockOnDeleteColumn}
//       />
//     );

//     // Click the add task button
//     fireEvent.click(screen.getByText("+"));

//     // Ensure callback is called
//     expect(mockOnAddTask).toHaveBeenCalled();
//   });

//   it("calls onDeleteColumn when the delete column button is clicked", () => {
//     render(
//       <Column
//         column={mockColumn}
//         onAddTask={mockOnAddTask}
//         onDeleteColumn={mockOnDeleteColumn}
//       />
//     );

//     // Click the delete column button
//     fireEvent.click(screen.getByText("✖"));

//     // Ensure callback is called
//     expect(mockOnDeleteColumn).toHaveBeenCalled();
//   });

//   it("renders multiple tasks when provided", () => {
//     const multipleTasksColumn = {
//       ...mockColumn,
//       tasks: [
//         { id: "1", name: "Task 1", subtitle: "Subtitle 1", date: "2024-11-28", value: "Low" },
//         { id: "2", name: "Task 2", subtitle: "Subtitle 2", date: "2024-12-01", value: "Medium" },
//       ],
//     };

//     render(
//       <Column
//         column={multipleTasksColumn}
//         onAddTask={mockOnAddTask}
//         onDeleteColumn={mockOnDeleteColumn}
//       />
//     );

//     // Check if all task names are rendered
//     expect(screen.getByText("Task 1")).toBeInTheDocument();
//     expect(screen.getByText("Task 2")).toBeInTheDocument();
//   });
// });
