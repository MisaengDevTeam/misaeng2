export default function validateInput(arr: any[]): boolean {
  for (const item of arr) {
    if (item === '' || item === 0 || item === null || item === undefined) {
      return true;
    }
  }
  return false;
}
