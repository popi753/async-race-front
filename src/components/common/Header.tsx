import { useLocation, useNavigate } from "react-router";
import { Car, Trophy } from "lucide-react";
import NavButton from "./NavButton";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <h1 className="flex items-center gap-2 text-xl font-bold text-slate-800">
          <span className="text-blue-600">Async</span> Race
        </h1>
        <nav className="flex gap-2">
          <NavButton active={location.pathname === "/"} onClick={() => navigate("/")} icon={<Car size={16} />} label="Garage" />
          <NavButton active={location.pathname === "/winners"} onClick={() => navigate("/winners")} icon={<Trophy size={16} />} label="Winners" />
        </nav>
      </div>
    </header>
  );
}
