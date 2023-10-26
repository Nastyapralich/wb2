export function generateSalePercent() {
  let randomNumber = Math.random();
  let result = Math.floor(randomNumber * (30 - 2 + 1)) + 2;
  return result;
}
