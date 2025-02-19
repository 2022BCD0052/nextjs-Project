"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Task = {
  id: string;
  title: string;
  priority: string;
  completed: boolean;
};

export default function TasksPage() {
  const [filter, setFilter] = useState("all");

  // Fetch tasks from API
  const { data: tasks, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axios.get("/api/tasks");
      return res.data;
    },
  });

  // Apply filters
  const filteredTasks = tasks?.filter((task: Task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    if (filter === "high-priority") return task.priority === "high";
    return true;
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Task Management</h1>

      {/* Filter Options */}
      <div className="mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="all">All Tasks</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="high-priority">High Priority</option>
        </select>
      </div>

      {/* Task List */}
      {isLoading ? (
        <p>Loading tasks...</p>
      ) : (
        <ul className="space-y-2">
          {filteredTasks?.map((task: Task) => (
            <li key={task.id} className="p-4 border rounded flex justify-between items-center">
              <span>{task.title}</span>
              <span className={`text-sm ${task.completed ? "text-green-500" : "text-gray-500"}`}>
                {task.completed ? "✔ Done" : "⏳ Pending"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
