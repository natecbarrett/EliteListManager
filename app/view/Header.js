Ext.define('Bmi.view.Header', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.appheader',

    height: 30, // #3
    ui: 'footer', // #4
    style: 'border-bottom: 4px solid #4c72a4;',

    items: [
        {
            xtype: 'label',
            html: '<div id="titleHeader">List Manager<span style="font-size:12px;"> - Bmi Elite</span></div>'
        },
        {
            xtype: 'tbfill'
        },
        {
            xtype: 'tbseparator'
        },
        {
            xtype: 'button',
            text: 'Logout',
            itemId: 'logout',
            iconCls: 'logout'
        }
    ]
});