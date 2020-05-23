import React from 'react';
import { Router, Link } from '@reach/router';
import Homepage from '../src/pages/homepage/homepage.page';
import BarExample1 from '../src/pages/bar-example-pages/bar-example1.page';
import LineExample1 from '../src/pages/line-example-pages/line-example1.page';
import './App.css';

function App() {
  return (
    <div className="App">
      <h2>Nice charts library</h2>
      <nav>
        <Link to="/">Home</Link>
        <Link to="bar">Bar Chart Examples</Link>
        <Link to="line">Line Chart Examples</Link>
      </nav>
      <Router>
        <Homepage path="/" />
        <BarExample1 path="bar" />
        <LineExample1 path="line" />
      </Router>
    </div>
  );
}

export default App;
