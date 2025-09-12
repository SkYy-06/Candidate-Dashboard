import { searchProfile } from "../lib/api";
import { useState } from "react";
function SearchPage() {
  const [q, setQ] = useState("");
  const [result, setResult] = useState(null);

  const search = async () => {
    if (!q) return alert("Enter search query");
    try {
      const res = await searchProfile(q);
      setResult(res.data.data || res.data);
    } catch (err) {
      alert("Search error: " + (err?.response?.data?.message || err.message));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-3">Search</h1>
      <div className="flex gap-2 mb-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search for name, email, project, or skill..."
          className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={search}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          Search
        </button>
      </div>

      {result && (
        <div className="space-y-6">
          {/* Profile Info */}
          {result.profileInfo &&
            (result.profileInfo.name || result.profileInfo.email) && (
              <div className="bg-white shadow rounded p-4">
                <h2 className="text-lg font-semibold mb-2">Profile Info</h2>
                {result.profileInfo.name && <p>👤 {result.profileInfo.name}</p>}
                {result.profileInfo.email && (
                  <p>📧 {result.profileInfo.email}</p>
                )}
              </div>
            )}

          {/* Projects */}
          {result.projects && result.projects.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Projects</h2>
              <div className="space-y-4">
                {result.projects.map((p, idx) => (
                  <div key={idx} className="bg-white p-4 rounded shadow">
                    <h3 className="font-semibold">{p.title}</h3>
                    <p className="text-sm text-gray-600">{p.description}</p>

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
                            {l} {/* Show the actual link */}
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
                ))}
              </div>
            </div>
          )}

          {/* Work Experience */}
          {result.work && result.work.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Work Experience</h2>
              <div className="grid gap-3">
                {result.work.map((w, idx) => (
                  <div key={idx} className="bg-white p-4 rounded shadow">
                    <p className="font-medium">{w.companyName}</p>
                    <p className="text-sm text-gray-600">{w.role}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchPage;
