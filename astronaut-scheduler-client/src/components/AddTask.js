import React, { useState, useEffect } from "react";
import { addTask, updateTask } from "../services/api";

const AddTask = ({ refreshTasks, currentTask, clearCurrentTask }) => {
  const [task, setTask] = useState({
    description: "",
    startTime: "",
    endTime: "",
    priority: "",
    completed: false,
  });

  useEffect(() => {
    if (currentTask) {
      setTask(currentTask);
    } else {
      setTask({
        description: "",
        startTime: "",
        endTime: "",
        priority: "",
        completed: false,
      });
    }
  }, [currentTask]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (task._id) {
        await updateTask(task._id, task);
        alert("Task updated successfully");
      } else {
        await addTask(task);
        alert("Task added successfully");
      }
      refreshTasks();
      clearCurrentTask();
    } catch (err) {
      console.error(err);
      alert("Error adding/updating task");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="description"
        value={task.description}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <input
        type="datetime-local"
        name="startTime"
        value={task.startTime}
        onChange={handleChange}
        required
      />
      <input
        type="datetime-local"
        name="endTime"
        value={task.endTime}
        onChange={handleChange}
        required
      />
      <select
        name="priority"
        value={task.priority}
        onChange={handleChange}
        required
      >
        <option value="">Select Priority</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <button type="submit">{task._id ? "Update Task" : "Add Task"}</button>
      {task._id && <button onClick={clearCurrentTask}>Clear</button>}
    </form>
  );
};

export default AddTask;
