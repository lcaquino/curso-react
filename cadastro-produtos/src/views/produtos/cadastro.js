import React from 'react';

import ProdutoService from '../../app/produtoService';
import { withRouter } from 'react-router-dom';

const estadoInicial = {
    nome: '',
    sku: '',
    descricao: '',
    preco: 0,
    fornecedor: '',
    sucesso: false,
    errors: [],
    atualizando: false
}

class CadastroProduto extends React.Component {
    state = estadoInicial;

    constructor(){
        super();
        this.service = new ProdutoService();
    }

    componentDidMount() {
        const sku = this.props.match.params.sku;
        if(sku){
            const resultado = this.service.obterProdutos().filter( produto => produto.sku === sku );
            if(resultado.length === 1){
                const produtoEncontrado = resultado[0];
                this.setState({...produtoEncontrado, atualizando: true});
            }
        }else{
            this.limparCampos();
        }
    }

    onChange = (event) => {
        const valor = event.target.value;
        const nomeDoCampo = event.target.name;
        this.setState({ [nomeDoCampo]: valor })
    }

    onSubmit = (event) => {
        const produto = {
            nome: this.state.nome,
            sku: this.state.sku,
            descricao: this.state.descricao,
            preco: this.state.preco,
            fornecedor: this.state.fornecedor    
        }

        try {
            this.service.salvar(produto);
            this.limparCampos();
            this.setState({sucesso: true});
            setTimeout(() => { this.limparCampos(); }, 5000);    
        } catch (error) {
            console.log(error.errors);
            this.setState({errors : error.errors});
        }

        
    }

    limparCampos = () => {
        this.setState(estadoInicial);
    }

    render() {
        return (
            <div className="card">
                <div className="card-header">  
                {this.state.atualizando ? 'Atualização ' : 'Cadastro '}                  
                    de Produto
                </div>
                <div className="card-body">

                    {
                        this.state.sucesso &&
                            <div className="alert alert-success" role="alert">
                                Cadastro realizado com sucesso!
                            </div>                      
                    }

                    {
                        this.state.errors && this.state.errors.length > 0 &&
                            this.state.errors.map( msg => {
                                return (
                                    <div className="alert alert-danger" role="alert">
                                        {msg}
                                    </div>                                         
                                )                                
                            })               
                    }
                    
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Nome: *</label>
                                <input type="text" name="nome" value={this.state.nome} className="form-control" onChange={this.onChange}/>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label>SKU: *</label>
                                <input type="text" name="sku" value={this.state.sku} className="form-control" onChange={this.onChange} disabled={this.state.atualizando}/>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label>Descrição:</label>
                                <textarea type="text" name="descricao" value={this.state.descricao} className="form-control" onChange={this.onChange}/>
                            </div>
                        </div>                        
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Preço: *</label>
                                <input type="text" name="preco" value={this.state.preco} className="form-control" onChange={this.onChange}/>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Fornecedor: *</label>
                                <input type="text" name="fornecedor" value={this.state.fornecedor} className="form-control" onChange={this.onChange}/>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-1">
                            <button className="btn btn-success" onClick={this.onSubmit}>
                            {this.state.atualizando ? 'Atualizar' : 'Salvar '}
                            </button>
                        </div>         
                        <div className="col-md-1">
                            <button className="btn btn-primary" onClick={this.limparCampos}>Limpar</button>
                        </div>                                        
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(CadastroProduto);