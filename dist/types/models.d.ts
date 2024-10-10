import { Arrays } from "helpers";
/** A Nexus authorization session */
export interface InitiatedSession {
    /** The session URL */
    url: string;
    /** The session expiry date */
    expiresAt: string;
}
/** Subject types */
export declare enum SubjectTypes {
    Roblox = 0,
    Discord = 1
}
/** a roblox linked account */
export interface RobloxAccount {
    id: string;
    linkedAt: string;
}
/** A Nexus account */
export interface Account {
    discord: string;
    roblox: RobloxAccount[];
    createdAt: string;
}
/** Bulk Nexus accounts */
export type BulkAccounts = Record<string, Arrays.AtLeast<Account> | Account | null>;
