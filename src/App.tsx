import "./App.css";
import { Routes, Route } from "react-router";
import { TaskProvider } from "./context/TaskContext";
import MainPage from "./pages/MainPage/MainPage";
import EditPage from "./pages/EditPage/EditPage";

function App() {
  return (
    <>
      <TaskProvider>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/task/:id" element={<EditPage />}></Route>
        </Routes>
      </TaskProvider>
    </>
  );
}

export default App;