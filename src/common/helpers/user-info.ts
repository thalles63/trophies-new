export class UserInfo {
    private static readonly authTokenKey = "token";

    public static isLoggedIn() {
        return !!localStorage.getItem(this.authTokenKey);
    }

    public static setLoginToken(token: string) {
        localStorage.setItem(this.authTokenKey, token);
    }

    public static clearLoginToken() {
        localStorage.removeItem(this.authTokenKey);
    }

    public static getToken() {
        return localStorage.getItem(this.authTokenKey);
    }
}
