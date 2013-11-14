var persons_setting_html = '<span id="export_persons" class="btn btn-primary" style="float:left;">导出表格</span>' +
                            '<span id="print_persons" class="btn btn-primary" style="float:right">打印</span>'

var positions_setting_html = '<span id="export_positions" class="btn btn-primary" style="float:left;">导出表格</span>' +
                            '<span id="print_positions" class="btn btn-primary" style="float:right">打印</span>'

var lines_setting_html = '<span id="export_lines" class="btn btn-primary" style="float:left;">导出表格</span>' +
                        '<span id="print_lines" class="btn btn-primary" style="float:right">打印</span>' +
                        '<div id="line_page_position_card_div"><br/>' +
                            '线路名称&nbsp;<input id="add_line_input"></input><span id="add_line_btn" class="btn" style="float:right">增加</span><br/>' +
                            '<table id="line_page_position_card_table" class="table table-striped table-bordered">' +
                                '<thead></thread>' +
                                '<tbody>' +
                                    '<tr><td>线路名</td><td><select id="add_line_name_td_select" class="selectpicker"></select></td></tr>' +
                                    '<tr><td>地点卡</td><td><select id="add_line_position_card_td_select" class="selectpicker"></select></td></tr>' +
                                    '<tr><td>下次到达时间</td><td><input id="add_line_next_time_arrival_td_input"></input></td></tr>' +
//                                    '<tr><td>时间误差</td><td><input id="add_line_time_error_td_input"></input></td></tr>' +
                                    '<td>顺序</td><td><input id="add_line_order_td_input"></input></td>' +
                                '</tbody>' +
                            '</table>' +
                            '<span id="add_line_position_card_btn" class="btn btn-primary" style="float:right">增加线路地点卡</span>' +
                        '</div>'

var schedule_setting_html = '<span id="export_multiDaySchedule" class="btn btn-primary" style="float:left;">导出表格</span>' +
                            '<span id="print_multiDaySchedule" class="btn btn-primary" style="float:right">打印</span><br/>' +
                            '<div style="width:100%;float:left"><br/>' +
                                '<select id="schedule_type_select" class="selectpicker" style="width:80% !important;">' +
                                    '<option>多天计划设置</option>' +
                                    '<option>有顺序计划设置</option>' +
                                    '<option>无顺序计划设置</option>' +
                                '</select>' +
                            '</div>' +
                            '<div style="width:100%;float:left"><br/>' +
                                '<select id="schedule_line_select" class="selectpicker" style="width:80% !important;"></select>' +
                            '</div>'

var multi_day_schedule_setting_html = '<span id="export_multiDaySchedule" class="btn btn-primary" style="float:left;">导出表格</span>' +
                                    '<span id="print_multiDaySchedule" class="btn btn-primary" style="float:right">打印</span><br/>' +
                                    '<div style="width:100%;float:left"><br/>' +
                                        '<select id="multi_day_schedule_line_select" class="selectpicker" style="width:80% !important;"></select>' +
                                    '</div>'

var ordered_schedule_setting_html = '<span id="export_orderedSchedule" class="btn btn-primary" style="float:left;">导出表格</span>' +
                                    '<span id="print_orderedSchedule" class="btn btn-primary" style="float:right">打印</span>' +
                                    '<div style="width:100%;float:left"><br/>' +
                                        '<select id="ordered_schedule_line_select" class="selectpicker" style="width:80% !important;"></select>' +
                                    '</div>'

var unordered_schedule_setting_html = '<span id="export_unorderedSchedule" class="btn btn-primary" style="float:left;">导出表格</span>' +
                                    '<span id="print_unorderedSchedule" class="btn btn-primary" style="float:right">打印</span>' +
                                    '<div style="width:100%;float:left"><br/>' +
                                        '<select id="unordered_schedule_line_select" class="selectpicker" style="width:80% !important;"></select>' +
                                    '</div>'

var temp_hum_setting_html = '<span id="export_positions" class="btn btn-primary" style="float:left;">导出表格</span>' +
                            '<span id="print_positions" class="btn btn-primary" style="float:right">打印</span>'

var query_setting_html = '<span id="export_unorderedSchedule" class="btn btn-primary" style="float:left;">导出表格</span>' +
                            '<span id="print_unorderedSchedule" class="btn btn-primary" style="float:right">打印</span>' +
                            '<div style="width:100%;height:100%;overflow-y:auto;float:left"><br/>' +
                                '<span id="result_query_schedule" class="btn result_query">计划查询</span>' +
//                                '<span id="result_query_ordered_schedule" class="btn result_query">有顺序计划查询</span>' +
//                                '<span id="result_query_unordered_schedule" class="btn result_query">无顺序计划查询</span>' +
//                                '<span id="result_query_alarm" class="btn result_query">报警信息查询</span>' +
                                '<span id="result_query_map_history" class="btn result_query">巡检地图历史轨迹查询</span>' +
                                '<span id="result_query_patrol_device_status" class="btn result_query">巡检设备状态查询</span>' +
                                '<span id="result_query_realtime_temperature_humidity" class="btn result_query">实时温湿度查询</span>' +
                                '<span id="result_query_temperature_humidity" class="btn result_query">历史温湿度查询</span>' +
                            '</div>'


function persons_setting_expand(){
    try{
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


function positions_setting_expand(){
    try{
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


function lines_setting_expand(){
           try{
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

function schedule_setting_expand(){
    try{
        multi_day_schedule_setting_expand()

        $('#schedule_type_select').change(function(){
            var schedule_type = $(this).val()
            console.log(schedule_type)
            $('#schedule_line_select').empty()
            if(schedule_type == '多天计划设置'){
                multi_day_schedule_setting_expand()
            }
            else if(schedule_type == '有顺序计划设置'){
                ordered_schedule_expand()
            }
            else{
                unordered_schedule_expand()
            }
        })
    }
    catch(err){
        console.log(err)
    }
}

function multi_day_schedule_setting_expand(){
    try{
        try{
            var editor = Ext.getCmp('table-editor')
            editor.setTitle('多天计划设置')
            var divEditor = Ext.get('div-editor')
            divEditor.dom.innerHTML=""
            $('#div-editor').empty()
        }
        catch(err){}

        multiDayScheduleEditor()

        $("#export_multiDaySchedule").click(function(){
            export_multiDaySchedule()
        })
        $('#print_multiDaySchedule').click(function(){
            $('#div-editor').jqprint();
        })

        update_multi_day_schedule_line_select()
    }
    catch(err){
        console.log(err)
    }
}

function ordered_schedule_expand(){
    try{
        try{
            var editor = Ext.getCmp('table-editor')
            editor.setTitle('有顺序计划设置')
            var divEditor = Ext.get('div-editor')
//                                            divEditor.dom.innerHTML=""
            divEditor.dom.innerHTML=""
            $('#div-editor').empty()
        }
        catch(err){}

        orderedScheduleEditor()

        $("#export_orderedSchedule").click(function(){
            export_orderedSchedule()
        })
        $('#print_orderedSchedule').click(function(){
            $('#div-editor').jqprint();
        })

        update_ordered_schedule_line_select()
    }
    catch(err){
        console.log(err)
    }
}


function unordered_schedule_expand(){
    try{
        try{
            var editor = Ext.getCmp('table-editor')
            editor.setTitle('无顺序计划设置')
            var divEditor = Ext.get('div-editor')
            divEditor.dom.innerHTML=""
            $('#div-editor').empty()
        }
        catch(err){}

        unorderedScheduleEditor()

        $("#export_unorderedSchedule").click(function(){
            export_unorderedSchedule()
        })
        $('#print_unorderedSchedule').click(function(){
            $('#div-editor').jqprint();
        })

        update_unordered_schedule_line_select()
    }
    catch(err){
        console.log(err)
    }
}

function show_temp_hum_map(){
        try{
            var divEditor = Ext.get('div-editor')
//                                            divEditor.dom.innerHTML=""
            divEditor.dom.innerHTML=""
            divEditor.createChild('<div id="div-editor-left">' +
                                    '<div id="div-editor-map"></div>' +
                                '</div>' +
                                '<div id="div-editor-right">' +
                                    '<span id="change_map" class="btn">选择巡检地图</span>' +
                                    '<span style="float:right;" id="upload_map" class="btn">上传地图</span><br/>' +
                                    '<span id="add_position_mapping" class="btn">添加地点映射</span>' +
                                    '<span id="add_position_card" class="btn" style="float:left">添加地点</span>' +
                                    '<div style="width:100%;height:380px;overflow-y:auto;">' +
                                        '<div id="mapping_div" style="width:100%;display:none">' +
                                            '<select id="mapping_position" class="selectpicker"></select>' +
                                            '<select id="mapping_position_card" class="selectpicker"></select>' +
                                            '<span id="mapping_confirm" class="btn">确定</span>' +
                                        '</div>' +
                                        '<table id="map_info_table" class="table table-striped table-bordered"></table>' +
                                    '</div>' +
                                '</div>')
            divEditor.createChild('')
            divEditor.createChild('')
            Ext.get('div-editor-map').createChild('<img id="map_img" class="geograph" src="/static/images/temp_hum_geograph.png"/>')
            $("#map_info_table").append("<thead><td>地点</td><td>x坐标</td><td>y坐标</td></thead><tbody></tbody>")

            auto_fit_map_img('map_img')

            update_temp_hum_position_card_table()

            $('#change_map').click(function(){
                map_setting_expand()
            })

            $('#add_position_card').click(function(){
                $('#add_position_card').toggleClass('btn-primary')

                if($('#add_position_card').hasClass('btn-primary')){
                    $('#div-editor-left').css('cursor', 'pointer')
                    $('#div-editor-left').click(function(e){
                        add_temp_hum_position_card(e)
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
                    update_temp_hum_mapping_table()
                    update_temp_hum_mapping_position_select()
                    update_temp_hum_mapping_position_card_select()
                    $('#mapping_div').show()
                }
                else{
                    $('#mapping_div').hide()
                    map_info_table$.empty()
                    map_info_table$.append("<thead><td>地点</td><td>x坐标</td><td>y坐标</td></thead><tbody></tbody>")
                    update_temp_hum_position_card_table()
                }
            })

            $('#mapping_confirm').click(function(){
                confirm_temp_hum_mapping()
            })

            $('#upload_map').click(function(){
                upload_map()
            })
        }
        catch(err){}
}

function map_setting_expand(){
    try{
        try{
            var divEditor = Ext.get('div-editor')
//                                            divEditor.dom.innerHTML=""
            divEditor.dom.innerHTML=""
            divEditor.createChild('<div id="div-editor-left">' +
                                    '<div id="div-editor-map"></div>' +
                                '</div>' +
                                '<div id="div-editor-right">' +
                                    '<span id="change_map" class="btn">选择温湿度地图</span>' +
                                    '<span style="float:right;" id="upload_map" class="btn">上传地图</span><br/>' +
                                    '<span id="add_position_mapping" class="btn">添加地点映射</span>' +
                                    '<span id="add_position_card" class="btn" style="float:left">添加地点</span>' +
                                    '<div style="width:100%;height:380px;overflow-y:auto;">' +
                                    '<div id="mapping_div" style="width:100%;display:none">' +
                                        '<select id="mapping_position" class="selectpicker"></select>' +
                                        '<select id="mapping_position_card" class="selectpicker"></select>' +
                                    '<span id="mapping_confirm" class="btn">确定</span>' +
                                    '</div>' +
                                    '<table id="map_info_table" class="table table-striped table-bordered"></table>' +
                                '</div>'
                )
            Ext.get('div-editor-map').createChild('<img id="map_img" class="geograph" src="/static/images/geograph.png"/>')
            $("#map_info_table").append("<thead><td>地点</td><td>x坐标</td><td>y坐标</td></thead><tbody></tbody>")

            auto_fit_map_img('map_img')

            update_position_card_table()

            $('#change_map').click(function(){
                show_temp_hum_map()
            })

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

            $('#upload_map').click(function(){
                upload_map()
            })
        }
        catch(err){}
    }
    catch(err){
        console.log(err)
    }
}

function temp_hum_setting_expand(){
    try{
        try{
            var divEditor = Ext.get('div-editor')
            divEditor.dom.innerHTML=""
        }
        catch(err){
            console.log(err)
        }

        temperatureHumidityEditor()

        $("#export_positions").click(function(){
            export_temphum_devices()
        })
        $('#print_positions').click(function(){
            $('#div-editor').jqprint();
        })
    }
    catch(err){
        console.log(err)
    }
}


function query_setting_expand(){
    try{
        try{
            var divEditor = Ext.get('div-editor')
//                                        divEditor.dom.innerHTML=""
            divEditor.dom.innerHTML=""
        }
        catch(err){}

        $('span.result_query').each(function(){
                $(this).click(function(){
                    $('span.result_query').removeClass('btn-primary')
                    $(this).toggleClass('btn-primary')
                })
            }
        )

        $('span.result_query').removeClass('btn-primary')
        $('span#result_query_multi_day_schedule').addClass('btn-primary')

//        show_result_query_multi_day_schedule()
        show_result_query_schedule()

        $('#result_query_schedule').click(function(){
//            show_result_query_multi_day_schedule()
            show_result_query_schedule()
        })
//        $('#result_query_ordered_schedule').click(function(){
//            show_result_query_ordered_schedule()
//        })
//        $('#result_query_unordered_schedule').click(function(){
//            show_result_query_unordered_schedule()
//        })
        $('#result_query_alarm').click(function(){
            show_result_query_alarm()
        })
        $('#result_query_map_history').click(function(){
            show_result_query_map_history()
        })
        $('#result_query_patrol_device_status').click(function(){
            show_result_query_patrol_device_status()
        })

        $('#result_query_temperature_humidity').click(function(){
            show_result_query_temperature_humidity()
        })

        $('#result_query_realtime_temperature_humidity').click(function(){
            show_result_realtime_query_temperature_humidity()
        })
    }
    catch(err){
        console.log(err)
    }
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
                            html: persons_setting_html,
                            title:'人员设置',
                            autoScroll: true,
                            border: false,
                            iconCls: 'nav',

                            listeners: {
                                expand: function(){
                                    var editor = Ext.getCmp('table-editor')
                                    editor.setTitle("人员设置")
                                    persons_setting_expand()
                                }
                            }
                        },
                        {
                            html: positions_setting_html,
                            title:'巡检地点设置',
                            autoScroll: true,
                            border: false,
                            iconCls: 'nav',

                            listeners: {
                                expand: function(){
                                    var editor = Ext.getCmp('table-editor')
                                    editor.setTitle("巡检地点设置")
                                    positions_setting_expand()
                                }
                            }
                        },
                        {
                            html: lines_setting_html,
                            title:'线路设置',
                            autoScroll: true,
                            border: false,
                            iconCls: 'nav',

                            listeners: {
                                expand: function(){
                                    var editor = Ext.getCmp('table-editor')
                                    editor.setTitle("线路设置")
                                    lines_setting_expand()
                                }
                            }
                        },
                        {
                            title:'计划设置',
                            html: schedule_setting_html,
                            border: false,
                            autoScroll: true,
                            iconCls: 'nav',

                            listeners: {
                                expand: function(){
//                                    multi_day_schedule_setting_expand()
                                    schedule_setting_expand()
                                }
                            }
                        },
//                        {
//                            title:'有顺序计划设置',
//                            html: ordered_schedule_setting_html,
//                            border: false,
//                            autoScroll: true,
//                            iconCls: 'nav',
//
//                            listeners: {
//                                expand: function(){
//                                    ordered_schedule_expand()
//                                }
//                            }
//                        },
//                        {
//                            title:'无顺序计划设置',
//                            html: unordered_schedule_setting_html,
//                            border: false,
//                            autoScroll: true,
//                            iconCls: 'nav',
//
//                            listeners: {
//                                expand: function(){
//                                    unordered_schedule_expand()
//                                }
//                            }
//                        },
                        {
                            title:'地图设置',
                            html: '',
                            border: false,
                            autoScroll: true,
                            iconCls: 'nav',

                            listeners: {
                                expand: function(){
                                    var editor = Ext.getCmp('table-editor')
                                    editor.setTitle('地图设置')
                                    map_setting_expand()
                                }
                            }
                        },
                        {
                            html: temp_hum_setting_html,
                            title:'温湿度计设置',
                            autoScroll: true,
                            border: false,
                            iconCls: 'nav',

                            listeners: {
                                expand: function(){
                                    var editor = Ext.getCmp('table-editor')
                                    editor.setTitle("温湿度计设置")
                                    temp_hum_setting_expand()
                                }
                            }
                        },
                        {
                            title:'查询',
                            html: query_setting_html,
                            border: false,
                            autoScroll: true,
                            iconCls: 'nav',

                            listeners: {
                                expand: function(){
                                    var editor = Ext.getCmp('table-editor')
                                    editor.setTitle('查询结果')
                                    query_setting_expand()
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
