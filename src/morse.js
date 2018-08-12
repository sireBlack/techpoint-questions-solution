const MORSE_CODE = {
  '-.-.--': '!',
  '.-..-.': '"',
  '...-..-': '$',
  '.-...': '&',
  '.----.': "'",
  '-.--.': '(',
  '-.--.-': ')',
  '.-.-.': '+',
  '--..--': ',',
  '-....-': '-',
  '.-.-.-': '.',
  '-..-.': '/',
  '-----': '0',
  '.----': '1',
  '..---': '2',
  '...--': '3',
  '....-': '4',
  '.....': '5',
  '-....': '6',
  '--...': '7',
  '---..': '8',
  '----.': '9',
  '---...': ':',
  '-.-.-.': ';',
  '-...-': '=',
  '..--..': '?',
  '.--.-.': '@',
  '.-': 'A',
  '-...': 'B',
  '-.-.': 'C',
  '-..': 'D',
  '.': 'E',
  '..-.': 'F',
  '--.': 'G',
  '....': 'H',
  '..': 'I',
  '.---': 'J',
  '-.-': 'K',
  '.-..': 'L',
  '--': 'M',
  '-.': 'N',
  '---': 'O',
  '.--.': 'P',
  '--.-': 'Q',
  '.-.': 'R',
  '...': 'S',
  '-': 'T',
  '..-': 'U',
  '...-': 'V',
  '.--': 'W',
  '-..-': 'X',
  '-.--': 'Y',
  '--..': 'Z',
  '..--.-': '_',
  '...---...': 'SOS',
};

Object.freeze(MORSE_CODE);

/**
 * This is the entry point to the program.
 *
 * @param {string} morseCode The string to decode.
 */
function decodeMorse(morseCode) {
  // Your code should go here.

  /**
   * Since every word in the encoded string is splitted by 3 spaces, it checks for every 3 spaces and  splits the morseCode into words...
   */
  var words = (morseCode).split('   ');
  
/**
 * Since every letter in a word is splitted by one space, it checks for every single spaces and splits them into letters
 */
  var letters = words.map((w) => w.split(' '));

  // An empty array to save the decoded string
  var decoded = [];

  /**
   * traverse every letter
   */
  for(var i = 0; i < letters.length; i++){
    // Initialize an empty array to save the equivalent english letter for every 
    decoded[i] = [];
    for(var x = 0; x < letters[i].length; x++){
        if(MORSE_CODE[letters[i][x]]){
            decoded[i].push(MORSE_CODE[letters[i][x]]);
        }
    }
  }
  return (decoded.map((arr) => arr.join('')).join(' ')).trim();
}

module.exports = decodeMorse;
