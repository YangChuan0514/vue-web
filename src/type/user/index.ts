export interface LoginType{
    accountNumber: string;
    password: string;
}
export interface RegisterType {
    accountNumber: string;
    password: string;
    repetitionPassword: string;
}
export interface ChangePassWord {
    accountNumber: string;
    password: string;
    newPassword: string;
}
export interface Checkout {
    accountNumber: string;
    password: string;
    newPassword?: string;
    repetitionPassword?: string;
}