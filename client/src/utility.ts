import ColorHash from 'color-hash';

export default class Utility {
  public static color(seed: number, type: number) {
    return typeof seed === typeof undefined ?
      '' :
      this.colorHash.hex(String(seed + type * 1000));
  }

  public static pad(n: number, len = 2) {
    const str = String(n);
    if (str.length < len) {
      return Array(len - str.length + 1).join('0') + str;
    } else {
      return str;
    }
  }

  private static colorHash = new ColorHash({lightness: 0.7});
}
