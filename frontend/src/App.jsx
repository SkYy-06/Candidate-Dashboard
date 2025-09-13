import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router";
import {
  getProfile,
  createProfile,
  updateProfileAndAddProject,
  getTopSkills,
} from "./lib/api";
import WorkPage from "./Pages/WorkPage";
import ProjectsPage from "./Pages/ProjectPage";
import SearchPage from "./Pages/SearchPage";



function Navbar() {
  return (
    <nav className="bg-white shadow p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link to="/" className="text-xl font-semibold">
          Candidate Profile
        </Link>
        <Link to="/projects" className="text-sm text-gray-600 hover:underline">
          Projects
        </Link>

        <Link to="/work" className="text-sm text-gray-600 hover:underline">
          Work
        </Link>

        <Link to="/search" className="text-sm text-gray-600 hover:underline">
          Search
        </Link>
      </div>
    </nav>
  );
}

function useProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await getProfile();
      setProfile(res.data.data || res.data);
      setError(null);
    } catch (err) {
      setError(err?.response?.data?.message || err.message);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return { profile, setProfile, fetchProfile, loading, error };
}

function TopSkills({ profile }) {
  const [topSkills, setTopSkills] = useState([]);

  useEffect(() => {
    const fetchTop = async () => {
      try {
        const res = await getTopSkills();
        setTopSkills(res.data.data || []);
      } catch (err) {}
    };
    fetchTop();
  }, [profile]);

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-medium mb-2">Top Skills</h3>
      {topSkills.length === 0 ? (
        <p className="text-sm text-gray-500">No skills found</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {topSkills.map(([skill, count]) => (
            <div key={skill} className="px-3 py-1 rounded-full border text-sm">
              {skill} • {count}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ProfileCard({ profile, onRefresh }) {
  const navigate = useNavigate();
  if (!profile) return null;
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-semibold">{profile.name}</h2>
      <p className="text-sm text-gray-600">{profile.email}</p>
      {profile.education && (
        <p className="text-sm text-gray-700 mt-1">🎓 {profile.education}</p>
      )}
      <div className="mt-3 flex gap-2 flex-wrap">
        <button
          onClick={() => navigate("/projects")}
          className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          View Projects
        </button>
        <button
          onClick={onRefresh}
          className="px-3 py-1 border rounded text-sm hover:bg-gray-100 transition"
        >
          Refresh
        </button>

        {profile.links?.github && (
          <a
            href={"https://github.com/SkYy-06"}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-900 transition"
          >
            GitHub
          </a>
        )}
        {profile.links?.linkedin && (
          <a
            href={"https://www.linkedin.com/in/aakashdivakar/"}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            LinkedIn
          </a>
        )}
      </div>
      <div className="mt-4">
        <TopSkills profile={profile} />
      </div>
    </div>
  );
}

function EditProfile({ profile, onSaved }) {
  const [form, setForm] = useState({
    name: profile?.name || "",
    email: profile?.email || "",
    education: profile?.education || "",
  });

  useEffect(() => {
    setForm({
      name: profile?.name || "",
      email: profile?.email || "",
      education: profile?.education || "",
    });
  }, [profile]);

  const saveProfile = async () => {
    try {
      let res;
      if (!profile?._id) {
        res = await createProfile(form);
      } else {
        res = await updateProfileAndAddProject(profile._id, form);
      }
      onSaved(res.data.data || res.data);
    } catch (err) {
      alert(
        "Error saving profile: " + (err?.response?.data?.message || err.message)
      );
    }
  };

  return (
    <div className="bg-white rounded shadow p-4 mt-4">
      <h3 className="font-medium mb-3 text-lg">Edit Profile</h3>
      <div className="space-y-3">
        <input
          name="name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Name"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          name="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          name="education"
          value={form.education}
          onChange={(e) => setForm({ ...form, education: e.target.value })}
          placeholder="College / University"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <div className="flex justify-end">
          <button
            onClick={saveProfile}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

function ProfilePage() {
  const { profile, setProfile, fetchProfile, loading, error } = useProfile();
  if (loading) return <div className="p-6">Loading...</div>;
  return (
    <div className="p-6">
      <ProfileCard profile={profile} onRefresh={fetchProfile} />
      <EditProfile
        profile={profile || {}}
        onSaved={(updated) => setProfile(updated)}
      />
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<ProfilePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </div>
    </Router>
  );
}
