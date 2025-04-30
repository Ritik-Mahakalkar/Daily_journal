import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import JournalList  from "./Component/JournalList";
import JournalForm  from "./Component/JournalForm";
import JournalEntry from "./Component/JournalEntry";
import Update       from "./Component/Update";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  /* utility that returns proper classes for NavLink */
  const navClasses = ({ isActive }) =>
    [
      "px-3 py-2 rounded-lg text-sm font-medium transition",
      isActive
        ? "bg-emerald-600 text-white shadow hover:bg-emerald-600"
        : "text-gray-700 hover:bg-gray-100 hover:text-emerald-700",
    ].join(" ");

  return (
    <BrowserRouter>
      {/* ───────────────────────────── NAVBAR ───────────────────────────── */}
      <header className="sticky top-0 z-30 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          {/* brand / logo */}
          <Link
            to="/"
            className="text-2xl font-extrabold tracking-tight text-emerald-600"
          >
            Daily&nbsp;Journal
          </Link>

          {/* nav links */}
          <div className="space-x-1">
            <NavLink to="/" end className={navClasses}>
              Home
            </NavLink>
            <NavLink to="/new" className={navClasses}>
              New&nbsp;Entry
            </NavLink>
          </div>
        </nav>
      </header>

      {/* ───────────────────────────── ROUTES ───────────────────────────── */}
      <Routes>
        <Route path="/"          element={<JournalList />} />
        <Route path="/new"       element={<JournalForm />} />
        <Route path="/edit/:id"  element={<JournalForm />} />
        <Route path="/entry/:id" element={<JournalEntry />} />
        <Route path="/update/:id" element={<Update />} />
      </Routes>

      {/* global toast container (never unmounts) */}
      <ToastContainer position="top-right" autoClose={4000} />
    </BrowserRouter>
  );
}
