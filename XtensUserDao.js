/**
 * 
 */
var XtensUser = require("./XtensUser.js");




function XtensUserDao() {
	var pg = require('pg');
	var conString = "postgres://valentina:030612ale@localhost:5432/prova";
	this.client = new pg.Client(conString);

}

XtensUserDao.prototype.create = function (xtensUser){

	var self = this;
	this.client.connect();
	var idQuery = self.client.query("SELECT MAX(ID) FROM XTENS_USER");
	idQuery.on('end', function() {
		self.client.end();
	});
	idQuery.on('row', function(row) {
	if(row.max !='')
		{
	var query = self.client.query("INSERT INTO XTENS_USER (ID,NAME,SURNAME,BIRTH_DATE,SEX,LOGIN,PASSWORD) VALUES ("+(row.max+1)+", '"+xtensUser.name+"','"+xtensUser.surname+"','"+xtensUser.date+"','"+xtensUser.sex+"','"+xtensUser.login+"','"+xtensUser.password+"')");
	query.on('end', function() {
		self.client.end();
	});
		}
	else
		{
		var query = self.client.query("INSERT INTO XTENS_USER (ID,NAME,SURNAME,BIRTH_DATE,SEX,LOGIN,PASSWORD) VALUES ("+(1)+", '"+xtensUser.name+"','"+xtensUser.surname+"','"+xtensUser.date+"','"+xtensUser.sex+"','"+xtensUser.login+"','"+xtensUser.password+"')");
		query.on('end', function() {
			self.client.end();
		});
		}
	});
	
};

XtensUserDao.prototype.select = function (xtensUser) {
	
	var self = this;
	
	self.client.connect();
	
	var string = "SELECT * FROM XTENS_USER WHERE 1=1";
	if(xtensUser.id !=null)
	{
		string = string.concat("AND ID="+xtensUser.id);
	}
	if (xtensUser.name != null)
	{
		string = string.concat("AND NAME='"+xtensUser.name+"'");
	}
	if(xtensUser.surname !=null)
	{
		string = string.concat("AND SURNAME='"+xtensUser.surname+"'");
	}
	if(xtensUser.date !=null)
	{
		string = string.concat("AND BIRTH_DATE='"+xtensUser.date+"'");
	}
	if(xtensUser.sex !=null)
	{
		string = string.concat("AND SEX='"+xtensUser.sex+"'");
	}
	if (xtensUser.login !=null)
	{
		string = string.concat("AND LOGIN='"+xtensUser.login+"'");
	}
	var query = self.client.query(string);

	query.on('row', function(row) {
		console.log(row);
	});

	query.on('end', function() {
		self.client.end();
	});
};

XtensUserDao.prototype.update = function (xtensUser) {

	var self = this;

	self.client.connect();

	var string = "UPDATE XTENS_USER SET ID="+xtensUser.id;

	if (xtensUser.name != null)
	{
		string = string.concat(", NAME='"+xtensUser.name+"'");
	}
	if(xtensUser.surname !=null)
	{
		string = string.concat(", SURNAME='"+xtensUser.surname+"'");
	}
	if(xtensUser.date !=null)
	{
		string = string.concat(", BIRTH_DATE='"+xtensUser.date+"'");
	}
	if(xtensUser.sex !=null)
	{
		string = string.concat(",SEX='"+xtensUser.sex+"'");
	}
	if (xtensUser.login !=null)
	{
		string = string.concat(", LOGIN='"+xtensUser.login+"'");
	}

	string = string.concat(" WHERE ID="+xtensUser.id);

	var query = self.client.query(string);

	query.on('end', function() {
		self.client.end();
	});
};

XtensUserDao.prototype.destroy = function (id) {

	var self = this;
	self.client.connect();
	var query = self.client.query("DELETE FROM XTENS_USER WHERE ID ="+id);

	query.on('end', function() {
		self.client.end();
	});
};

XtensUserDao.prototype.count = function (xtensUser) {

	var self = this;
	self.client.connect();

	var string = "SELECT COUNT(*) FROM XTENS_USER WHERE 1=1";

	if(xtensUser.id !=null)
	{
		string = string.concat("AND ID="+xtensUser.id);
	}
	if (xtensUser.name != null)
	{
		string = string.concat("AND NAME='"+xtensUser.name+"'");
	}
	if(xtensUser.surname !=null)
	{
		string = string.concat("AND SURNAME='"+xtensUser.surname+"'");
	}
	if(xtensUser.date !=null)
	{
		string = string.concat("AND BIRTH_DATE='"+xtensUser.date+"'");
	}
	if(xtensUser.sex !=null)
	{
		string = string.concat("AND SEX='"+xtensUser.sex+"'");
	}
	if (xtensUser.login !=null)
	{
		string = string.concat("AND LOGIN='"+xtensUser.login+"'");
	}
	var query = self.client.query(string);

	query.on('row', function(row) {
		console.log(row);
	});

	query.on('end', function() {
		self.client.end();
	});
};


XtensUserDao.prototype.selectGroupbyUser = function (id)
{
	var self = this;
	self.client.connect();
	
	var query = self.client.query("SELECT XTENS_GROUP.NAME AS GROUP FROM XTENS_USER JOIN USER_GROUP ON (USER_GROUP.ID_USER = XTENS_USER.ID) JOIN XTENS_GROUP ON ( XTENS_GROUP.ID = USER_GROUP.ID_GROUP ) WHERE XTENS_USER.ID = "+id);

	query.on('row', function(row) {
		console.log(row);
	});

	query.on('end', function() {
		self.client.end();
	});
	};
module.exports = XtensUserDao;



