Array.prototype.min = function() {
    var min = this[0];
    var len = this.length;
    for (var i = 1; i < len; i++){
        if (this[i] < min){
        min = this[i];
        }
    }
    return min;
}

//最大值
Array.prototype.max = function() {
    var max = this[0];
    var len = this.length;
    for (var i = 1; i < len; i++){
    if (this[i] > max) {
        max = this[i];
        }
    }
    return max;
}

/**
 * A dict like this :
 * {
 *       0: {
            x: 10,
            y:10
        }
 * }
 */
var position_card_dict = new Array()

/**
 * @param e: click event
 */
function add_position_card(e){
    var render_div$ = $("#div-editor-left")
    var position_table_tbody$ = $($('#map_info_table').children().eq(1))

    var p_x = e.offsetX
    var p_y = e.offsetY

    render_div$.append('<div class="position-div" style="left:'+p_x+'px;top:'+p_y+'px;"></div>')

    var new_id = position_card_dict.length

    console.log('new_id '+new_id)
    console.log(position_card_dict)

    position_card_dict[new_id] = {
        name: '第' + (new_id+1) + '张地点卡',
        x: p_x,
        y: p_y
    }

    position_table_tbody$.append('<tr><td>' +
        '第' + (new_id+1) + '张地点卡' +
        '</td><td>' +
        p_x +
        '</td><td>' +
        p_y +
        '</td></tr>')

    //Send position card to backend
    $.get(
        "/add/positioncard/",
        {
            name: '第' + (new_id+1) + '张地点卡',
            x: p_x,
            y: p_y
        },
        null
    )
}

/*
* Export Persons
* */
function export_persons(){
    var url = '/get/excel/persons/'
    location.href = url;
}

/*
* Export Lines
* */
function export_lines(){
    var url = '/get/excel/lines/'
    location.href = url;
}

/*
* Export Positions
* */
function export_positions(){
    var url = '/get/excel/positions/'
    location.href = url;
}

/*
* Export MultiDaySchedule
* */
function export_multiDaySchedule(){
    var url = '/get/excel/multidayschedule/'
    location.href = url;
}

/*
* Export OrderedSchedule
* */
function export_orderedSchedule(){
    var url = '/get/excel/orderedschedule/'
    location.href = url;
}

/*
* Export UnorderedSchedule
* */
function export_unorderedSchedule(){
    var url = '/get/excel/unorderedschedule/'
    location.href = url;
}

/**
 * Update position card table
 */
function update_position_card_table(){
    $.get(
        "/get/positioncard/",
        null,
        function(data, status){
            position_card_dict = []
            var data = eval(data)
            for(var i=0;i<data.length;i++){
                var item = data[i]
                var render_div$ = $("#div-editor-left")
                var position_table_tbody$ = $($('#map_info_table').children().eq(1))
                position_table_tbody$.append('<tr><td>'+item.name+'</td><td>'+item.x+'</td><td>'+item.y+'</td></tr>')
                position_card_dict.push(item)
                var p_x = item.x
                var p_y = item.y
                render_div$.append('<div class="position-div" style="left:'+p_x+'px;top:'+p_y+'px;"></div>')
            }
        }
    )
}


/**
 * Update mapping table
**/
function update_mapping_table(){
    $.get(
        "/get/position/mapping/",
        null,
        function(data, status){
            var data = eval(data)
            console.log(data)
            var position_mapping_table_tbody$ = $($('#map_info_table').children().eq(1))
            for(var i=0;i<data.length;i++){
                position_mapping_table_tbody$.append(
                    '<tr><td>' +
                    data[i]['position'] +
                    '</td><td>' +
                    data[i]['position_card'] +
                    '</td></tr>')
            }
        }
    )
}


/*
* Update mapping position select
* */
function update_mapping_position_select(){
    $.get(
        "/data/positionData/",
        null,
        function(data, status){
            var data = eval(data)
            console.log("position data:")
            console.log(data)
            var mapping_position_select$ = $('#mapping_position')
            mapping_position_select$.empty()
            for(var i=0;i<data.length;i++){
                mapping_position_select$.append('<option>'+data[i]['position']+'</option>')
            }
        }
    )
}


/*
* Update mapping position card select
* */
function update_mapping_position_card_select(){
    $.get(
        "/get/positioncard/",
        null,
        function(data, status){
            var data = eval(data)
            console.log("position card data:")
            console.log(data)
            var mapping_position_card_select$ = $('#mapping_position_card')
            mapping_position_card_select$.empty()
            for(var i=0;i<data.length;i++){
                mapping_position_card_select$.append('<option>'+data[i]['name']+'</option>')
            }
        }
    )
}


/*
* Confirm mapping
* */
function confirm_mapping(){
    var mapping_position$ = $('#mapping_position')
    var mapping_position_card$ = $('#mapping_position_card')
    var mapping_position = mapping_position$.val()
    var mapping_position_card = mapping_position_card$.val()

    console.log(mapping_position)
    console.log(mapping_position_card)
    var position_mapping_table_tbody$ = $($('#map_info_table').children().eq(1))
    position_mapping_table_tbody$.append(
        '<tr><td>' +
        mapping_position +
        '</td><td>' +
        mapping_position_card +
        '</td></tr>')

    $.get(
        '/add/position/mapping/',
        {
            position: mapping_position,
            position_card: mapping_position_card
        },
        null
    )
}


/*
* Add position card to line
* */
function add_position_card_to_line(position_card){
    console.log('func add_position_card_to_line')
    var line;
}


/*
* update_line_page_position_card_table
* */
function update_line_page_position_card_table(){
    var pc_select$ = $("#add_line_position_card_td_select")
    var line_select$ = $('#add_line_name_td_select')
    line_select$.empty()
    pc_select$.empty()
    $.get(
        "/get/positioncard/",
        null,
        function(data, status){
            data = eval(data)
            for(var i=0;i<data.length;i++){
                pc_select$.append('<option>'+data[i]['name']+'</option>')
            }
        }
    )

    $.get(
        "/data/lineData/",
        null,
        function(data, status){
            console.log(data)
            data = eval(data)
            for(var i=0;i<data.length;i++){
                line_select$.append('<option>'+data[i][0]+'</option>')
            }
        }
    )
}

/*
* add_line
* */
function add_line(){
    var line_input$ = $('#add_line_input')
    var new_line_name = line_input$.val()
    var line_select$ = $('#add_line_name_td_select')
    line_select$.empty()

    var exists_flag = false
    $('#add_line_name_td_select option').each(function(){
        if($(this).val() == new_line_name){
            exists_flag = true
        }
    })

    if(! exists_flag){
        line_select$.append('<option>'+new_line_name+'</option>')
    }
}

/*
* add_line_position_card
* */
function add_line_position_card(){
    var line_select$ = $('#add_line_name_td_select')
    var line = line_select$.val()
    var pc_select$ = $("#add_line_position_card_td_select")
    var position_card = pc_select$.val()
    var next_time_arrival_input$ = $('#add_line_next_time_arrival_td_input')
    var next_time_arrival = parseInt(next_time_arrival_input$.val())
    var order_input$ = $('#add_line_order_td_input')
    var order = order_input$.val()



    $.post(
        "/data/lineData",
        {
            row: {
                name: line,
                position: position_card,
                next_time_arrival: next_time_arrival,
                order: order
            }
        },
        function(data, status){

        }
    )
}

/**
 * @class Ext.app.Portal
 * @extends Object
 * A sample portal layout application class.
 */

Ext.define('Ext.app.Portal', {

    extend: 'Ext.container.Viewport',
    requires: ['Ext.app.PortalPanel', 'Ext.app.PortalColumn', 'Ext.app.GridPortlet', 'Ext.app.ChartPortlet'],

    getTools: function(){
        return [{
            xtype: 'tool',
            type: 'gear',
            handler: function(e, target, header, tool){
                var portlet = header.ownerCt;
                portlet.setLoading('Loading...');
                Ext.defer(function() {
                    portlet.setLoading(false);
                }, 2000);
            }
        }];
    },

    accordionPanelClicked: function(name){
        console.log('accordion panel clicked')
        console.log(name)
        console.log('app.Portal')
    },

    initComponent: function(){
//        var content = '<div class="portlet-content">'+Ext.example.shortBogusMarkup+'</div>';
        var content = '<div class="portlet-content">'+'设置说明'+'</div>';

        Ext.apply(this, {
            id: 'app-viewport',
            layout: {
                type: 'border',
                padding: '0 5 5 5' // pad the layout from the window edges
            },

            items: [{
                id: 'app-header',
                xtype: 'box',
                region: 'north',
                height: 80,
//                html: "智能监狱管理系统",
                html: '<img class="logo" src="/static/images/jinhui.png"/>'+'<div class="system-name">智能监狱管理系统</div><div id="logout"><a href="/logout">退出</a></div>'
            },{
                xtype: 'container',
                region: 'center',
                layout: 'border',

                items: [{
                    id: 'function-nav',
                    title: '功能选项',
                    region: 'west',
                    animCollapse: true,
                    width: 200,
                    minWidth: 150,
                    maxWidth: 400,
                    split: true,
                    collapsible: true,
                    layout:{
                        type: 'accordion',
                        animate: true
                    },

                    items: [
                        {
                            html: '<span id="export_persons" class="btn btn-primary" style="float:left;">导出表格</span>' +
                                '<span id="print_persons" class="btn btn-primary" style="float:right">打印</span>',
//                                '<script type="text/javascript">$("#export_persons").click(function(){export_persons()})</script>',
                            title:'人员设置',
                            autoScroll: true,
                            border: false,
                            iconCls: 'nav',

                            listeners: {
                                expand: function(){
                                    try{
                                        var editor = Ext.getCmp('table-editor')
                                        editor.setTitle("人员设置")

                                        try{
                                            var divEditor = Ext.get('div-editor')
//                                            divEditor.dom.innerHTML=""
                                            divEditor.dom.innerHTML=""
                                        }
                                        catch(err){}

                                        personEditor()

                                        $("#export_persons").click(function(){
                                            export_persons()
                                        })
                                        $('#print_persons').click(function(){
                                            $('#div-editor').jqprint();
                                        })
                                    }
                                    catch(err){
                                        console.log(err)
                                    }
                                }
                            }
                        },
                        {
                            html: '<span id="export_positions" class="btn btn-primary" style="float:left;">导出表格</span>' +
                                '<span id="print_positions" class="btn btn-primary" style="float:right">打印</span>',
                            title:'地点设置',
                            autoScroll: true,
                            border: false,
                            iconCls: 'nav',

                            listeners: {
                                expand: function(){
                                    try{
                                        var editor = Ext.getCmp('table-editor')
                                        editor.setTitle("地点设置")

                                        try{
                                            var divEditor = Ext.get('div-editor')
//                                            console.log(divEditor.first())
                                            divEditor.dom.innerHTML=""
                                        }
                                        catch(err){
                                            console.log(err)
                                        }

                                        positionEditor()

                                        $("#export_positions").click(function(){
                                            export_positions()
                                        })
                                        $('#print_positions').click(function(){
                                            $('#div-editor').jqprint();
                                        })
                                    }
                                    catch(err){
                                        console.log(err)
                                    }
                                }
                            }
                        },
                        {
                            html: '<span id="export_lines" class="btn btn-primary" style="float:left;">导出表格</span>' +
                                '<span id="print_lines" class="btn btn-primary" style="float:right">打印</span>' +
                                '<div id="line_page_position_card_div"><br/>' +
                                '线路名称&nbsp;<input id="add_line_input"></input><span id="add_line_btn" class="btn" style="float:right">增加</span>' +
                                '<table id="line_page_position_card_table" class="table table-striped table-bordered">' +
                                '<thead></thread><tbody>' +
                                '<tr><td>线路名</td><td><select id="add_line_name_td_select" class="selectpicker"></select></td></tr>' +
                                '<tr><td>地点卡</td><td><select id="add_line_position_card_td_select" class="selectpicker"></select></td></tr>' +
                                '<tr><td>下次到达时间</td><td><input id="add_line_next_time_arrival_td_input"></input></td></tr>' +
                                '<td>顺序</td><td><input id="add_line_order_td_input"></input></td>' +
                                '</tbody></table>' +
                                '<span id="add_line_position_card_btn" class="btn btn-primary" style="float:right">增加线路地点卡</span>' +
                                '</div>',
                            title:'线路设置',
                            autoScroll: true,
                            border: false,
                            iconCls: 'nav',

                            listeners: {
                                expand: function(){
                                    try{
                                        var editor = Ext.getCmp('table-editor')
                                        editor.setTitle("线路设置")

                                        try{
                                            var divEditor = Ext.get('div-editor')
//                                            divEditor.dom.innerHTML=""
                                            divEditor.dom.innerHTML=""
                                        }
                                        catch(err){}

                                        lineEditor()

                                        $("#export_lines").click(function(){
                                            export_lines()
                                        })
                                        $('#print_lines').click(function(){
                                            $('#div-editor').jqprint();
                                        })

                                        $('#add_line_position_card_btn').click(function(){
                                            add_line_position_card()
                                        })

//                                        $('#line_page_position_card_div').css(
//                                            'height',
//                                            $('#line_page_position_card_div').parent().height-108
//                                        )
                                        update_line_page_position_card_table()

                                        $('#add_line_btn').click(function(){
                                            add_line()
                                        })
                                    }
                                    catch(err){
                                        console.log(err)
                                    }
                                }
                            }
                        },
                        {
                        title:'多天计划设置',
                        html: '<span id="export_multiDaySchedule" class="btn btn-primary" style="float:left;">导出表格</span>' +
                                '<span id="print_multiDaySchedule" class="btn btn-primary" style="float:right">打印</span>',
                        border: false,
                        autoScroll: true,
                        iconCls: 'nav',

                        listeners: {
                            expand: function(){
                                try{
                                    var editor = Ext.getCmp('table-editor')
                                    editor.setTitle('多天计划设置')

                                    try{
                                        var divEditor = Ext.get('div-editor')
                                        divEditor.dom.innerHTML=""
                                    }
                                    catch(err){}

                                    multiDayScheduleEditor()

                                    $("#export_multiDaySchedule").click(function(){
                                        export_multiDaySchedule()
                                    })
                                    $('#print_multiDaySchedule').click(function(){
                                        $('#div-editor').jqprint();
                                    })
                                }
                                catch(err){
                                    console.log(err)
                                }
                            }
                        }
                    },
                        {
                            title:'有顺序计划设置',
                            html: '<span id="export_orderedSchedule" class="btn btn-primary" style="float:left;">导出表格</span>' +
                                '<span id="print_orderedSchedule" class="btn btn-primary" style="float:right">打印</span>',
                            border: false,
                            autoScroll: true,
                            iconCls: 'nav',

                            listeners: {
                                expand: function(){
                                    try{
                                        var editor = Ext.getCmp('table-editor')
                                        editor.setTitle('有顺序计划设置')

                                        try{
                                            var divEditor = Ext.get('div-editor')
//                                            divEditor.dom.innerHTML=""
                                            divEditor.dom.innerHTML=""
                                        }
                                        catch(err){}

                                        orderedScheduleEditor()

                                        $("#export_orderedSchedule").click(function(){
                                            export_orderedSchedule()
                                        })
                                        $('#print_orderedSchedule').click(function(){
                                            $('#div-editor').jqprint();
                                        })
                                    }
                                    catch(err){
                                        console.log(err)
                                    }
                                }
                            }
                        },
                        {
                        title:'无顺序计划设置',
                        html: '<span id="export_unorderedSchedule" class="btn btn-primary" style="float:left;">导出表格</span>' +
                                '<span id="print_unorderedSchedule" class="btn btn-primary" style="float:right">打印</span>',
                        border: false,
                        autoScroll: true,
                        iconCls: 'nav',

                        listeners: {
                            expand: function(){
                                try{
                                    var editor = Ext.getCmp('table-editor')
                                    editor.setTitle('无顺序计划设置')

                                    try{
                                        var divEditor = Ext.get('div-editor')
//                                        divEditor.dom.innerHTML=""
                                        divEditor.dom.innerHTML=""
                                    }
                                    catch(err){}

                                    unorderedScheduleEditor()

                                    $("#export_unorderedSchedule").click(function(){
                                        export_unorderedSchedule()
                                    })
                                    $('#print_unorderedSchedule').click(function(){
                                        $('#div-editor').jqprint();
                                    })
                                }
                                catch(err){
                                    console.log(err)
                                }
                            }
                        }
                    },
                        {
                            title:'地图设置',
                            html: '',
                            border: false,
                            autoScroll: true,
                            iconCls: 'nav',

                            listeners: {
                                expand: function(){
                                    try{
                                        var editor = Ext.getCmp('table-editor')
                                        editor.setTitle('地图设置')

                                        try{
                                            var divEditor = Ext.get('div-editor')
//                                            divEditor.dom.innerHTML=""
                                            divEditor.dom.innerHTML=""
                                            divEditor.createChild('<div id="div-editor-map">' +
                                                                '<div id="div-editor-left"></div>' +
                                                                '<div id="div-editor-right">' +
                                                                '<span id="change_map" class="btn">更换地图</span>' +
                                                                '<span id="add_position_mapping" class="btn">添加地点映射</span>' +
                                                                '<span id="add_position_card" class="btn">添加地点</span>' +
                                                                '<div style="width:100%;height:380px;overflow-y:auto;">' +
                                                                '<div id="mapping_div" style="width:100%;display:none">' +
                                                                '地点<select id="mapping_position" class="selectpicker"></select>' +
                                                                '地点卡<select id="mapping_position_card" class="selectpicker"></select>' +
                                                                '<span id="mapping_confirm" class="btn">确定</span>' +
                                                                '</div>' +
                                                                '<table id="map_info_table" class="table table-striped table-bordered"></table>' +
                                                                '</div></div></div>')
                                            divEditor.createChild('')
                                            divEditor.createChild('')
                                            Ext.get('div-editor-left').createChild('<img class="geograph" src="/static/images/geograph.png"/>')
                                            $("#map_info_table").append("<thead><td>地点</td><td>x坐标</td><td>y坐标</td></thead><tbody></tbody>")

                                            update_position_card_table()

                                            $('#add_position_card').click(function(){
                                                $('#add_position_card').toggleClass('btn-primary')

                                                if($('#add_position_card').hasClass('btn-primary')){
                                                    $('#div-editor-left').css('cursor', 'pointer')
                                                    $('#div-editor-left').click(function(e){
                                                        add_position_card(e)
                                                    })
                                                }
                                                else{
                                                    $('#div-editor-left').css('cursor', 'default')
                                                    $('#div-editor-left').unbind('click')
                                                    $('#div-editor-left').off('click')
                                                }
                                            })

                                            $('#add_position_mapping').click(function(){
                                                $('#add_position_mapping').toggleClass('btn-primary')
                                                var map_info_table$ = $('#map_info_table')
                                                if($('#add_position_mapping').hasClass('btn-primary')){
                                                    map_info_table$.empty()
                                                    map_info_table$.append("<thead><td>地点</td><td>地点卡</td></thead><tbody></tbody>")
                                                    update_mapping_table()
                                                    update_mapping_position_select()
                                                    update_mapping_position_card_select()
                                                    $('#mapping_div').show()
                                                }
                                                else{
                                                    $('#mapping_div').hide()
                                                    map_info_table$.empty()
                                                    map_info_table$.append("<thead><td>地点</td><td>x坐标</td><td>y坐标</td></thead><tbody></tbody>")
                                                    update_position_card_table()
                                                }
                                            })

                                            $('#mapping_confirm').click(function(){
                                                confirm_mapping()
                                            })
                                        }
                                        catch(err){}
                                    }
                                    catch(err){
                                        console.log(err)
                                    }
                                }
                            }
                        }
                    ]
                },{
                    id: 'app-portal',
                    xtype: 'portalpanel',
                    region: 'center',
                    items: [{
                        id: 'col-1',
                        items: [{
                                id: 'table-editor',
//                                xtype: 'editorgrid',
                                title: '人员设置',
                                html: '<div id="div-editor"></div>'
                            }]
                    }]
                }]
            }]
        });
        this.callParent(arguments);
    },

    onPortletClose: function(portlet) {
        this.showMsg('"' + portlet.title + '" was removed');
    },

    showMsg: function(msg) {
        var el = Ext.get('app-msg'),
            msgId = Ext.id();

        this.msgId = msgId;
        el.update(msg).show();

        Ext.defer(this.clearMsg, 3000, this, [msgId]);
    },

    clearMsg: function(msgId) {
        if (msgId === this.msgId) {
            Ext.get('app-msg').hide();
        }
    }
});
