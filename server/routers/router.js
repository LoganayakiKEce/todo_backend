let express = require("express");
let Task = require("../models/task");
let router = express.Router();
let path = require("path");

//Add routes

router.post("/task/add", async (request, response) => {
  console.log("Connected to router");
  let body = request.body;
  let newtask = new Task({
    task: body.task,
    priority: body.priority,
    date: body.date,
  });
  try {
    await newtask.save();
    console.log("success");
    response.send("New Task Added");
  } catch (err) {
    console.log(err);
    response.send(err);
  }
});

router.get(`/task/tasks/`, async (req, response) => {
  // Task.findByIdAndUpdate(req.params.userID)
  const todo = await Task.find()
    .then((todo) => response.json(todo))
    .catch((err) =>
      response
        .status(404)
        .json({ message: "Todo not found", error: err.message })
    );
});

router.delete("/delete/:id", (request, response) => {
  Task.findByIdAndRemove(request.params.id, request.body)
    .then((data) =>
      response.json({ message: "todo deleted successfully", data })
    )
    .catch((err) =>
      response
        .status(404)
        .json({ message: "book not found", error: err.message })
    );
});

router.patch("/edit/:id", (request, response) => {
  console.log(request.body);
  Task.findByIdAndUpdate(request.params.id, request.body)
    .then((data) => response.json({ message: "updated successfully", data }))
    .catch((err) =>
      response
        .status(400)
        .json({ message: "Failed to update todo", error: err.message })
    );
});

module.exports = router;
