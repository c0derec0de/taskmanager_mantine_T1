import "./App.css";
import { Routes, Route } from "react-router";
import { TaskProvider } from "./providers/TaskProvider";
import MainPage from "../pages/MainPage/ui/MainPage";
import EditPage from "../pages/EditPage/ui/EditPage";

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
