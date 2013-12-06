Ext.define('Bmi.store.Menu', {
    extend: 'Ext.data.Store',

    requires: [
        'Bmi.model.menu.Root'
    ],

    model: 'Bmi.model.menu.Root',

    proxy: {
        type: 'ajax',
        url: 'php/menu.php',

        reader: {
            type: 'json',
            root: 'items'
        }
    }
});