import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";



export default function JournalEntry() {
  const { id } = useParams();
  const [entry, setEntry] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/journal/${id}`);
        setEntry(data);
      } catch {
        toast.error("Could not load entry");
      }
    })();
  }, [id]);

  if (!entry) return null;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Link to="/" className="text-blue-600">&larr; Back</Link>

      <h1 className="text-3xl font-bold mt-2">{entry.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        {new Date(entry.created_at).toLocaleString()}
      </p>

      <div className="prose prose-lg" dangerouslySetInnerHTML={{ __html: entry.content.replace(/\n/g, "<br/>") }} />
    </div>
  );
}
