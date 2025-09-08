const morse = {

  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',

  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',

  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',

  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',

  'Y': '-.--', 'Z': '--..',

  '0': '-----', '1': '.----', '2': '..---', '3': '...--',

  '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',

  '9': '----.', ' ': '/'

};

const inverseMorse = Object.fromEntries(Object.entries(morse).map(([k, v]) => [v, k]));

function textToMorse(text) {

  return text.toUpperCase().split('').map(char => morse[char] || '').join(' ');

}

function morseToText(code) {

  return code.split(' ').map(symbol => inverseMorse[symbol] || '').join('');

}

function textToBase(text, base) {

  return text.split('').map(c => c.charCodeAt(0).toString(base)).join(' ');

}

function baseToText(input, base) {

  return input.split(' ').map(i => String.fromCharCode(parseInt(i, base))).join('');

}

function baseValue(base) {

  return { binary: 2, octal: 8, decimal: 10, hex: 16 }[base];

}

function convert() {

  const input = document.getElementById('input').value.trim();

  const from = document.getElementById('from').value;

  const to = document.getElementById('to').value;

  let output = '';

  try {

    if (from === 'text') {

      if (to === 'morse') output = textToMorse(input);

      else output = textToBase(input, baseValue(to));

    } else if (from === 'morse') {

      const text = morseToText(input);

      output = to === 'text' ? text : textToBase(text, baseValue(to));

    } else {

      const text = baseToText(input, baseValue(from));

      output = to === 'text' ? text : (to === 'morse' ? textToMorse(text) : textToBase(text, baseValue(to)));

    }

  } catch (e) {

    output = 'Error: Invalid input or conversion.';

  }

  document.getElementById('output').value = output;

}

function copyOutput() {

  const output = document.getElementById('output');

  output.select();

  output.setSelectionRange(0, 99999); // For mobile

  navigator.clipboard.writeText(output.value).then(() => {

    const btn = document.getElementById('copyBtn');

    btn.textContent = 'Copied!';

    setTimeout(() => btn.textContent = 'Copy Output', 1500);

  });

}