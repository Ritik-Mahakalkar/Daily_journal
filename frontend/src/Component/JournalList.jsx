import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function JournalList() {
  const [entries, setEntries] = useState([]);

  /* ─────────────────────────────────── FETCH ENTRIES ─────────────────────────────────── */
  useEffect(() => {
    axios
      .get("http://localhost:3001/getUsers")
      .then((res) => setEntries(res.data))
      .catch((err) => {
        console.error(err);
        toast.error("Could not fetch entries");
      });
  }, []);

  /* ─────────────────────────────────── DELETE HANDLER ─────────────────────────────────── */
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/deleteuser/${id}`)
      .then(() => {
        toast.success("Entry deleted successfully!");
        setEntries((prev) => prev.filter((e) => e._id !== id));
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to delete the entry. Please try again.");
      });
  };

  /* ─────────────────────────────────── UI ─────────────────────────────────── */
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-rose-50 to-emerald-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* heading */}
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 tracking-tight">
          My&nbsp;
          <span className="text-emerald-600">Journal</span>
        </h1>

        {/* new entry button */}
        <Link
          to="/new"
          className="mb-8 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 font-medium text-white shadow transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          New Entry
        </Link>

        {/* entries list */}
        <ul className="space-y-4">
          {entries.map(({ _id, title, created_at }) => (
            <li
              key={_id}
              className="group relative flex items-start gap-4 overflow-hidden rounded-2xl bg-white/70 p-5 shadow-sm backdrop-blur transition hover:shadow-lg"
            >
              {/* coloured bar (pure CSS) */}
              <span className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-emerald-500 to-emerald-300"></span>

              {/* link area */}
              <Link to={`/entry/${_id}`} className="flex-1">
                <h2 className="text-lg font-semibold text-gray-800 group-hover:underline">
                  {title}
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  {new Date(created_at).toLocaleString()}
                </p>
              </Link>

              {/* action buttons */}
              <div className="flex shrink-0 gap-2 pt-1">
                <Link
                  to={`/update/${_id}`}
                  className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1 text-sm text-gray-700 transition hover:bg-gray-100"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(_id)}
                  className="inline-flex items-center rounded-lg border border-red-300 bg-white px-3 py-1 text-sm text-red-600 transition hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}

          {entries.length === 0 && (
            <li className="rounded-xl bg-white/70 p-6 text-center text-gray-500 shadow-sm backdrop-blur">
              No entries yet. Click <span className="font-medium">“New
              Entry”</span> to start writing!
            </li>
          )}
        </ul>
      </div>

      {/* global toast */}
      <ToastContainer position="top-right" autoClose={4000} />
    </div>
  );
}
