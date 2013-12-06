
//Define the model for the Group data
Ext.define('Bmi.model.security.Group', {

	//Inherits from the ext data model
	extend: 'Ext.data.Model',

	//The id property
	idProprty: 'id',

	//The fields in the model
	fields: [

	  //The id field.
	  { name: 'id' },

	  //The group name field.
	  { name: 'name' }
	]


});