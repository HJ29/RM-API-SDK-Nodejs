import { RMSDKInstance } from '.';
/**
 * Get client credential (Authentication)
 * will return null if clientId and clientSecret incorrect
 */
export declare function getClientCredentials(this: RMSDKInstance): Promise<any>;
/**
 * Refresh token
 */
export declare function refreshToken(this: RMSDKInstance, refreshToken: string): Promise<any>;
//# sourceMappingURL=credentials.d.ts.map