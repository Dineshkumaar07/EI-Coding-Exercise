import React, { useState } from "react";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";

const App = () => {
  const [currentTask, setCurrentTask] = useState(null);
  const [tasksUpdated, setTasksUpdated] = useState(false);

  const refreshTasks = () => {
    setTasksUpdated(!tasksUpdated);
  };

  const clearCurrentTask = () => {
    setCurrentTask(null);
  };

  return (
    <div>
      <h1>Astronaut Scheduler</h1>
      <AddTask
        refreshTasks={refreshTasks}
        currentTask={currentTask}
        clearCurrentTask={clearCurrentTask}
      />
      <TaskList key={tasksUpdated} setCurrentTask={setCurrentTask} />
    </div>
  );
};

export default App;
