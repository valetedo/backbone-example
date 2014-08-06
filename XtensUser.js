
function XtensUser(id,name,surname,birth_date,sex,login,password) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.date = birth_date;
    this.sex = sex;
    this.login = login;
    this.password = password;
};

module.exports = XtensUser;