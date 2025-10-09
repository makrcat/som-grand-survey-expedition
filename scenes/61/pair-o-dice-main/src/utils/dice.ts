export function rollDice(quantity: number, sides: number): number[] {
  const res: number[] = [];
  for (let i = 0; i < quantity; i++) {
    res.push(1 + Math.floor(Math.random() * sides));
  }
  return res;
}

export function sum(nums: number[]): number {
  return nums.reduce((a, b) => a + b, 0);
}

export function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}