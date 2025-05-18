/* eslint-disable @typescript-eslint/no-explicit-any */
export {};

declare global {
    interface Array<T> {
        replaceOrUnshift: (item: T) => T[];
        sortByField: (property: string) => T[];
    }
}

Array.prototype.replaceOrUnshift = function <T>(item: Record<string, any>): Array<T> {
    const index = this.map((m) => m.index).indexOf(item["index"]);

    if (index >= 0) {
        this[index] = item;
    } else {
        this.unshift(item);
    }

    return this;
};

Array.prototype.sortByField = function (property: string, order = "desc") {
    const copy = [...this];

    return copy.sort((a, b) => {
        if (a[property] === undefined || b[property] === undefined) {
            return 0;
        }

        let comparison = 0;

        if (a[property] > b[property]) {
            comparison = 1;
        } else if (a[property] < b[property]) {
            comparison = -1;
        }

        return order === "desc" ? comparison * -1 : comparison;
    });
};
