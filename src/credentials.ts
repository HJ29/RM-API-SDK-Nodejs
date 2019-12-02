import { Buffer } from 'buffer';
import { RMSDKInstance } from '.';

/**
 * Get client credential (Authentication)
 * will return null if clientId and clientSecret incorrect
 */
export function getClientCredentials(this: RMSDKInstance) {
    const basic = this.clientId + ':' + this.clientSecret
    const basic_signature = Buffer.from(basic).toString('base64')

    return this.oauthInstance({
        url: '/token',
        method: 'post',
        data: { grantType: 'client_credentials' },
        headers: { 'Authorization': 'Basic ' + basic_signature },
    })
}

/**
 * Refresh token
 */
export function refreshToken(this: RMSDKInstance, refreshToken: string) { 
    const basic = this.clientId + ':' + this.clientSecret
    const basic_signature = Buffer.from(basic).toString('base64')

    return this.oauthInstance({
        url: 'token',
        method: 'post',
        data: {
            grantType: "refresh_token",
            refreshToken, 
        },
        headers: { 'Authorization': 'Basic ' + basic_signature },
    })
}
