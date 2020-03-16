import React, { useState, Fragment } from 'react';
import { 
  Grid,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Paper,
  TextField
} from '@material-ui/core';
import InputMask from "react-input-mask";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ptLocale from "date-fns/locale/pt-BR";
import { Page, ProdutoInfo } from '../modules';
import './venda-info.component.scss';
import { withRouter } from 'react-router-dom';
import vendaService from '../../services/venda-service';

// const BrowserHistory = require('react-router/lib/BrowserHistory').default;

const VendaInfo = (props) => {
  var [venda, setVenda] = useState(props.location.venda || {produtos: [], vendaResumo: {}, data: new Date()});
  var [data, setData] = useState(venda.data);
  var [razaoSocial, setRazaoSocial] = useState(venda.razaoSocial);
  var [cnpj, setCnpj] = useState(venda.cnpj);
  var [telefone, setTelefone] = useState(venda.telefone);
  var [email, setEmail] = useState(venda.email);
  var [produtoOpened, setProdutoOpened] = useState(false);
  var [produtoIdx, setProdutoIdx] = useState(-1);
  var [showProdutoInfo, setShowProdutoInfo] = useState(false);
  
  const handleProdutoUpdate = () => {
    const newVenda = venda;
    produtoOpened.total = produtoOpened.preco * produtoOpened.quantidade;
    if(produtoIdx !== -1)
      newVenda.produtos[produtoIdx] = produtoOpened;
    else
      newVenda.produtos.push(produtoOpened);
    setVenda(newVenda);
    setProdutoIdx(-1);
    setShowProdutoInfo(false);
  }

  const handleChange = (prop, value) => {
    const newVenda = venda;
    newVenda[prop] = value;
    setVenda(newVenda);
  }

  const handleProdutoEdit = (produto, idx) => {
    setProdutoIdx(idx);
    setProdutoOpened(produto);
    setShowProdutoInfo(true)
  }

  const handleProdutoClose = () => {
    setProdutoIdx(-1);
    setShowProdutoInfo(false);
  }

  const populateResumo = () => {
    const newVenda = venda;
    newVenda.vendaResumo.quantidadeItens = newVenda.produtos.reduce((total, p) => total + parseFloat(p.quantidade), 0);
    newVenda.vendaResumo.quantidadeProdutos = newVenda.produtos.length;
    newVenda.vendaResumo.valorTotal = newVenda.produtos.reduce((total, p) => total + p.total, 0);
  }

  const handleSave = () => {
    populateResumo();
    if(venda.id)
      vendaService.update(venda).then(newVenda => setVenda(newVenda));
    else
      vendaService.create(venda).then(newVenda => setVenda(newVenda));
  }

  const handleFinish = () => {
    populateResumo();
    vendaService.finish(venda).then(newVenda => setVenda(newVenda));
  }

  const disableEdit = venda.situacao === "FINALIZADO";

  return (
    <Fragment>
      <Page title="Informações do Venda">
        <div className="sub-header">
          <Button variant="contained" onClick={props.history.goBack}>
            Voltar
          </Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Gravar
          </Button>
          <Button variant="contained" className="success-btn" onClick={handleFinish}>
            Finalizar
          </Button>
        </div>
        <Grid container spacing={2} className="group">
          <Grid item xs={6} md={3}>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptLocale}>
                <KeyboardDatePicker
                style={{width: '100%'}}
                variant="inline"
                disabled={disableEdit}
                label="Data do Atendimento"
                format="dd/MM/yyyy"
                helperText=""
                value={data}
                onChange={(value) => {setData(value); handleChange('data', value)}}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={6} md={5}>
            <TextField
              disabled={disableEdit}
              required
              autoComplete="off"
              id="razaoSocial"
              name="razaoSocial"
              label="Razão Social"
              fullWidth
              value={razaoSocial}
              onChange={(e) => {setRazaoSocial(e.target.value); handleChange('razaoSocial', e.target.value)}}
            />
          </Grid>
          <Grid item xs={6} md={2}>
            <TextField
              disabled={disableEdit}
              required
              autoComplete="off"
              id="cnpj"
              name="cnpj"
              label="CNPJ"
              fullWidth
              value={cnpj}
              onChange={(e) => {
                setCnpj(e.target.value);
                handleChange('cnpj', e.target.value)
              }}
            >
            </TextField>
          </Grid>
          <Grid item xs={6} md={2}>
            <TextField
              disabled={disableEdit}
            autoComplete="off"
              id="telefone"
              name="telefone"
              label="Telefone"
              fullWidth
              value={telefone}
              onChange={(e) => {setTelefone(e.target.value); handleChange('telefone', e.target.value)}}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} className="group">
          <Grid item xs={6} md={3}>
            <TextField
              disabled={disableEdit}
              required
              autoComplete="off"
              id="email"
              name="email"
              label="Email"
              fullWidth
              value={email}
              onChange={(e) => {setEmail(e.target.value); handleChange('email', e.target.value)}}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <TextField
              disabled
              id="situacao"
              name="situacao"
              label="Situação"
              fullWidth
              value={venda.situacao || "NÃO GRAVADA"}
            />
          </Grid>
        </Grid>
        <Grid container>
          <Button disabled={disableEdit} variant="contained" color="primary" onClick={() => handleProdutoEdit({}, -1)}>
            Novo Produto
          </Button>
        </Grid>
        <TableContainer className="table-container" component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Produto</TableCell>
                <TableCell>Quantidade</TableCell>
                <TableCell>Preço</TableCell>
                <TableCell>Valor Total</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {venda.produtos && venda.produtos.map((produto, idx) => (
                <TableRow key={produto.id}>
                  <TableCell>{produto.produtoDescricao}</TableCell>
                  <TableCell>{produto.quantidade}</TableCell>
                  <TableCell>R${parseFloat(produto.preco).toLocaleString({style:'currency', currency:'BRL'})}</TableCell>
                  <TableCell>R${parseFloat(produto.total).toLocaleString({style:'currency', currency:'BRL'})}</TableCell>
                  <TableCell>
                    <Button disabled={disableEdit} variant="contained" color="primary" onClick={() => handleProdutoEdit(produto, idx)}>
                      Editar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Page>
      {showProdutoInfo && <ProdutoInfo 
        produto={produtoOpened}
        idx={produtoIdx}
        handleClose={handleProdutoClose}
        handleConfirm={(produto) => {handleProdutoUpdate(produto)}}
        />}
    </Fragment>
  )
}

export default withRouter(VendaInfo);