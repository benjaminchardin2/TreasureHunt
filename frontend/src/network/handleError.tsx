export function getError(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}