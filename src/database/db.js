const sqlite3 = require('sqlite3')
.verbose()
const db = new sqlite3.Database("./src/database/database.db")

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY  AUTOINCREMENT,
      image TEXT,
      name TEXT,
      address TEXT,
      address2 TEXT,
      state TEXT,
      city TEXT,
      items TEXT
    );
  `)
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
  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTnkJKRzOeyJJRA0o1hccYEzSytUsw5-bv2sj0haakCtS4HU1_m&usqp=CAU",
  "Colectoria",
  "Guilherme Gemballa, Jardim América",
  "Número 260",
  "Santa Catarina",
  "Rio do Sul",
  "Resíduos Eletrônicos, Lâmpadas"
]
  function afterInsertData(err) {
    if(err) {
      console.log(err)
      return res.send("Erro no cadastro!")
    }
    console.log("Cadastrado com sucesso!")
    console.log(this)
    
  }
  
  // db.run(query, values, afterInsertData)

  db.all(`SELECT * FROM places`, function(err, rows) {
    if(err) {
      return console.log(err)
    }
    console.log("Aqui estão seus registros")
    console.log(rows)
  })

  db.run(`DELETE FROM places where id = ?`, 1, function(err) {
    if(err) {
      return console.log(err)
    }
    console.log("Registro deletado com sucesso!")
  })

  module.exports = db
})