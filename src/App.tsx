import { Route, Routes } from "react-router";
import { Layout } from "@/components";
import { GaragePage } from "@/pages";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<GaragePage/>} />
                <Route path="/winners"  element={<>Winners Page</>} />
            </Route>
        </Routes>
    );
}
