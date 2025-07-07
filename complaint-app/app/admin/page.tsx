'use client';

import { useEffect, useState } from "react";

type Complaint = {
  _id: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  dateSubmitted: string;
};

export default function AdminPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  useEffect(() => {
    async function fetchComplaints() {
      const res = await fetch("/api/complaints", { cache: "no-store" });
      const data = await res.json();
      setComplaints(data.complaints || []);
    }
    fetchComplaints();
  }, []);

  const filteredComplaints = complaints.filter((c) => {
    return (statusFilter === "All" || c.status === statusFilter) &&
           (priorityFilter === "All" || c.priority === priorityFilter);
  });

  const handleStatusChange = async (id: string, newStatus: string) => {
    const res = await fetch(`/api/complaints/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    if (res.ok) {
      const updated = await res.json();
      setComplaints((prev) =>
        prev.map((c) => (c._id === id ? updated.complaint : c))
      );
    } else {
      alert("Failed to update status");
    }
  };

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin - Complaints</h1>

      <div className="flex gap-4 mb-4">
        <select
          className="border p-2 rounded"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>All</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Resolved</option>
        </select>

        <select
          className="border p-2 rounded"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option>All</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>

      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Priority</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredComplaints.length > 0 ? (
            filteredComplaints.map((complaint) => (
              <tr key={complaint._id}>
                <td className="p-2 border">{complaint.title}</td>
                <td className="p-2 border">{complaint.category}</td>
                <td className="p-2 border">{complaint.priority}</td>
                <td className="p-2 border">
                  <select
                    value={complaint.status}
                    onChange={(e) => handleStatusChange(complaint._id, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </td>
                <td className="p-2 border">
                  {new Date(complaint.dateSubmitted).toLocaleString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="p-2 border text-center" colSpan={5}>
                No complaints found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  );
}
