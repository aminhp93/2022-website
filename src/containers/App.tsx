import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Test from "./Test";
import Stock from "./Stock";
import Account from "./Account";

import "../css/App.css";
import Tool from "./Tool";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/stock" component={Stock} />
        <Route path="/test" component={Test} />
        <Route path="/account" component={Account} />
        <Route path="/" component={LinkList} />
      </Switch>
    </Router>
  );
}

export default App;

class LinkList extends React.Component {
  render() {
    return <ul>
      <li>
        <Link to="/stock">Stock</Link>
      </li>
      <li>
        <Link to="/test">test</Link>
      </li>
      <li>
        <Link to="/account">Account</Link>
      </li>
    </ul>
  }
}