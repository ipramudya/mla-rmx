import jsCookie from 'js-cookie'

export default class OrganizerTokenizing {
    public static setAccessToken(s: string) {
        // this.accessToken = s
        jsCookie.set('oat', s)
    }

    public static getAccessToken() {
        // return this.accessToken
        return jsCookie.get('oat') || ''
    }

    public static clearAccessToken() {
        // return (this.accessToken = '')
        jsCookie.remove('oat')
    }
}
