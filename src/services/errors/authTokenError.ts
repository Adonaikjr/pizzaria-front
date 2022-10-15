export class AuthTokenError extends Error{
    constructor() {
        super('Error de autenticacao no token.')
    }
}