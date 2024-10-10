import { Logger } from "helpers";
import { Errors } from "@nexus/helpers";
/** Nexus service logger */
export declare const logger: Logger;
/** The Nexus service requests handler */
export declare class Requests {
    /** The Nexus API key */
    private key?;
    /** Whether to throw `APIError`s instead of `AppError`s */
    protected rawErrors: boolean;
    /** The Nexus API base URL */
    protected base: string;
    constructor(config?: Config);
    /** The heart of the API service, handles all requests to Nexus APIs */
    protected request<M>(
    /** The request's HTTP method */
    method: Methods, 
    /** The endpoint's path */
    path: string, 
    /** Additional HTTP and helper options */
    options?: Options): Promise<ResolvedResponse<M>>;
    /** Handles Nexus API responses, throws on error */
    protected handle<M>(response: ResolvedResponse<M>): ResolvedResponse<M> & {
        ok: true;
    };
}
export type Config = {
    /** The Nexus API key */
    key?: string;
    /** Whether to throw `APIError`s instead of `AppError`s */
    rawErrors?: true;
};
type Methods = "GET" | "POST";
type ResolvedResponse<Model = any> = (Response & {
    ok: true;
    data: Model;
}) | (Response & {
    ok: false;
    data: {
        code: keyof typeof Errors;
        message: string;
    };
});
type Options = {
    /** The API version to use */
    version?: 1;
    /** Whether this endpoint requires authorization */
    key?: true;
    /** JSON request body */
    body?: Record<string, any>;
    /** Query string parameters */
    params?: Record<string, any>;
};
export {};
