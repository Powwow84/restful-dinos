const express = require('express')
const router = express.Router()
const fs = require('fs')

const readDinos = () => {
    const dinosaurs = fs.readFileSync('./dinosaurs.json')
    const dinoData =JSON.parse(dinosaurs)
    return dinoData
}

router.get('/', (req, res) => {
    let dinos = readDinos()
    console.log(req.query)

    if(req.query.dinoFilter) {
        dinos = dinos.filter(dino => {
            return dino.name.toLowerCase().includes(req.query.dinoFilter.toLowerCase())
        })
    }

    res.render('dinos/index.ejs', {
        dinos:dinos
    })
})

router.get('/new', (req, res) => {
    res.render('dinos/new.ejs')
})

router.post('/', (req, res) => {
    console.log(req.body)
    const dinos = readDinos()
    dinos.push(req.body)
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinos))
    res.redirect('/dinosaurs')
})

router.get('/:id', (req, res) => {
    const dinos = readDinos()
    const foundDino = dinos[req.params.id]
    res.render('dinos/details.ejs', {
        dino: foundDino,
        id: req.params.id
    })
})

module.exports = router