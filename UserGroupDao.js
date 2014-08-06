var UserGroup = require('./UserGroup.js');
function UserGroupDao() {
	var pg = require('pg');
	var conString = "postgres://valentina:030612ale@localhost:5432/prova";
	this.client = new pg.Client(conString);

}
UserGroupDao.prototype.create = function (userGroup){

	var self = this;
	self.client.connect();
	var query = self.client.query("INSERT INTO USER_GROUP (ID_USER,ID_GROUP) VALUES ("+userGroup.user+", "+ userGroup.group+")");
	
	query.on('end', function() {
		self.client.end();
	});

};

UserGroupDao.prototype.destroy = function (userGroup){
	
	var self = this;
	self.client.connect();
	var query = self.client.query("DELETE FROM USER_GROUP WHERE ID_USER = "+userGroup.user+" AND ID_GROUP = "+userGroup.group);
	query.on('end', function() {
		self.client.end();
	});

}

module.exports = UserGroupDao;