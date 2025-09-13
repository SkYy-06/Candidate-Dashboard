import React, { useState } from "react";
import { useProfile } from "../hooks/useProfile"; // your existing hook
import { updateProfileAndAddProject } from "../lib/api";

function WorkForm({ work, onSaved, onCancel }) {
  const [form, setForm] = useState({
    companyName: work?.companyName || "",
    role: work?.role || "",
    duration: work?.duration || "",
  });

  const saveWork = () => onSaved(form);

  return (
    <div className="bg-white p-4 rounded shadow space-y-3">
      <input
        placeholder="Company Name"
        value={form.companyName}
        onChange={(e) => setForm({ ...form, companyName: e.target.value })}
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        placeholder="Role"
        value={form.role}
        onChange={(e) => setForm({ ...form, role: e.target.value })}
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        placeholder="Duration"
        value={form.duration}
        onChange={(e) => setForm({ ...form, duration: e.target.value })}
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <div className="flex justify-end gap-2">
        <button
          onClick={saveWork}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 border rounded hover:bg-gray-100 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default function WorkPage() {
  const { profile, setProfile, loading } = useProfile();
  const [editingIndex, setEditingIndex] = useState(null);
  const [adding, setAdding] = useState(false);

  if (loading) return <div className="p-6">Loading...</div>;

  const saveWork = async (workData) => {
    const updatedProfile = { ...profile };
    if (editingIndex !== null) {
      updatedProfile.work[editingIndex] = workData;
      setEditingIndex(null);
    } else {
      updatedProfile.work = [...(updatedProfile.work || []), workData];
      setAdding(false);
    }

    try {
      const res = await updateProfileAndAddProject(profile._id, updatedProfile);
      setProfile(res.data.data || res.data);
    } catch (err) {
      alert(
        "Error updating profile: " +
          (err?.response?.data?.message || err.message)
      );
    }
  };

  const deleteWork = async (index) => {
    if (!window.confirm("Are you sure you want to delete this work?")) return;
    const updatedProfile = { ...profile };
    updatedProfile.work.splice(index, 1);
    try {
      const res = await updateProfileAndAddProject(profile._id, updatedProfile);
      setProfile(res.data.data || res.data);
    } catch (err) {
      alert(
        "Error deleting work: " + (err?.response?.data?.message || err.message)
      );
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">
        Work Experience ({profile?.work?.length || 0})
      </h1>

      {profile?.work?.map((w, idx) =>
        editingIndex === idx ? (
          <WorkForm
            key={idx}
            work={w}
            onSaved={saveWork}
            onCancel={() => setEditingIndex(null)}
          />
        ) : (
          <div
            key={idx}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{w.companyName}</p>
              <p className="text-sm text-gray-700">{w.role}</p>
              <p className="text-sm text-gray-500">{w.duration}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setEditingIndex(idx)}
                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => deleteWork(idx)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        )
      )}

      {adding ? (
        <WorkForm onSaved={saveWork} onCancel={() => setAdding(false)} />
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          Add Work
        </button>
      )}
    </div>
  );
}
