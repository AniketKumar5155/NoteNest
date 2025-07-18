import { Routes, Route } from "react-router-dom"
import Homepage from "./pages/Homepage"
import NoteEditor from "./pages/NoteEditor"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from "./components/ProtectedRoute"
import ArchivePage from "./pages/ArchivePage"
import Header from "./components/Header"
import { useLocation } from "react-router-dom"
import Bin from "./pages/Bin"

const App = () => {
  const location = useLocation();

  return (
    <>
      <ToastContainer />
      {!location.pathname.startsWith("/note")?<Header />: null}
      <Routes>

        <Route path="/signup" element={<Signup />} />

        <Route path="/login" element={<Login />} />

        <Route path="/" element={
          <ProtectedRoute>
            <Homepage filter="active"/>
          </ProtectedRoute>
        }
        />
        <Route path="/note/" element={
          <ProtectedRoute>
            <NoteEditor />
          </ProtectedRoute>
        } />

        <Route path="/note/:id" element={
          <ProtectedRoute>
            <NoteEditor />
          </ProtectedRoute>
        } />

        <Route path="/archive" element={
          <ProtectedRoute>
            <ArchivePage />
          </ProtectedRoute>
        } />

        <Route path="/bin" element={
          <ProtectedRoute>
            <Bin />
          </ProtectedRoute>
        } />

      </Routes>
    </>
  )
}

export default App
