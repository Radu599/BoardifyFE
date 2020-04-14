export function gameGroup(state = [], action) {
    switch (action.type) {
        case 'USER_JOINED':
        case 'USER_LEFT':
            const us = action.users && action.users.length > 0 ? action.users : [];
            return us;z
        default:
    }

    return state;
}
