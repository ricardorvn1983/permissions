"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTimeToDate = void 0;
const addTimeToDate = (date, minutes) => {
    const timeInMilliseconds = minutes * 60 * 1000;
    const dateMod = new Date(date);
    dateMod.setTime(dateMod.getTime() + (timeInMilliseconds));
    return dateMod;
};
exports.addTimeToDate = addTimeToDate;
//# sourceMappingURL=addTimeToDate.js.map