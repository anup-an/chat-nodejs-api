export const pascalToSnakeCase = (input: string): string => {
    return input
        .split(/(?=[A-Z])/)
        .join('_')
        .toLowerCase();
};


export const omitFields = <T extends object>(inputObject: T, keys: (keyof T)[]) => {
    return Object.keys(inputObject).reduce((acc: Partial<T>, value) => {
        return keys.includes(value as keyof T) ? acc : {...acc, [value]: inputObject[value as keyof T]}
    }, {})
}