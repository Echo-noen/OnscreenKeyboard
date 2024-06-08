const keys = document.querySelectorAll('key');

const keyMap = {
  "Backquote": "\\",
  "Digit1": "1",
  "Digit2": "2",
  "Digit3": "3",
  "Digit4": "4",
  "Digit5": "5",
  "Digit6": "6",
  "Digit7": "7",
  "Digit8": "8",
  "Digit9": "9",
  "Digit0": "0",
  "Minus": "'",
  "Equal": "ì",
  "Backspace": "backspace",
  "Tab": "tab",
  "KeyQ": "q",
  "KeyW": "w",
  "KeyE": "e",
  "KeyR": "r",
  "KeyT": "t",
  "KeyY": "y",
  "KeyU": "u",
  "KeyI": "i",
  "KeyO": "o",
  "KeyP": "p",
  "BracketLeft": "è",
  "BracketRight": "+",
  "Backslash": "ù",
  "CapsLock": "caps_lock",
  "KeyA": "a",
  "KeyS": "s",
  "KeyD": "d",
  "KeyF": "f",
  "KeyG": "g",
  "KeyH": "h",
  "KeyJ": "j",
  "KeyK": "k",
  "KeyL": "l",
  "Semicolon": "ò",
  "Quote": "à",
  "Enter": "enter",
  "ShiftLeft": "shift",
  "KeyZ": "z",
  "KeyX": "x",
  "KeyC": "c",
  "KeyV": "v",
  "KeyB": "b",
  "KeyN": "n",
  "KeyM": "m",
  "Comma": ",",
  "Period": ".",
  "Slash": "-",
  "ShiftRight": "shift_r",
  "ControlLeft": "ctrl",
  "cmd": "cmd",
  "AltLeft": "alt",
  "Space": "space",
  "AltRight": "alt_r",
  "IntlBackslash": "<",
  "ControlRight": "ctrl_r",
  "None": null
}

const shiftedMap = {
  "Backquote": "~",
  "Digit1": "!",
  "Digit2": "@",
  "Digit3": "#",
  "Digit4": "$",
  "Digit5": "%",
  "Digit6": "^",
  "Digit7": "&",
  "Digit8": "*",
  "Digit9": "(",
  "Digit0": ")",
  "Minus": "_",
  "Equal": "+",
  "Backspace": "backspace",
  "Tab": "tab",
  "KeyQ": "Q",
  "KeyW": "W",
  "KeyE": "E",
  "KeyR": "R",
  "KeyT": "T",
  "KeyY": "Y",
  "KeyU": "U",
  "KeyI": "I",
  "KeyO": "O",
  "KeyP": "P",
  "BracketLeft": "{",
  "BracketRight": "}",
  "Backslash": "|",
  "CapsLock": "caps_lock",
  "KeyA": "A",
  "KeyS": "S",
  "KeyD": "D",
  "KeyF": "F",
  "KeyG": "G",
  "KeyH": "H",
  "KeyJ": "J",
  "KeyK": "K",
  "KeyL": "L",
  "Semicolon": ":",
  "Quote": "\"",
  "Enter": "enter",
  "ShiftLeft": "shift",
  "KeyZ": "Z",
  "KeyX": "X",
  "KeyC": "C",
  "KeyV": "V",
  "KeyB": "B",
  "KeyN": "N",
  "KeyM": "M",
  "Comma": "<",
  "Period": ">",
  "Slash": "?",
  "ShiftRight": "shift_r",
  "ControlLeft": "ctrl",
  "cmd": "cmd",
  "AltLeft": "alt",
  "Space": "space",
  "AltRight": "alt_r",
  "IntlBackslash": ">",
  "ControlRight": "ctrl_r",
  "None": null
}

let usedMap = keyMap;
let shiftPressed = false;
let altPressed = false;

function updateMap() {
  if (!shiftPressed) {
    usedMap = keyMap;
  } else {
    usedMap = shiftedMap;
  }
}

keys.forEach(key => {
  key.dataset.default = key.innerHTML;
});

document.addEventListener("keydown", (e) => {
  e.preventDefault();
  const keyCode = e.code;

  if (keyCode === 'ShiftRight' || keyCode === 'ShiftLeft') {
    shiftPressed = true;
    updateKeys();
  } else if (keyCode === 'None') {
    altPressed = true;
    updateKeys();
  }

  const keyElements = document.querySelectorAll(`key[kid="${keyCode}"]`);
  keyElements.forEach(keyElement => {
    keyElement.classList.add('active');
  });

  updateMap();
});

document.addEventListener("keyup", (e) => {
  const keyCode = e.code;

  if (keyCode === 'ShiftRight' || keyCode === 'ShiftLeft') {
    shiftPressed = false;
  } else if (keyCode === 'None') {
    altPressed = false;
  }

  const keyElement = document.querySelector(`key[kid="${keyCode}"]`);
  if (keyElement) {
    keyElement.classList.remove('active');
  }

  updateKeys();
  updateMap();
});

function updateKeys() {
  if (shiftPressed && altPressed) {
    keys.forEach(key => {
      if (key.hasAttribute('sup')) {
        key.innerHTML = key.getAttribute('sup');
      }
    });
  } else if (shiftPressed) {
    keys.forEach(key => {
      if (key.hasAttribute('alt')) {
        key.innerHTML = key.getAttribute('alt');
      }
    });
  } else if (altPressed) {
    keys.forEach(key => {
      if (key.hasAttribute('gr')) {
        key.innerHTML = key.getAttribute('gr');
      }
    });
  } else {
    resetKeys();
  }
}

function resetKeys() {
  keys.forEach(key => {
    key.innerHTML = key.dataset.default;
  });
}

function getKeyByValue(object, value) {
  const key = Object.keys(object).find(key => object[key] === value);
  if (!key) {
    console.log('Value not found in map:', value);
  }
  return key;
}

window.electronAPI.onExternalEvent((event, data) => {
  updateMap();
  var parsedData = getKeyByValue(usedMap, data.key);
  console.log('data.key:', data.key);

  const keyEvent = new KeyboardEvent(data.type, {
    key: data.key,
    code: parsedData,
  });
  console.log(keyEvent);
  document.dispatchEvent(keyEvent);
});
