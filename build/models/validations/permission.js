"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.endDate = exports.startDate = exports.personFile = void 0;
const toutc_1 = require("../../helpers/toutc");
exports.personFile = {
    isNumeric: {
        msg: 'User File is not numeric'
    },
    len: {
        args: [1, 7],
        msg: "User File must have between 1 and 7 characters."
    }
};
exports.startDate = {
    isDate: {
        args: true,
        msg: "start_date isn't a valid date."
    },
    isAfter: {
        args: (0, toutc_1.createLocalDateToUtc)(),
        msg: "start_date must be greater than the current date."
    }
};
exports.endDate = {
    isDate: {
        args: true,
        msg: "end_date isn't a valid date."
    },
    isBeforeStartDate(value) {
        if (this.start_date >= value) {
            throw new Error("end_date must be greater than the start_date");
        }
    }
};
//# sourceMappingURL=permission.js.map