import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Link
} from "react-router-dom";
import { Menu } from 'antd';
import './landing.scss';
import Route from "../../../routing/Route";
import history from '../../../services/history';
import Home from '../../landing';
import SignIn from '../../Auth/SignIn';
import SignUp from '../../Auth/SignUp';

const Landing = () => {
  const [menu, setmenu] = useState({ current: 'home' });
  const handleClick = (e) => setmenu({ current: e.key });

  return (
    <Router history={history}>
      <div>
        <Menu onClick={handleClick} selectedKeys={[menu.current]} mode="horizontal">
          <Menu.Item key="/home">
            <Link to="/home">Inicio</Link>
          </Menu.Item>
          <Menu.Item key="/signIn">
            <Link to="/signIn">Iniciar sesión</Link>
          </Menu.Item>
          <Menu.Item key="/signUp">
            <Link to="/signUp">Registrarse</Link>
          </Menu.Item>
        </Menu>

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route path="/signIn">
            <SignIn />
          </Route>
          <Route path="/signUp">
            <SignUp />
          </Route>
          <Route>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default Landing;