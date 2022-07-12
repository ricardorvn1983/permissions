import { ModelValidateOptions } from "sequelize/types";
import { createLocalDateToUtc } from "../../helpers/toutc";


export const personFile: ModelValidateOptions = {
    isNumeric: {
        msg: 'User File is not numeric'
    },
    len: {
        args: [1,7],
        msg: "User File must have between 1 and 7 characters."
    }
}

export const startDate: ModelValidateOptions = {
    isDate: {
        args: true,
        msg: "start_date isn't a valid date."
    },
    isAfter:{
        args: createLocalDateToUtc(),
        msg: "start_date must be greater than the current date."
    }
}

export const endDate: ModelValidateOptions = {
    isDate: {
        args: true,
        msg: "end_date isn't a valid date."
    },
    isBeforeStartDate(value: string) {
        if (this.start_date as string >= value ) {
            throw new Error("end_date must be greater than the start_date");
        }
    } 
}