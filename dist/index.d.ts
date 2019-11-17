interface LoginAuth {
    key: string;
    identifier: string;
}
interface Auth extends LoginAuth {
    challengeId: string;
    secret?: string;
    oth: string;
}
export declare function authorize({ key, identifier, challengeId, secret, oth }: Auth): Promise<void>;
export declare function login({ identifier, key }: LoginAuth): Promise<void>;
interface AuthResult {
    identifier: string;
    oth: string;
    challengeId: string;
}
export declare function getParams(url_string: string): AuthResult | null;
export {};
