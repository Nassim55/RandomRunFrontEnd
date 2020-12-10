const passwordValidator = password => {
    //at least one number, one lowercase and one uppercase letter, at least six characters:
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(password);
};

export default passwordValidator;