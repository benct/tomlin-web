/**
 * Takes an action type, a reducer, and optionally an action creator, and returns an action creator with the type and reducer attached.
 *
 * A collection of action creators can be passed to [makeReducer()]{@link makeReducer.js} to automatically generate a reducer.
 *
 * The reducer can be either a function or a string. Reducer functions have the normal reducer signature: (state, action) => newState
 * If a string is provided instead, a simple reducer will be generated automatically which will return a new state where a field named
 * after the provided string will be set to the value of action.payload. The default reducer has no effect.
 *
 * The default action creator function will return an action that takes one optional argument: The value of the `payload` field
 *
 * @example
 * // Example usage:
 * myAction = makeAction('MY_ACTION', (state, action) => Object.assign({}, state, { result: action.payload });
 * dispatch(myAction('myValue'));
 *
 * // Passing a string as the reducer:
 * myAction = makeAction('ACTION_TYPE', 'myStateFieldName');
 * myAction.reducer({}, 'myStateFieldValue'); // Returns: { myStateFieldName: 'myStateFieldValue' }
 *
 * @param type {String} The action type
 * @param reducer {Function|String} A reducer function, or the name of a field in the state that this action will affect
 * @param creator {Function} An action creation function
 *
 * @return {Function} An action creation function
 * @see {@link makeReducer.js}
 */
export default function makeAction(type, reducer, creator = payload => ({ type, payload })) {
    if (!type || !reducer) {
        throw new Error('A type and a reducer is required');
    }

    const action = creator;
    action.type = type;

    if (typeof reducer === 'string') {
        action.reducer = (state, a) => Object.assign({}, state, { [reducer]: a.payload });
    } else {
        action.reducer = reducer;
    }

    return action;
}
