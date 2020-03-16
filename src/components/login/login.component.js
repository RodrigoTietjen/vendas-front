import React, { useState } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
  FormGroup  } from '@material-ui/core';
import AuthService from '../../services/auth-service';
import {
  Redirect,
  Router
} from "react-router-dom";

import './login.component.scss';
import { withRouter } from "react-router-dom";

function Login(props) {
  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');

  const handleSubmit = (username, password) => {
    AuthService.login(username, password).then(res => {
      if(res.status === 403) {
        console.error('Usuário e/ou Senha incorretos!');
      }
      if(res.status === 200) {
        res.json().then(r => {
          localStorage.setItem('access_token', r.token);
          props.history.push('/lista-vendas');
        });
      }
    });
  }

  return  (
      <div className="login-container">
      <h1 className="title">Sistema de Vendas</h1>
      <div className="card-wrapper">
        <Card className="card">
          <CardContent>
            <h2>Entrar</h2>
            <form noValidate autoComplete="off">
              <FormGroup>
                <TextField
                  id="user"
                  autoComplete="off"
                  label="Usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}/>
              </FormGroup>
              <FormGroup>
                <TextField 
                  id="password"
                  autoComplete="off"
                  label="Senha"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}/>
              </FormGroup>
            </form>
          </CardContent>
          <CardActions className="actions">
            <Button variant="contained" color="primary" onClick={() => handleSubmit(username, password)}>
              Login
            </Button>
          </CardActions>
        </Card>
      </div>
    </div>  
  );
}

export default withRouter(Login);