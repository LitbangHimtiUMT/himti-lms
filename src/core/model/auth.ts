export interface AuthLoginModel {
    access_token?: string
}

export interface AuthLoginDTO {
    email: string,
    password: string
}

export interface AuthRegisterDTO {
    name: string,
    email: string,
    password: string
    confirmPassword: string
}