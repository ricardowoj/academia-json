const express = require('express')
const routes = express.Router()
const instructors = require('./controllers/instructors')
const members = require('./controllers/members')

routes.get('/', (req,res) => {
    return res.redirect("/instructors")
})

/* Routes instructors */
routes.get('/instructors', instructors.index)
routes.get('/instructors/create', instructors.create)
routes.get('/instructors/:id', instructors.getShow)
routes.get('/instructors/:id/edit', instructors.getEdit)
routes.post('/instructors', instructors.postCreate)
routes.put('/instructors', instructors.putSaveEdit)
routes.delete('/instructors', instructors.delete)

/* Routes members */
routes.get('/members', members.index)
routes.get('/members/create', members.create)
routes.get('/members/:id', members.getShow)
routes.get('/members/:id/edit', members.getEdit)
routes.post('/members', members.postCreate)
routes.put('/members', members.putSaveEdit)
routes.delete('/members', members.delete)

module.exports = routes