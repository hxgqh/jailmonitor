Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*',
    'Ext.state.*',
    'Ext.form.*'
]);

var lineData = []
var multiDayScheduleData = []
var orderedScheduleData = []
var unorderedScheduleData = []





function hrEditor(){
    // Define our data model
    Ext.define('Employee', {
        extend: 'Ext.data.Model',
        fields: [
            'no',
            'name',
            'contact',
            'address',
            { name: 'active', type: 'bool' }
        ]
    });

//    Ext.define('Line',{
//        extend: 'Ext.data.Model',
//        fields: [
//            'line_name',
//            'position_name',
//            'nextTimer_arrival',
//            'order'
//        ]
//    });
//
//    Ext.define('MultiDaySchedule',{
//        extend: 'Ext.data.Model',
//        fields: [
//            'no',
//            'name',
//            'contact',
//            'address'
//        ]
//    });
//
//    Ext.define('OrderedSchedule',{
//        extend: 'Ext.data.Model',
//        fields: [
//            'no',
//            'name',
//            'contact',
//            'address'
//        ]
//    });
//
//    Ext.define('UnorderedSchedule',{
//        extend: 'Ext.data.Model',
//        fields: [
//            'no',
//            'name',
//            'contact',
//            'address',
//            { name: 'active', type: 'bool' }
//        ]
//    });

    // Generate mock employee data
    var data = (function() {
//        var lasts = ['Jones', 'Smith', 'Lee', 'Wilson', 'Black', 'Williams', 'Lewis', 'Johnson', 'Foot', 'Little', 'Vee', 'Train', 'Hot', 'Mutt'],
//            firsts = ['Fred', 'Julie', 'Bill', 'Ted', 'Jack', 'John', 'Mark', 'Mike', 'Chris', 'Bob', 'Travis', 'Kelly', 'Sara'],
//            lastLen = lasts.length,
//            firstLen = firsts.length,
//            usedNames = {},
            data = []
//            s = new Date(2007, 0, 1),
//            eDate = Ext.Date,
            var now = new Date()
            var getRandomInt = Ext.Number.randomInt

//            generateName = function() {
//                var name = firsts[getRandomInt(0, firstLen - 1)] + ' ' + lasts[getRandomInt(0, lastLen - 1)];
//                if (usedNames[name]) {
//                    return generateName();
//                }
//                usedNames[name] = true;
//                return name;
//            };

//        while (s.getTime() < now.getTime()) {
//            var ecount = getRandomInt(0, 3);
//            for (var i = 0; i < ecount; i++) {
////                var name = generateName();
//                data.push({
//                    no:'no',
////                    start : eDate.add(eDate.clearTime(s, true), eDate.DAY, getRandomInt(0, 27)),
//                    name : name,
////                    email: name.toLowerCase().replace(' ', '.') + '@sencha-test.com',
//                    active: getRandomInt(0, 1),
//                    contact: '18611147179',
//                    address: '北京上地'
////                    salary: Math.floor(getRandomInt(35000, 85000) / 1000) * 1000
//                });
//            }
//            s = eDate.add(s, eDate.MONTH, 1);
//        }

        return data;
    })();

    // create the Data Store
    var store = Ext.create('Ext.data.Store', {
        // destroy the store if the grid is destroyed
        autoDestroy: true,
        model: 'Employee',
        proxy: {
            type: 'memory'
        },
        data: data,
        sorters: [{
            property: 'start',
            direction: 'ASC'
        }]
    });

    var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
        clicksToMoveEditor: 1,
        autoCancel: false
    });

    // create the grid and specify what field you want
    // to use for the editor at each column.
    var grid = Ext.create('Ext.grid.GridPanel', {
        store: store,
        columns: [{
            header: '序号',
            dataIndex: 'no',
            width: '15%',
//            flex: 1,
            editor: {
                // defaults to textfield if no xtype is supplied
                allowBlank: true
            }
        }, {
            header: '姓名',
            dataIndex: 'name',
//            width: 160,
            width: '25%',
            editor: {
                allowBlank: true
//                vtype: 'email'
            }
        }, {
//            xtype: 'datecolumn',
            header: '联系方式',
            dataIndex: 'contact',
//            width: 105,
            width: '15%',
            editor: {
//                xtype: 'datefield',
                allowBlank: true
//                format: 'm/d/Y',
//                minValue: '01/01/2006',
//                minText: 'Cannot have a start date before the company existed!',
//                maxValue: Ext.Date.format(new Date(), 'm/d/Y')
            }
        }, {
//            xtype: 'numbercolumn',
            header: '通讯地址',
            dataIndex: 'address',
//            format: '$0,0',
            width: '35%',
            editor: {
//                xtype: 'numberfield',
                allowBlank: true
//                minValue: 1,
//                maxValue: 150000
            }
        }, {
            xtype: 'checkcolumn',
            header: 'Active?',
            dataIndex: 'active',
            width: '10%',
            editor: {
                xtype: 'checkbox',
                cls: 'x-grid-checkheader-editor'
            }
        }],
        renderTo: 'div-editor',
//        width: 600,
        width: '100%',
        height: 400,
//        title: 'Employee Salaries',
        frame: true,
        tbar: [{
            text: 'Add Employee',
            iconCls: 'employee-add',
            handler : function() {
                rowEditing.cancelEdit();

                // Create a model instance
                var r = Ext.create('Employee', {
                    name: 'New Guy',
                    email: 'new@sencha-test.com',
                    start: Ext.Date.clearTime(new Date()),
                    salary: 50000,
                    active: true
                });

                store.insert(0, r);
                rowEditing.startEdit(0, 0);
            }
        }, {
            itemId: 'removeEmployee',
            text: 'Remove Employee',
            iconCls: 'employee-remove',
            handler: function() {
                var sm = grid.getSelectionModel();
                rowEditing.cancelEdit();
                store.remove(sm.getSelection());
                if (store.getCount() > 0) {
                    sm.select(0);
                }
            },
            disabled: true
        }],
        plugins: [rowEditing],
        listeners: {
            'selectionchange': function(view, records) {
                grid.down('#removeEmployee').setDisabled(!records.length);
            }
        }
    });
}

function lineEditor(){
    // Define our data model
    Ext.define('Line',{
        extend: 'Ext.data.Model',
        fields: [
            'line_name',
            'position_name',
            { name: 'nextTime_arrival', type: 'int'},// dateFormat: 'm/d/Y' },
            'order'
        ]
    });

    // create the Data Store
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

            writer: 'json',

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

    var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
        clicksToMoveEditor: 1,
        autoCancel: false
    });

    // create the grid and specify what field you want
    // to use for the editor at each column.
    var grid = Ext.create('Ext.grid.GridPanel', {
        store: lineStore,
        columns: [{
            header: '线路名称',
            dataIndex: 'line_name',
            width: '25%',
            editor: {
                allowBlank: true
            }
        }, {
            header: '地点名称',
            dataIndex: 'position_name',
            width: '45%',
            editor: {
                allowBlank: true
            }
        }, {
            header: '下次到达时间(/min)',
            dataIndex: 'nextTime_arrival',
            width: '15%',
            editor: {
                allowBlank: true
            }
        }, {
            header: '顺序',
            dataIndex: 'order',
            width: '15%',
            editor: {
                allowBlank: true
            }
        }],
        renderTo: 'div-editor',
        width: '100%',
        height: 400,
        frame: true,
        tbar: [{
            text: 'Add Line',
            iconCls: 'line-add',
            handler : function() {
                rowEditing.cancelEdit();

                // Create a model instance
                var r = Ext.create('Line', {
                    line_name: '',
                    position_name: '',
                    nextTime_arrival: '',
                    order: ''
                });

                lineStore.insert(0, r);
                rowEditing.startEdit(0, 0);
            }
        }, {
            itemId: 'removeLine',
            text: 'Remove Line',
            iconCls: 'line-remove',
            handler: function() {
                var sm = grid.getSelectionModel();
                rowEditing.cancelEdit();
                lineStore.remove(sm.getSelection());
                if (lineStore.getCount() > 0) {
                    sm.select(0);
                }


            },
            disabled: true
        }],
        plugins: [rowEditing],
        listeners: {
            'selectionchange': function(view, records) {
                grid.down('#removeLine').setDisabled(!records.length);
            }
        }
    });
}

function multiDayScheduleEditor(){
    // Define our data model
    Ext.define('MultiDayScheduleModel',{
        extend: 'Ext.data.Model',
        fields: [
            'line_name',
            { name: 'start_time', type: 'datetime'},// dateFormat: 'm/d/Y' },
            { name: 'end_time', type: 'datetime'}//, dateFormat: 'm/d/Y' }
        ]
    });

    // Generate mock employee data
    var data = []

    // create the Data Store
    var store = Ext.create('Ext.data.Store', {
        // destroy the store if the grid is destroyed
        autoDestroy: true,
        model: 'MultiDayScheduleModel',
        proxy: {
            type: 'memory'
        },
        data: data,
        sorters: [{
            property: 'start',
            direction: 'ASC'
        }]
    });

    var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
        clicksToMoveEditor: 1,
        autoCancel: false
    });

    // create the grid and specify what field you want
    // to use for the editor at each column.
    var grid = Ext.create('Ext.grid.GridPanel', {
        store: store,
        columns: [{
            header: '线路',
            dataIndex: 'line_name',
            width: '20%',
            editor: {
                allowBlank: true
            }
        }, {
            header: '开始日期',
            dataIndex: 'start_time',
            width: '40%',
            editor: {
                allowBlank: true
            }
        }, {
            header: '结束日期',
            dataIndex: 'end_time',
            width: '40%',
            editor: {
                allowBlank: true
            }
        }],
        renderTo: 'div-editor',
        width: '100%',
        height: 400,
        frame: true,
        tbar: [{
            text: 'Add Schedule',
            iconCls: 'schedule-add',
            handler : function() {
                rowEditing.cancelEdit();

                var now = new Date()

                // Create a model instance
                var r = Ext.create('MultiDayScheduleModel', {
                    line_name: '',
                    start_time: Ext.Date.format(now, "n/j/Y"),
                    end_time: Ext.Date.format(now, "n/j/Y")
                });

                store.insert(0, r);
                rowEditing.startEdit(0, 0);
            }
        }, {
            itemId: 'removeSchedule',
            text: 'Remove Schedule',
            iconCls: 'schedule-remove',
            handler: function() {
                var sm = grid.getSelectionModel();
                rowEditing.cancelEdit();
                store.remove(sm.getSelection());
                if (store.getCount() > 0) {
                    sm.select(0);
                }
            },
            disabled: true
        }],
        plugins: [rowEditing],
        listeners: {
            'selectionchange': function(view, records) {
                grid.down('#removeSchedule').setDisabled(!records.length);
            }
        }
    });
}

function orderedScheduleEditor(){
    // Define our data model
    Ext.define('OrderedScheduleModel',{
        extend: 'Ext.data.Model',
        fields: [
            'line_name',
            { name: 'start_time', type: 'datetime'}// dateFormat: 'm/d/Y' },
        ]
    });

    // Generate mock employee data
    var data = []

    // create the Data Store
    var store = Ext.create('Ext.data.Store', {
        // destroy the store if the grid is destroyed
        autoDestroy: true,
        model: 'OrderedScheduleModel',
        proxy: {
            type: 'memory'
        },
        data: data,
        sorters: [{
            property: 'start',
            direction: 'ASC'
        }]
    });

    var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
        clicksToMoveEditor: 1,
        autoCancel: false
    });

    // create the grid and specify what field you want
    // to use for the editor at each column.
    var grid = Ext.create('Ext.grid.GridPanel', {
        store: store,
        columns: [{
            header: '线路',
            dataIndex: 'line_name',
            width: '30%',
            editor: {
                allowBlank: true
            }
        }, {
            header: '开始时间',
            dataIndex: 'start_time',
            width: '70%',
            editor: {
                allowBlank: true
            }
        }],
        renderTo: 'div-editor',
        width: '100%',
        height: 400,
        frame: true,
        tbar: [{
            text: 'Add Schedule',
            iconCls: 'schedule-add',
            handler : function() {
                rowEditing.cancelEdit();

                var now = new Date()

                // Create a model instance
                var r = Ext.create('OrderedScheduleModel', {
                    line_name: '',
                    start_time: Ext.Date.format(now, "n/j/Y")
                });

                store.insert(0, r);
                rowEditing.startEdit(0, 0);
            }
        }, {
            itemId: 'removeSchedule',
            text: 'Remove Schedule',
            iconCls: 'schedule-remove',
            handler: function() {
                var sm = grid.getSelectionModel();
                rowEditing.cancelEdit();
                store.remove(sm.getSelection());
                if (store.getCount() > 0) {
                    sm.select(0);
                }
            },
            disabled: true
        }],
        plugins: [rowEditing],
        listeners: {
            'selectionchange': function(view, records) {
                grid.down('#removeSchedule').setDisabled(!records.length);
            }
        }
    });
}

function unorderedScheduleEditor(){
    // Define our data model
    Ext.define('UnorderedScheduleModel',{
        extend: 'Ext.data.Model',
        fields: [
            'line_name',
            { name: 'start_time', type: 'datetime'},// dateFormat: 'm/d/Y' },
            { name: 'end_time', type: 'datetime'}// dateFormat: 'm/d/Y' },
        ]
    });

    // Generate mock employee data
    var data = []

    // create the Data Store
    var store = Ext.create('Ext.data.Store', {
        // destroy the store if the grid is destroyed
        autoDestroy: true,
        model: 'UnorderedScheduleModel',
        proxy: {
            type: 'memory'
        },
        data: data,
        sorters: [{
            property: 'start',
            direction: 'ASC'
        }]
    });

    var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
        clicksToMoveEditor: 1,
        autoCancel: false
    });

    // create the grid and specify what field you want
    // to use for the editor at each column.
    var grid = Ext.create('Ext.grid.GridPanel', {
        store: store,
        columns: [{
            header: '线路',
            dataIndex: 'line_name',
            width: '20%',
            editor: {
                allowBlank: true
            }
        }, {
            header: '开始时间',
            dataIndex: 'start_time',
            width: '40%',
            editor: {
                allowBlank: true
            }
        }, {
            header: '结束时间',
            dataIndex: 'end_time',
            width: '40%',
            editor: {
                allowBlank: true
            }
        }],
        renderTo: 'div-editor',
        width: '100%',
        height: 400,
        frame: true,
        tbar: [{
            text: 'Add Schedule',
            iconCls: 'schedule-add',
            handler : function() {
                rowEditing.cancelEdit();

                var now = new Date()

                // Create a model instance
                var r = Ext.create('UnorderedScheduleModel', {
                    line_name: '',
                    start_time: Ext.Date.format(now, "H:i:s"),
                    end_time: Ext.Date.format(now, "H:i:s")
                });

                store.insert(0, r);
                rowEditing.startEdit(0, 0);
            }
        }, {
            itemId: 'removeSchedule',
            text: 'Remove Schedule',
            iconCls: 'schedule-remove',
            handler: function() {
                var sm = grid.getSelectionModel();
                rowEditing.cancelEdit();
                store.remove(sm.getSelection());
                if (store.getCount() > 0) {
                    sm.select(0);
                }
            },
            disabled: true
        }],
        plugins: [rowEditing],
        listeners: {
            'selectionchange': function(view, records) {
                grid.down('#removeSchedule').setDisabled(!records.length);
            }
        }
    });
}