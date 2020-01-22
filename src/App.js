import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Tutorial } from "./components/";
import { Game } from "./containers/";

const App = () => {
  return (
    <div className="ui container">
      <BrowserRouter>
        <div>
            <Route path="/" exact component={Tutorial} />
            <Route path="/game" render={()=><Game boardSize={20} playerSize={25} /> }/>
        </div> 
      </BrowserRouter>
    </div>
  );
};

export default App;