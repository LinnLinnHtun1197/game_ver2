import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Tutorial,Finish } from "./components/";
import { Game } from "./containers/";

const App = () => {
  return (
    <div className="ui container">
      <BrowserRouter>
        <div>
            <Route path="/game"  component={Tutorial} />
            <Route path="/" exact render={()=><Game boardSize={10} playerSize={85}/> }/>
            <Route path="/finish" component={Finish} />
        </div> 
      </BrowserRouter>
    </div>
  );
};

export default App;