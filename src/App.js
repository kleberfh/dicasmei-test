import React from 'react';
import Home from "./Components/Home";
import List from "./Components/List";
import { Route, Switch, BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Switch>
                <Route path={'/'} exact component={Home}/>
                <Route path={'/boletos'} exact component={List}/>
            </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
