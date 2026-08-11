/**
 * Genera un JWT con forma válida (header.payload.signature en base64url) para el demo.
 * JwtHelperService (@auth0/angular-jwt) solo decodifica el payload y compara `exp`,
 * no verifica la firma, por lo que basta con un token bien formado sin backend real.
 */
function base64url(input: object): string {
    const json = JSON.stringify(input);
    const base64 = btoa(unescape(encodeURIComponent(json)));
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function createFakeJwt(payload: Record<string, any>, hoursValid: number): string {
    const header = { alg: 'HS256', typ: 'JWT' };
    const now = Math.floor(Date.now() / 1000);
    const fullPayload = { ...payload, iat: now, exp: now + hoursValid * 3600 };
    const signature = base64url({ demo: true, ts: now });
    return `${base64url(header)}.${base64url(fullPayload)}.${signature}`;
}
