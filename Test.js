/**
 * 
 */
var XtensUserDao = require("./XtensUserDao.js");
var XtensUser = require("./XtensUser.js");
var XtensGroup = require("./XtensGroup.js");
var XtensGroupDao = require("./XtensGroupDao.js");
var UserGroup = require("./UserGroup.js");
var UserGroupDao = require("./UserGroupDao.js");

var userDao = new XtensUserDao();

var user = new XtensUser(null,null,null,null,'m',null,'pass');

var id_user = 5;

var id_group = 2;

//userDao.create(user);

//userDao.select(user);

//userDao.destroy(id);

//userDao.update(user);

//userDao.count(user);

userDao.selectGroupbyUser(id_user);

var groupDao = new XtensGroupDao();

var group = new XtensGroup(2,'admin');

//groupDao.create(group);

//groupDao.select(group);

//groupDao.destroy(id);
 
//groupDao.update(group);

//groupDao.count(group);

groupDao.findUserbyGrp(id_group);

var relationDao = new UserGroupDao();

var relation = new UserGroup(6,2);

//relationDao.create(relation);

//relationDao.destroy(relation);