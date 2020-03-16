import React, { useEffect } from 'react';
import {
  Table, 
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button
} from '@material-ui/core';
import { useState } from 'react';
import { Page } from '../modules';
import vendaService from '../../services/venda-service'
import './lista-vendas.component.scss';
import { withRouter } from 'react-router-dom';

const ListaVendas = (props) => {
  var [ vendas, setVendas ] = useState([]);
  useEffect(() => {
    vendaService.getVendas()
    .then(res => res.json())
      .then(r => setVendas(r.content));
  }, []);

  const handleVendaEdit = (venda) => {
    props.history.push({
      pathname: '/venda-info',
      venda: venda
    });
  }

  const handleNewOrder = () => {
    props.history.push({
      pathname: '/venda-info',
      venda: {produtos: [], vendaResumo: {}, data: new Date()}
    });
  }
  return (
    <div className="lista-vendas-container">
      <Page title="Lista de Vendas">
        <div className="sub-header">
          <Button variant="contained" color="primary" onClick={handleNewOrder}>
            Novo Venda
          </Button>
        </div>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Número</TableCell>
                <TableCell>Data</TableCell>
                <TableCell>Situação</TableCell>
                <TableCell>Razão Social</TableCell>
                <TableCell>CNPJ</TableCell>
                <TableCell>Qtd Prod.</TableCell>
                <TableCell>Qtd. Itens</TableCell>
                <TableCell>Valor Total</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vendas.map(venda => (
                <TableRow key={venda.id}>
                  <TableCell>{venda.id}</TableCell>
                  <TableCell>{new Date(venda.data).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell>{venda.situacao}</TableCell>
                  <TableCell>{venda.razaoSocial}</TableCell>
                  <TableCell>{venda.cnpj}</TableCell>
                  <TableCell>{venda.vendaResumo.quantidadeProdutos}</TableCell>
                  <TableCell>{venda.vendaResumo.quantidadeItens}</TableCell>
                  <TableCell>R${parseFloat(venda.vendaResumo.valorTotal).toLocaleString({style:'currency', currency:'BRL'})}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => handleVendaEdit(venda)}>
                      Editar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Page>
    </div>
  )
}

export default withRouter(ListaVendas);