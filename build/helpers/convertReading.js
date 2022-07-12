"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertReadingToWiegand = void 0;
const convertReadingToWiegand = (reading) => {
    // convertir de decima a hexadecimal despues sacar primeros 3 digitos y 5 digitos y convertir a decimal
    const strHexRead = parseInt(reading).toString(16);
    const threeNumsWiegand = parseInt(strHexRead.slice(0, 2), 16).toString();
    const fiveNumbsWiegand = parseInt(strHexRead.slice(2, 6), 16).toString();
    let wiegandNumber = threeNumsWiegand + fiveNumbsWiegand;
    if (wiegandNumber.length < 8)
        wiegandNumber = "0" + wiegandNumber;
    return wiegandNumber;
};
exports.convertReadingToWiegand = convertReadingToWiegand;
//# sourceMappingURL=convertReading.js.map