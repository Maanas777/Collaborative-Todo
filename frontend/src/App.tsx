import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoApp from "./pages/todo"
import Login from "./pages/login";
import Signup from "./pages/signup";
import PrivateRoute from "./components/privateRoute";



const App = () => {
  return (
   <>
    <Router>
      <Routes>
      <Route path="/" element={<PrivateRoute element={<TodoApp />} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
   </>
  )
}

export default App