
// check this def: https://en.wikipedia.org/wiki/RSA_(algorithm)

// note

// to test it on node.js repl:
// .load ./rsa.js

// see https://en.wikipedia.org/wiki/Euclidean_algorithm
var gcd = function gcd(a, b) {
  if (a > b)        return gcd(a-b, b);
  else if (a < b)   return gcd(a, b-a);
  else              return a; // trivial case, a === b
};

var isCoprime = function(a, b) {
  return gcd(a, b) === 1;
};

var getCoprimes = function(a) {
  var coprimes = [];
  for (var c = 1; c < a; c++) {
    if (isCoprime(a, c)) coprimes.push(c);
  }
  return coprimes;
};

var isPrime = function isPrime(a) {
  var top = Math.floor(a * 0.5) + 1;
  for (var c = 2; c <= top; c++) {
    if (a % c === 0) return false;
  }
  return true;
};

// get Modular Multiplicative inverse
// https://en.wikipedia.org/wiki/Modular_multiplicative_inverse
var getMMI = function getMMI(a, modulo) {
  for (var c = a; c <= modulo; c++) {
    if ( (a*c) % modulo === 1 ) return c;
  };
  return null;
};

// see https://en.wikipedia.org/wiki/Modular_exponentiation
// this function should just return Math.pow(base, exp) % modulo;
// but Javascript can't seem to handle this
var modPow = function modPow(base, exp, modulo) {

  var loop = function(exp) {
    if (exp === 1) return base % modulo;
    else           return (base * loop(exp-1)) % modulo;
    // return exp === 0 ? 1 : (base * loop(exp-1)) % modulo;
  };

  return loop(exp);

};

// modPow, non-recursive version
var _modPow = function _modPow(base, exp, modulo) {
  var ret = 1;
  for (var c = 1; c <= exp; c++) {
    ret = (base * ret) % modulo;
  };
  return ret;
};
