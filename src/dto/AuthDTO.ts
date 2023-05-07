export interface AuthDTO {
    login: string,
    permission: string[],
    iat: number,
    exp: number
}