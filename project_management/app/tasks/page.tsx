"use client"

import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

async function fetchTasks() {
  const response = await fetch("/api/tasks")
  if (!response.ok) {
    throw new Error("Failed to fetch tasks")
  }
  return response.json()
}

export default function TasksPage() {
  const [newTask, setNewTask] = useState("")
  const { data: tasks, isLoading, isError, refetch } = useQuery({ queryKey: ["tasks"], queryFn: fetchTasks })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTask }),
    })
    if (response.ok) {
      setNewTask("")
      refetch()
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error fetching tasks</div>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New task"
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Task
        </button>
      </form>
      <ul>
        {tasks?.map((task: { id: string; title: string }) => (
          <li key={task.id} className="mb-2">
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

