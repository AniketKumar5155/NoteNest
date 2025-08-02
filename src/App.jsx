import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import NoteEditor from "./pages/NoteEditor";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute";
import ArchivePage from "./pages/ArchivePage";
import Bin from "./pages/Bin";
import CategoryPage from "./pages/CategoryPage";

const Placeholder = () => (
  <div className="flex items-center justify-center h-full text-gray-500 bg-amber-200 min-h-screen">
    Select a note to start editing...
  </div>
);

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Navigate to="/notes" />} />

        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <NoteEditor />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <Homepage />
            </ProtectedRoute>
          }
        >
          <Route index element={<Placeholder />} />
          <Route path=":id" element={<NoteEditor />} />
          <Route path="create" element={<NoteEditor />} />
        </Route>

        <Route
          path="/note/:id"
          element={
            <ProtectedRoute>
              <NoteEditor />
            </ProtectedRoute>
          }
        />

<Route
  path="/archive"
  element={
    <ProtectedRoute>
      <ArchivePage />
    </ProtectedRoute>
  }
>
  <Route index element={<Placeholder/>} />
  <Route path="notes/:id" element={<NoteEditor />} />
</Route>

        <Route
          path="/bin"
          element={
            <ProtectedRoute>
              <Bin />
            </ProtectedRoute>
          }
        >
          <Route index element={<Placeholder />} />
          <Route path="notes/:id" element={<NoteEditor />} />
        </Route>

        <Route
          path="/note/category/:categoryName"
          element={
            <ProtectedRoute>
              <CategoryPage />
            </ProtectedRoute>
          }
        >
          <Route index element={<Placeholder />} />
          <Route path=":id" element={<NoteEditor />} />
        </Route>

      </Routes>

    </>
  );
};

export default App;
