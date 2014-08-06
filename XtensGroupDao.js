
var XtensGroup = require('./XtensGroup.js');

function XtensGroupDao() {
	var pg = require('pg');
	var conString = "postgres://valentina:030612ale@localhost:5432/prova";
	this.client = new pg.Client(conString);

}

XtensGroupDao.prototype.create = function (xtensGroup){

	var self = this;
	this.client.connect();
	var idQuery = self.client.query("SELECT MAX(ID) FROM XTENS_GROUP");
	idQuery.on('end', function() {
		self.client.end();
	});
	idQuery.on('row', function(row) {
	if(row.max !='')
		{
		 var query = self.client.query("INSERT INTO XTENS_GROUP(ID,NAME) SELECT "+(row.max+1)+",'"+xtensGroup.name+"' WHERE NOT EXISTS ( SELECT NAME FROM XTENS_GROUP WHERE NAME ='"+xtensGroup.name+"')");

	query.on('end', function() {
		self.client.end();
	});
		}
	else
		{
		var query = self.client.query("INSERT INTO XTENS_GROUP (ID,NAME) VALUES ("+(1)+", '"+xtensGroup.name+"')");
		query.on('end', function() {
			self.client.end();
		});
		}
	});
	

};

XtensGroupDao.prototype.select = function (xtensGroup) {
	
	var self = this;
	
	self.client.connect();
	
	var string = "SELECT * FROM XTENS_GROUP WHERE 1=1";
	if(xtensGroup.id !=null)
	{
		string = string.concat("AND ID="+xtensGroup.id);
	}
	if (xtensGroup.name != null)
	{
		string = string.concat("AND NAME='"+xtensGroup.name+"'");
	}
	
	var query = self.client.query(string);

	query.on('row', function(row) {
		console.log(row);
	});

	query.on('end', function() {
		self.client.end();
	});
};

XtensGroupDao.prototype.update = function (xtensGroup) {

	var self = this;

	self.client.connect();

	var string = "UPDATE XTENS_GROUP ";

	if (xtensGroup.name != null)
	{
		string = string.concat(" SET NAME='"+xtensGroup.name+"'");
	}
	
	string = string.concat(" WHERE ID="+xtensGroup.id);

	var query = self.client.query(string);

	query.on('end', function() {
		self.client.end();
	});
};

XtensGroupDao.prototype.destroy = function (id) {

	var self = this;
	self.client.connect();
	var query = self.client.query("DELETE FROM XTENS_GROUP WHERE ID ="+id);

	query.on('end', function() {
		self.client.end();
	});
};

XtensGroupDao.prototype.count = function (xtensGroup) {

	var self = this;
	self.client.connect();

	var string = "SELECT COUNT(*) FROM XTENS_GROUP WHERE 1=1";

	if(xtensGroup.id !=null)
	{
		string = string.concat("AND ID="+xtensGroup.id);
	}
	if (xtensGroup.name != null)
	{
		string = string.concat("AND NAME='"+xtensGroup.name+"'");
	}
	
	var query = self.client.query(string);

	query.on('row', function(row) {
		console.log(row);
	});

	query.on('end', function() {
		self.client.end();
	});
};

XtensGroupDao.prototype.findUserbyGrp = function (id) {
	var self = this;
	self.client.connect();
	var query = self.client.query("SELECT XTENS_USER.NAME, XTENS_USER.SURNAME AS GROUP FROM XTENS_GROUP JOIN USER_GROUP ON (USER_GROUP.ID_GROUP = XTENS_GROUP.ID) JOIN XTENS_USER ON ( XTENS_USER.ID = USER_GROUP.ID_USER ) WHERE XTENS_GROUP.ID = "+id);

	query.on('row', function(row) {
		console.log(row);
	});

	query.on('end', function() {
		self.client.end();
	});
}
module.exports = XtensGroupDao;



