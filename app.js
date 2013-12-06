/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when upgrading.
*/



//our application will have a single page and the parent container of the app will be the Viewport.
//The Viewport is a specialized container representing the viewable application area that is rendered
//inside the body tag of the HTML page (<body></body>). It also manages the application's size inside
//the browser and manages the window resizing.
Ext.application({

	//The name of the application which will be the namespace
	name: 'Bmi',

	//The init function called upon application initialization
	init: function() {

		//Create the splash screen, applying a mask to the body using the splashscreen css
		splashscreen = Ext.getBody().mask('Loading application', 'splashscreen');

		//Add the splashscreen css
		splashscreen.addCls('splashscreen');

		//search for the first DIV tag that contains the .x-mask-msg class (Ext.query('.x-mask-msg')[0])
		//and will add a new DIV tag as child with the class x-splash-icon that will be responsible for
		//adding the logo image above the loading message.
		Ext.DomHelper.insertFirst(Ext.query('.x-mask-msg')[0], {
		     cls: 'x-splash-icon'
		});


	},

	//This function will be called after all the application's controllers are initialized and this means
	//that the application is completely loaded. So this function is a good place to instantiate our main view.
    launch: function() {

    	//Initialize tool tips.
    	Ext.tip.QuickTipManager.init();

    	//Create a delayed task to remove the splash screen. We delay itso the user gets a chance to see it.
    	var task = new Ext.util.DelayedTask(function() {

    		//Add a fadeout animation to make it look a bit nicer.
    		splashscreen.fadeOut({
    		    duration: 1000,
    		    remove:true
    		});

    		//Fade the div also
    		splashscreen.next().fadeOut({
                duration: 1000,
                remove:true,


            });

    		Ext.widget('login');
    	});

    	//Delay for two seconds.
    	task.delay(2000);
    },

	controllers: [ 'Login', 'Menu', 'security.Users']
});
