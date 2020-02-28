import React from 'react';

function App (props) {
  const criarComboBox = (list) => {
    const combo = list.map( opcao => <option>{opcao}</option> );

    return (
      <select>
        {combo}
      </select>
    )
  }  

  const modificarNome = event => {
    console.log(event.target.value);
  }

  
  const MeuComboBox = () => criarComboBox(["Fulano", "Ciclano"]);

  return (
    <div>
      <input type="text" value={props.nome} onChange={ modificarNome  } />
      <h1>Teste {props.nome}</h1>
      <MeuComboBox  />
    </div>
  )
  
}

export default App;
