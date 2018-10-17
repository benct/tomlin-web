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
export default function makeReducer(actions) {
    if (typeof actions !== 'object') {
        throw new Error('Failed to make reducer: No actions specified');
    }

    const reducerActions = Object.keys(actions)
        .filter(name => !!actions[name].reducer && !!actions[name].type)
        .reduce((last, name) => {
            last[name] = actions[name];
            return last;
        }, {});

    function reducer(state, action) {
        if (!state || typeof state !== 'object') {
            throw new Error('Failed to execute reducer: Missing state');
        } else if (!action || typeof action !== 'object' || !action.type) {
            throw new Error('Failed to execute reducer: Missing action');
        }

        const actionNames = Object.keys(reducerActions || {}).filter(actionName => actions[actionName].type === action.type);

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
