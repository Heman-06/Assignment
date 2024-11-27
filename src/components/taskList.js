import React, { useState, useEffect } from "react";
import { createTask, getTasks, updateTask, deleteTask } from "../utils/taskApi";
import { signOut } from "firebase/auth";
import { auth } from "../config";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [editingTask, setEditingTask] = useState(null);
  const [message, setMessage] = useState(""); // To display feedback messages

  useEffect(() => {
    const fetchTasks = async () => {
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
      setLoading(false);
    };
    fetchTasks();
  }, []);

  const handleCreate = async () => {
    if (!newTask.title || !newTask.description) {
      setMessage("Please fill out both fields.");
      return;
    }
    await createTask(newTask.title, newTask.description);
    setMessage("Task added successfully!");
    setNewTask({ title: "", description: "" });
    const updatedTasks = await getTasks();
    setTasks(updatedTasks);
  };

  const handleUpdate = async () => {
    if (!editingTask.title || !editingTask.description) {
      setMessage("Please fill out both fields.");
      return;
    }
    await updateTask(editingTask.id, editingTask.title, editingTask.description);
    setMessage("Task updated successfully!");
    setEditingTask(null);
    const updatedTasks = await getTasks();
    setTasks(updatedTasks);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      await deleteTask(id);
      setMessage("Task deleted successfully!");
      const updatedTasks = await getTasks();
      setTasks(updatedTasks);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Successfully logged out!");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Task Manager</h2>
      <button
        onClick={handleLogout}
        style={{
          marginBottom: "20px",
          padding: "10px 20px",
          background: "#f44",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          borderRadius: "5px",
        }}
      >
        Logout
      </button>

      {message && <p style={{ color: "green", marginBottom: "10px" }}>{message}</p>}

      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <ul className="nm" style={{ listStyle: "none", padding: 0 }}>
          {tasks.map((task) => (
            <li
              key={task.id}
              style={{
                marginBottom: "10px",
                padding: "10px",
                backgroundColor: editingTask?.id === task.id ? "#ffffcc" : "#f9f9f9",
                borderRadius: "5px",
                boxShadow: "0 0 5px rgba(0,0,0,0.1)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>
                <strong>{task.title}</strong>: {task.description}
              </span>
              <div>
                <button
                  onClick={() => setEditingTask(task)}
                  style={{
                    marginRight: "10px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    padding: "5px 10px",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  style={{
                    backgroundColor: "#dc3545",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    padding: "5px 10px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div
        style={{
          marginTop: "20px",
          padding: "10px",
          backgroundColor: "#f1f1f1",
          borderRadius: "5px",
        }}
      >
        {editingTask ? (
          <>
            <h3>Edit Task</h3>
            <input
              type="text"
              value={editingTask.title}
              onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
              style={{ marginRight: "10px", padding: "5px" }}
            />
            <input
              type="text"
              value={editingTask.description}
              onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
              style={{ marginRight: "10px", padding: "5px" }}
            />
            <button
              onClick={handleUpdate}
              style={{
                backgroundColor: "#28a745",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              Update Task
            </button>
          </>
        ) : (
          <>
            <h3>Add New Task</h3>
            <input
              type="text"
              placeholder="Task Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              style={{ marginRight: "10px", padding: "5px" }}
            />
            <input
              type="text"
              placeholder="Task Description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              style={{ marginRight: "10px", padding: "5px" }}
            />
            <button
              onClick={handleCreate}
              style={{
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              Add Task
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskList;
