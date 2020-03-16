import React, { Fragment, useState } from 'react';
import { Link, Card, CardContent } from '@material-ui/core';
import './page.component.scss';
import { Redirect } from 'react-router-dom';

const Page = (props) => {
  var [gotoLogin, setGotoLogin] = useState(false);
  return (
    !localStorage.getItem('access_token') || gotoLogin ?
    <Redirect
      to={{
        pathname: ""
      }}
    /> :
    <Fragment>
      <div className="page-header">
        <div style={{display: 'flex'}}>
          <h2 className="title">
            Sistema de Vendas
          </h2>
          <h2 className="page-title title">
            {props.title}
          </h2>
        </div>
        <Link className="logout" onClick={() => {localStorage.removeItem('access_token'); setGotoLogin(true)}}>
          Logout
        </Link>
      </div>
      <Card className="page-body">
        <CardContent>
          {props.children}
        </CardContent>
      </Card>
    </Fragment>
  )
}
export default Page;