import { AnyAction, Reducer } from 'redux';

export interface Actions {
    [key: string]: any;
}

/**
 * Takes an object consisting of action definitions as defined by makeAction, and returns a reducer function that handles all these actions
 *
 * @example
 * const actions = {
 *   action1: makeAction('ACTION_1'),
 *   action2: makeAction('ACTION_2'),
 * };
 * const reducer = makeReducer(actions);
 *
 * @param actions
 * @returns {reducer}
 * @see {@link makeAction.js}
 */
export default function makeReducer<T>(actions: Actions): Reducer {
    if (typeof actions !== 'object') {
        throw new Error('Failed to make reducer: No actions specified');
    }

    const reducerActions: Actions = Object.keys(actions)
        .filter((name: string): boolean => !!actions[name].reducer && !!actions[name].type)
        .reduce((acc: Actions, name: string): Actions => {
            acc[name] = actions[name];
            return acc;
        }, {});

    function reducer(state: T, action: AnyAction): T {
        if (!state || typeof state !== 'object') {
            throw new Error('Failed to execute reducer: Missing state');
        } else if (!action || typeof action !== 'object' || !action.type) {
            throw new Error('Failed to execute reducer: Missing action');
        }

        const actionNames = Object.keys(reducerActions || {}).filter(
            (actionName: string): boolean => actions[actionName].type === action.type
        );

        if (actionNames.length === 1) {
            return reducerActions[actionNames[0]].reducer(state, action);
        } else if (actionNames.length === 0) {
            return state;
        } else {
            // Could also run each reducer sequentially instead of giving up
            throw new Error(`Action type "${action.type}" has multiple reducers - giving up`);
        }
    }
    reducer.actions = Object.keys(reducerActions);
    return reducer;
}
