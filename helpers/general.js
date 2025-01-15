module.exports.CreateStringRamdom = (length) => {
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (var i= 0 ; i <length ;i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}


module.exports.CreateNumberRamdom = (length) => {
    const characters = "0123456789";
    let result = "";
    for (var i= 0 ; i <length ;i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}