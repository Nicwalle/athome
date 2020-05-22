export default class HueAPI {

    constructor(bridge) {
    }

    /**
     * Source: https://stackoverflow.com/questions/22894498/philips-hue-convert-xy-from-api-to-hex-or-rgb
     * @param x
     * @param y
     * @param bri
     * @returns {string}: rgb(R, G, B)
     */
    xyBriToRgb = (x, y, bri) => {
        let z = 1.0 - x - y;
        let Y = bri / 255.0; // Brightness of lamp
        let X = (Y / y) * x;
        let Z = (Y / y) * z;
        let r = X * 1.612 - Y * 0.203 - Z * 0.302;
        let g = -X * 0.509 + Y * 1.412 + Z * 0.066;
        let b = X * 0.026 - Y * 0.072 + Z * 0.962;
        r = r <= 0.0031308 ? 12.92 * r : (1.0 + 0.055) * Math.pow(r, (1.0 / 2.4)) - 0.055;
        g = g <= 0.0031308 ? 12.92 * g : (1.0 + 0.055) * Math.pow(g, (1.0 / 2.4)) - 0.055;
        b = b <= 0.0031308 ? 12.92 * b : (1.0 + 0.055) * Math.pow(b, (1.0 / 2.4)) - 0.055;
        let maxValue = Math.max(r, g, b);
        r /= maxValue;
        g /= maxValue;
        b /= maxValue;
        r = r * 255;   if (r < 0) { r = 255 }
        g = g * 255;   if (g < 0) { g = 255 }
        b = b * 255;   if (b < 0) { b = 255 }
        return `rgb(${r},${g},${b})`
    };

    /**
     * Converts RGB color to X Y BRI color for philips hue
     * @param r
     * @param g
     * @param b
     * @returns {{x: number, bri: number, y: number}}
     */
    rgbToXYBri = (r, g, b) => {
        r = r / 255;
        g = g / 255;
        b = b / 255;
        r = (r > 0.04045) ? Math.pow((r + 0.055) / (1.0 + 0.055), 2.4) : (r / 12.92);
        g = (g > 0.04045) ? Math.pow((g + 0.055) / (1.0 + 0.055), 2.4) : (g / 12.92);
        b = (b > 0.04045) ? Math.pow((b + 0.055) / (1.0 + 0.055), 2.4) : (b / 12.92);
        const X = r * 0.649926 + g * 0.103455 + b * 0.197109;
        const Y = r * 0.234327 + g * 0.743075 + b * 0.022598;
        const Z = g * 0.053077 + b * 1.035763;
        const xyzSum = X + Y + Z;
        const x = xyzSum !== 0 ? X / xyzSum : 0;
        const y = xyzSum !== 0 ? Y / xyzSum : 0;
        return {
            x: x,
            y: y,
            bri: Math.round(Y * 255)
        }
    };
}
