const fs = require('fs')
const data = require('../data.json')
const moment = require('moment')

//INDEX
exports.index = (req, res) => {

    return res.render("members/index", { members: data.members })
}

// Show create
exports.create = (req, res) => {

    return res.render("members/create")
    
}

// Create members
exports.postCreate = (req, res) => {
    const keys = Object.keys(req.body)

    for(key of keys){
        if (req.body[key] == "") {
            return res.send('Preencha todos os campos!')
        }
    }

    let { avatar_url, name, birth, gender, services } = req.body
    
    birth = moment(req.body.birth).format('YYYY-MM-DD')
    created_at = moment().format('YYYY-MM-DD')
    id = Number(data.members.length +1)

    data.members.push({
        id,
        avatar_url,
        name,
        birth,
        gender,
        services,
        created_at
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send("Escrita do arquivo com erro.")
        return res.redirect("/members")
    })
    
}

// Show members
exports.getShow = (req,res) => {

    const { id } = req.params

    const foundInstructor = data.members.find((instructor) => {
        return id == instructor.id //return true ou false
    })

    if (!foundInstructor) return res.send()

    const instructor = {
        ...foundInstructor,
        services: foundInstructor.services.split(","),
        birth: moment(foundInstructor.birth).format('DD/MM/YYYY'),
        created_at: moment(foundInstructor.created_at).format('DD/MM/YYYY'),
        birth: moment().diff(foundInstructor.birth, 'years',false)

    }
    
    return res.render("members/show", { instructor })
}

// Edit
exports.getEdit = (req, res) => {
    const { id } = req.params

    const foundInstructor = data.members.find((instructor) => {
        return id == instructor.id //return true ou false
    })

    if (!foundInstructor) return res.send("Instrutor não localizado.")

    return res.render('members/edit', { instructor: foundInstructor })
}

// PUT
exports.putSaveEdit = (req, res) => {
    const { id } = req.body

    const foundInstructor = data.members.find((instructor) => {
        return id == instructor.id //return true ou false
    })

    if (!foundInstructor) return res.send("Instrutor não localizado PUT.")

    const instructor = {
        ...foundInstructor,
        ...req.body
    }

    data.members[id - 1] = instructor

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send("Write error!")

        return res.redirect(`/members/${id}`)
    })
}

// DELETE
exports.delete = (req, res) => {
    const { id } = req.body

    const filteredInstructors = data.members.filter((instructor) => {
        return instructor.id != id
    })

    data.members = filteredInstructors

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send("Write error!")

        return res.redirect('/members')
    })
}