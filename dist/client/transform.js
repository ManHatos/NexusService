export const transform = {
    account(account) {
        return {
            discord: BigInt(account.discord),
            roblox: account.roblox.map((roblox) => ({
                id: BigInt(roblox.id),
                linkedAt: new Date(roblox.linkedAt),
            })),
            createdAt: new Date(account.createdAt),
        };
    },
};
