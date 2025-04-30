import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";   // ⬅ import container
import "react-toastify/dist/ReactToastify.css";           // ⬅ import styles

export default function JournalForm() {
  const { id }      = useParams();
  const navigate    = useNavigate();
  const isEdit      = Boolean(id);

  const [title,   setTitle]   = useState("");
  const [content, setContent] = useState("");

  /* ────────────────────────────── LOAD DATA WHEN EDITING ────────────────────────────── */
  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      try {
        const { data } = await axios.get(`http://localhost:3001/entry/${id}`);
        setTitle(data.title);
        setContent(data.content);
      } catch (err) {
        console.error(err);
        toast.error("Could not load entry");
        navigate("/");
      }
    })();
  }, [id, isEdit, navigate]);

  /* ───────────────────────────────────── SUBMIT ─────────────────────────────────────── */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url    = isEdit ? `http://localhost:3001/update/${id}` : "http://localhost:3001/create";
      const method = isEdit ? "put" : "post";

      await axios({ method, url, data: { title, content } });

      toast.success("Entry saved successfully!");   // ⬅ toast now works

      setTitle("");
      setContent("");

      /* wait a moment so the toast is visible, then go home */
      setTimeout(() => navigate("/"), 800);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong, please try again.");
    }
  };

  /* ───────────────────────────────────── UI ─────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-rose-50 to-emerald-50">
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-gray-800">
          {isEdit ? "Edit Entry" : "New Entry"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* TITLE */}
          <input
            type="text"
            className="w-full rounded-xl border border-gray-300 bg-white/70 p-4 text-lg font-medium shadow-sm backdrop-blur placeholder:text-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-100"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          {/* CONTENT */}
          <textarea
            className="h-80 w-full resize-none rounded-xl border border-gray-300 bg-white/70 p-4 text-base shadow-sm backdrop-blur placeholder:text-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-100"
            placeholder="What's on your mind today?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />

          {/* ACTION BAR */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white shadow transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300"
            >
              {isEdit ? (
                <>
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
                      d="M17 16l4-4m0 0l-4-4m4 4H7"
                    />
                  </svg>
                  Update
                </>
              ) : (
                <>
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Save
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Toast host – keep just one per app */}
      <ToastContainer />
    </div>
  );
}
