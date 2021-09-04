module.exports = {
    encode(info, secret) {
        // Header 头部 固定格式
        let header = this.base64UrlEscape(this.toBase64({typ: 'JWT', alg: 'HS256'}))
        // Payload 负载、载荷
        let content = this.base64UrlEscape(this.toBase64(info))
        // Signature 签名 对前两部分的签名，防止数据篡改
        let sign = this.signed(header + '.' + content, secret)
        return header + '.' + content + '.' + sign;
    },
    decode(token, secret) {
        let [header, content, sign] = token.split('.');
        let newSign = this.signed([header, content].join('.'), secret);
        if (sign === newSign) {
            return JSON.parse(Buffer.from(this.base64urlUnescape(content), 'base64').toString());
        } else {
            throw new Error('被篡改')
        }
    },
    signed(content, secret) {
        return this.base64UrlEscape(require('crypto').createHmac('sha256', secret).update(content).digest('base64'))
    },
    toBase64(content) {
        return Buffer.from(JSON.stringify(content)).toString('base64')
    },
    base64UrlEscape(content) {
        return content.replace(/\+/g, '-').replace(/=/g, '').replace(/\//g, '_');
    },
    base64urlUnescape(str) {
        str += new Array(5 - str.length % 4).join('=');
        return str.replace(/\-/g, '+').replace(/_/g, '/');
    }

}
