const express = require('express')
const app = express()
const tasks = require('./routes/task')
const connectDB = require('./db/connect')
require('dotenv').config()
const notFound = require('./middleware/not-found')
// Middleware
app.use(express.static('./public'))
app.use(express.json())

// Routes
app.use('/api/v1/tasks', tasks)
app.use(notFound)

const port = 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`listening on ${port}`))
  } catch (error) {
    console.log(error)
  }
}
start()
/*
app.post('/api/v1/tasks')      - create a new tasks
app.get('/api/v1/tasks/:id')   - get single task
app.patch('/api/v1/tasks/:id)  - update task
app.delete('/api/v1/tasks/:id) - delete tasks
*/
