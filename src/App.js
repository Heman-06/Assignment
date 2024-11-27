import React from "react";
import { useAuth } from "./context/authContext";
import Auth from "./components/auth";
import TaskList from "./components/taskList";

const App = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; 
  }

  return <div>{user ? <TaskList /> : <Auth />}</div>;
};

export default App;
