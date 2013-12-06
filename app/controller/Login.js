Ext.define('Bmi.controller.Login', {
	extend: 'Ext.app.Controller',
	requires: [
	           'Bmi.util.MD5',
	           'Bmi.util.Util',
	           'Bmi.util.SessionMonitor'
	       ],
	views:
	[
	 	'Login',
	 	 'authentication.CapsLockTooltip',
	 	 'Header'
	],

	refs: [
	       {
	           ref: 'capslockTooltip',
	           selector: 'capslocktooltip'
	       }
	   ],

	init: function(application) {
		this.control({
			//Bind a click listner to the submit button on the form
			"login form button#submit": {
	            click: this.onButtonClickSubmit
	        },

	        //Bind a click listner on the cancel button on the form.
	        "login form button#cancel": {
	            click: this.onButtonClickCancel
	        },

	        "login form textfield": {
	        	specialkey: this.onTextfieldSpecialKey
	        },

	        "login form textfield[name=password]": {
	            keypress: this.onTextfieldKeyPress
	        },
	        "appheader button#logout": {
	            click: this.onButtonClickLogout
	        }
		});

	},

	//Handler for the click event on the logout button in the header.
	onButtonClickLogout: function(button, e, options) {

		//Submit an ajaz request.
	    Ext.Ajax.request({

	    	//Call the logout.php page
	        url: 'php/logout.php',

	        //On success do the folowing..
	        success: function(conn, response, options, eOpts){

	        	//Get the result
	        	var result = Bmi.util.Util.decodeJSON(conn.responseText);

	        	//Check if we logged out
	            if (result.success) {

	            	//Destroy components
	                button.up('mainviewport').destroy();

	                //Reload the app
	                window.location.reload();
	            }

	            //Couldnt log out
	            else {
	                Bmi.util.Util.showErrorMsg(conn.responseText);
	            }
	        },

	        //On request failure do the following
	        failure: function(conn, response, options, eOpts) {

	        	//Show the error message
	        	Bmi.util.Util.showErrorMsg(conn.responseText);


	        }
	    });
	},

	//function to call whe na key is pressed in the password textfield.
	onTextfieldKeyPress: function(field, e, options) {

		//Get the character code of the key presed.
		var charCode = e.getCharCode();

	    if((e.shiftKey && charCode >= 97 && charCode <= 122) ||
	        (!e.shiftKey && charCode >= 65 && charCode <= 90)){

	        if(this.getCapslockTooltip() === undefined){

	        	//Show the tooltip.
	        	Ext.widget('capslocktooltip');
	        }

	        this.getCapslockTooltip().show();

	    } else {

	        if(this.getCapslockTooltip() !== undefined){
	            this.getCapslockTooltip().hide();
	        }
	    }
	},

	onTextfieldSpecialKey: function(field, e, options)
	{
		//Check to see if it was the enter key pressed
		if (e.getKey() == e.ENTER){

			//Get reference to the submit button.
			var submitBtn = field.up('form').down('button#submit');

			//Fire the click event on the submit button.
			submitBtn.fireEvent('click', submitBtn, e, options);
		}
	},

	//The function to call when the submit button is pressed.
	onButtonClickSubmit: function(button, e, options) {

		//Get the reference to the form
		var formPanel = button.up('form'),

		//Get the reference to the login button
		login = button.up('login'),

		//Get the reference to the username field.
	    user = formPanel.down('textfield[name=user]').getValue(),

	    //Get thje reference to the password field.
	    pass = formPanel.down('textfield[name=password]').getValue();

		//Make sure the form is validated
		if (formPanel.getForm().isValid()) {

			//Encode the password
			pass = Bmi.util.MD5.encode(pass);

			//Submit an ajax request.
			Ext.Ajax.request({
				url: 'php/login.php',
				params: {
					user: user,
					password: pass
				},
				failure: function(conn, response, options, eOpts) {

					//Remove the authenticating message
					Ext.get(login.getEl()).unmask();

					Ext.get(login.getEl()).mask("Authenticating... Please wait...", 'loading');

					//Show the error message if the request failed.
					Ext.Msg.show({
				        title:'Error!',
				        msg: conn.responseText,
				        icon: Ext.Msg.ERROR,
				        buttons: Ext.Msg.OK
					});
				},
				success: function(conn, response, options, eOpts) {

					//Remove the authenticating message
					Ext.get(login.getEl()).unmask();

					//Decode the json response
					var result = Ext.JSON.decode(conn.responseText, true);

					//If no result was eturned assume failure.
					if (!result)
					{
						result = {};
						result.success = false;
						result.msg = conn.responseTect;
					}

					//Check if the login was successfull.
					if (result.success)
					{
						//Close the login window.
						login.close();

						//Create the main viewport.
						Ext.create('Bmi.view.MyViewport');

						//Start the session monitor.
						Bmi.util.SessionMonitor.start();
					}

					//Else failed.
					else
					{
						//Show the error.
						Ext.Msg.show({
				            title:'Fail!',
				            msg: result.msg,
				            icon: Ext.Msg.ERROR,
				            buttons: Ext.Msg.OK
				        });
					}

				}

			});
		}

	},

	//The function to call when the cancel button is clicked.
	onButtonClickCancel: function(button, e, options) {
		button.up('form').getForm().reset();
	}

});