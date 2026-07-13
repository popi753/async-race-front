import { Link, useNavigate } from "react-router";

export default function MissingPage() {
  const navigate = useNavigate();
  return (
    <main className="p-8 text-center">
      <h1>404 — Page Not Found</h1>
      <p>The page you’re looking for doesn't exist or was moved.</p>
      <div className="flex gap-4 justify-center">
        <Link to="/" className="hover:underline">
          ← Back to Home
        </Link>

        <button onClick={() => navigate(-1)} className="hover:underline" aria-label="Go back">
          Go Back
        </button>
      </div>
    </main>
  );
}
