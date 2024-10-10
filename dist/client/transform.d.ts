import { Account } from "@nexus/helpers";
import { Nexus } from "../nexus.js";
/** Transform API responses */
export declare const transform: {
    /** Transform a Nexus account */
    account(account: Nexus.Models.Account): Account;
};
