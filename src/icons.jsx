import React from 'react';

function AlarmSVG({bgColor, color}) {
  return (
      <svg id='alarm' className="button" viewBox="0 0 120 120">
      <title>Alarm Clock</title>
      <rect width="100%" height="100%" fill={bgColor} />
      <g stroke={color} fill={color} strokeLinecap="round">
      <circle id="rim" cx="60" cy="65" r="45" fill="none" strokeWidth="15" />

    <g id="legs" strokeWidth="15">
      <line id="leftLeg"  x1="60" x2="60" y1="5" y2="12" transform="rotate(220, 60, 65)" />
      <line id="rightLeg" x1="60" x2="60" y1="5" y2="12" transform="rotate(140, 60, 65)" />
    </g>

    <g id="hands" strokeWidth="10">
      <line id="hour"   x1="60" x2="60" y1="65" y2="80" transform="rotate(30, 60, 65)" />
      <line id="minute" x1="60" x2="60" y1="65" y2="90" transform="rotate(180, 60, 65)" />
    </g>

    <g id="bells">
      <path id="leftBell"  d="M40,20 C40,-10 80,-10 80,20" transform="rotate(-35, 60, 65)" />
      <path id="rightBell" d="M40,20 C40,-10 80,-10 80,20" transform="rotate(35, 60, 65)" />
    </g>
    
  </g>
  
    </svg>
  )
}

function GearSVG({color}) {
  return (
    <svg id='gear' className="button" viewBox="0 0 120 120">

  <title>Gear</title>

  <defs>
    <mask id="hole">
      <rect width="100%" height="100%" fill="white"/>
      <circle r="18" cx="50%" cy="50%" fill="black"/>
    </mask>
  </defs>

  <g stroke={color} fill={color}>
    
  <circle id="donut" r="40" cx="50%" cy="50%" mask="url(#hole)" />
  <g id="teeth"> 
    <rect x="52" y="5" rx="3" ry="3" width="16" height="20" />
    <rect x="52" y="5" rx="3" ry="3" width="16" height="20" transform="rotate(45, 60, 60)" />
    <rect x="52" y="5" rx="3" ry="3" width="16" height="20" transform="rotate(-45, 60, 60)" />
    <rect x="52" y="5" rx="3" ry="3" width="16" height="20" transform="rotate(90, 60, 60)" />
    <rect x="52" y="5" rx="3" ry="3" width="16" height="20" transform="rotate(-90, 60, 60)" />
    <rect x="52" y="5" rx="3" ry="3" width="16" height="20" transform="rotate(135, 60, 60)" />
    <rect x="52" y="5" rx="3" ry="3" width="16" height="20" transform="rotate(-135, 60, 60)" />
    <rect x="52" y="5" rx="3" ry="3" width="16" height="20" transform="rotate(180, 60, 60)" />
  </g>
  </g>
  </svg>
  )
}


function ResetSVG({color}) {
  return (
  <svg id='reset' className="button" viewBox="0 0 60 60">
  <title>Reset</title>
    <path d="M32,3 L19,11 32,17" fill={color} />
      <path d="M10,32 A22,22 0 1 0 31,10" fill="none" stroke={color} strokeWidth="8" />
</svg>
  )
}


function StopwatchSVG({color='#f00' ,bgColor='#000'}) {
  return (
  <svg id='stopwatch' className="button" viewBox="0 0 120 120">
  <title>Stopwatch</title>

  <rect width="100%" height="100%" fill={bgColor} />
  <g stroke={color} fill={color}>

    <circle id="rim" cx="60" cy="65" r="45" fill="none" strokeWidth="15" />

    <g id="crown">
      <rect x="54" y="2" width="12" height="12"  />
      <rect x="50" y="2" width="20" height="8"  />
    </g>
  
    <rect id="start" x="55" y="5" width="10" height="8" transform="rotate(45, 60, 65)" />

    <path d="M60,30 L52,60 C 49,72 71,72 68,60 Z"
	  strokeLinejoin="round" transform="rotate(30, 60, 65)" /> 
  </g>
  
</svg>
  )
}

export {AlarmSVG, GearSVG, ResetSVG, StopwatchSVG};
