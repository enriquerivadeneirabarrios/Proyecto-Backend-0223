const app = require("./app")
require('dotenv').config()      
const port = process.env.PORT || 3000   // || es el comparador logico OR en JS


app.listen(port, ()=> {//listen un metodo - un numero de puerto. el callback no es necesario pero sirve para avisar que esta abierto
    console.log (`Example app listening on port ${port}`)
})