import React from 'react';
import {DoubleDigit, Colon} from './digits.jsx';
import {AlarmSVG, GearSVG, ResetSVG, StopwatchSVG} from './icons.jsx';

// stopwatch state and reducer

function initSW() {
  return {start:0, running:false, drift:0, seconds:0, lastTick:0};
}

function reduceSW(state,action) {
  let state2 = {...state};
  switch (action.type) {

  case 'start':
    state2.running=true;
    state2.lastTick = state2.start = Date.now();
    state2.drift=0;
    break;

  case 'stop':
    state2.running=false;
    break;

  case 'reset':
    return initSW();

  case 'tick':
    state2.drift =  (Date.now()-state2.start) % 100;
    state2.seconds += Math.round( (Date.now() - state2.lastTick)/1000 );
    if (state2.seconds>=6000) state2.seconds=0; //rollover
    state2.lastTick = Date.now();
    break;
  }
  return state2;
}

function Stopwatch({state, dispatch, dimensions, switchMode, prefs}) {

  //let timer=null;
  const timer = React.useRef(null);
  React.useEffect(() => {
    if (state.running)
      timer.current=setTimeout(() => {
	dispatch({type:'tick'});
	return ()=> clearTimeout(timer.current);
      }, (1000-state.drift))
  }, [state.seconds,state.running]);

  const start = e => {
    e.stopPropagation();
    e.preventDefault();
    dispatch({type:'start'});
  }

  const PlayButton = () => {
    return (
      <polygon points={(dimensions.orientation==='landscape') ? '900,350 900,650 1125,500' : '425,800 425,1200 625,1000'}
      fill={prefs.darkMode ? prefs.color : '#ccc'}
      onContextMenu={e=>e.preventDefault()}
      onMouseUp={e=>start(e)}
      onTouchEnd={e=>start(e)}
	/>
    )
  }

  const Controls = () => {
    return (
	<span className='icons'>
	
	<button id='stopwatchButton'>
	<StopwatchSVG bgColor={prefs.buttonColor} color='#000' />
	</button>

	<button id='timerButton' onClick={()=>switchMode('timer')}>
	<AlarmSVG color={prefs.buttonColor} />
	</button>

	<button id='settingsButton' onClick={()=>switchMode('settings')}>
	<GearSVG color={prefs.buttonColor} />
	</button>
	
	<button id='resetButton' onClick={()=>dispatch({type:'reset'})}>
	<ResetSVG color={prefs.buttonColor} />
	</button>
	
      </span>
    )
  }

  const stop = e => {
    e.stopPropagation();
    e.preventDefault();
    clearTimeout(timer.current);
    dispatch({type:'stop'});
  }
  
  return (
    <React.Fragment>
      <svg viewBox={`0 0 ${dimensions.vbWidth} ${dimensions.vbHeight}`}
           preserveAspectRatio='none'
           onContextMenu={ e=>e.preventDefault() }
           onMouseUp={ e=>stop(e) }
           onTouchEnd={ e=>stop(e) } >

      <rect height="100%" width="100%" fill='#000' />
      
      <g stroke={prefs.color} fill={prefs.color} opacity={prefs.opacity}>
      <DoubleDigit key="minutes" font={prefs.font} num={Math.floor(state.seconds/60) } orientation={null} />
	{(dimensions.orientation==='landscape') ? <Colon font={prefs.font} /> : ''}
	<DoubleDigit key="seconds" font={prefs.font} num={state.seconds % 60} orientation={dimensions.orientation} />
	{state.running ? '' : <PlayButton />}
      </g>

    </svg>

    {state.running ? '' : <Controls />}

    </React.Fragment>
  )
}

export {Stopwatch, initSW, reduceSW} ;
