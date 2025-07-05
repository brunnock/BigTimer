import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';

import Settings      from  './settings.jsx';
import {Stopwatch, initSW, reduceSW}   from  './stopwatch.jsx';
import {Timer, initTimer, reduceTimer} from  './timer.jsx';


document.addEventListener('deviceready', ()=>{
  // disable device timeouts
  if (window.plugins && window.plugins.insomnia)
    window.plugins.insomnia.keepAwake()
}, false);


function debounce(fn, ms) {
  let timer
  return _ => {
    clearTimeout(timer)
    timer = setTimeout(_ => {
      timer = null
      fn.apply(this, arguments)
    }, ms)
  };
}


function App() {

  const initPrefs = () => {
    let storedPrefs = localStorage.getItem('prefs')
    if (storedPrefs) return JSON.parse(storedPrefs);
    return {
      color:       '#f00',
      opacity:     1,
      font:        'led',
      darkMode:    false,
      buttonColor: '#fff'
    }
  }

  function reducePrefs(prefs,action) {
    localStorage.setItem('prefs', JSON.stringify(action.newPrefs));
    return action.newPrefs;
  }
  
  const [prefs, setPrefs] = React.useReducer(reducePrefs, initPrefs());
  
  const getDimensions = () => {
    if (window.innerWidth > window.innerHeight) {
      return({vbWidth:     2000,
	      vbHeight:    1000,
	      orientation: 'landscape'});
    }
    
    return({vbWidth:     1000,
	    vbHeight:    2000,
	    orientation: 'portrait'});
  }
  
  const [dimensions, setDimensions] = React.useState(getDimensions());

  const debouncedHandleResize = debounce(()=>setDimensions(getDimensions), 500)
  
  React.useEffect(() => {
    window.addEventListener('resize', debouncedHandleResize);
    return ()=>window.removeEventListener('resize', debouncedHandleResize)
  })

  const [mode, setMode] = React.useState('stopwatch');
  const [oldMode, setOldMode] = React.useState('stopwatch');

  const [stopwatch, updateSW] = React.useReducer(reduceSW, initSW());
  const [timer, updateTimer] = React.useReducer(reduceTimer, initTimer());
  React.useEffect(()=> updateTimer({type:'color', color:prefs.color}), [prefs.color]);
  
  // timer state and reducer
  
  const switchMode = (newMode) => {
    setOldMode(mode);
    setMode(newMode);
  }
  
  switch (mode) {

  case 'settings':
    return <Settings
    oldMode={oldMode}
    setMode={setMode}
    prefs={prefs}
    setPrefs={setPrefs}
      />

    
  case 'timer':
    return <Timer
    state={timer}
    dispatch={updateTimer}
    switchMode={switchMode}
    prefs={prefs}
    dimensions={dimensions}
      />

    
  default:
    return <Stopwatch
    state={stopwatch}
    dispatch={updateSW}
    prefs={prefs}
    dimensions={dimensions}
    switchMode={switchMode}
      />

  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.StrictMode> <App/> </React.StrictMode>);
