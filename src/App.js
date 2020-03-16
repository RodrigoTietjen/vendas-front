import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Login, ListaVendas, VendaInfo } from './components/modules';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header>
        <link rel="stylesheet" type="text/css" href="https://cdn.rawgit.com/alpertuna/react-metismenu/master/dist/react-metismenu-standart.min.css" />        
      </header>
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/lista-vendas">
            <ListaVendas />
          </Route>
          <Route exact path="/venda-info">
            <VendaInfo />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
export default App;
