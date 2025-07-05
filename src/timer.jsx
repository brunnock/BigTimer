import React from 'react';
import {DoubleDigit, Colon} from './digits.jsx';
import {AlarmSVG, GearSVG, ResetSVG, StopwatchSVG} from './icons.jsx';

import beep2mp3 from './assets/beep2.mp3';

if (!cordova) var cordova=null; // get around webpack 
const beep = new Audio(beep2mp3);

// timer state and reducer

function initTimer() {
  return {start:0, running:false, expired:false, 
	  minutes:0, seconds:0, totalSeconds:0,
	  lastTick:0, drift:0, color:'#000'};
}

function reduceTimer(state,action) {
  let state2 = {...state};
  switch (action.type) {

  case 'start':
    state2.running=true;
    state2.expired=false;
    state2.done=false;
    state2.lastTick = state2.start = Date.now();
    state2.drift=0;
    state2.totalSeconds= state2.minutes*60 + state2.seconds;
    break;

  case 'stop':
    state2.running=false;
    state2.color=action.color;
    state2.bgColor = '#000';
    break;

  case 'reset':
    state2 = initTimer();
    state2.color=action.color;
    state2.bgColor = '#000';
    break;
    
  case 'change':
    // break up unit into digits
    let digits = [ Math.floor(state2[action.unit]/10), state2[action.unit]%10];
    // modify digit
    let digit = digits[action.column];
    digit+=action.amount;
    if (digit>9) digit=0;
    if (digit<0) digit=9;
    digits[action.column]=digit;
    // recombine digits into 1 number
    state2[action.unit] = Number(digits.join(''));
    break;
    
  case 'tick':
    if (state2.totalSeconds===0) state2.expired=true;
    let elapsed = Math.round( (Date.now() - state2.lastTick)/1000 );
    if (state2.expired) {
      state2.totalSeconds += elapsed;
      if (state2.totalSeconds>=6000) state2.totalSeconds=0; //rollover
      [state2.color,state2.bgColor] = [state2.bgColor,state2.color];
      beep.play();

    } else {
      state2.totalSeconds -= elapsed;
      if (state2.totalSeconds<0) {
	state2.totalSeconds = Math.abs(state2.totalSeconds);
	state2.expired=true;
      }
    }
    state2.minutes = Math.floor(state2.totalSeconds/60);
    state2.seconds = state2.totalSeconds%60;
    state2.drift =  (Date.now()-state2.start) % 100;
    state2.lastTick = Date.now();
    break;

  case 'color':
    state2.color = action.color;
    state2.bgColor = '#000';
    break;
  }
  return state2;
}

function Timer({state,dispatch,switchMode,prefs,dimensions}) {

  //let timer=null;  
  const timer = React.useRef(null);
  React.useEffect(() => {
    if (state.running)
      timer.current=setTimeout(() => {
	dispatch({type:'tick'});
	return ()=> clearTimeout(timer.current);
      }, (1000-state.drift))
  }, [state.totalSeconds,state.running]);


  const Arrow = ({transform, amount, column, unit}) => {
    const changeAmount = ()=>dispatch({type:'change', column:column, amount:amount, unit:unit});
    return <polygon points='175,225 250,150 325,225'
    fill={prefs.darkMode ? prefs.color : '#ccc'}
    transform={transform}
    onMouseUp={changeAmount}
    onTouchEnd={changeAmount}
      />
  }

  
  const start = e => {
    e.stopPropagation();
    e.preventDefault();
    dispatch({type:'start'});
    // enable background mode
    if (cordova && cordova.plugins && cordova.plugins.backgroundMode)
      cordova.plugins.backgroundMode.enable();
  }
  
  const SVGControls = () => {
    // return 1 play button, 8 arrows, 4up and 4down
    return (
	<g fill='#fff' opacity='.75'>
	<polygon id='playButton' points={(dimensions.orientation==='landscape') ? '900,350 900,650 1125,500' : '425,800 425,1200 625,1000'}
                 fill={prefs.darkMode ? prefs.color : '#ccc'}
                 onContextMenu={e=>e.preventDefault()}
                 onMouseUp={e=>start(e)}
                 onTouchEnd={e=>start(e)} />

	<Arrow unit='minutes' column={0} amount={1} />
	<Arrow unit='minutes' column={0} amount={-1} transform='rotate(180,250,500)' />

	<g transform='translate(500)'>
	<Arrow unit='minutes' column={1} amount={1} />
	<Arrow unit='minutes' column={1} amount={-1} transform='rotate(180,250,500)' />
	</g>
	
	<g transform={`translate(${ dimensions.orientation==='landscape' ? 1000 : 0}, ${ dimensions.orientation==='portrait' ? 1000 : 0})`} >
	<Arrow unit='seconds' column={0} amount={1} />
	<Arrow unit='seconds' column={0} amount={-1} transform='rotate(180,250,500)' />

	<g transform='translate(500)'>
	<Arrow unit='seconds' column={1} amount={1} />
	<Arrow unit='seconds' column={1} amount={-1} transform='rotate(180,250,500)' />
	</g>
	</g>
	
      </g>
    )
  }

  
  const Controls = () => {
    return (
	<span className='icons'>

	<button id='stopwatchButton' onClick={()=>switchMode('stopwatch')}>
	<StopwatchSVG color={prefs.buttonColor} />
	</button>

	<button id='timerButton'>
	<AlarmSVG bgColor={prefs.buttonColor} color='#000' />
	</button>

	<button id='settingsButton' onClick={()=>switchMode('settings')}>
	<GearSVG color={prefs.buttonColor} />
	</button>
	
	<button id='resetButton' onClick={()=>dispatch({type:'reset', color:prefs.color})}>
	<ResetSVG color={prefs.buttonColor} />
	</button>
	
      </span>
    )
  }

  const stop = e => {
    e.stopPropagation();
    e.preventDefault();
    clearTimeout(timer.current);
    dispatch({type:'stop', color:prefs.color});
    if (cordova && cordova.plugins && cordova.plugins.backgroundMode)
      cordova.plugins.backgroundMode.disable();
  }
  

  return (
    <React.Fragment>
    <svg viewBox={`0 0 ${dimensions.vbWidth} ${dimensions.vbHeight}`} preserveAspectRatio='none'
    onContextMenu={ e=>e.preventDefault() }
    onMouseUp={ e=>stop(e) }
    onTouchEnd={ e=>stop(e) }
      >

      <g opacity={prefs.opacity}>
	<rect height="100%" width="100%" fill={state.bgColor} />

	<g stroke={state.color} fill={state.color}>
	  <DoubleDigit key="minutes" font={prefs.font} num={state.minutes} orientation={null} controls={!state.running} />
	  {(dimensions.orientation==='landscape') ? <Colon /> : ''}
	  <DoubleDigit key="seconds" font={prefs.font} num={state.seconds} orientation={dimensions.orientation} controls={!state.running} />
	  {state.running ? '' : <SVGControls /> }
	</g>
      </g>
    </svg>

    {state.running ? '' : <Controls />}
    
    </React.Fragment>
  )
}

export {Timer, initTimer, reduceTimer};
