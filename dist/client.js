import { Requests } from "./client/requests.js";
import { AppError } from "helpers";
import { transform } from "./client/transform.js";
/** The Nexus service allows you to interact with the Nexus APIs */
export class Client extends Requests {
    constructor(config) {
        super(config);
    }
    /** Initiate an authorization session */
    async init(type, sub) {
        return await this.request("GET", "/init", {
            key: true,
            params: { type, sub },
        })
            .then((response) => this.handle(response).data)
            .then((session) => ({
            url: session.url,
            expiresAt: new Date(session.expiresAt),
        }));
    }
    /** Process an authorization callback */
    async process(code, state) {
        await this.request("POST", "/process", { body: { code, state } }).then((response) => this.handle(response));
    }
    /** Get a session's authorization URL */
    async session(code) {
        return await this.request("GET", "/session", { params: { code } }).then((response) => this.handle(response).data);
    }
    async single(type, sub) {
        return await this.request("GET", "/query", { key: true, params: { type, sub } })
            .then((response) => {
            if (!this.rawErrors && !response.ok && response.status === 404) {
                switch (response.data.code) {
                    case 1:
                        throw new AppError({
                            code: "NOT_FOUND",
                            context: `The Nexus account \` ${sub} \` was not found`,
                        });
                }
            }
            return this.handle(response).data;
        })
            .then((accounts) => {
            if (Array.isArray(accounts))
                return accounts.map(transform.account);
            else
                return transform.account(accounts);
        });
    }
    async bulk(type, sub) {
        return await this.request("GET", "/query/bulk", {
            key: true,
            params: { type, sub },
        })
            .then((response) => {
            if (!this.rawErrors && !response.ok && response.status === 404) {
                switch (response.data.code) {
                    case 1:
                        throw new AppError({
                            code: "NOT_FOUND",
                            context: `No Nexus account was found`,
                        });
                }
            }
            return this.handle(response).data;
        })
            .then((accounts) => {
            const map = new Map();
            for (const id in accounts) {
                const account = accounts[id];
                if (!account)
                    map.set(BigInt(id), null);
                else {
                    if (Array.isArray(account))
                        map.set(BigInt(id), account.map(transform.account));
                    else
                        map.set(BigInt(id), transform.account(account));
                }
            }
            return map;
        });
    }
}
export * as Models from "./types/models.js";
