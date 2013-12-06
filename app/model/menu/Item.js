Ext.define('Bmi.model.menu.Item', {
    extend: 'Ext.data.Model',

    uses: [
        'Bmi.model.menu.Root'
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
            name: 'className'
        },
        {
            name: 'id'
        },
        {
            name: 'parent_id'
        }
    ],

    belongsTo: {
        model: 'Bmi.model.menu.Root',
        foreignKey: 'parent_id'
    }
});