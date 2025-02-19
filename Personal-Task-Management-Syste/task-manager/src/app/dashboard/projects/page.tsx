"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type Project = {
  id: string;
  name: string;
  description: string;
};

export default function ProjectsPage() {
  const queryClient = useQueryClient();

  // Fetch projects from API
  const { data: projects, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await axios.get("/api/projects");
      return res.data;
    },
  });

  // Add Project Mutation
  const addProjectMutation = useMutation({
    mutationFn: async (newProject: Omit<Project, "id">) => {
      return axios.post("/api/projects", newProject);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
  });

  // Delete Project Mutation
  const deleteProjectMutation = useMutation({
    mutationFn: async (projectId: string) => {
      return axios.delete(`/api/projects/${projectId}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
  });

  // Form State
  const [newProject, setNewProject] = useState({ name: "", description: "" });

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    addProjectMutation.mutate(newProject);
    setNewProject({ name: "", description: "" });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Project Management</h1>

      {/* Add Project Form */}
      <form onSubmit={handleAddProject} className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Project Name"
          className="w-full p-2 border rounded"
          value={newProject.name}
          onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          className="w-full p-2 border rounded"
          value={newProject.description}
          onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
          Add Project
        </button>
      </form>

      {/* Project List */}
      {isLoading ? (
        <p>Loading projects...</p>
      ) : (
        <ul className="space-y-2">
          {projects?.map((project: Project) => (
            <li key={project.id} className="flex justify-between items-center p-4 border rounded">
              <div>
                <h3 className="font-semibold">{project.name}</h3>
                <p className="text-sm text-gray-500">{project.description}</p>
              </div>
              <button
                onClick={() => deleteProjectMutation.mutate(project.id)}
                className="p-2 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
