import store from '../redux/store.js';
import actions from '../redux/actions.js';

export default function toast(message) {
    store.dispatch(actions.showToast(message));
}
