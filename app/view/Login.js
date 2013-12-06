

Ext.define('Bmi.view.Login', {

	//Extend the ext js window class
	extend: 	'Ext.window.Window',

	//Assign an alias to  this object.
	alias: 		'widget.login',

	//Auto show the window.
	autoShow: 	true,

	//Set the height of the login window.
	height: 	170,

	//Set the width of the login window.
	width: 		360,

	//Add the fit layout to the window.
	layout: 	{ type: 'fit' },

	//Add the key icon to the window.
	iconCls: 	'key',

	itemId: 'login',

	//Give the window a title.
	title: 		"Login",

	//dont destroy the window on close, just hide it.
	closeAction: 'hide',

	//Window is not closable.
	closable: 	false,

	//The items in the window.
	items:
	[
	 	{
	 		//Add a form to the window.
	 		xtype: 'form',

	 		//No frame on the form.
	 		frame: false,

	 		//Add some body padding
	 		bodyPadding: 15,

	 		//Defaults for the form.
	 		defaults: {
	 			xtype: 'textfield',
	 			anchor: '100%',
	 			labelWidth: 60,
	 			allowBlank: false,
	 			vtype: 'alphanum',
	 			minLength: 3,
	 			msgTarget: 'under'
	 		},

	 		//Items for the form.
	 		items:
	 		[
	 		 	{
	 		 		//Filed for the username
	 		 		name: 'user',
	 		 		fieldLabel: "User",
	 		 		maxLength: 25
	 		 	},
	 		 	{
	 		 		//Field for the password
	 		 		inputType: 'password',
	 		 		name: 'password',
	 		 		fieldLabel: "Password",
	 		 		maxLength: 15,
	 		 		enableKeyEvents: true,
	 		 		id: 'password'
	 		 	}
	 		 ],

	 		dockedItems:
	 			[
	 			 	{
	 			 		//Type is a toolbar
	 			 		xtype: 'toolbar',

	 			 		//dock at the bottom
	 			 		dock: 'bottom',

	 			 		//Items in the toolbar
	 			 		items:
	 			 		[
	 			 		 	{
	 			 		 		xtype: 'tbfill'
	 			 		 	},
	 			 		 	{
	 			 		 		xtype: 'button',
	 			 		 		itemId: 'cancel',
	 			 		 		iconCls: 'cancel',
	 			 		 		text: 'Cancel'
	 			 		 	},
	 			 		 	{
	 			 		 		xtype: 'button',
	 			 		 		itemId: 'submit',
	 			 		 		formBind: true,
	 			 		 		iconCls: 'key-go',
	 			 		 		text: 'Submit'
	 			 		 	}
	 			 		]
	 			 	}
	 			]
	 	}
	],




});

