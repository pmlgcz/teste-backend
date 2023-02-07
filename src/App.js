import React, {useEffect, useState} from "react";
import './App.css';
import Axios from "axios";
import Card from "./components/cards/cards"

function App() {
  const [values, setValues] = useState();
  const [listCard, setListCard] = useState([]);
  console.log(listCard);
  const handleRegisterGame = () => {
    Axios.post("http://localhost:3001/register",{
      name: values.name,
      cost: values.cost,
      category: values.category,
    }).then(() => {
      Axios.post("http://localhost:3001/search", {
        name: values.name,
        cost: values.cost,
        category: values.category,
      }).then((response) =>{
        setListCard([
          ...listCard,
          {
            id:response.data[0].id,
            name:values.name,
            cost: values.cost,
            category: values.category,
          }])
      }

      )}


    )};

    useEffect(() => {
      Axios.get("http://localhost:3001/getCards").then(
        (response) => {
          setListCard(response.data);
        });
    }, []);

    const handleaddValues = (values) => {
      setValues((prevValues) => ({
        ...prevValues,
        [values.target.name]: values.target.value,
      }))};

  return (
    <div className="app-container">
      <div className="register-container">
        <h1 className="register-tittle">Loja de Games</h1>

        <input type="text" name="nome" placeholder="Informe o Nome do Jogo" className="register-input" onChange={handleaddValues}/>

        <input type="text" name="cost" placeholder="Informe o valor do Jogo" className="register-input" onChange={handleaddValues}/>

        <input type="text" name="category" placeholder="Informe a Categoria do Jogo" className="register-input" onChange={handleaddValues}/>

        <button onClick={handleRegisterGame} className="register-button">Cadastrar</button>
      </div>
      {listCard.map((val) => (
        <Card
          listCard={listCard}
          setListCard={setListCard}
          key={val.id}
          id={val.name}
          cost={val.cost}
          category={val.category}
          />
      ))}
    </div>
  );
}

export default App;
