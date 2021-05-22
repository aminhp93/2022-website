import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Test from "./Test";
import Stock from "./Stock";
import StockWatchlist from "./StockWatchlist";
import Account from "./Account";
import Tool from "./Tool";
import Buy from "./Buy";
import Sell from "./Sell";

import "../css/App.css";
import "../css/StockDashboard.css";
import "../css/CashStatement.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/stock/watchlist" component={StockWatchlist} />
        <Route path="/stock" component={Stock} />
        <Route path="/tool" component={Tool} />
        <Route path="/test" component={Test} />
        <Route path="/account" component={Account} />
        <Route path="/buy" component={Buy} />
        <Route path="/sell" component={Sell} />
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
        <Link to="/stock/watchlist">Stock Watchlist</Link>
      </li>
      <li>
        <Link to="/stock">Stock Dashboard</Link>
      </li>
      <li>
        <Link to="/test">test</Link>
      </li>
      <li>
        <Link to="/account">Account</Link>
      </li>
      <li>
        <Link to="/tool">Tool</Link>
      </li>
      <li>
        <Link to="/buy">Buy</Link>
      </li>
      <li>
        <Link to="/sell">Sell</Link>
      </li>
      
    </ul>
  }
}