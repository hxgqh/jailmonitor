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

function personEditor(){
    var model_name = 'Person'

    var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
        clicksToMoveEditor: 1,
        autoCancel: false
    });

    // create the grid and specify what field you want
    // to use for the editor at each column.
    var grid = Ext.create('Ext.grid.GridPanel', {
        store: personStore,
        columns: [{
            header: '号',
            dataIndex: 'person_no',
            width: '15%',
            editor: {
                allowBlank: true
            }
        }, {
            header: '人员',
            dataIndex: 'name',
            width: '15%',
            editor: {
                allowBlank: true
            }
        }, {
            header: '联系方式',
            dataIndex: 'contact',
            width: '25%',
            editor: {
                allowBlank: true
            }
        }, {
            header: '通讯地址',
            dataIndex: 'address',
            width: '45%',
            editor: {
                allowBlank: true
            }
        }],
        renderTo: 'div-editor',
        width: '100%',
        height: 400,
        frame: true,
        tbar: [{
            text: '增加人员',
            iconCls: 'person-add',
            handler : function() {
                rowEditing.cancelEdit();

                // Create a model instance
                var r = Ext.create(model_name, {
                    person_no: '',
                    name: '',
                    contact: '',
                    address: ''
                });

                personStore.autoSync = false
                personStore.insert(0, r);
                rowEditing.startEdit(0, 0);
                personStore.autoSync = true
            }
        }, {
            itemId: 'removePerson',
            text: '删除人员',
            iconCls: 'person-remove',
            handler: function() {
                var sm = grid.getSelectionModel();
                rowEditing.cancelEdit();
                personStore.remove(sm.getSelection());
                if (personStore.getCount() > 0) {
                    sm.select(0);
                }
            },
            disabled: true
        }],
        plugins: [rowEditing],
        listeners: {
            'selectionchange': function(view, records) {
                grid.down('#removePerson').setDisabled(!records.length);
            }
        }
    });
}

function positionEditor(){
    var model_name = 'Position'

    var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
        clicksToMoveEditor: 1,
        autoCancel: false
    });

    // create the grid and specify what field you want
    // to use for the editor at each column.
    var grid = Ext.create('Ext.grid.GridPanel', {
        store: positionStore,
        columns: [{
            header: 'IP地址',
            dataIndex: 'ip',
            width: '15%',
            editor: {
                allowBlank: true
            }
        }, {
            header: 'MAC地址',
            dataIndex: 'mac',
            width: '20%',
            editor: {
                allowBlank: true
            }
        }, {
            header: '地点名称',
            dataIndex: 'position',
            width: '20%',
            editor: {
                allowBlank: true
            }
        }, {
            header: '安装位置',
            dataIndex: 'install_position',
            width: '45%',
            editor: {
                allowBlank: true
            }
        }
//            ,{
//            header: '地点卡',
//            dataIndex: 'position_card',
//            width: '30%',
//            editor: {
//                allowBlank: true
//            }
//        }
        ],
        renderTo: 'div-editor',
        width: '100%',
        height: 400,
        frame: true,
        tbar: [{
            text: '增加地点',
            iconCls: 'position-add',
            handler : function() {
                rowEditing.cancelEdit();

                // Create a model instance
                var r = Ext.create(model_name, {
                    ip: '',
                    mac: '',
                    position: '',
                    install_position: ''
//                    position_card: ''
                });

                positionStore.autoSync = false
                positionStore.insert(0, r);
                rowEditing.startEdit(0, 0);
                positionStore.autoSync = true
            }
        }, {
            itemId: 'removePosition',
            text: '删除地点',
            iconCls: 'position-remove',
            handler: function() {
                var sm = grid.getSelectionModel();
                rowEditing.cancelEdit();
                positionStore.remove(sm.getSelection());
                if (positionStore.getCount() > 0) {
                    sm.select(0);
                }
            },
            disabled: true
        }],
        plugins: [rowEditing],
        listeners: {
            'selectionchange': function(view, records) {
                grid.down('#removePosition').setDisabled(!records.length);
            }
        }
    });
}

function temperatureHumidityEditor(){
    var model_name = 'TemperatureHumidityDevice'

    var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
        clicksToMoveEditor: 1,
        autoCancel: false
    });

    // create the grid and specify what field you want
    // to use for the editor at each column.
    var grid = Ext.create('Ext.grid.GridPanel', {
        store: temperatureHumidityDeviceStore,
        columns: [
            {
                header: 'id',
                dataIndex: 'id',
                width: '0%',
                hidden: true,
                editor: {
                    allowBlank: false
                }
            }, {
                header: 'IP地址',
                dataIndex: 'ip',
                width: '25%',
                editor: {
                    allowBlank: true
                }
            }, {
                header: '温湿度计编号',
                dataIndex: 'device_no',
                width: '25%',
                editor: {
                    allowBlank: true
                }
            }, {
                header: '地点名称',
                dataIndex: 'position',
                width: '50%',
                editor: {
                    allowBlank: true
                }
            }
        ],
        renderTo: 'div-editor',
        width: '100%',
        height: 400,
        frame: true,
        tbar: [{
            text: '增加湿度计',
            iconCls: 'temp-hum-device-add',
            handler : function() {
                rowEditing.cancelEdit();

                var num = temperatureHumidityDeviceStore.getCount()
                // Create a model instance
                var r = Ext.create(model_name, {
                    id: num+1,
                    ip: '',
                    device_no: '',
                    position: ''
                });

                temperatureHumidityDeviceStore.autoSync = false
                temperatureHumidityDeviceStore.insert(0, r);
                rowEditing.startEdit(0, 0);
                temperatureHumidityDeviceStore.autoSync = true
            }
        }, {
            itemId: 'removeTempHum',
            text: '删除温湿度计',
            iconCls: 'temp-hum-remove',
            handler: function() {
                var sm = grid.getSelectionModel();
                rowEditing.cancelEdit();
                temperatureHumidityDeviceStore.remove(sm.getSelection());
                if (temperatureHumidityDeviceStore.getCount() > 0) {
                    sm.select(0);
                }
            },
            disabled: true
        }],
        plugins: [rowEditing],
        listeners: {
            'selectionchange': function(view, records) {
                grid.down('#removeTempHum').setDisabled(!records.length);
            }
        }
    });
}

function lineEditor(){
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
            dataIndex: 'name',
            width: '20%',
            editor: {
                allowBlank: true
            }
        }, {
            header: '地点名称',
            dataIndex: 'position',
            width: '35%',
            editor: {
                allowBlank: true
            }
        }, {
            header: '下次到达时间(/min)',
            dataIndex: 'next_time_arrival',
            width: '15%',
            editor: {
                allowBlank: true
            }
        }, {
            header: '允许时间误差(/min)',
            dataIndex: 'time_error',
            width: '15%',
            editor: {
                allowBlank: true
            }
        },
            {
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
//        tbar: [],
        plugins: [rowEditing],
        listeners: {
            'selectionchange': function(view, records) {
                grid.down('#removeLine').setDisabled(!records.length);
            }
        }
    });
}

function multiDayScheduleEditor(){
    var model_name = 'MultiDayScheduleModel'

    // Generate mock employee data
    var data = []

    var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
        clicksToMoveEditor: 1,
        autoCancel: false
    });

    // create the grid and specify what field you want
    // to use for the editor at each column.
    var grid = Ext.create('Ext.grid.GridPanel', {
        store: multiDayScheduleStore,
        columns: [{
            header: '序号',
            dataIndex: 'no',
            width: '0%',
            hidden: true,
            editor: {
                allowBlank: false
            }
        },{
            header: '线路',
            dataIndex: 'line',
            width: '25%',
            editor: {
                allowBlank: false
            }
        }, {
            header: '开始日期',
            dataIndex: 'start_time',
            width: '20%',
            editor: {
                allowBlank: false
            }
        }, {
            header: '结束日期',
            dataIndex: 'end_time',
            width: '20%',
            editor: {
                allowBlank: false
            }
        }, {
            header: '巡检开始时间',
            dataIndex: 'daily_start_time',
            width: '30%',
            editor: {
                allowBlank: false
            }
        }],
        renderTo: 'div-editor',
        width: '100%',
        height: 400,
        frame: true,
        tbar: [{
            text: '增加计划',
            iconCls: 'schedule-add',
            handler : function() {
                try{
                    rowEditing.cancelEdit();

                    var line_name = $('#multi_day_schedule_line_select').val()
                    console.log(line_name)

                    if(! line_name){
                        return -1;
                    }

                    var now = new Date()

                    var schedule_num = multiDayScheduleStore.getCount()

                    var r = new MultiDayScheduleModel({
                        no: schedule_num+1,
                        line: line_name,
                        start_time: Ext.Date.format(now, "Y-n-j"),
                        end_time: Ext.Date.format(now, "Y-n-j"),
                        daily_start_time: Ext.Date.format(now, "H:i:s")
                    })

//                    var r = Ext.create(model_name, {
//                        no: schedule_num+1,
//                        line: line_name,
//                        start_time: '2013-11-07',
//                        end_time: '2013-11-07',
//                        daily_start_time: '08:00:00'
//                    })

                    multiDayScheduleStore.autoSync = false
                    multiDayScheduleStore.insert(0, r);
                    rowEditing.startEdit(0, 0);
                    multiDayScheduleStore.autoSync = true

//                    rowEditing.addEventListener('update', function(store, record){
//                        console.log('update')
//                        $.post(
//                            '/data/multiDayScheduleData',
//                            {
//                                no: record.get("ID"),
//                                line: record.get('line'),
//                                start_time: record.get('start_time'),
//                                end_time: record.get('end_time'),
//                                daily_start_time: record.get('daily_start_time')
//                            },
//                            null
//                        )
//                    })
                }
                catch(err){
                    console.log(err)
                }
            }
        }, {
            itemId: 'removeSchedule',
            text: '删除计划',
            iconCls: 'schedule-remove',
            handler: function() {
                var sm = grid.getSelectionModel();
                rowEditing.cancelEdit();
                multiDayScheduleStore.remove(sm.getSelection());
                if (multiDayScheduleStore.getCount() > 0) {
                    sm.select(0);
                }
            },
            disabled: true
        }],
        plugins: [rowEditing],
        listeners: {
            'selectionchange': function(view, records) {
                grid.down('#removeSchedule').setDisabled(!records.length);
            },
            'write': function(store,record){
                console.log('update write')
            }
        }
    });
}

function orderedScheduleEditor(){
    var model_name = 'OrderedScheduleModel'

    // Generate mock employee data
    var data = []

    var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
        clicksToMoveEditor: 1,
        autoCancel: false
    });

    // create the grid and specify what field you want
    // to use for the editor at each column.
    var grid = Ext.create('Ext.grid.GridPanel', {
        store: orderedScheduleStore,
        columns: [{
            header: '序号',
            dataIndex: 'no',
            width: '0%',
            hidden: true,
            editor: {
                allowBlank: true
            }
        }, {
            header: '线路',
            dataIndex: 'line',
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
            text: '增加计划',
            iconCls: 'schedule-add',
            handler : function() {
                rowEditing.cancelEdit();

                var now = new Date()

                var no = orderedScheduleStore.getCount()

                var line = $("#ordered_schedule_line_select").val()

                // Create a model instance
                var r = Ext.create(model_name, {
                    no: no+1,
                    line: line,
                    start_time: Ext.Date.format(now, "Y-n-j H:i:s")
                });

                orderedScheduleStore.autoSync = false
                orderedScheduleStore.insert(0, r);
                rowEditing.startEdit(0, 0);
                orderedScheduleStore.autoSync = true
            }
        }, {
            itemId: 'removeSchedule',
            text: '删除计划',
            iconCls: 'schedule-remove',
            handler: function() {
                var sm = grid.getSelectionModel();
                rowEditing.cancelEdit();
                orderedScheduleStore.remove(sm.getSelection());
                if (orderedScheduleStore.getCount() > 0) {
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
    var model_name = 'UnorderedScheduleModel'

    // Generate mock employee data
    var data = []

    var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
        clicksToMoveEditor: 1,
        autoCancel: false
    });

    // create the grid and specify what field you want
    // to use for the editor at each column.
    var grid = Ext.create('Ext.grid.GridPanel', {
        store: unorderedScheduleStore,
        columns: [{
            header: '序号',
            dataIndex: 'no',
            width: '0%',
            hidden: true,
            editor: {
                allowBlank: false
            }
        }, {
            header: '线路',
            dataIndex: 'line',
            width: '20%',
            editor: {
                allowBlank: false
            }
        }, {
            header: '开始时间',
            dataIndex: 'start_time',
            width: '40%',
            editor: {
                allowBlank: false
            }
        }, {
            header: '结束时间',
            dataIndex: 'end_time',
            width: '40%',
            editor: {
                allowBlank: false
            }
        }],
        renderTo: 'div-editor',
        width: '100%',
        height: 400,
        frame: true,
        tbar: [{
            text: '增加计划',
            iconCls: 'schedule-add',
            handler : function() {
                rowEditing.cancelEdit();

                var now = new Date()
                var no = unorderedScheduleStore.getCount()
                var line = $("#unordered_schedule_line_select").val()

                // Create a model instance
                var r = Ext.create(model_name, {
                    no: no+1,
                    line: line,
                    start_time: Ext.Date.format(now, "Y-n-j H:i:s"),
                    end_time: Ext.Date.format(now, "Y-n-j H:i:s")
                });

                unorderedScheduleStore.autoSync = false
                unorderedScheduleStore.insert(0, r);
                rowEditing.startEdit(0, 0);
                unorderedScheduleStore.autoSync = true
            }
        }, {
            itemId: 'removeSchedule',
            text: '删除计划',
            iconCls: 'schedule-remove',
            handler: function() {
                var sm = grid.getSelectionModel();
                rowEditing.cancelEdit();
                unorderedScheduleStore.remove(sm.getSelection());
                if (unorderedScheduleStore.getCount() > 0) {
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