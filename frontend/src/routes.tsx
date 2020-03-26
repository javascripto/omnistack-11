import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Logon } from './pages/Logon';
import { Profile } from './pages/Profile';
import { Register } from './pages/Register';

export function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Logon} />
        <Route path="/profile" component={Profile} />
        <Route path="/register" component={Register} />
      </Switch>
    </BrowserRouter>
  );
}
