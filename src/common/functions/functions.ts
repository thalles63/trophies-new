export function SanitizeEmptyStrings(params: any) {
    if (!params) {
        return params;
    }

    for (const key of Object.keys(params)) {
        if (params[key] === "" || params[key] === null || params[key] === undefined) {
            delete params[key];
        } else if (typeof params[key] === "object") {
            params[key] = SanitizeEmptyStrings(params[key]);
        }
    }

    return Array.isArray(params) ? params.filter((val: any) => val) : params;
}
