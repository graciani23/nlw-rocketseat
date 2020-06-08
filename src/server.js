const express = require('express')
const server = express()

const db = require("./database/db")

//config pasta public
server.use(express.static("public"))

//habilitar req.body
server.use(express.urlencoded({ extended: true }))

//template engine
const nunjucks = require('nunjucks')
nunjucks.configure("src/views", {
  express: server,
  noCache: true
})


server.get("/", (req, res) => {
  return res.render("index.html", { title: "Um título" })
})

server.get("/create-point", (req, res) => {
  console.log(req.query)
  return res.render("create-point.html")
})

server.post("/savePoint", (req, res) => {

  // return res.send(req.body)
  const query = `
  INSERT INTO places (
    image,
    name,
    address,
    address2,
    state,
    city,
    items
  ) VALUES (?, ?, ?, ?, ?, ?, ?);
`

const values = [
  req.body.image,
  req.body.name,
  req.body.address,
  req.body.address2,
  req.body.state,
  req.body.city,
  req.body.items,
]

function afterInsertData(err) {
  if(err) {
    return console.log(err)
    return res.send("Erro no cadastro!")
  }
  console.log("Cadastrado com sucesso!")
  console.log(this)
  
  return res.render("create-point.html", { saved: true })
}

db.run(query, values, afterInsertData)

})

server.get("/search", (req, res) => {
  
  const search = req.query.search
  
  if(search == "") {
    return res.render("search-results.html", { total: 0 })
  }

  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
    if(err) {
      return console.log(err)
    }
    console.log(rows)
    const total = rows.length
    console.log(total)
    return res.render("search-results.html", {places: rows, total:total})
  })

})

server.listen(3000)
