const Task = require("../models/Task");

exports.addTask = async (req, res) => {
  const { description, startTime, endTime, priority } = req.body;

  try {
    const overlappingTasks = await Task.find({
      $or: [
        { startTime: { $lt: endTime, $gt: startTime } },
        { endTime: { $gt: startTime, $lt: endTime } },
        { startTime: { $lte: startTime }, endTime: { $gte: endTime } },
      ],
    });

    if (overlappingTasks.length > 0) {
      return res
        .status(400)
        .json({ msg: "Task times overlap with existing tasks." });
    }

    const newTask = new Task({
      description,
      startTime,
      endTime,
      priority,
    });

    const task = await newTask.save();
    res.json(task);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

exports.removeTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }
    await Task.deleteOne({ _id: req.params.id });
    res.json({ msg: "Task removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

exports.viewTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ startTime: 1 });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.editTask = async (req, res) => {
  const { description, startTime, endTime, priority, completed } = req.body;
  try {
    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    task.description = description || task.description;
    task.startTime = startTime || task.startTime;
    task.endTime = endTime || task.endTime;
    task.priority = priority || task.priority;
    task.completed = completed !== undefined ? completed : task.completed;

    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.viewTasksByPriority = async (req, res) => {
  try {
    const tasks = await Task.find({ priority: req.params.priority }).sort({
      startTime: 1,
    });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
