import { Account, SubjectTypes } from "@nexus/helpers";
import { Config, Requests } from "./client/requests.js";
import { Arrays } from "helpers";
export declare class Client extends Requests {
    constructor(config?: Config);
    init(type: SubjectTypes, sub: bigint): Promise<{
        url: string;
        expiresAt: Date;
    }>;
    process(code: string, state: string): Promise<void>;
    session(code: string): Promise<string>;
    single(type: SubjectTypes.Roblox, sub: bigint): Promise<Arrays.AtLeast<Account>>;
    single(type: SubjectTypes.Discord, sub: bigint): Promise<Account>;
    bulk(type: SubjectTypes.Roblox, sub: Arrays.AtLeast<bigint>): Promise<Map<bigint, Arrays.AtLeast<Account>>>;
    bulk(type: SubjectTypes.Discord, sub: Arrays.AtLeast<bigint>): Promise<Map<bigint, Account>>;
}
export * as Models from "./types/models.js";
