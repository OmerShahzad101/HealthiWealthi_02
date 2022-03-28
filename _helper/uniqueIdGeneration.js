exports.generateUniqueId = () => {
    const number = Date.now() + Math.floor(Math.random() * 100);
    return number.toString();
};
