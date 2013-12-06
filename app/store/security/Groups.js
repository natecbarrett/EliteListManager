Ext.define('Bmi.store.security.Groups', {
	extend: 'Ext.data.Store',
	requires: [ 'Bmi.model.security.Group' ],
	model: 'Bmi.model.security.Group',
	storeId: 'groups',
	autoLoad: true,
	proxy: {
		type: 'ajax',
		url: 'php/security/groups.php',
		reader: {
			type: 'json',
			root: 'data'
		}
	}

});