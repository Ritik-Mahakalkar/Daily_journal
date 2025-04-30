import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function Update() {
  const { id }        = useParams();
  const navigate      = useNavigate();

  const [title,   setTitle]   = useState("");
  const [content, setContent] = useState("");

  /* ─────────────────────────── fetch existing post ─────────────────────────── */
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`http://localhost:3001/getdata/${id}`);
        setTitle(data.title);
        setContent(data.content);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch post data. Please try again.");
        navigate("/");
      }
    })();
  }, [id, navigate]);

  /* ───────────────────────────── submit update ─────────────────────────────── */
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/userUpdate/${id}`, { title, content });

      toast.success("Post updated successfully!", {
        autoClose: 3000,
        onClose: () => navigate("/"),
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to update the post. Please try again.");
    }
  };

  /* ────────────────────────────────── UI ───────────────────────────────────── */
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-rose-50 to-emerald-50">
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-gray-800">
          Edit Post
        </h1>

        <form onSubmit={handleUpdate} className="space-y-6">
          {/* title */}
          <input
            type="text"
            className="w-full rounded-xl border border-gray-300 bg-white/70 p-4 text-lg font-medium shadow-sm backdrop-blur placeholder:text-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-100"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          {/* content */}
          <textarea
            className="h-80 w-full resize-none rounded-xl border border-gray-300 bg-white/70 p-4 text-base shadow-sm backdrop-blur placeholder:text-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-100"
            placeholder="What's on your mind today?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />

          {/* button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white shadow transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
