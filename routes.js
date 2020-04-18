const express = require('express')
const routes = express.Router()
const instructors = require('./controllers/instructors')
const students = require('./controllers/students')

routes.get('/', (req,res) => {
    return res.redirect("/instructors")
})

/* Routes instructors */
routes.get('/instructors', instructors.index)
routes.get('/instructors/create', instructors.getCreate)
routes.post('/instructors', instructors.postCreate)
routes.get('/instructors/:id', instructors.showCreate)
routes.get('/instructors/:id/edit', instructors.editCreate)
routes.put('/instructors', instructors.putCreate)
routes.delete('/instructors', instructors.delete)

/* Routes students */
routes.get('/students', students.index)
routes.get('/students/create', students.getCreate)
routes.post('/students', students.postCreate)
routes.get('/students/:id', students.showCreate)
routes.get('/students/:id/edit', students.editCreate)
routes.put('/students', students.putCreate)
routes.delete('/students', students.delete)

module.exports = routes