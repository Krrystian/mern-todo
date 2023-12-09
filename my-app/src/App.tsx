import { Suspense } from "react";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ToDo from "./pages/ToDo";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen text-white text-5xl text-center items-center">
          Loading...
        </div>
      }
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todo" element={<ToDo />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer limit={3} transition={Flip} />
    </Suspense>
  );
}
