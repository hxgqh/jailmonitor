var query_map_history_html =
//                            '<select id="result_query_map_schedule_select" class="selectpicker" style="width:100px !important;margin:0px">' +
//                                '<option>多天计划</option>' +
//                                '<option>有顺序计划</option>' +
//                                '<option>无顺序计划</option>' +
//                            '</select>' +
                            '<select id="result_query_map_person_select" class="selectpicker" style="width:100px !important;;margin:0px"></select>' +
                            '<input id="result_query_map_start_date_input" style="width:80px !important;" value="2013-11-02"/>' +
                            '<input id="result_query_map_end_date_input" style="width:80px !important;" value="2013-11-02"/>' +
                            '<input id="result_query_map_start_time_input" style="width:60px !important;" value="08:00:00"/>' +
                            '<input id="result_query_map_end_time_input" style="width:60px !important;" value="20:00:00"/>' +
            //                '<select id="result_query_map_line_select" class="selectpicker" style="width:300px !important"></select>' +
                            '<span id="result_query_map_start_btn" class="btn">开始演示</span>' +
                            '<span id="result_query_map_pause_btn" class="btn">暂停演示</span>' +
                            '<span id="result_query_map_continue_btn" class="btn">继续演示</span>' +
//                            '<span id="result_query_map_prev_btn" class="btn">前一条</span>' +
//                            '<span id="result_query_map_next_btn" class="btn">后一条</span>' +
                            '<span id="upload_path_file_btn" class="btn">上传路径文件</span><br/>' +
                            '<div id="div-editor-left">' +
                                '<div id="div-editor-map">' + // style="background-image: url(/static/images/geograph.png)">' +
                                    '<img id="map_img" class="geograph" src="/static/images/geograph.png"/>' +
                                '</div>' +
                                '<div id="map_animation"></div>' +
                            '</div>' +
                            '<div id="div-editor-right">' +
//                                '<span style="float:right;" id="upload_path_file_btn" class="btn">上传路径文件</span><br/>' +
                                '<table id="map_info_table" class="table table-striped table-bordered">' +
                                    "<tbody>" +
                                        "<tr>" +
                                            "<td>姓名：</td><td><input id='patrol_history_point_person'/></td>" +
                                        "</tr>" +
                                        "<tr>" +
                                            "<td>地点：</td><td><input id='patrol_history_point_position'/></td>" +
                                        "</tr>" +
                                        "<tr>" +
                                            "<td>时间：</td><td><input id='patrol_history_point_arrive_time'/></td>" +
                                        "</tr>" +
                                        "<tr>" +
                                            "<td>地点编号：</td><td><input id='patrol_history_point_position_card'/></td>" +
                                        "</tr>" +
                                    "</tbody>"
                                '</table>' +
                            '</div>'


var query_map_realtime_html =
                            '<div id="div-editor-left">' +
                                    '<img id="map_img" class="geograph" src="/static/images/geograph.png"/>' +
                                '</div>' +
                                '<div id="map_animation"></div>' +
                            '</div>' +
                            '<div id="div-editor-bottom">' +
                                '<table id="map_info_table" class="table table-striped table-bordered">' +
                                    '<thead>' +
                                        '<th>时间</th>' +
                                        '<th>地点</th>' +
                                        '<th>人员</th>' +
                                    '</thead>' +
                                    "<tbody>" +
                                    "</tbody>"
                                '</table>' +
                            '</div>'


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


function upload_map(){
    var change_map_text = $('#change_map').text()
    console.log(change_map_text)

    var map_type = 'temp_hum_map'

    if(change_map_text.indexOf('温湿度') >= 0){    // 当前为巡检地图
		map_type = 'patrol_map'
    }

    $('#upload_map').uploadify({
				'formData'     : {
					map: map_type
				},
                height        : 30,
                swf           : '/static/flash/uploadify.swf',
                width         : 120,
				'uploader' : '/upload/map/',
                'onUploadSuccess' : function(file, data, response) {
                    //Refresh page
                    location.reload()
                }
			});

    $('.uploadify-button-text').html('上传地图')
}


function upload_path_file(){
    $('#upload_path_file_btn').uploadify({
                height        : 30,
                swf           : '/static/flash/uploadify.swf',
                width         : 120,
				'uploader' : '/upload/pathfile/',
                'onUploadSuccess' : function(file, data, response) {
                    //Refresh page
//                    location.reload()
                    show_result_query_map_history()
                }
			});

    $('.uploadify-button-text').html('上传文件')
}


function position_card_mouse_up(element, event){
    var parent$ = $('#div-editor-map')
    var name = $(element).attr('data')
    var map_width = parent$.width()
    var map_height = parent$.height()
    var x = $(element).css('left')
    x = x.replace(/px/,'')
    x = parseInt(x)
    var y = $(element).css('top')
    y = y.replace(/px/,'')
    y = parseInt(y)

    var data = {
        name: name,
        x: x,
        y: y,
        map_width: map_width,
        map_height: map_height
    }

    console.log(data)
    update_position_card(data)
}

function temp_hum_position_card_mouse_up(element, event){
    var parent$ = $('#div-editor-map')
    var name = $(element).attr('data')
    var map_width = parent$.width()
    var map_height = parent$.height()
    var x = $(element).css('left')
    x = x.replace(/px/,'')
    x = parseInt(x)
    var y = $(element).css('top')
    y = y.replace(/px/,'')
    y = parseInt(y)

    var data = {
        name: name,
        x: x,
        y: y,
        map_width: map_width,
        map_height: map_height
    }

    console.log(data)
    update_temp_hum_position_card(data)
}

/**
 * @param e: click event
 */
function add_position_card(e){
    var render_div$ = $("#div-editor-left")
    var position_table_tbody$ = $($('#map_info_table').children().eq(1))

    var p_x = e.offsetX
    var p_y = e.offsetY

    var new_id = position_card_dict.length
    var position_card = '第' + (new_id+1) + '张地点卡'

    console.log('new_id '+new_id)
    console.log(position_card_dict)

    render_div$.append('<div class="position-div" style="left:'+p_x+'px;top:'+p_y+'px;" data="'+position_card+'"></div>')

    var map_img$ = $('#map_img')
    var map_width = map_img$.width()
    var map_height = map_img$.height()

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
            y: p_y,
            map_width: map_width,
            map_height: map_height
        },
        null
    )
}

function update_position_card(data){
    $.get(
        '/update/positioncard/',
        data,
        function(data, status){
            $.get(
                "/get/positioncard/",
                null,
                function(data, status){
                    var position_table_tbody$ = $($('#map_info_table').children().eq(1))
                    position_table_tbody$.empty()
                    var data = eval(data)
                    for(var i=0;i<data.length;i++){
                        var item = data[i]
                        var render_div$ = $("#div-editor-left")
                        position_table_tbody$.append('<tr><td>'+item.name+'</td><td>'+item.x+'</td><td>'+item.y+'</td></tr>')
                    }
                }
            )
        }
    )
}

function update_temp_hum_position_card(data){
    $.get(
        '/update/temphumpositioncard/',
        data,
        function(data, status){
            $.get(
                "/get/temphumpositioncard/",
                null,
                function(data, status){
                    var position_table_tbody$ = $($('#map_info_table').children().eq(1))
                    position_table_tbody$.empty()
                    var data = eval(data)
                    for(var i=0;i<data.length;i++){
                        var item = data[i]
                        var render_div$ = $("#div-editor-left")
                        position_table_tbody$.append('<tr><td>'+item.name+'</td><td>'+item.x+'</td><td>'+item.y+'</td></tr>')
                    }
                }
            )
        }
    )
}


function add_temp_hum_position_card(e){
    var render_div$ = $("#div-editor-left")
    var position_table_tbody$ = $($('#map_info_table').children().eq(1))

    var p_x = e.offsetX
    var p_y = e.offsetY

    render_div$.append('<div class="position-div" style="left:'+p_x+'px;top:'+p_y+'px;"></div>')
    var map_img$ = $('#map_img')
    var map_width = map_img$.width()
    var map_height = map_img$.height()

    var new_id = position_card_dict.length

    console.log('new_id '+new_id)
    console.log(position_card_dict)

    position_card_dict[new_id] = {
        name: '温湿度计' + (new_id+1),
        x: p_x,
        y: p_y
    }

    position_table_tbody$.append('<tr><td>' +
        '温湿度计' + (new_id+1) +
        '</td><td>' +
        p_x +
        '</td><td>' +
        p_y +
        '</td></tr>')

    //Send position card to backend
    $.get(
        "/add/temphumpositioncard/",
        {
            name: '温湿度计' + (new_id+1),
            x: p_x,
            y: p_y,
            map_width: map_width,
            map_height: map_height
        },
        null
    )
}

function update_temp_hum_position_card(data){
    $.get(
        '/update/temphumpositioncard/',
        data,
        function(data, status){
            $.get(
                "/get/temphumpositioncard/",
                null,
                function(data, status){
                    var position_table_tbody$ = $($('#map_info_table').children().eq(1))
                    position_table_tbody$.empty()
                    var data = eval(data)
                    for(var i=0;i<data.length;i++){
                        var item = data[i]
                        var render_div$ = $("#div-editor-left")
                        position_table_tbody$.append('<tr><td>'+item.name+'</td><td>'+item.x+'</td><td>'+item.y+'</td></tr>')
                    }
                }
            )
        }
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
* Export Temperature and Humidity
* */
function export_temphum_devices(){
    var url = '/get/excel/temphumdevices/'
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

function update_position_card_on_map(render_div_id){
    $.get(
        "/get/positioncard/",
        null,
        function(data, status){
            position_card_dict = []
            var data = eval(data)
            for(var i=0;i<data.length;i++){
                var item = data[i]
                var render_div$ = $("#"+render_div_id)
                var p_x = item.x
                var p_y = item.y+28
                var name = item.name
                render_div$.append('<div class="position-div" style="left:'+p_x+'px;top:'+p_y+'px;" data="'+name+'"></div>')
            }

            $('.position-div').show_data_tooltip()
        }
    )
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
//                var name = item.name
                render_div$.append('<div class="position-div" style="left:'+p_x+'px;top:'+p_y+'px;" data="'+item.name+'"></div>')
            }

            $('.position-div').draggable()
            $('.position-div').mouseup(function(e){
                console.log('mouse up')
                position_card_mouse_up(this, e)
            })

            $('.position-div').show_data_tooltip()
        }
    )
}

function update_temp_hum_position_card_table(){
    $.get(
        "/get/temphumpositioncard/",
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
                render_div$.append('<div class="position-div" style="left:'+p_x+'px;top:'+p_y+'px;" data="'+item.name+'"></div>')

                $('.position-div').draggable()
                $('.position-div').mouseup(function(e){
                    console.log('mouse up')
                    temp_hum_position_card_mouse_up(this, e)
                })

                $('.position-div').show_data_tooltip()
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
            //console.log(data)
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

function update_temp_hum_mapping_table(){
    $.get(
        "/get/temphumposition/mapping/",
        null,
        function(data, status){
            var data = eval(data)
            //console.log(data)
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
            //console.log(data)
            var mapping_position_select$ = $('#mapping_position')
            mapping_position_select$.empty()
            for(var i=0;i<data.length;i++){
                mapping_position_select$.append('<option>'+data[i]['position']+'</option>')
            }
        }
    )
}

function update_temp_hum_mapping_position_select(){
    $.get(
        "/data/tempHumDevice/",
        null,
        function(data, status){
            var data = eval(data)
            console.log("position data:")
            //console.log(data)
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
            //console.log(data)
            var mapping_position_card_select$ = $('#mapping_position_card')
            mapping_position_card_select$.empty()
            for(var i=0;i<data.length;i++){
                mapping_position_card_select$.append('<option>'+data[i]['name']+'</option>')
            }
        }
    )
}

function update_temp_hum_mapping_position_card_select(){
    $.get(
        "/get/temphumpositioncard/",
        null,
        function(data, status){
            var data = eval(data)
            console.log("position card data:")
            //console.log(data)
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

function confirm_temp_hum_mapping(){
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
        '/add/temphumposition/mapping/',
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
    var p_select$ = $("#add_line_position_td_select")
    var line_select$ = $('#add_line_name_td_select')
    line_select$.empty()
    p_select$.empty()
    $.get(
        "/data/positionData/",
        null,
        function(data, status){
            data = eval(data)
            for(var i=0;i<data.length;i++){
                p_select$.append('<option>'+data[i]['position']+'</option>')
            }
        }
    )

    $.get(
        "/data/lineData/",
        null,
        function(data, status){
            //console.log(data)
            data = eval(data)
            for(var i=0;i<data.length;i++){
                line_select$.append('<option>'+data[i]['name']+'</option>')
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
    var p_select$ = $("#add_line_position_td_select")
    var position = p_select$.val()
    var next_time_arrival_input$ = $('#add_line_next_time_arrival_td_input')
    var next_time_arrival = parseInt(next_time_arrival_input$.val())
//    var time_error_input$ = $('#add_line_time_error_td_input')
//    var time_error = parseInt($('#add_line_time_error_td_input').val())
    var order_input$ = $('#add_line_order_td_input')
    var order = order_input$.val()

    console.log(line)

    lineStore.add(new Line({
        line: line,
        position: position,
        next_time_arrival: next_time_arrival,
//        time_error: time_error,
        order: order
    }))
}


/*
* update_multi_day_schedule_line_select
* */
function update_multi_day_schedule_line_select(){
    $.get(
        "/data/lineData",
        null,
        function(data, status){
            //console.log(data)
            data = eval(data)
            var mds_line_select$ = $("#schedule_line_select")
            for(var i=0;i<data.length;i++){
                mds_line_select$.append('<option>'+data[i]['name']+'</option>')
            }
        }
    )
}

/*
* update_ordered_schedule_line_select
* */
function update_ordered_schedule_line_select(){
    $.get(
        "/data/lineData",
        null,
        function(data, status){
            //console.log(data)
            data = eval(data)
            var mds_line_select$ = $("#schedule_line_select")
            for(var i=0;i<data.length;i++){
                mds_line_select$.append('<option>'+data[i]['name']+'</option>')
            }
        }
    )
}

/*
* update_unordered_schedule_line_select
* */
function update_unordered_schedule_line_select(){
    $.get(
        "/data/lineData",
        null,
        function(data, status){
            //console.log(data)
            data = eval(data)
            var mds_line_select$ = $("#schedule_line_select")
            for(var i=0;i<data.length;i++){
                mds_line_select$.append('<option>'+data[i]['name']+'</option>')
            }
        }
    )
}


function render_select_person(select_id){
    $.get(
        "/data/personData",
        null,
        function(data, status){
            data = JSON.parse(data)
            var select$ = $('#'+select_id)
            select$.empty()
            for(var i=0;i<data.length;i++){
                select$.append('<option>'+data[i]['name']+'</option>')
            }
        }
    )
}


function query_and_show_mds(){
    var select$ = $("#query_result_multi_day_schedule_line_select")
    if(! select$.val()){
        return 0
    }
    var select_split = select$.val().split(',')
    var select_line_name = select_split[0]
    var start_time = select_split[1]
    var end_time = select_split[2]
    var daily_start_time = select_split[3]

    // Show query result table here
    $.get(
        "/get/query/multidayschedule/",
        {
            line: select_line_name,
            start_time: start_time,
            end_time: end_time,
            daily_start_time: daily_start_time
        },
        function(data, status){
//            //console.log(data)
            var render_table_body$ = $('#query_result_table').children().eq(1)
            render_table_body$.empty()
            try{
                var data = eval(data)
                for(var i=0;i<data.length;i++){
                    if(data[i].status == '未到'){
                        render_table_body$.append(
                            '<tr class="error">' +
                                '<td>'+data[i]['position']+'</td>' +
                                '<td>'+data[i]['status']+'</td>' +
                                '<td>'+data[i]['arrive_time']+'</td>' +
                                '<td>'+data[i]['person']+'</td>' +
                                '<td>'+data[i]['event']+'</td>' +
                            '</tr>'
                        )
                    }
                    else{   //已到
                        render_table_body$.append(
                            '<tr>' +
                                '<td>'+data[i]['position']+'</td>' +
                                '<td>'+data[i]['status']+'</td>' +
                                '<td>'+data[i]['arrive_time']+'</td>' +
                                '<td>'+data[i]['person']+'</td>' +
                                '<td>'+data[i]['event']+'</td>' +
                            '</tr>'
                        )
                    }
                }
            }
            catch(err){
                console.log(err)
            }
        }
    )
}


/*
* show_result_query_multi_day_schedule()
* */
//function show_result_query_multi_day_schedule(){
//    var div_editor$ = $('#div-editor')
//    var select$ = $("#query_result_multi_day_schedule_line_select")
//    div_editor$.empty()
//    div_editor$.append('<div id="query_result"><div>' +
//        '<select id="query_result_multi_day_schedule_line_select" style="width:400px !important"></select>' +
//        '</div>' +
//            '<table class="table table-bordered table-stripped" id="query_result_table">' +
//                '<thead><th>地点</th><th>巡检状态</th><th>实到时间</th><th>人员</th><th>事件</th></thead>' +
//                '<tbody></tbody>' +
//            '</table>' +
//        '</div>')
//
//    $.get(
//        "/data/multiDayScheduleData",
//        null,
//        function(data, status){
//            data = eval(data)
//            console.log("show_result_query_multi_day_schedule")
//            //console.log(data)
//            var select$ = $("#query_result_multi_day_schedule_line_select")
//            for(var i=0;i<data.length;i++){
//                select$.append(
//                    "<option>" +
//                        data[i].line+","+
//                        data[i].start_time+','+
//                        data[i].end_time+","+
//                        data[i].daily_start_time+
//                    "</option>"
//                )
//            }
//
//            query_and_show_mds()
//        }
//    )
//
//    $('#query_result_multi_day_schedule_line_select').change(function(){
//        query_and_show_mds()
//    })
//}

function query(){
    var schedule_type = $('#query_result_schedule_type_select').val()
    var schedule_line = $('#query_result_schedule_line_select').val()
    var start_time = $('#query_result_schedule_start_time_input').val()
    var end_time = $('#query_result_schedule_end_time_input').val()
    var time_error = $('#query_result_schedule_time_error_input').val()
    var position = $('#query_result_schedule_position_input').val()
    var person = $('#query_result_schedule_person_input').val()
    var status = $('#query_result_schedule_status_input').val()

    $.get(
        "/query/",
        {
            schedule_type: schedule_type,
            schedule_line: schedule_line,
            start_time: start_time,
            end_time: end_time,
            time_error: time_error,
            position: position,
            person: person,
            status: status
        },
        function(data, status){
            data = eval(data)
            console.log(data)
            var query_result_table_tbody$ = $($('#query_result_table').children().eq(1))
            query_result_table_tbody$.empty()
            console.log(query_result_table_tbody$)
            for(var i=0;i<data.length;i++){
                if(data[i]['status'].indexOf('未到') >= 0){
                    query_result_table_tbody$.append(
                        '<tr class="error">' +
                            '<td>'+data[i]['position']+'</td>' +
                            '<td>'+data[i]['status']+'</td>' +
                            '<td>'+data[i]['arrive_time']+'</td>' +
                            '<td>'+data[i]['person']+'</td>' +
                            '<td>'+data[i]['event']+'</td>' +
                        '</tr>'
                    )
                }
                else{
                    query_result_table_tbody$.append(
                        '<tr>' +
                            '<td>'+data[i]['position']+'</td>' +
                            '<td>'+data[i]['status']+'</td>' +
                            '<td>'+data[i]['arrive_time']+'</td>' +
                            '<td>'+data[i]['person']+'</td>' +
                            '<td>'+data[i]['event']+'</td>' +
                        '</tr>'
                    )
                }

            }
        }
    )
}

function init_query_options(){
    var schedule_type = $('#query_result_schedule_type_select').val()
    if(schedule_type == '多天计划查询'){
        $.get(
            "/data/multiDayScheduleData",
            null,
            function(data, status){
                data = eval(data)
                $('#query_result_schedule_line_select').empty()
                $('#query_result_schedule_line_select').append('<option>所有</option>')
                for(var i=0;i<data.length;i++){
                    $('#query_result_schedule_line_select').append(
                        '<option>' +
                            data[i].line + ',' +
                            data[i].start_time + ',' +
                            data[i].end_time + ',' +
                            data[i].daily_start_time +
                        '</option>'
                    )
                }
            }
        )
    }
    else if(schedule_type == '有顺序计划查询'){
        $.get(
            "/data/orderedScheduleData",
            null,
            function(data, status){
                data = eval(data)
                $('#query_result_schedule_line_select').empty()
                $('#query_result_schedule_line_select').append('<option>所有</option>')
                for(var i=0;i<data.length;i++){
                    $('#query_result_schedule_line_select').append(
                        '<option>' +
                            data[i].line + ',' +
                            data[i].start_time +
                        '</option>'
                    )
                }
            }
        )
    }
    else{
        $.get(
            "/data/unorderedScheduleData",
            null,
            function(data, status){
                data = eval(data)
                $('#query_result_schedule_line_select').empty()
                $('#query_result_schedule_line_select').append('<option>所有</option>')
                for(var i=0;i<data.length;i++){
                    $('#query_result_schedule_line_select').append(
                        '<option>' +
                            data[i].line + ',' +
                            data[i].start_time + ',' +
                            data[i].end_time +
                        '</option>'
                    )
                }
            }
        )
    }

    set_input_default('#query_result_schedule_start_time_input', '2013-11-02 01:01:01')
    set_input_default('#query_result_schedule_end_time_input', '2013-11-02 01:01:01')

    $.get(
        "/data/positionData",
        null,
        function(data, status){
            data = eval(data)
            $('#query_result_schedule_position_input').empty()
            $('#query_result_schedule_position_input').append('<option>所有</option>')
            for(var i=0;i<data.length;i++){
                $('#query_result_schedule_position_input').append(
                    '<option>' +
                        data[i].position +
                    '</option>'
                )
            }
        }
    )

    $.get(
        "/data/personData",
        null,
        function(data, status){
            data = eval(data)
            $('#query_result_schedule_person_input').empty()
            $('#query_result_schedule_person_input').append('<option>所有</option>')
            for(var i=0;i<data.length;i++){
                $('#query_result_schedule_person_input').append(
                    '<option>' +
                        data[i].name +
                    '</option>'
                )
            }
        }
    )
}

function show_result_query_schedule(){
    var div_editor$ = $('#div-editor')
    div_editor$.empty()
    div_editor$.append('<div id="query_result">' +
                '<span>线路类型：</span>' +
                    '<select id="query_result_schedule_type_select">' +
                        '<option>多天计划查询</option>' +
                        '<option>有顺序计划查询</option>' +
                        '<option>无顺序计划查询</option>' +
                    '</select>' +
                '<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;线路：</span>' +
                    '<select id="query_result_schedule_line_select" style="width:400px !important"></select>' +
                '<br/><br/><span>开始时间：</span>' +
                    '<input id="query_result_schedule_start_time_input" value="2013-11-02 01:01:01"/>' +
                '<span>&nbsp;&nbsp;&nbsp;&nbsp;结束时间：</span>' +
                    '<input id="query_result_schedule_end_time_input" value="2013-11-02 01:01:01"/>' +
                '<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;时间误差（分钟数）：</span>' +
                    '<input id="query_result_schedule_time_error_input" value="8"/>' +
                '<br/><br/><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;地点：</span>' +
                    '<select id="query_result_schedule_position_input"></select>' +
                '<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;人员：</span>' +
                    '<select  id="query_result_schedule_person_input"></select>' +
                '<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;状态：</span>' +
                    '<select id="query_result_schedule_status_input">' +
                        '<option>所有</option>' +
                        '<option>未到</option>' +
                        '<option>已到</option>' +
                    '</select>' +
                '<span id="query" class="btn btn-primary" style="float:right;margin-right:10px;">查询</span>' +
            '<div>' +
        '</div>' +
            '<table class="table table-bordered table-stripped" id="query_result_table">' +
                '<thead><th>地点</th><th>巡检状态</th><th>实到时间</th><th>人员</th><th>事件</th></thead>' +
                '<tbody></tbody>' +
            '</table>' +
        '</div>'
    )

    init_query_options()

    $('#query_result_schedule_type_select').change(function(){
        init_query_options()
    })

    $('#query').click(function(){
        query()
    })

//    $.get(
//        "/data/multiDayScheduleData",
//        null,
//        function(data, status){
//            data = eval(data)
//            console.log("show_result_query_multi_day_schedule")
//            //console.log(data)
//            var select$ = $("#query_result_multi_day_schedule_line_select")
//            for(var i=0;i<data.length;i++){
//                select$.append(
//                    "<option>" +
//                        data[i].line+","+
//                        data[i].start_time+','+
//                        data[i].end_time+","+
//                        data[i].daily_start_time+
//                    "</option>"
//                )
//            }
//
//            query_and_show_mds()
//        }
//    )

//    $('#query_result_multi_day_schedule_line_select').change(function(){
//        query_and_show_mds()
//    })
}

function query_and_show_os(){
    var select$ = $("#query_result_ordered_schedule_line_select")
    var select_split = select$.val().split(',')
    var select_line_name = select_split[0]
    var start_time = select_split[1]

    // Show query result table here
    $.get(
        "/get/query/orderedschedule/",
        {
            line: select_line_name,
            start_time: start_time
        },
        function(data, status){
            //console.log(data)
            var render_table_body$ = $('#query_result_table').children().eq(1)
            render_table_body$.empty()
            try{
                var data = eval(data)
                for(var i=0;i<data.length;i++){
                    if(data[i].status == '未到'){
                        render_table_body$.append(
                            '<tr class="error">' +
                                '<td>'+data[i]['position']+'</td>' +
                                '<td>'+data[i]['status']+'</td>' +
                                '<td>'+data[i]['arrive_time']+'</td>' +
                                '<td>'+data[i]['person']+'</td>' +
                                '<td>'+data[i]['event']+'</td>' +
                            '</tr>'
                        )
                    }
                    else{   //已到
                        render_table_body$.append(
                            '<tr>' +
                                '<td>'+data[i]['position']+'</td>' +
                                '<td>'+data[i]['status']+'</td>' +
                                '<td>'+data[i]['arrive_time']+'</td>' +
                                '<td>'+data[i]['person']+'</td>' +
                                '<td>'+data[i]['event']+'</td>' +
                            '</tr>'
                        )
                    }
                }
            }
            catch(err){
                console.log(err)
            }
        }
    )
}

/*
* show_result_query_ordered_schedule()
* */
function show_result_query_ordered_schedule(){
    var div_editor$ = $('#div-editor')
    div_editor$.empty()
    $('#query_result_table').empty()

    div_editor$.append('<div id="query_result"><div>' +
        '<select id="query_result_ordered_schedule_line_select"></select>' +
        '</div>' +
            '<table class="table table-bordered table-stripped" id="query_result_table">' +
                '<thead><th>地点</th><th>巡检状态</th><th>实到时间</th><th>人员</th><th>事件</th></thead>' +
                '<tbody></tbody>' +
            '</table>' +
        '</div>'
    )

    // Show query result table here
    $.get(
        "/data/orderedScheduleData",
        null,
        function(data, status){
            data = eval(data)
            //console.log(data)
            var select$ = $("#query_result_ordered_schedule_line_select")
            for(var i=0;i<data.length;i++){
                select$.append(
                    "<option>" +
                        data[i].line+","+
                        data[i].start_time +
                    "</option>"
                )
            }

            query_and_show_os()
        }
    )

    $('#query_result_ordered_schedule_line_select').change(function(){
        query_and_show_os()
    })
}


function query_and_show_uos(){
    var select$ = $("#query_result_unordered_schedule_line_select")
    var select_split = select$.val().split(',')
    console.log(select_split)
    var select_line_name = select_split[0]
    var start_time = select_split[1]
    var end_time = select_split[2]

    // Show query result table here
    $.get(
        "/get/query/orderedschedule/",
        {
            line: select_line_name,
            start_time: start_time,
            end_time: end_time
        },
        function(data, status){
            //console.log(data)
            var render_table_body$ = $('#query_result_table').children().eq(1)
            render_table_body$.empty()
            try{
                var data = eval(data)
                for(var i=0;i<data.length;i++){
                    if(data[i].status == '未到'){
                        render_table_body$.append(
                            '<tr class="error">' +
                                '<td>'+data[i]['position']+'</td>' +
                                '<td>'+data[i]['status']+'</td>' +
                                '<td>'+data[i]['arrive_time']+'</td>' +
                                '<td>'+data[i]['person']+'</td>' +
                                '<td>'+data[i]['event']+'</td>' +
                            '</tr>'
                        )
                    }
                    else{   //已到
                        render_table_body$.append(
                            '<tr>' +
                                '<td>'+data[i]['position']+'</td>' +
                                '<td>'+data[i]['status']+'</td>' +
                                '<td>'+data[i]['arrive_time']+'</td>' +
                                '<td>'+data[i]['person']+'</td>' +
                                '<td>'+data[i]['event']+'</td>' +
                            '</tr>'
                        )
                    }
                }
            }
            catch(err){
                console.log(err)
            }
        }
    )
}

/*
* show_result_query_unordered_schedule()
* */
function show_result_query_unordered_schedule(){
    var div_editor$ = $('#div-editor')
    div_editor$.empty()
    div_editor$.append('<div id="query_result"><div>' +
        '<select id="query_result_unordered_schedule_line_select"></select>' +
        '</div>' +
            '<table class="table table-bordered table-stripped" id="query_result_table">' +
                '<thead><th>地点</th><th>巡检状态</th><th>实到时间</th><th>人员</th><th>事件</th></thead>' +
                '<tbody></tbody>' +
            '</table>' +
        '</div>'
    )

    // Show query result table here
    $.get(
        "/data/unorderedScheduleData",
        null,
        function(data, status){
            data = eval(data)
            //console.log(data)
            var select$ = $("#query_result_unordered_schedule_line_select")
            for(var i=0;i<data.length;i++){
                select$.append(
                    "<option>" +
                        data[i].line+","+
                        data[i].start_time+','+
                        data[i].end_time +
                    "</option>"
                )
            }

            query_and_show_uos()
        }
    )

    $('#query_result_unordered_schedule_line_select').change(function(){
        query_and_show_uos()
    })
}

/*
* show_result_query_alarm()
* */
function show_result_query_alarm(){
    var div_editor$ = $('#div-editor')
    div_editor$.empty()
    div_editor$.append('<div id="query_result"><div>' +
        '<select id="query_result_position_select"></select>&nbsp;&nbsp;' +
        '开始时间<input id="query_result_alarm_start_time" value="2013-11-02 01:01:01"></input>' +
        '结束时间<input id="query_result_alarm_end_time" value="2013-11-02 01:01:01"></input>' +
        '</div>' +
            '<table class="table table-bordered table-stripped" id="query_result_table">' +
                '<thead><th>序号</th><th>时间</th><th>地点</th><th>事件</th></thead>' +
                '<tbody></tbody>' +
            '</table>' +
        '</div>'
    )

    $('#query_result input').set_input_default('2013-11-02 01:01:01')

    // Show query result table here
    $.get(
        "/data/unorderedScheduleData",
        null,
        function(data, status){
            data = eval(data)
            //console.log(data)
            var select$ = $("#query_result_unordered_schedule_line_select")
            for(var i=0;i<data.length;i++){
                select$.append(
                    "<option>" +
                        data[i].line+","+
                        data[i].start_time+','+
                        data[i].end_time +
                    "</option>"
                )
            }

            query_and_show_uos()
        }
    )

    $('#query_result_unordered_schedule_line_select').change(function(){
        query_and_show_uos()
    })
}


function query_and_show_mh(){
    var mss$ = $('#result_query_map_schedule_select')
    var select$ = $("#result_query_map_line_select")

    var schedule = mss$.val()
    var line_data = select$.val()

    if(schedule == '多天计划'){
        var line = line_data.split(',')[0]
        var start_time = line_data.split(',')[1]
        var end_time = line_data.split(',')[2]
        var daily_start_time = line_data.split(',')[3]

        $.get(
            "/get/map/multiDayScheduleData",
            {
                line: line,
                start_time: start_time,
                end_time: end_time,
                daily_start_time: daily_start_time
            },
            function(data, status){
                /*
                @param data: a dict is like this
                {
                    line: [
                        {
                            name:
                            order:
                            position:
                            position_card:
                            x:
                            y:
                        }
                    ],
                    patrol_history: [
                        {
                            position1: {
                                time: ''
                                person: ''
                            }
                        }
                    ]
                }
                * */
                data = JSON.parse(data)
//                var animate = PatrolAnimate('map_animation', data)
                var animate = $('#map_animation').PatrolAnimate(data)
                animate.draw()

                $('#result_query_map_start_btn').click(function(){
                    animate.start()
                })

                $('#result_query_map_pause_btn').click(function(){
                    animate.pause()
                })

                $('#result_query_map_continue_btn').click(function(){
                    console.log('continue')
                    animate.resume()
                })
            }
        )
    }
}


var color_array = ['#ffd700', '#ff1493', '#4b0082', '#7cfc00', '#ffa07a']
var realtime_patrol_person_last_time = null   // {person1: {'person':'person1', 'position':'', 'x':'', 'y':'','arrive_time':''}, person2: {}, ...}
var person_color_dict = {}  // {'person1': i}
function realtime_patrol_start(){
    window.setInterval(function(){
        console.log('Refresh real time patrol data')
        $.get(
            "/get/map/patrol/realtime",
            realtime_patrol_person_last_time,
            function(data, status){
                var new_data = JSON.parse(data)
                var old_data = realtime_patrol_person_last_time

                var count = 0
                for(var person in new_data){
                    if(count > 4){
                        count = 0
                    }
                    else{
                        count += 1
                    }
                    if(old_data[person]){
                        var line_color = color_array[person_color_dict[person]]
                        // Show animate
                        console.log('show animate')
                        var animate_data = {
                            old_data: old_data[person],
                            new_data: new_data[person],
                            person: person,
                            line_color:line_color
                        }
                        console.log(animate_data)
                        var animate = $('#map_animation').RealTimePatrolAnimate(animate_data)
                        animate.start()
                    }
                    else{   // New appear person, assign color
                        person_color_dict[person] = count
                    }

//                    // Update real time data in table
//                    update_realtime_patrol_table()
                }

                realtime_patrol_person_last_time = new_data
            }
        )
    }, 5000)
}

function patrol_start(){
//    var mss$ = $('#result_query_map_schedule_select')
//    var schedule = mss$.val()

    var person = $('#result_query_map_person_select').val()
    var start_date = $('#result_query_map_start_date_input').val()
    var end_date = $('#result_query_map_end_date_input').val()
    var start_time = $('#result_query_map_start_time_input').val()
    var end_time = $('#result_query_map_end_time_input').val()

    var url = '/get/schedule/map/history'
    $.get(
        url,
        {
            person: person,
            start_date: start_date,
            end_date: end_date,
            start_time: start_time,
            end_time: end_time
        },
        function(data, status){
            data = JSON.parse(data)
            var animate = $('#map_animation').PatrolAnimate(
                {
                    render: 'map_animation',
                    data: data
                }
            )
            animate.start()

            $('#result_query_map_pause_btn').click(function(){
                animate.pause()
            })

            $('#result_query_map_continue_btn').click(function(){
                console.log('continue')
                animate.resume()
            })
        }
    )
}


function show_result_query_map_realtime(){
    var div_editor$ = $('#div-editor')
    div_editor$.empty()

    try{
        try{
            var divEditor = Ext.get('div-editor')
            divEditor.dom.innerHTML=""
            divEditor.createChild(query_map_realtime_html)

            render_select_person('result_query_map_person_select')

            $('#upload_path_file_btn').click(function(){
                upload_path_file()
            })

            $('#div-editor span.btn').each(function(){
                $(this).click(function(){
                    $('#div-editor span.btn').removeClass('btn-primary')
                    $(this).toggleClass('btn-primary')
                })
            })

            $('#div-editor-left').width(parseInt(parseFloat($('#div-editor').width())*1.0))
            $("#map_img").img_auto_fit()
            $('#div-editor-left').height($("#map_img").height())
            $('#map_animation').width($('#map_img').width())
            $('#map_animation').height($('#map_img').height())

            $('#div-editor').height($('#map_img').height()+$('#div-editor-bottom').height())
            $('#table-editor').height($('#div-editor').height())

            update_position_card_on_map('div-editor-left')

            realtime_paper = null

            realtime_patrol_start()
        }
        catch(err){
            console.log(err)
        }
    }
    catch(err){
        console.log(err)
    }
}

/*
* show_result_query_map_history()
* */
function show_result_query_map_history(){
    var div_editor$ = $('#div-editor')
    div_editor$.empty()

    try{
        try{
            var divEditor = Ext.get('div-editor')
            divEditor.dom.innerHTML=""
            divEditor.createChild(query_map_history_html)

            render_select_person('result_query_map_person_select')

            $('#upload_path_file_btn').click(function(){
                upload_path_file()
            })

            $('#div-editor span.btn').each(function(){
                $(this).click(function(){
                    $('#div-editor span.btn').removeClass('btn-primary')
                    $(this).toggleClass('btn-primary')
                })
            })

            $('#div-editor-left').width(parseInt(parseFloat($('#div-editor').width())*1.0))
            $('#div-editor-right').width(parseInt(parseFloat($('#div-editor').width())*0.0))
            $('#map_animation').width($('#div-editor-left').width())
            $("#map_img").img_auto_fit()

            $('#result_query_map_start_date_input').set_input_default('2013-11-02')
            $('#result_query_map_end_date_input').set_input_default('2013-11-02')
            $('#result_query_map_start_time_input').set_input_default('08:00:00')
            $('#result_query_map_end_time_input').set_input_default('20:00:00')

            update_position_card_on_map('div-editor-left')

            $('#result_query_map_start_btn').click(function(){
                patrol_start()
            })
        }
        catch(err){
            console.log(err)
        }
    }
    catch(err){
        console.log(err)
    }
}


/*
* show_result_query_patrol_device_status()
* */
function show_result_query_patrol_device_status(){
        var div_editor$ = $('#div-editor')
    div_editor$.empty()

    try{
        try{
            var divEditor = Ext.get('div-editor')
            divEditor.dom.innerHTML=""
            divEditor.createChild(
                '<span id="result_query_map_start_btn" class="btn">开始检查设备状态</span>' +
                '<div id="div-editor-map">' +
                    '<div id="div-editor-left"></div>' +
                    '<div id="div-editor-right">' +
                        '<div style="width:100%;height:100%;overflow-y:auto;">' +
                            '<table id="map_info_table" class="table table-striped table-bordered"></table>' +
                        '</div>' +
                    '</div>' +
                '</div>'
            )

            $('#div-editor span.btn').each(function(){
                $(this).click(function(){
                    $('#div-editor span.btn').removeClass('btn-primary')
                    $(this).toggleClass('btn-primary')
                })
            })

            Ext.get('div-editor-left').createChild('<img class="geograph" src="/static/images/geograph.png"/>')
            $("#map_info_table").append(
                "<tbody>" +
                    "<tr>" +
                        "<td>地点：</td><td><input /></td>" +
                    "</tr>" +
                    "<tr>" +
                        "<td>地点编号：</td><td><input /></td>" +
                    "</tr>" +
                    "<tr>" +
                        "<td>状态：</td><td><input /></td>" +
                    "</tr>" +
                "</tbody>")
        }
        catch(err){
            console.log(err)
        }
    }
    catch(err){
        console.log(err)
    }
}


/*
* show_result_query_temperature_humidity()
* */
function show_result_query_temperature_humidity(){
        var div_editor$ = $('#div-editor')
    div_editor$.empty()

    try{
        try{
            var divEditor = Ext.get('div-editor')
            divEditor.dom.innerHTML=""
            divEditor.createChild(
                '<div id="div-editor-map">' +
                    '<div id="div-editor-left"></div>' +
                    '<div id="div-editor-right">' +
                        '温湿度计选择<select id="temp_hum_device_select"></select>' +
                        '<div style="width:100%;height:100%;overflow-y:auto;">' +
                            '<table id="map_info_table" class="table table-striped table-bordered"></table>' +
                        '</div>' +
                    '</div>' +
                '</div>'
            )

            $('#div-editor span.btn').each(function(){
                $(this).click(function(){
                    $('#div-editor span.btn').removeClass('btn-primary')
                    $(this).toggleClass('btn-primary')
                })
            })

            $('#temp_hum_device_select').change(function(){
                show_temperature_humidity('div-editor-left')
            })

            $.get(
                "/data/temperatureHumidityDevice",
                null,
                function(data, status){
                    $('#temp_hum_device_select').empty()
                    var data = eval(data)
                    for(var i=0;i<data.length;i++){
                        $('#temp_hum_device_select').append('<option>'+data[i].position+'</option>')
                    }

                    show_temperature_humidity('div-editor-left')
                }
            )

            $("#map_info_table").append(
                '<thead>' +
                    '<th>地点编号</th>' +
                    '<th>地点</th>' +
                    '<th>时间</th>' +
                    '<th>温度</th>' +
                    '<th>湿度</th>' +
                '</thead>' +
                "<tbody></tbody>")
        }
        catch(err){
            console.log(err)
        }
    }
    catch(err){
        console.log(err)
    }
}

function show_realtime_temperature_humidity(div_id){
    $.get(
        "/get/temphumpositioncard/",
        null,
        function(data, status){
            var render$ = $('#'+div_id)
            var render_width = render$.width()
            var render_height = render$.height()

            console.log("render_width: "+render_width+"render_height: "+render_height)

            var data = eval(data)
            for(var i=0;i<data.length;i++){
                console.log(data)
                var map_width = data[i]['map_width']
                var map_height = data[i]['map_height']
                var p_x = data[i]['x']
                var p_y = data[i]['y']
                console.log(map_width, map_height, p_x, p_y)
                var p_x = parseInt((parseFloat(p_x*render_width))/parseFloat(map_width))
                var p_y = parseInt(parseFloat(p_y*render_height)/parseFloat(map_height))
                console.log('p_x:'+p_x+'; p_y:'+p_y)
                render$.append(
                    '<div class="position-div" style="left:'+p_x+'px;top:'+p_y+'px;" name='+data[i]['name']+'>' +
                    '</div>'
                )
            }

            render$.append(
                '<div id="position_temp_hum_div">' +
                    '<span id="position_temp_hum_div_name" style=""></span><br/>' +
                    '<span id="position_temp_hum_div_temp" style=""></span><br/>' +
                    '<span id="position_temp_hum_div_hum" style=""></span><br/>' +
                '</div>'
            )

            $('.position-div').mouseover(function(e){
                console.log($(this).attr('name'))
                var name = $(this).attr('name')
                console.log(e)
                var position_div$ = $(this)
                $.get(
                    "/get/recent/temphum/",
                    {
                        name: name
                    },
                    function(data, status){
                        //@TODO: Show recent temperature and humidity here
                        data = JSON.parse(data)
                        var position = data['position']
                        var temperature = data['temperature']
                        var humidity = data['humidity']
                        console.log(position_div$)

                        $('#position_temp_hum_div_name').html('温湿度计位置：'+position)
                        $('#position_temp_hum_div_temp').html('温度：'+temperature)
                        $('#position_temp_hum_div_hum').html('湿度：'+humidity)
                        $('#position_temp_hum_div').css('left', position_div$[0].offsetLeft+10)
                        $('#position_temp_hum_div').css('top', position_div$[0].offsetTop+10)
                        $('#position_temp_hum_div').show(500)
                    }
                )
            })

            render$.mouseover(function(e){
                $('#position_temp_hum_div').hide(250)
            })
        }
    )
}


function show_result_realtime_query_temperature_humidity(){
    var div_editor$ = $('#div-editor')
    div_editor$.empty()

    try{
        try{
            var divEditor = Ext.get('div-editor')
            divEditor.dom.innerHTML=""
            divEditor.createChild(
                '<div id="div-editor-map">' +
                    '<img id="map_img" src="/static/images/temp_hum_geograph.png"/>' +
                '</div>'
            )

//            auto_fit_img('map_img', 'div-editor-map')
            $("#map_img").img_auto_fit()

            show_realtime_temperature_humidity('div-editor-map')
        }
        catch(err){
            console.log(err)
        }
    }
    catch(err){
        console.log(err)
    }
}


/*
* @param data: a dict like this
*              {
*                   'temperature': [[], [], []],
*                   'humidity': [[], [], []]
*              }
* */
function draw_temp_hum_chart(div_id, data){
    var chart;
    chart = $('#'+div_id).highcharts({
        chart: {
                zoomType: 'xy'
        },
        title: {
            text: '温湿度查询'
        },
        xAxis: [{
            categories: data['x'],
            type: 'datetime',
            dateTimeLabelFormats: {
                day: '%y-%b-%e %H:%M'
            },
            tickInterval: 3600 * 1000
        }],
        yAxis: [{ // Primary yAxis
            labels: {
                format: '{value}°C',
                style: {
                    color: '#89A54E'
                }
            },
            title: {
                text: '温度',
                style: {
                    color: '#89A54E'
                }
            }
        }, { // Secondary yAxis
            title: {
                text: '湿度',
                style: {
                    color: '#4572A7'
                }
            },
            labels: {
                format: '%{value}',
                style: {
                    color: '#4572A7'
                }
            },
            opposite: true
        }],
        tooltip: {
            shared: true
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            x: 120,
            verticalAlign: 'top',
            y: 100,
            floating: true,
            backgroundColor: '#FFFFFF'
        },
        series: [
            {
                name: '湿度',
                color: '#4572A7',
                type: 'spline',
                yAxis: 1,
                data: data['y']['humidity'],
                tooltip: {
                    valuePrefix: '% '
                }
            },
            {
                name: '温度',
                color: '#89A54E',
                type: 'spline',
                data: data['y']['temperature'],
                tooltip: {
                    valueSuffix: '°C'
                }
            }
        ]
    });
    return chart
}

/* Show Temperaure and Humidity history chart
* */
function show_temperature_humidity(div_id){
    var position = $('#temp_hum_device_select').val()

    $('#div-editor-left').height(600);

    //@TODO: get temperature data and show
    $.get(
        "/data/oneDeviceTemperatureHumidity",
        {
            position: position
        },
        function(data, status){
            try{
                data = JSON.parse(data)
                var chart_data = {
                    x: [],
                    y: {
                        temperature: [],
                        humidity: []
                    }
                }
                for(var i=0;i<data.length;i++){
                    try{
                        chart_data.x.push(data[i]['time'])
                        chart_data.y.temperature.push(data[i]['temperature'])
                        chart_data.y.humidity.push(data[i]['humidity'])
                    }
                    catch(err){
                        console.log(err)
                    }
                }

                draw_temp_hum_chart('div-editor-left', chart_data)
            }
            catch(err){
                console.log(err)
            }
        }
    )
}

