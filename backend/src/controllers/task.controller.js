let tasks = [];

exports.getTasks = (req, res) => {
  res.json(tasks);
};

exports.createTask = (req, res) => {
  const task = {
    id: tasks.length + 1,
    title: req.body.title,
    owner: req.user.email
  };
  tasks.push(task);
  res.status(201).json(task);
};
