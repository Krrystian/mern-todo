import { Suspense } from "react";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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
          {/* <Route path="/todo" element={<HomePage />} /> */}
          {/* <Route path="/profile/:userId" element={<ProfilePage />} /> */}
        </Routes>
      </BrowserRouter>
      {/* <ToastContainer limit={2} transition={Slide} /> */}
    </Suspense>
  );
}
