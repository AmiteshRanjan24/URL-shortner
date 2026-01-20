const CHARS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function encodeBase62(num) {
  if (num === 0) return CHARS[0];
  let res = "";
  while (num > 0) {
    res = CHARS[num % 62] + res;
    num = Math.floor(num / 62);
  }
  return res;
}
