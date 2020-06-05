const express = require('express')
const server = express()

//config pasta public
server.use(express.static("public"))

//template engine
const nunjucks = require('nunjucks')
nunjucks.configure("src/views", {
  express: server,
  noCache: true
})

server.listen(3000)

server.get("/", (req, res) => {
  return res.render("index.html", { title: "Um título" })
})

server.get("/create-point", (req, res) => {
  return res.render("create-point.html")
})

server.get("/search", (req, res) => {
  return res.render("search-results.html")
})