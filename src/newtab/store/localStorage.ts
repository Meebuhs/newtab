import { IPersistedState } from "../reducers/newtab";

/**
 * Loads the persisted state from local storage.
 */
export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

/**
 * Saves the passed in state to local storage
 * @param {IPersistedState} state The persisted state to save
 */
export const saveState = (state: IPersistedState) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch {
        // ignore write errors
    }
};