import ColorHash from 'color-hash';

export default class Utility {
  public static color(seed?: string) {
    return seed == null ? '' : this.colorHash.hex(seed);
  }

  public static pad(n: number, len = 2) {
    const str = String(n);
    if (str.length < len) {
      return Array(len - str.length + 1).join('0') + str;
    } else {
      return str;
    }
  }

  private static colorHash = new ColorHash({lightness: 0.6, saturation: 0.95});
}
