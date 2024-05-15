import { Theme_Change } from "./Constants";

export const switchMode = (mode) => {
    return {
        type: Theme_Change,
        payload: mode,
    };
};