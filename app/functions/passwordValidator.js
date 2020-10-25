const passwordValidator = password => {
    //at least one number, one lowercase and one uppercase letter, at least six characters:
    const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    return re.test(password);
};

export default passwordValidator;