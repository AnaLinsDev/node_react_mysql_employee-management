
// require é necessário para usar os modulos instalados no node_modules
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

// express usará cors e apenas usará o tipo json como req e res
const app = express();
app.use(cors());
app.use(express.json());

// CRIA CONEXÃO COM AS INFO PASSADAS
/*
O db será bastante usado nos endpoints que serão criados,
pois é nele que será chamado o método query() para fazer 
as requisições básicas para o banco de dados
*/
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "root",
  database: "employeeSystem",
});

/*
CRIE A TABELA NO MYSQL:

CREATE TABLE employees (
	id MEDIUMINT NOT NULL AUTO_INCREMENT,
	name VARCHAR(256) NOT NULL , 
	age INT NOT NULL ,
	country VARCHAR(256) NOT NULL , 
	position VARCHAR(256), 
	wage INT,
	PRIMARY KEY (id)
);

*/


// CREATE EMPLOYEE
app.post("/create", (req, res) => {

  // Criando uma const para cada atributo passado pelo frontend
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;

  db.query(
    "INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)",
    [name, age, country, position, wage],
    (err, result) => {

      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
        console.log(result)
      }

    }
  );
});

// GET ALL EMPLOYEES
app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employees",
   (err, result) => {

    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }

  });
});

// UPDATE EMPLOYEE
app.put("/update", (req, res) => {
  const id = req.body.id;
  const wage = req.body.wage;
  db.query(
    "UPDATE employees SET wage = ? WHERE id = ?",
    [wage, id],
    (err, result) => {

      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }

    }
  );
});

// DELETE EMPLOYEE
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM employees WHERE id = ?",
   id,
   (err, result) => {

    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }

  });
});


// O app estará rodando na porta 3001, acesse: http://localhost:3001/ no browser, postman, insomnia ou outro
app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});