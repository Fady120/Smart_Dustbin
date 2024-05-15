import { Theme_Change } from "./Constants";

const initialState = {
    moede: 'light'
};

const themeReducer = (state = initialState, action) => {
    switch (action.type) {
        case Theme_Change:
            return {
                ...state,
                mode: action.payload
            }
        default:
            return state;
    }
}

export default themeReducer;