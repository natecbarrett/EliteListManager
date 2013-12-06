
Ext.define('Bmi.controller.security.Users', {
	extend: 'Ext.app.Controller',
	views: [ 'security.Users', 'security.Profile' ],
	requires: [
	           'Bmi.util.Util',
	           'Bmi.util.Alert',
	       ],
	init: function(application) {
		this.control({
			"userslist": {
				render: this.onRender
			},
			"users button#add": {
				click: this.onButtonClickAdd
			},
			"users button#edit": {
				click: this.onButtonClickEdit
			},
			"users button#delete": {
				click: this.onButtonClickDelete
			},
			"profile button#save": {
                click: this.onButtonClickSave
            },
            "profile button#cancel": {
                click: this.onButtonClickCancel
            },
            "profile filefield": {
                change: this.onFilefieldChange
            }
		});
	},

	stores: ['security.Groups'],

	refs: [
	       {
	    	   ref: 'usersList',
	    	   selector: 'userslist'
	       },
	       {
	    	   ref: 'userPicture',
	    	   selector: 'profile image'
	       }
	],

	onButtonClickDelete: function (button, e, options) {

		//Get the users list grid.
		var grid = this.getUsersList(),

		//Get the record that is selected
	    record = grid.getSelectionModel().getSelection(),

	    //Get the grids data store.
	    store = grid.getStore();

		//Check to make sure there are two or more users and a valid record is selected.
	    if (store.getCount() >= 2 && record[0]){

	    	//Show a message asking for conformation of delete.
	    	Ext.Msg.show({

	    		//The title of the message
	    	     title:'Delete?',

	    	     //The message to show.
	    	     msg: 'Are you sure you want to delete?',

	    	     //The buttons on the message box.
	    	     buttons: Ext.Msg.YESNO,

	    	     //The icon to use.
	    	     icon: Ext.Msg.QUESTION,

	    	     //The function to call when a button is pushed.
	    	     fn: function (buttonId){

	    	    	 //If th eyes button is pressed...
	    	        if (buttonId == 'yes'){

	    	        	//Make an ajax request to the server to delete the user.
	    	            Ext.Ajax.request({

	    	            	//The url of the ajax request.
	    	            	url: 'php/security/deleteUser.php',

	    	            	//The parameters to pass
	    	                params: {

	    	                	//Pass the user id we want to delete.
	    	                    id: record[0].get('id')
	    	                },

	    	                //The success callback function.
	    	                success: function(conn, response, options, eOpts) {

	    	                	//The result from the server
	    	                	var result = Bmi.util.Util.decodeJSON(conn.responseText);

	    	                	//If successfull response.
	    	                	if (result.success) {

	    	                		//Show success message
	    	                        Bmi.util.Alert.msg('Success!', 'User deleted.');

	    	                        //Reload the data store.
	    	                        store.load();

	    	                    }
	    	                	else {
	    	                        Bmi.util.Util.showErrorMsg(conn.responseText);
	    	                    }
	    	                },

	    	                //The failure callback
	    	                failure: function(conn, response, options, eOpts) {
	    	                    Bmi.util.Util.showErrorMsg(conn.responseText);
	    	                }
	    	            });
	    	        }
	    	     }
	    	});

	    }

	    //If there is only one user in the store, we cant delete it, as we cant delete all
	    //users in the system
	    else if (store.getCount() == 1) {

	    	//Show the error message
	    	Ext.Msg.show({

	    		//The title of the message box.
	            title:'Warning',

	            //The message to show.
	            msg: 'You cannot delete all the users from the application.',

	            //Buttons in the message window.
	            buttons: Ext.Msg.OK,

	            //The icon to use.
	            icon: Ext.Msg.WARNING
	        });
	    }
	},

	onButtonClickCancel: function(button, e, options) {
		//Close the window.
		button.up('window').close();
	},

	onFilefieldChange: function(filefield, value, options) {

		console.debug(filefield);
		//Get the file object that is stored inside the file
		//input element of the ext js file field component.
		var file = filefield.fileInputEl.dom.files[0];

		//Get a reference to the Ext.image component this is in
		//our form.
		var picture = this.getUserPicture();

		//Check if the file reader api is available in this browser, and the file is an image.
		if (typeof FileReader !== "undefined" && (/image/i).test(file.type)) {
			var reader = new FileReader();

			//On load of the reader.
			reader.onLoad = function(e) {

				//Set the pictures new src to the one we are previewing.
				picture.setSrc(e.target.result);
			};

			reader.readAsDataURL(file);
		}

		//If not a image file.
		else if (!(/image/i).test(file.type)) {

			//Show error message
			Ext.Msg.alert('Warning', 'You can only upload image files!');

			//Reset the file field.
			fielfield.reset();
		}
	},

	onButtonClickSave: function(button, e, options) {

		//Get reference to the window.
		var win = button.up('window'),

		//Get reference to the form panel.
		formPanel = win.down('form'),

		//Get the users store.
		store = this.getUsersList().getStore();

		//Verify the form is valid.
		if (formPanel.getForm().isValid()) {

			//Submit the form.
			formPanel.getForm().submit({
				clientValidation: true,
				url: 'php/security/saveUser.php',

				//On sucess..
				success: function(form, action) {
					var result = action.result;
					if (result.success) {

						//Show success message.
						Bmi.util.Alert.msg('Success!', 'User saved.');

						//Reload the store.
						store.load();

						//Close the window.
						win.close();
					}

					else{
						//Show error message.
						Bmi.util.Util.showErrorMsg(result.msg);
					}
				},

				//On failure
				failure: function(form, action) {
					switch(action.failureType) {

						case Ext.form.action.Action.CLIENT_INVALID:
							Ext.Msg.alert('Failure', 'Form fields may not be submitted with invalid values');
							break;

						case  Ext.form.action.Action.CONNECT_FAILURE:
							Ext.Msg.alert('Failure', 'Ajax communication failed');
							break;

						case Ext.form.action.Action.SERVER_INVALID:
							Ext.Msg.alert('Failure', action.result.msg);
							break;
					}
				}
			});
		}

	},

	onRender: function(component, options) {
		component.getStore().load();
	},

	onButtonClickEdit: function(button, e, options) {

		//Get the record we want to edit
		var grid = this.getUsersList(),
		record = grid.getSelectionModel().getSelection();

		if (record[0]) {

			//Create the edit window.
			var editWindow = Ext.create('Bmi.view.security.Profile');

			//Load the record into the form.
			editWindow.down('form').loadRecord(record[0]);

			//See if the record has a picture.
			if (record[0].get('picture')) {

				//Get reference to the image field in the form.
				var img = editWindow.down('image');

				//Set the source of the image.
				img.setSrc('resources/profileImages/' + record[0].get('picture'));

			}

			//Set the window title to the name of the user we are editing
			editWindow.setTitle(record[0].get('name'));

			//show the window.
			editWindow.show();
		}
	},

	onButtonClickAdd: function (button, e, options) {

		//Create the window to show.
		var win = Ext.create('Bmi.view.security.Profile');

		//Set the window title.
		win.setTitle('Add new user');

		//Show the window.
		win.show();
	}
});