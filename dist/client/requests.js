import { AppError, Logger } from "helpers";
import { Errors } from "@nexus/helpers";
/** Nexus service logger */
export const logger = new Logger("Nexus");
/** The Nexus service requests handler */
export class Requests {
    /** The Nexus API key */
    key;
    /** Whether to throw `APIError`s instead of `AppError`s */
    rawErrors = false;
    /** The Nexus API base URL */
    base = "nexus.tychosystems.xyz/api";
    constructor(config) {
        this.key = config?.key;
        this.rawErrors = config?.rawErrors ?? false;
    }
    /** The heart of the API service, handles all requests to Nexus APIs */
    async request(
    /** The request's HTTP method */
    method, 
    /** The endpoint's path */
    path, 
    /** Additional HTTP and helper options */
    options = {}) {
        const endpoint = "https://" + this.base + `/v${options.version ?? 1}` + path;
        logger.info("client calling: " + endpoint);
        const request = new Request(options.params ? endpoint.concat("?" + new URLSearchParams(options.params)) : endpoint, {
            method,
            body: options.body
                ? JSON.stringify(options.body, (_, value) => typeof value === "bigint" ? Number(value) : value)
                : undefined,
        });
        request.headers.set("CONTENT-TYPE", "application/json");
        request.headers.set("ACCEPT", "*/*");
        request.headers.set("USER-AGENT", "Mozilla/5.0 (Linux x86_64)");
        if (options.key === true) {
            if (!this.key)
                throw new AppError({
                    code: "UNAUTHORIZED",
                    context: "This endpoint requires authentication",
                });
            request.headers.set("AUTHORIZATION", this.key);
        }
        let response = (await fetch(request).catch((error) => {
            logger.error(error, "client");
            throw new AppError({
                code: "INTERNAL",
                context: "Nexus service encountered an internal error\nPlease try again shortly. `CLIENT` fetch failed.",
            });
        }));
        try {
            if (response.headers.get("CONTENT-TYPE")?.startsWith("application/json"))
                response.data = response.data ?? (await response.json());
        }
        catch (error) {
            logger.error(error, "client JSON parser");
        }
        return response;
    }
    /** Handles Nexus API responses, throws on error */
    handle(response) {
        if (response.ok)
            return response;
        if (this?.rawErrors) {
            if (!response.data.code || !response.data.message)
                throw Errors[0];
            else
                throw response.data;
        }
        else if (response.status === 429)
            throw new AppError({
                code: "TOO_MANY_REQUESTS",
                context: "Nexus service temporarily blocked\n%d",
            });
        else if (response.status >= 500)
            throw new AppError({
                code: "EXTERNAL",
                context: "Nexus service is unavailable\nPlease try again later.",
            });
        else {
            logger.error(response.data, "request handler, status " + response.status);
            throw new AppError({
                code: "UNKNOWN",
                context: "Nexus service has encountered an unexpected error\n" + (response.data?.message || "%d"),
            });
        }
    }
}
