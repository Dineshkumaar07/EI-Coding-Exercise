import React, { useEffect, useState } from "react";
import { getTasks, removeTask } from "../services/api";

const TaskList = ({ setCurrentTask }) => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await removeTask(id);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const sortTasksByPriority = (tasks) => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    return tasks.sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
    );
  };

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {sortTasksByPriority(tasks).map((task) => (
          <li key={task._id}>
            <p>{task.description}</p>
            <p>
              {new Date(task.startTime).toLocaleString()} -{" "}
              {new Date(task.endTime).toLocaleString()}
            </p>
            <p>Priority: {task.priority}</p>
            <button onClick={() => setCurrentTask(task)}>Edit</button>
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
