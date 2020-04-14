export function userJoined(users) {
    return {
        type: 'USER_JOINED',
        users: users
    }
}

export function userLeft(users) {
    return {
        type: 'USER_LEFT',
        users: users
    }
}
