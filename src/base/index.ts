
export function type(val) {
  return Object.prototype.toString.call(val).slice(8, -1).toLowerCase();
}