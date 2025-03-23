export const inputTypes = {
    EMAIL: "EMAIL",
    USERNAME: "USERNAME",
    PASSWORD: "PASSWORD",
    CONFIRM_PASSWORD: "CONFIRM_PASSWORD",
} as const;

type InputKeys = keyof typeof inputTypes;

export type inputTypesInterface = {
    [K in InputKeys]: string;
};

export const emptyInputTypes: inputTypesInterface = {
    EMAIL: "",
    USERNAME: "",
    PASSWORD: "",
    CONFIRM_PASSWORD: "",
} as const;

type Keys = keyof typeof inputTypes;

export function toInputKey(input: string): InputKeys | undefined {
    return Object.keys(inputTypes).find((key) => inputTypes[key as InputKeys] === input) as InputKeys | undefined;
}

// let newTypes: inputTypesInterface = emptyInputTypes;
// let type = 'EMAIL';
// let key = stringToKey(type);
