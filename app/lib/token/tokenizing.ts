import jsCookie from 'js-cookie'

export default class Tokenizing {
    // private static accessToken: string = jsCookie.get('at') || ''

    public static setAccessToken(s: string) {
        // this.accessToken = s
        jsCookie.set('at', s)
    }

    public static getAccessToken() {
        // return this.accessToken
        return jsCookie.get('at') || ''
    }

    public static clearAccessToken() {
        // return (this.accessToken = '')
        jsCookie.remove('at')
    }
}
