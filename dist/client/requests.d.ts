import { Logger } from "helpers";
import { Errors } from "@nexus/helpers";
export declare const logger: Logger;
export declare class Requests {
    private key?;
    protected rawErrors: boolean;
    protected base: string;
    constructor(config?: Config);
    protected request<M>(method: Methods, path: string, options?: Options): Promise<ResolvedResponse<M>>;
    protected handle<M>(response: ResolvedResponse<M>): ResolvedResponse<M> & {
        ok: true;
    };
}
export type Config = {
    key?: string;
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
    version?: 1;
    key?: true;
    body?: Record<string, any>;
    params?: Record<string, any>;
};
export {};
