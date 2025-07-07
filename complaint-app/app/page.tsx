'use client';

import { useState } from "react";

export default function HomePage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Product",
    priority: "Low",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("Submitting...");

    try {
      const res = await fetch("/api/complaints", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setMessage("Complaint submitted successfully!");
        setForm({ title: "", description: "", category: "Product", priority: "Low" });
      } else {
        const data = await res.json();
        setMessage(`Failed: ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong.");
    }
  };

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Submit a Complaint</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          type="text"
          name="title"
          placeholder="Complaint Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          className="w-full p-2 border rounded"
          name="description"
          placeholder="Description"
          rows={4}
          value={form.description}
          onChange={handleChange}
          required
        />
        <select
          className="w-full p-2 border rounded"
          name="category"
          value={form.category}
          onChange={handleChange}
        >
          <option value="Product">Product</option>
          <option value="Service">Service</option>
          <option value="Support">Support</option>
        </select>
        <div className="space-x-4">
          <label>
            <input
              type="radio"
              name="priority"
              value="Low"
              checked={form.priority === "Low"}
              onChange={handleChange}
            />
            Low
          </label>
          <label>
            <input
              type="radio"
              name="priority"
              value="Medium"
              checked={form.priority === "Medium"}
              onChange={handleChange}
            />
            Medium
          </label>
          <label>
            <input
              type="radio"
              name="priority"
              value="High"
              checked={form.priority === "High"}
              onChange={handleChange}
            />
            High
          </label>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Submit
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
    </main>
  );
}
