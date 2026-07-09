import { Route, Routes } from "react-router";
import { Layout } from "@/components";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<>Garage Page</>} />
                <Route path="/winners"  element={<>Winners Page</>} />
            </Route>
        </Routes>
    );
}
