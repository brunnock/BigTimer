import React from 'react';
import {DoubleDigit, Colon} from './digits.jsx';

// allow user to try out changes on this screen,
// but revert if they cancel

const opacity2color = (opacity,darkMode,color) => {
  // brightness depends on color
  // f00, 0f0, 0ff, ff0
  let brightness = ~~(255 * opacity);
  if (darkMode) {
    switch (color) {
    case '#f00':
      return(`rgb( ${brightness},0,0`);
    case '#0f0':
      return(`rgb( 0,${brightness},0`);
    case '#0ff':
      return(`rgb( 0,${brightness},${brightness}`);
    case '#ff0':
      return(`rgb( ${brightness},${brightness},0`); 
    default:
      return(`rgb( ${brightness}, ${brightness}, ${brightness}`); 
    }
  }
  return(`rgb( ${brightness}, ${brightness}, ${brightness}`); 
}

function Settings({prefs,setPrefs,oldMode,setMode}) {

  const reducePrefs = (prefs, action) => {
    let prefs2 = {...prefs}
    switch (action.type) {
    case 'tryColor':
      prefs2.color = action.color;
      break;
    case 'tryFont':
      prefs2.font = action.font;
      break;
    case 'tryDark':
      prefs2.darkMode = action.darkMode;
      break;
    case 'tryOpacity':
      prefs2.opacity = action.opacity;
      break;
    }
    prefs2.buttonColor =
      opacity2color(prefs2.opacity, prefs2.darkMode, prefs2.color);
    
    return prefs2;
  }
  
  const [prefs2, tryPrefs] = React.useReducer(reducePrefs, {...prefs});

  const Color =({color})=> {
    return (
      <span style={{color:color, padding:'2vmin', fontSize:'15vmin'}}
            onClick={()=>tryPrefs({type:'tryColor', color:color})}>&#9679;</span>
    )
  }

  const Font = ({font}) => {
    return (
	<svg viewBox='0 0 2000 1000' preserveAspectRatio='none'
             style={{width:'60vmin', height:'20vmin', margin:'1vmin',
                     border:((prefs2.font===font) ? '1px solid #fff' : 'none') }}
             onClick={()=>tryPrefs({type:'tryFont', font:font})}>
	  <g stroke={prefs2.color} fill={prefs2.color} opacity={prefs2.opacity}>
	    <DoubleDigit key="minutes" num={2}  font={font} orientation={null} />
	    <Colon font={font} /> 
	    <DoubleDigit key="seconds" num={34} font={font} orientation='landscape' />
	  </g>
	</svg>
    )
  }

  const DarkMode = () => {
    return (
      <div style={{marginTop:'1em', color:prefs2.buttonColor}}>
        <label htmlFor='darkModeCheck'>Darkroom:&nbsp;</label>
        <input style={{transform:'scale(2)', verticalAlign:'middle'}}
             type='checkbox' id='darkModeCheck' checked={prefs2.darkMode}
               onChange={()=>tryPrefs({type:'tryDark', darkMode:!prefs2.darkMode})} />
      </div>
    )
  }

  return (
    <div id='settingsDIV' style={{color:prefs2.color}}>
      <Font font='led'   />
      <Font font='nixie' />

      <p style={{margin:'0vmin auto'}}>
        <Color color='#f00' />
        <Color color='#0f0' />
        <Color color='#ff0' />
        <Color color='#0ff' />
        <Color color='#fff' />
      </p>

      <div id="opacitySliderDIV">
        <input type="range" min='.05' max='1' step='.01' value={prefs2.opacity}
	       onChange={ e=>tryPrefs({type:'tryOpacity', opacity:e.target.value}) } />
      </div>
      
      <DarkMode />

    <p id="settingsButtons">
      <button onClick={()=>setMode(oldMode)} style={{left:0, color:prefs2.buttonColor}}>Cancel</button>
      
      <button onClick={()=>{
	setMode(oldMode);
	setPrefs({newPrefs:prefs2});
      }} style={{right:0, color:prefs2.buttonColor}}>Save</button>
      </p>      
      </div>
  )
}
    
export default Settings;
