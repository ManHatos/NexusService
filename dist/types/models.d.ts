import { Arrays } from "helpers";
export interface InitiatedSession {
    url: string;
    expiresAt: string;
}
export declare enum SubjectTypes {
    Roblox = 0,
    Discord = 1
}
export interface RobloxAccount {
    id: string;
    linkedAt: string;
}
export interface Account {
    discord: string;
    roblox: RobloxAccount[];
    createdAt: string;
}
export type BulkAccounts = Record<string, Arrays.AtLeast<Account> | Account | null>;
