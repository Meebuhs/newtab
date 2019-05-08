import { IState, reducer } from 'reducers/newtab'
import { createStore } from 'redux'
import { loadState, saveState } from 'store/localStorage'

const persistedState = loadState();
const store = createStore<IState, any, any, any>(
    reducer,
    persistedState
);

store.subscribe(() => {
    saveState({
        grid: store.getState().grid,
    });
});

export default store
