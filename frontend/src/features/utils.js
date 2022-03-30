export function getUserFromLocalStorage() {
    const userInfoFromLocalStorage = localStorage.getItem("user");
    let userInfoParsed;
    if(userInfoFromLocalStorage) {
        userInfoParsed = JSON.parse(userInfoFromLocalStorage);
    }
    return userInfoParsed;
}
