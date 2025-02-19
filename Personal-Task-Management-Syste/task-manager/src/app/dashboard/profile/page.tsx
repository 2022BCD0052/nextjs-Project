"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";

type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
};

export default function ProfilePage() {
  const [name, setName] = useState("");

  // Fetch user data
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axios.get("/api/user/profile");
      return res.data;
    },
  });

  // Update user profile
  const mutation = useMutation({
    mutationFn: async (updatedData: { name: string }) => {
      await axios.put("/api/user/profile", updatedData);
    },
  });

  const handleUpdate = async () => {
    mutation.mutate({ name });
  };

  if (isLoading) return <p>Loading profile...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Profile Settings</h1>

      <div className="flex items-center gap-4 mb-4">
        <img src={user.avatar} alt="Profile" className="w-16 h-16 rounded-full" />
        <p className="text-lg">{user.email}</p>
      </div>

      <input
        type="text"
        placeholder="Update name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-2 border rounded w-full mb-4"
      />
      <button onClick={handleUpdate} className="px-4 py-2 bg-blue-500 text-white rounded">
        Save Changes
      </button>
    </div>
  );
}
