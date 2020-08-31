import React,  { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Lifecycle from './demo/Lifecycle';

function App() {
  const [cflag, setCflag] = useState('Lifecycle')
  const [lifecycleV, setLifecycleV] = useState(22)
  return (
    <div className="App">
      <div className='contentWrapper'>
          <div className='content left'>
            < div style={{margin: '15px'}}>
                <button onClick={() => { setCflag('Lifecycle') }}>测试Lifecycle生命周期</button>
                <button style={{marginLeft: '5px'}} onClick={() => { setLifecycleV(Math.random()*1000) }}>Lifecycle-setLifecycleV</button>
              </div >
              <div style={{margin: '15px'}}>
                {cflag === 'Lifecycle' && <Lifecycle defaultValue={lifecycleV}/>} 
              </div>
            </div>
          <div className='right'>
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Edit <code>src/App.js</code> and save to reload.
              </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
            </header>
          </div>
      </div>
      
    </div>
  );
}

export default App;
