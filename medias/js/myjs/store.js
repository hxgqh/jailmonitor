Ext.define('Line',{
    extend: 'Ext.data.Model',
    fields: [
        'name',
        'position',
        { name: 'next_time_arrival', type: 'int'},
//        { name: 'time_error', type: 'int'},
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
        'mac',
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


Ext.define('MultiDayScheduleModel',{
    extend: 'Ext.data.Model',
    fields: [
        'no',   // schedule number
        'line',
        'start_time',    // dateFormat: 'Y-d-m' },
        'end_time',   // dateFormat: 'Y-d-m' },
        'daily_start_time'
    ]
});

// create the Data Store
var multiDayScheduleStore = Ext.create('Ext.data.Store', {
    // destroy the store if the grid is destroyed
    autoDestroy: true,
    autoSync : true,
    autoLoad: true,
    model: 'MultiDayScheduleModel',

    proxy: {
        type: 'ajax',
        url : '/data/multiDayScheduleData',
        reader: {
            type: 'json'
        },

        writer: {
            type             : 'json',
            writeAllFields    : false,
            allowSingle         : false,
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



Ext.define('OrderedScheduleModel',{
    extend: 'Ext.data.Model',
    fields: [
        'no',
        'line',
        'start_time'    // dateFormat: 'Y-d-m' },
    ]
});

// create the Data Store
var orderedScheduleStore = Ext.create('Ext.data.Store', {
    // destroy the store if the grid is destroyed
    autoDestroy: true,
    autoSync : true,
    autoLoad: true,
    model: 'OrderedScheduleModel',

    proxy: {
        type: 'ajax',
        url : '/data/orderedScheduleData',
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


Ext.define('UnorderedScheduleModel', {
    extend: 'Ext.data.Model',
    fields: [
        'no',
        'line',
        'start_time',   // dateFormat: 'Y-d-m' },
        'end_time'  // dateFormat: 'Y-d-m' },
    ]
});

// create the Data Store
var unorderedScheduleStore = Ext.create('Ext.data.Store', {
    // destroy the store if the grid is destroyed
    autoDestroy: true,
    autoSync : true,
    autoLoad: true,
    model: 'UnorderedScheduleModel',

    proxy: {
        type: 'ajax',
        url : '/data/unorderedScheduleData',
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

Ext.define('TemperatureHumidityDevice', {
    extend: 'Ext.data.Model',
    fields: [
        'id',
        'ip',
        'position',
        'device_no'
    ]
});

var temperatureHumidityDeviceStore = Ext.create('Ext.data.Store', {
    // destroy the store if the grid is destroyed
    autoDestroy: true,
    autoSync : true,
    autoLoad: true,
    model: 'TemperatureHumidityDevice',

    proxy: {
        type: 'ajax',
        url : '/data/temperatureHumidityDevice',
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