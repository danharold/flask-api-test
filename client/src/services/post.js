export function getPosts() {
    return fetch('http://localhost:5000/api/posts')
        .then(data => data.json())
}