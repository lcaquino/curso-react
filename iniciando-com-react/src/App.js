import React from 'react';
class App extends React.Component {
  state = {
    nome : ""
  }

  modificarNome = (event) =>{
    let nome = event.target.value;
    this.setState( {
      nome : nome
    });
  }

  criarComboBox = (list) => {
    const combo = list.map( opcao => <option>{opcao}</option> );

    return (
      <select>
        {combo}
      </select>
    )
  }

  render() {
    const MeuComboBox = () => this.criarComboBox(["Fulano", "Ciclano"]);

    return (
      <div>
        <input type="text" value={this.state.nome} onChange={ this.modificarNome  } />
        <h1>Teste {this.state.nome}</h1>
        <MeuComboBox  />
      </div>
    )
  }
}

export default App;
