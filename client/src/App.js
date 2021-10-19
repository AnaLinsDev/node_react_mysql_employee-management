import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  // atributos do usuário
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);

  // lista de employees
  const [employeeList, setEmployeeList] = useState([]);


  /*
  Aqui a library axios irá fazer uma requisição POST para url
  http://localhost:3001/create que é o nosso backends (express),
  nele irá ser passado no body um json contendo todos os atributos
  que o usuario digitou. E após isso, se não ocorrer nenhum erro, 
  será adicionado o novo employee na lista de employees

  */
  const addEmployee = () => {
    Axios.post("http://localhost:3001/create", 
    {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    }
    ).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          name: name,
          age: age,
          country: country,
          position: position,
          wage: wage,
        },
      ]);
    });
  };

  // simples requisição GET para pegar todos os employees que o 
  // back pedir do nosso banco de dados
  const getEmployees = () => {
    Axios.get("http://localhost:3001/employees").then((response) => {
      setEmployeeList(response.data);
    });
  };

  /*
  Aqui ocorrerá um update do wage do employee que terá o id selecionado 
  no front, o body será composto do id e novo wage. Se ocorrer tudo certo,
  a lista de employees será atualizada no id do parametro
  */
  const updateEmployeeWage = (id) => {
    Axios.put("http://localhost:3001/update", { wage: wage, id: id }).then(
      (response) => {
        setEmployeeList(
          employeeList.map((val) => {
            return val.id == id
              ? {
                  id: val.id,
                  name: val.name,
                  country: val.country,
                  age: val.age,
                  position: val.position,
                  wage: wage,
                }
              : val;
          })
        );
      }
    );
  };

  /*
  Será passado um id no parametro desse método, e será feita a requisição
  DELETE para o backend, se ocorrer tudo certo, a lista de emplyees será
  atualizada
  */
  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id != id;
        })
      );
    });
  };

  return (
    <div className="App">
      <div className="information">
        <h1>Add a new employee</h1>
        <input
          type="text"
          placeholder="Name"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />

        <input
          type="number"
          placeholder="Age"
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />

        <input
          type="text"
          placeholder="Country"
          onChange={(event) => {
            setCountry(event.target.value);
          }}
        />

        <input
          type="text"
          placeholder="Position"
          onChange={(event) => {
            setPosition(event.target.value);
          }}
        />

        <input
          type="number"
          placeholder="Wage (year)"
          onChange={(event) => {
            setWage(event.target.value);
          }}
        />
        <button onClick={addEmployee}>Add Employee</button>
      </div>
      <div className="employees">
        <button onClick={getEmployees}>Show Employees</button>

        {employeeList.map((val, key) => {
          return (
            <div className="employee">
              <div>
                <h3>Name: {val.name}</h3>
                <h3>Age: {val.age}</h3>
                <h3>Country: {val.country}</h3>
                <h3>Position: {val.position}</h3>
                <h3>Wage: {val.wage}</h3>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="New Wage..."
                  onChange={(event) => {
                    setWage(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateEmployeeWage(val.id);
                  }}
                >
                  {" "}
                  Update Wage
                </button>

                <button
                  className = "delete-button"
                  onClick={() => {
                    deleteEmployee(val.id);
                  }}
                >
                  Delete Employee
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;