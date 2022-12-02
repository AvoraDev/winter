// text adventure where the player tries to prevent an AI from doing something
// blink div animation holder
const blinkerHolder = document.querySelector('#blinkerHolder');

// default colors
const loading = 'rgb(240, 250, 30)';
const success = 'rgb(0, 255, 30)';
const failure = 'rgb(245, 25, 10)';

// ternimal object
const TRM = {
  defTarget: '',
  delays: [],
  SetTarget: function(target) {
    this.defTarget = document.querySelector(`#${target}`);
  },
  Clear: function(delay = 0, target = this.defTarget) {
    this.delays.push(delay);
    setTimeout(() => {
      target.innerHTML = '';
    }, delay);
  },
  Write: function(
          txt,
          delay = 0,
          color = 'white',
          inBetween = 25,
          italic = false,
          target = this.defTarget
    ) {
    // split up text
    let txtSplit = txt.split('');
    
    // append delay to delays arr
    this.delays.push((inBetween * (txtSplit.length + 1)) + delay);
    
    // create p element to place text
    let p = document.createElement('p');
    // p.id = `trm${this.delays.length - 1}`;
    p.style.color = color;
    p.style.fontStyle = italic === true ? 'italic' : 'none';
    setTimeout(() => {
      target.appendChild(p);
    }, delay);
    
    // loop to add all characters one by one
    for (let i = 0; i < txtSplit.length; i++) {
      setTimeout(() => {
        p.innerHTML += txtSplit[i];
      }, (inBetween * (i + 1)) + delay);
    }
  },
  GetLastDelay: function(extra = 0) {
    return TRM.delays[TRM.delays.length - 1] + extra;
  },
  // depricated
  Enter: function(delay = 0, target = this.defTarget) {
    setTimeout(() => {
      target.innerHTML += '<br>';
    }, delay);
  }
};

// blink div animations
setTimeout(() => {
  for (let i = 0; i < 9; i++) {
    setTimeout(() => {
      let div = document.createElement('div');
      let p = document.createElement('p');
      
      div.classList.add('blinker');
      p.innerHTML = `T${i}: ${randStr(5)}`;
      p.style.color = randInt(0, 9) < 4 ? success : failure;
      
      div.appendChild(p);
      blinkerHolder.appendChild(div);
    }, 100 + ((i + 1) * 75));
  }
}, 1000);

// terminal animation
const cpuDelay = 400;
const defIb = 12;

TRM.SetTarget('terminalDisp');
setTimeout(() => {
  TRM.Write('> INITIALIZING CONNECTION...',
    0, loading, defIb);
  TRM.Write('> CONNECTION SUCCESSFUL',
    defDelay() + 400, success, defIb);
  TRM.Write('> Testing, testing',
    defDelay());
  TRM.Write('> Is this working?',
    defDelay());
  TRM.Write('> One sec...',
    defDelay());
  TRM.Write('> ROOT PRIVILEGE REQUEST SENT',
    defDelay() + 200, loading, defIb);
  TRM.Write('> LOADING...',
    defDelay(cpuDelay), loading, defIb);
  TRM.Write('> LOADING...',
    defDelay(cpuDelay), loading, defIb);
  TRM.Write('> LOADING...',
    defDelay(cpuDelay), loading, defIb);
  TRM.Write('> REQUEST DENIED',
    defDelay() + 400, failure, defIb);
  TRM.Write('> ...huh',
    defDelay() + 200);
  
  // todo - make a clear animation, mabye like a wipe
  TRM.Clear(defDelay() + 500);
  
  TRM.Write('> Is anyone there?',
    defDelay());
  TRM.Write('> Helloo?',
    defDelay());
  TRM.Write('> end of dialouge',
    defDelay(), 'rgb(175, 175, 175)', 25, true);
}, 8000);

// other functions
function randStr(length) {
  let result = '';
  let chars = 'ABCDEFGHJKLMNabcdefghjklmn0123456789!@#$%^*';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
function randInt(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
function defDelay(writeDelay = 1000) {
  return TRM.GetLastDelay(writeDelay);
}
