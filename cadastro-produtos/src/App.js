import React from 'react';
import Navbar from './components/navbar';
import Rotas from './rotas';

import { HashRouter} from 'react-router-dom';

function App() {
  return (
    
		<div className="container">
      <HashRouter>
        <Navbar /> 
        <Rotas />
      </HashRouter>
		</div>
    
  );
}

export default App;
