const fs = require('fs')
const data = require('../json/students.json')
const moment = require('moment')

//INDEX
exports.index = (req, res) => {

    return res.render("students/index", { students: data.students })
}

// Show create
exports.getCreate = (req, res) => {

    return res.render("students/create")
    
}

// Create students
exports.postCreate = (req, res) => {
    const keys = Object.keys(req.body)

    for(key of keys){
        if (req.body[key] == "") {
            return res.send('Preencha todos os campos!')
        }
    }

    let { avatar_url, name, email, birth, gender, activities, zip, city, state,  neighborhood, street, complement } = req.body
    
    birth = moment(req.body.birth).format('YYYY-MM-DD')
    created_at = moment().format('YYYY-MM-DD')
    id = Number(data.instructors.length +1)

    data.students.push({
        id,
        avatar_url, 
        name, 
        email, 
        birth, 
        gender, 
        activities, 
        zip, 
        city, 
        state,  
        neighborhood, 
        street, 
        complement
    })

    fs.writeFile("/json/students.json", JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send("Escrita do arquivo com erro.")
        return res.redirect("/students")
    })
    
}

// Show students
exports.showCreate = (req,res) => {

    const { id } = req.params

    const foundStudent = data.students.find((student) => {
        return id == student.id //return true ou false
    })

    if (!foundStudent) return res.send()

    const student = {
        ...foundStudent,
        activities: foundStudent.activities.split(","),
        created_at: moment(foundStudent.created_at).format('DD/MM/YYYY'),
        birth: moment(foundStudent.birth).format('DD/MM/YYYY'),
        birth: moment().diff(foundStudent.birth, 'years',false)
    }
    
    return res.render("students/show", { student })
}

// Edit
exports.editCreate = (req, res) => {
    const { id } = req.params

    const foundStudent = data.students.find((student) => {
        return id == student.id //return true ou false
    })

    if (!foundStudent) return res.send("Instrutor não localizado.")

    return res.render('students/edit', { student: foundStudent })
}

// PUT
exports.putCreate = (req, res) => {
    const { id } = req.body

    const foundStudent = data.students.find((student) => {
        return id == student.id //return true ou false
    })

    if (!foundStudent) return res.send("Student não localizado PUT.")

    const student = {
        ...foundStudent,
        ...req.body
    }

    data.students[id - 1] = student

    fs.writeFile("/json/students.json", JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send("Write error!")

        return res.redirect(`/students/${id}`)
    })
}

// DELETE
exports.delete = (req, res) => {
    const { id } = req.body

    const filteredStudents = data.students.filter((student) => {
        return student.id != id
    })

    data.students = filteredStudents

    fs.writeFile("/json/students.json", JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send("Write error!")

        return res.redirect('/students')
    })
}