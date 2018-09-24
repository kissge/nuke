declare module 'color-hash' {

    /**
     * Color Hash Class
     *
     * @class
     */
    class ColorHash {
        constructor(option?: any);

        /**
         * Returns the hash in [h, s, l].
         * Note that H ∈ [0, 360); S ∈ [0, 1]; L ∈ [0, 1];
         *
         * @param {String} str string to hash
         * @returns {Array} [h, s, l]
         */
        public hsl(str: string): [number, number, number];

        /**
         * Returns the hash in [r, g, b].
         * Note that R, G, B ∈ [0, 255]
         *
         * @param {String} str string to hash
         * @returns {Array} [r, g, b]
         */
        public rgb(str: string): [number, number, number];

        /**
         * Returns the hash in hex
         *
         * @param {String} str string to hash
         * @returns {String} hex with #
         */
        public hex(str: string): string;
    }

    namespace ColorHash {}
    export = ColorHash;
}
