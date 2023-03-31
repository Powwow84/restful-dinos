const express = require('express')
const fs = require('fs')
const app = express()
const PORT = 8000

app.get('/', (req,res) => {
    res.render('index')
})
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use('/prehistoric_creatures', require('./controllers/prehistoric_creatures'))
app.use('/dinosaurs', require('./controllers/dinosaurs'))

const readCreatures = () => {
    const creatures = fs.readFileSync('./prehistoric_creatures.json')
    const creatureData =JSON.parse(creatures)
    return creatureData
}








app.listen(PORT, () =>{
    console.log('All cylinders firing')
})