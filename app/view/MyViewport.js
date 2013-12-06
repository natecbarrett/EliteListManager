Ext.define('Bmi.view.MyViewport', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.mainviewport',

    requires: [
        'Bmi.view.Header',
        'Bmi.view.menu.Accordion',
        'Bmi.view.MainPanel',
        'Bmi.view.security.UsersList'
    ],

    layout: {
        type: 'border'
    },

    items: [
        {
            xtype: 'mainmenu',
            width: 185,
            collapsible: true,
            region: 'west',
            //style: 'background-color: #cc0000;'
        },
        {
            xtype: 'appheader',
            region: 'north'
        },
        {
            xtype: 'mainpanel',
            region: 'center',
            style: 'background-color: #000000;'
        },
        {
            xtype: 'container',
            region: 'south',
            height: 30,
            style: 'border-top: 1px solid #4c72a4;',
            html: '<div id="titleHeader"><center><span style="font-size:10px;">Bmi Elite List Management</span></center></div>'
        }
    ]
});