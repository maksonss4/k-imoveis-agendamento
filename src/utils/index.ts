export function fixedFloat(value: number) {
  return Number.parseFloat(value.toFixed(2));
}

export function newHour() {
  const time = new Date();
  const newTime = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
  console.log(newTime);
  return newTime;
}
