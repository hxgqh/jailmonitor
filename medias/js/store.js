Ext.define('Line',{
    extend: 'Ext.data.Model',
    fields: [
        'name',
        'position',
        { name: 'next_time_arrival', type: 'int'},// dateFormat: 'm/d/Y' },
        'order'
    ]
});

var lineStore = Ext.create('Ext.data.Store', {
        // destroy the store if the grid is destroyed
//        url: '/data/lineData',
    autoDestroy: true,
    autoSync : true,
    autoLoad: true,
    model: 'Line',

    proxy: {
        type: 'ajax',
        url : '/data/lineData',
        reader: {
            type: 'json'
        },

        writer: {
            type             : 'json',
            writeAllFields    : false,
            allowSingle         : true,
            encode             : true,
            root             : 'row'
        },

        actionMethods: {
            read: 'GET',
            write: 'POST',
            update: 'POST',
            destroy: 'POST'
        }
    },

    sorters: [{
        property: 'start',
        direction: 'ASC'
    }],

    listeners: {
        write: function(){
            console.log('write')
        }
    }
});


Ext.define('Person',{
        extend: 'Ext.data.Model',
        fields: [
            'person_no',
            'name',
            'contact',
            'address'
        ]
    });

var personStore = Ext.create('Ext.data.Store', {
        // destroy the store if the grid is destroyed
//        url: '/data/lineData',
    autoDestroy: true,
    autoSync : true,
    autoLoad: true,
    model: 'Person',

    proxy: {
        type: 'ajax',
        url : '/data/personData',
        reader: {
            type: 'json'
        },

        writer: {
            type             : 'json',
            writeAllFields    : false,
            allowSingle         : true,
            encode             : true,
            root             : 'row'
        },

        actionMethods: {
            read: 'GET',
            write: 'POST',
            update: 'POST',
            destroy: 'POST'
        }
    },

    sorters: [{
        property: 'start',
        direction: 'ASC'
    }],

    listeners: {
        write: function(){
            console.log('write')
        }
    }
});

Ext.define('Position',{
    extend: 'Ext.data.Model',
    fields: [
        'ip',
        'position',
        'install_position'
//            'position_card'
    ]
});

var positionStore = Ext.create('Ext.data.Store', {
        // destroy the store if the grid is destroyed
//        url: '/data/lineData',
    autoDestroy: true,
    autoSync : true,
    autoLoad: true,
    model: 'Position',

    proxy: {
        type: 'ajax',
        url : '/data/positionData',
        reader: {
            type: 'json'
        },

        writer: {
            type             : 'json',
            writeAllFields    : false,
            allowSingle         : true,
            encode             : true,
            root             : 'row'
        },

        actionMethods: {
            read: 'GET',
            write: 'POST',
            update: 'POST',
            destroy: 'POST'
        }
    },

    sorters: [{
        property: 'start',
        direction: 'ASC'
    }],

    listeners: {
        write: function(){
            console.log('write')
        }
    }
});
