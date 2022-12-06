const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')
//GET
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({})

  res.status(200).json({ tasks })
})
// POST
const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body)
  res.status(201).json({ task })
})
// GET
const getTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params
  const task = await Task.findOne({ _id: taskID })

  if (!task) {
    return res.status(404).json({ msg: `no tasks with id: ${taskID}` })
  }

  res.status(200).json({ task })
})

// DELETE
const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params
  const task = await Task.findOneAndDelete({ _id: taskID })

  if (!task) {
    return res.status(404).json({ msg: `no tasks with id: ${taskID}` })
  }
  res.status(200).json({ task })
  // res.status(200).send()
  // res.status(200).json({task: null, status:'success'})
})

/// PATCH
const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params

  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  })

  if (!task) {
    return res.status(404).json({ msg: `no tasks with id: ${taskID}` })
  }

  res.status(200).json({ task })
})

//// PUT
const editTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params

  const tasks = await Task.findOneAndUpdate({ _id: taskID }, req.body)

  if (!tasks) {
    return res
      .status(404)
      .json({ msg: `no tasks with id: ${taskID}` }, req.body, {
        new: true,
        runValidators: true,
        overwrite: true,
      })
  }

  res.status(200).json({ tasks })
})
/////////////////////////////////////////////////////////////
module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  editTask,
}
