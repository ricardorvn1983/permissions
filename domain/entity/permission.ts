export interface Permission_Type {
    person_file : string,
    start_date: string,
    end_date: string,
    permission_type_id: number,
    line_id: number,
    person_sign: string,
    person_sign_date: string,
    authorizer_sign: string,
    trh_checkin: string,
    trh_checkout:  string,
    security_checkin: string,
    security_checkout: string, 
    concept_id: number,
    motive_id:  number,
    declared_motive: string,
    payment_type_id: number,
    permission_status_id:  number
}