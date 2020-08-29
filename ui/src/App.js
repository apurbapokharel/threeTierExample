import React from 'react';
import Login from './Login';
import Crud from './Crud';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';


function App() {
  return (
    <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Login}/>
            <Route path="/crud" component={Crud}/>
          </Switch>  
        </div>
      </Router>

  );
}

export default App;

