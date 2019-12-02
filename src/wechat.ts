import crypto = require('crypto')
import { RMSDKInstance } from "."
import { generateSignature, sortObject } from "./signature"

export function getWechatOauthUrl(this: RMSDKInstance, accessToken: string, redirectUrl: string) {
    const nonceStr = crypto.randomBytes(32).toString('hex')
    const timestamp = new Date().getTime().toString()
    const data = {
        redirectUrl,
        scope: 'snsapi_userinfo'
    }

    return this.openApiInstance({
        url: '/socialmedia/rm/wechat-oauth/url',
        method: 'post',
        data: sortObject(data),
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-Timestamp': timestamp,
            'X-Nonce-Str': nonceStr,
            'X-Signature': 'sha256 ' + generateSignature({
                data,
                requestUrl: this.openApiUrl + '/socialmedia/rm/wechat-oauth/url',
                nonceStr,
                signType: 'sha256',
                method: 'post',
                timestamp,
            }, this.privateKey)
        },
    })
}

export function getWechatUserByCode(this: RMSDKInstance, accessToken: string, code: string) {
    const nonceStr = crypto.randomBytes(32).toString('hex')
    const timestamp = new Date().getTime().toString()
    const data = { code }

    return this.openApiInstance({
        url: 'socialmedia/rm/wechat-oauth/code',
        method: 'post',
        data: sortObject(data),
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'X-Timestamp': timestamp,
            'X-Nonce-Str': nonceStr,
            'X-Signature': 'sha256 ' + generateSignature({
                data,
                requestUrl: this.openApiUrl + '/socialmedia/rm/wechat-oauth/code',
                nonceStr,
                signType: 'sha256',
                method: 'post',
                timestamp,
            }, this.privateKey)
        }
    })
}