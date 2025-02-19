"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";

type Task = {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
};

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Fetch tasks from API
  const { data: tasks, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axios.get("/api/tasks");
      return res.data;
    },
  });

  // Filter tasks based on selected date
  const filteredTasks = tasks?.filter(
    (task: Task) => format(new Date(task.dueDate), "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Task Calendar</h1>

      {/* Calendar Component */}
      <Calendar onChange={(value: Date | Date[] | null) => value && setSelectedDate(value as Date)} value={selectedDate} />

      {/* Task List for Selected Date */}
      <h2 className="mt-4 text-lg font-semibold">Tasks on {format(selectedDate, "PPP")}</h2>

      {isLoading ? (
        <p>Loading tasks...</p>
      ) : filteredTasks.length > 0 ? (
        <ul className="mt-2 space-y-2">
          {filteredTasks.map((task: Task) => (
            <li key={task.id} className="p-2 border rounded flex justify-between items-center">
              <span>{task.title}</span>
              <span className={`text-sm ${task.completed ? "text-green-500" : "text-gray-500"}`}>
                {task.completed ? "\u2714 Done" : "\u23f3 Pending"}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No tasks for this date.</p>
      )}
    </div>
  );
}
