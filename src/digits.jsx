import React from 'react';

const digits = { led:[],  nixie:[] };

digits.nixie[0] = (
  <ellipse cx="250" cy="500" rx="150" ry="350" fill="none" strokeWidth="100" />
);

digits.nixie[1] = (
  <path strokeWidth="100" fill="none" strokeLinecap="round" strokeLinejoin="round" d="M150,220 L275,150 V850" />
);

digits.nixie[2] = (
  <path strokeWidth="100" fill="none" strokeLinecap="round" strokeLinejoin="round" d="M100,350 C190,-40 540,235 350,475 L100,850 H400" />
);

digits.nixie[3] = (
    <path strokeWidth="100" fill="none" strokeLinecap="round" strokeLinejoin="round"
  d="M120,230 C400,-30 550,500 200,500 C550,500 400,1030 120,770" />
);

digits.nixie[4] = (
  <path strokeWidth="100" fill="none" strokeLinecap="round" strokeLinejoin="round" d="M315,850 V150 L100,620 H400" />
);

digits.nixie[5] = (
  <path strokeWidth="100" fill="none" strokeLinecap="round" strokeLinejoin="round" d="M390,151 H111 V474 C500,281 500,1000 100,820" />
);

digits.nixie[6] = (
  <g strokeWidth="100" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="250" cy="650" rx="150" ry="200" />
    <path d="M300,150 L135,520"  />
  </g>
);

digits.nixie[7] = (
  <path strokeWidth="100" fill="none" strokeLinecap="round" strokeLinejoin="round" d="M100,160 H400 L150,850" />
);

digits.nixie[8] = (
  <g strokeWidth="100" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="250" cy="320" rx="150" ry="175" />
    <ellipse cx="250" cy="680" rx="150" ry="175" />
  </g>
);

digits.nixie[9] = (
  <g strokeWidth="100" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="250" cy="350" rx="150" ry="200" />
    <path d="M350,500 L150,850"  />
  </g>
);


digits.led[0] =  (
  <g strokeWidth='80' strokeLinecap="round">
    <line x1='125' x2='375' y1='75'  y2='75' />
    <line x1='125' x2='375' y1='925' y2='925' />
    <line x1='100' x2='100' y1='125'  y2='475'  />
    <line x1='100' x2='100' y1='550'  y2='875'  />
    <line x1='400' x2='400' y1='125'  y2='475'  />
    <line x1='400' x2='400' y1='550'  y2='875'  />
  </g>
);

digits.led[1] =  (
  <g  strokeWidth='80' strokeLinecap="round">
    <line x1='300' x2='300' y1='100'  y2='475'  />
    <line x1='300' x2='300' y1='550'  y2='900'  />
  </g>
);

digits.led[2] =  (
  <g  strokeWidth='80' strokeLinecap="round">
    <line x1='125' x2='375' y1='75'  y2='75' />
    <line x1='125' x2='375' y1='500' y2='500' />
    <line x1='125' x2='375' y1='925' y2='925' />
    <line x1='100' x2='100' y1='550'  y2='875'  />
    <line x1='400' x2='400' y1='125'  y2='475'  />
  </g>
);

digits.led[3] =  (
  <g  strokeWidth='80' strokeLinecap="round">
    <line x1='125' x2='375' y1='75'  y2='75' />
    <line x1='125' x2='375' y1='500' y2='500' />
    <line x1='125' x2='375' y1='925' y2='925' />
    <line x1='400' x2='400' y1='125'  y2='475'  />
    <line x1='400' x2='400' y1='550'  y2='875'  />
  </g>
);

digits.led[4] =  (
  <g  strokeWidth='80' strokeLinecap="round">
    <line x1='125' x2='375' y1='500' y2='500' />
    <line x1='100' x2='100' y1='125'  y2='475'  />
    <line x1='400' x2='400' y1='125'  y2='475'  />
    <line x1='400' x2='400' y1='550'  y2='900'  />
  </g>
);

digits.led[5] =  (
  <g  strokeWidth='80' strokeLinecap="round">
    <line x1='125' x2='375' y1='75'  y2='75' />
    <line x1='125' x2='375' y1='500' y2='500' />
    <line x1='125' x2='375' y1='925' y2='925' />
    <line x1='100' x2='100' y1='125'  y2='475'  />
    <line x1='400' x2='400' y1='550'  y2='875'  />
  </g>
);

digits.led[6] =  (
  <g  strokeWidth='80' strokeLinecap="round">
    <line x1='125' x2='375' y1='75'  y2='75' />
    <line x1='125' x2='375' y1='500' y2='500' />
    <line x1='125' x2='375' y1='925' y2='925' />
    <line x1='100' x2='100' y1='125'  y2='475'  />
    <line x1='100' x2='100' y1='550'  y2='875'  />
    <line x1='400' x2='400' y1='550'  y2='875'  />
  </g>
);

digits.led[7] =  (
  <g  strokeWidth='80' strokeLinecap="round">
    <line x1='125' x2='375' y1='75'  y2='75' />
    <line x1='400' x2='400' y1='125'  y2='475'  />
    <line x1='400' x2='400' y1='550'  y2='900'  />
  </g>
);

digits.led[8] =  (
  <g  strokeWidth='80' strokeLinecap="round">
    <line x1='125' x2='375' y1='75'  y2='75' />
    <line x1='125' x2='375' y1='500' y2='500' />
    <line x1='125' x2='375' y1='925' y2='925' />
    <line x1='100' x2='100' y1='125'  y2='475'  />
    <line x1='100' x2='100' y1='550'  y2='875'  />
    <line x1='400' x2='400' y1='125'  y2='475'  />
    <line x1='400' x2='400' y1='550'  y2='875'  />
  </g>
);

digits.led[9] =  (
  <g  strokeWidth='80' strokeLinecap="round">
    <line x1='125' x2='375' y1='75'  y2='75' />
    <line x1='125' x2='375' y1='500' y2='500' />
    <line x1='125' x2='375' y1='925' y2='925' />
    <line x1='100' x2='100' y1='125'  y2='475'  />
    <line x1='400' x2='400' y1='125'  y2='475'  />
    <line x1='400' x2='400' y1='550'  y2='875'  />
  </g>
);



function DoubleDigit({num, font='led', orientation=null, controls=false}) {
  let transX=0;
  let transY=0;
  if (orientation==='landscape') {
    transX=1000;
  } else if (orientation==='portrait') {
    transY=1000;
  }

  return (
    <g transform={`translate(${transX}, ${transY}) 
       ${controls ? ',scale(1,.5), translate(0,500)' : ''}`}>
      {digits[font][~~(num/10)]}
      <g transform='translate(500)'>{digits[font][num%10]}</g>
    </g>
  )
}

function Colon() {
  return (
    <g>
      <circle cx='1000' cy='400' r='30' />
      <circle cx='1000' cy='600' r='30' />
    </g>
  )
}

export {DoubleDigit, Colon};

