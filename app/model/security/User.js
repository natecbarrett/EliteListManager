Ext.define('Bmi.model.security.User', {
	extend: 'Ext.data.Model',
	isProperty: 'id',
	fields: [
	         { name: 'id' },
	         { name: 'name' },
	         { name: 'username' },
	         { name: 'email' },
	         { name: 'picture' },
	         { name: 'Group_id' }
	]
});