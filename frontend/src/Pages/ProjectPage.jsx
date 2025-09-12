import { useProfile } from "../hooks/useProfile";
import { useState } from "react";
function ProjectsPage() {
  const { profile, setProfile, loading, fetchProfile } = useProfile();
  const [editingIndex, setEditingIndex] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    links: [""],
    techStack: [""],
  });

  if (loading) return <div className="p-6">Loading...</div>;

  const projects = profile?.projects || [];

  const resetForm = () => {
    setProjectForm({
      title: "",
      description: "",
      links: [""],
      techStack: [""],
    });
    setEditingIndex(null);
  };

  const saveProject = async () => {
    try {
      let updatedProjects = [...projects];

      if (editingIndex !== null) {
        // Edit existing project
        updatedProjects[editingIndex] = projectForm;
      } else {
        // Add new project
        updatedProjects.push(projectForm);
      }

      const res = await updateProfile(profile._id, {
        ...profile,
        projects: updatedProjects,
      });

      setProfile(res.data.data || res.data);
      resetForm();
    } catch (err) {
      alert(
        "Error saving project: " + (err?.response?.data?.message || err.message)
      );
    }
  };

  const editProject = (idx) => {
    setProjectForm(projects[idx]);
    setEditingIndex(idx);
  };

  const deleteProject = async (idx) => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;

    try {
      const updatedProjects = projects.filter((_, i) => i !== idx);
      const res = await updateProfile(profile._id, {
        ...profile,
        projects: updatedProjects,
      });
      setProfile(res.data.data || res.data);
    } catch (err) {
      alert(
        "Error deleting project: " +
          (err?.response?.data?.message || err.message)
      );
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-semibold">
        All Projects ({projects.length})
      </h1>

      {/* Project Form */}
      <div className="bg-white p-4 rounded shadow space-y-3">
        <h2 className="font-semibold text-lg mb-2">
          {editingIndex !== null ? "Edit Project" : "Add New Project"}
        </h2>

        <input
          placeholder="Title"
          value={projectForm.title}
          onChange={(e) =>
            setProjectForm({ ...projectForm, title: e.target.value })
          }
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <textarea
          placeholder="Description"
          value={projectForm.description}
          onChange={(e) =>
            setProjectForm({ ...projectForm, description: e.target.value })
          }
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* Links */}
        <div className="space-y-1">
          <label className="font-medium">Links</label>
          {projectForm.links.map((l, i) => (
            <input
              key={i}
              placeholder={`Link ${i + 1}`}
              value={l}
              onChange={(e) => {
                const updatedLinks = [...projectForm.links];
                updatedLinks[i] = e.target.value;
                setProjectForm({ ...projectForm, links: updatedLinks });
              }}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          ))}
          <button
            onClick={() =>
              setProjectForm({
                ...projectForm,
                links: [...projectForm.links, ""],
              })
            }
            className="px-2 py-1 text-sm text-indigo-600 hover:underline"
          >
            + Add another link
          </button>
        </div>

        {/* Tech Stack */}
        <div className="space-y-1">
          <label className="font-medium">Tech Stack</label>
          {projectForm.techStack.map((t, i) => (
            <input
              key={i}
              placeholder={`Tech ${i + 1}`}
              value={t}
              onChange={(e) => {
                const updatedTech = [...projectForm.techStack];
                updatedTech[i] = e.target.value;
                setProjectForm({ ...projectForm, techStack: updatedTech });
              }}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          ))}
          <button
            onClick={() =>
              setProjectForm({
                ...projectForm,
                techStack: [...projectForm.techStack, ""],
              })
            }
            className="px-2 py-1 text-sm text-indigo-600 hover:underline"
          >
            + Add another tech
          </button>
        </div>

        <div className="flex justify-end gap-2">
          {editingIndex !== null && (
            <button
              onClick={resetForm}
              className="px-4 py-2 border rounded hover:bg-gray-100 transition"
            >
              Cancel
            </button>
          )}
          <button
            onClick={saveProject}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            {editingIndex !== null ? "Update Project" : "Add Project"}
          </button>
        </div>
      </div>

      {/* Projects List */}
      {projects.map((p, idx) => (
        <div
          key={idx}
          className="bg-white p-4 rounded shadow flex flex-col gap-2"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg">{p.title}</h3>
              <p className="text-sm text-gray-700 mt-1">{p.description}</p>

              {p.links && p.links.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {p.links.map((l, i) => (
                    <a
                      key={i}
                      href={l}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm px-2 py-1 border rounded hover:bg-gray-100"
                    >
                      Link {i + 1}
                    </a>
                  ))}
                </div>
              )}

              {p.techStack && p.techStack.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {p.techStack.map((t, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-gray-100 rounded text-xs"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Edit / Delete Buttons */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => editProject(idx)}
                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => deleteProject(idx)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProjectsPage;
