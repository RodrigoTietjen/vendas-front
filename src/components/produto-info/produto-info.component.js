import React, { useState } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import './produto-info.component.scss';

const ProdutoInfo = (props) => {
  
  var [produtoDescricao, setProdutoDescricao] = useState(props.produto.produtoDescricao);
  var [quantidade, setQuantidade] = useState(props.produto.quantidade);
  var [preco, setPreco] = useState(props.produto.preco);

  const handleChange = (prop, value) => {
    props.produto[prop] = value;
  }

  return (
    <div>
      <Dialog open={true} onClose={props.handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{props.idx !== -1 ? 'Editando ' : 'Novo '}Produto</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            autoComplete="off"
            id="produtoDescricao"
            label="Descrição"
            type="text"
            fullWidth
            value={produtoDescricao}
            onChange={(e) => {
              setProdutoDescricao(e.target.value);
              handleChange('produtoDescricao', e.target.value)
            }}
          />
          <TextField
            margin="dense"
            autoComplete="off"
            autoComplete="off"
            id="quantidade"
            label="Quantidade"
            type="number"
            fullWidth
            value={quantidade}
            onChange={(e) => {
              setQuantidade(e.target.value);
              handleChange('quantidade', e.target.value);
            }}
          />
          <TextField
            autoComplete="off"
            margin="dense"
            autoComplete="off"
            id="preco"
            label="Preço"
            type="number"
            fullWidth
            value={preco}
            onChange={(e) => {
              setPreco(e.target.value);
              handleChange('preco', e.target.value)
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={props.handleConfirm} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ProdutoInfo;