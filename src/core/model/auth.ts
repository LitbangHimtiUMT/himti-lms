export interface AuthLoginModel {
    accessToken?: string
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