import { Account, SubjectTypes } from "@nexus/helpers";
import { Config, Requests } from "./client/requests.js";
import { Arrays } from "helpers";
/** The Nexus service allows you to interact with the Nexus APIs */
export declare class Client extends Requests {
    constructor(config?: Config);
    /** Initiate an authorization session */
    init(type: SubjectTypes, sub: bigint): Promise<{
        /** The session URL */
        url: string;
        /** The session expiry date */
        expiresAt: Date;
    }>;
    /** Process an authorization callback */
    process(code: string, state: string): Promise<void>;
    /** Get a session's authorization URL */
    session(code: string): Promise<string>;
    /** Query a single Nexus account */
    single(type: SubjectTypes.Roblox, sub: bigint): Promise<Arrays.AtLeast<Account>>;
    single(type: SubjectTypes.Discord, sub: bigint): Promise<Account>;
    /** Query multiple Nexus accounts */
    bulk(type: SubjectTypes.Roblox, sub: Arrays.AtLeast<bigint>): Promise<Map<bigint, Arrays.AtLeast<Account>>>;
    bulk(type: SubjectTypes.Discord, sub: Arrays.AtLeast<bigint>): Promise<Map<bigint, Account>>;
}
export * as Models from "./types/models.js";
