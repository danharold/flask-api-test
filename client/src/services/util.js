function getAuthToken() {
    return document.cookie
        .split('; ')
        .find((row) => row.startsWith('auth-token'))
        ?.split('=')
}

export default getAuthToken;