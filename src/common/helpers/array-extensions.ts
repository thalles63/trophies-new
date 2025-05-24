import { SortDirection } from "../enums/sort-direction.enum";
import { SortFieldAndDirection } from "../models/sort-field-and-direction.interface";

/* eslint-disable @typescript-eslint/no-explicit-any */
export {};

declare global {
    interface Array<T> {
        replaceOrUnshift: (item: T) => T[];
        sortByField: (fields: SortFieldAndDirection | SortFieldAndDirection[]) => T[];
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

Array.prototype.sortByField = function <T>(fields: SortFieldAndDirection | SortFieldAndDirection[]): Array<T> {
    if (!Array.isArray(fields)) {
        fields = [fields];
    }

    if (!fields.length) {
        return this;
    }

    const evaluators = mapArray(
        fields.map((f) => f.fieldName),
        makeStringEvaluator
    );

    evaluateItems(this, evaluators);

    this.sort(function (a: any, b: any) {
        const aValues = a.values;
        const bValues = b.values;

        for (let i = 0, len = evaluators.length; i < len; i++) {
            const descendingOrder = fields[i].direction === SortDirection.Descending;
            let comparation = 0;
            aValues[i] ??= "";
            bValues[i] ??= "";
            const aValue = aValues[i].toString();
            const bValue = bValues[i].toString();

            if (descendingOrder) {
                comparation = bValue.localeCompare(aValue, undefined, { numeric: true, sensitivity: "base" });
            } else {
                comparation = aValue.localeCompare(bValue, undefined, { numeric: true, sensitivity: "base" });
            }

            if (comparation) return comparation;
        }
        return 0;
    });

    revertArrayToOriginalState(this);
    return this;
};

function mapArray(items: string[], cb: any) {
    const mappedItems = [];

    for (const item of items) {
        const mapped = cb(item);
        mappedItems.push(mapped);
    }

    return mappedItems;
}

function makeStringEvaluator(input: any) {
    return {
        func: (item: any) => {
            return nestedProperty(item, input);
        },
        invert: false
    };
}

function nestedProperty(obj: any, path: any) {
    if (path === "") return obj;
    path = path.split(".");
    let current = obj;

    while (path.length) {
        let nextKey = path.shift();
        let args: any = "";

        if (/[^(\r\n]*\([^(\r\n]*\)$/.test(nextKey)) {
            const indexOfOpenParenthesis = nextKey.indexOf("(");
            args = JSON.parse(`[${nextKey.slice(indexOfOpenParenthesis + 1, -1)}]`);
            nextKey = nextKey.slice(0, indexOfOpenParenthesis);
        }

        if (args) {
            // eslint-disable-next-line prefer-spread
            current = current[nextKey].apply(current, args);
        } else {
            current = current[nextKey];
        }

        if (current === null) return null;
    }

    return current;
}

function evaluateItems(input: any, evaluators: any) {
    for (let i = 0, len = input.length; i < len; i++) {
        const item = input[i];
        input[i] = {
            item: item,
            values: mapArray(evaluators, (evaluator: any) => {
                return evaluator.func(item);
            })
        };
    }
}

function revertArrayToOriginalState(input: any) {
    for (let i = 0, len = input.length; i < len; i++) {
        input[i] = input[i].item;
    }
}
