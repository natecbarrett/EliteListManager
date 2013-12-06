Ext.define('Bmi.store.security.Users', {
	extend: 'Ext.data.Store',
	requires: [ 'Bmi.model.security.User' ],
	model: 'Bmi.model.security.User',
	proxy: {
		type: 'ajax',
		url: 'php/security/users.php',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});