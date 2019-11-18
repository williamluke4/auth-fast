interface LoginAuth {
    key: string;
    identifier: string;
}
interface Auth extends LoginAuth {
    challengeId: string;
    secret?: string;
    oth: string;
}
interface Data {
    status: number;
    success: Boolean;
    fast_id: unknown;
    challenge_ip: string;
    challenge_ts: string;
}
export declare function verify({ key, identifier, challengeId, secret, oth }: Auth): Promise<Data>;
export declare function login({ identifier, key }: LoginAuth): Promise<void>;
interface AuthResult {
    identifier: string;
    oth: string;
    challengeId: string;
}
export declare function getParams(url_string: string): AuthResult | null;
export {};
