export function getPosts() {
    return fetch('/api/posts')
        .then(data => data.json())
}