export function getPosts() {
    return fetch('/api/posts')
        .then(data => data.json())
}

export function getUserInfo(username) {
    return fetch('/api/users/'+username)
        .then(data => data.json())
}