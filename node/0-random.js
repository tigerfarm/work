function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

console.log(getRndInteger(100,200));
console.log(getRndInteger(100000, 999999));