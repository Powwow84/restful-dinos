const express = require('express')
const router = express.Router()
const fs = require('fs')

const readCreatures = () => {
    const creatures = fs.readFileSync('./prehistoric_creatures.json')
    const creatureData =JSON.parse(creatures)
    return creatureData
}

router.get("/", (req, res) => {
    let creatures = readCreatures()
    console.log(req.query)
    res.render('prehistoric_creatures/index.ejs', {
        creatures
    })
})

router.get('/new', (req, res) => {
    res.render('prehistoric_creatures/new.ejs')
})

router.post('/' , (req, res) => {
    const creatures= readCreatures()
    creatures.push(req.body)
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatures))
    res.redirect('/prehistoric_creatures')
})


router.get('/:id', (req, res) => {
    const creatures = readCreatures()
    const foundCreature = creatures[req.params.id]
    res.render('prehistoric_creatures/details.ejs', {
        creature: foundCreature,
        id: req.params.id
    })
})

module.exports = router