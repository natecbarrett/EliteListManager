Ext.define('Bmi.model.menu.Root', {
    extend: 'Ext.data.Model',

    uses: [
        'Bmi.model.menu.Item'
    ],

    idProperty: 'id',

    fields: [
        {
            name: 'text'
        },
        {
            name: 'iconCls'
        },
        {
            name: 'id'
        }
    ],

    hasMany: {
        model: 'Bmi.model.menu.Item',
        foreignKey: 'parent_id',
        name: 'items'
    }
});