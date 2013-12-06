Ext.define('Bmi.store.list.Lists', {
	extend: 'Ext.data.Store',
	requires: [ 'Bmi.model.list.List' ],
	model: 'Bmi.model.list.List',
	proxy: {
		type: 'ajax',
		url: 'php/list/lists.php',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});