const binaryForm = document.getElementById('binary-form');
const decimalForm = document.getElementById('decimal-form');
const decimalOutput = document.getElementById('decimal-output');
const binaryOutput = document.getElementById('binary-output');

binaryForm.addEventListener('submit', e => {
  e.preventDefault();
  const binaryInput = document.getElementById('binary-input').value;
  const sanitizedBinaryInput = binaryInput.replace(/\s/g, ''); // remove spaces
  const binary = sanitizedBinaryInput.padStart(32, '0'); // pad leading 0s
  const sign = binary.charAt(0) === '0' ? 1 : -1;
  const exponentBinary = binary.substr(1, 8);
  const mantissaBinary = binary.substr(9, 23);
  const exponentDecimal = parseInt(exponentBinary, 2) - 127;
  let mantissaDecimal = 0;

  for (let i = 0; i < mantissaBinary.length; i++) {
    mantissaDecimal += parseInt(mantissaBinary.charAt(i)) * Math.pow(2, -(i + 1));
  }

  const decimal = sign * Math.pow(2, exponentDecimal) * (1 + mantissaDecimal);
  decimalOutput.innerHTML = decimal.toString();
});

decimalForm.addEventListener('submit', e => {
  e.preventDefault();
  const decimalInput = document.getElementById('decimal-input').value;
  const decimal = parseFloat(decimalInput);
  let sign = decimal < 0 ? 1 : 0;
  let absDecimal = Math.abs(decimal);
  let integerPartBinary = '';
  let fractionalPartBinary = '';

  if (absDecimal >= 1) {
    integerPartBinary = Math.floor(absDecimal).toString(2);
    absDecimal -= Math.floor(absDecimal);
  } else {
    integerPartBinary = '0';
  }

  for (let i = 0; i < 23; i++) {
    absDecimal *= 2;
    if (absDecimal >= 1) {
      fractionalPartBinary += '1';
      absDecimal -= 1;
    } else {
      fractionalPartBinary += '0';
    }
  }

  const exponent = (integerPartBinary.length - 1) + 127;
  const exponentBinary = exponent.toString(2).padStart(8, '0');
  const mantissaBinary = integerPartBinary.substr(1) + fractionalPartBinary;
  const mantissaPaddedBinary = mantissaBinary.padEnd(23, '0');
  const binary = sign.toString() + exponentBinary + mantissaPaddedBinary;
  binaryOutput.innerHTML = binary;
});

  
