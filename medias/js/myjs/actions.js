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

function add_temp_hum_position_card(e){
    var render_div$ = $("#div-editor-left")
    var position_table_tbody$ = $($('#map_info_table').children().eq(1))

    var p_x = e.offsetX
    var p_y = e.offsetY

    render_div$.append('<div class="position-div" style="left:'+p_x+'px;top:'+p_y+'px;"></div>')

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
    var pc_select$ = $("#add_line_position_card_td_select")
    var position_card = pc_select$.val()
    var next_time_arrival_input$ = $('#add_line_next_time_arrival_td_input')
    var next_time_arrival = parseInt(next_time_arrival_input$.val())
    var time_error_input$ = $('#add_line_time_error_td_input')
    var time_error = parseInt($('#add_line_time_error_td_input').val())
    var order_input$ = $('#add_line_order_td_input')
    var order = order_input$.val()

    lineStore.add(new Line({
        name: line,
        position: position_card,
        next_time_arrival: next_time_arrival,
        time_error: time_error,
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
            var mds_line_select$ = $("#multi_day_schedule_line_select")
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
            var mds_line_select$ = $("#ordered_schedule_line_select")
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
            var mds_line_select$ = $("#unordered_schedule_line_select")
            for(var i=0;i<data.length;i++){
                mds_line_select$.append('<option>'+data[i]['name']+'</option>')
            }
        }
    )
}


function query_and_show_mds(){
    var select$ = $("#query_result_multi_day_schedule_line_select")
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
function show_result_query_multi_day_schedule(){
    var div_editor$ = $('#div-editor')
    var select$ = $("#query_result_multi_day_schedule_line_select")
    div_editor$.empty()
    div_editor$.append('<div id="query_result"><div>' +
        '<select id="query_result_multi_day_schedule_line_select" style="width:400px !important"></select>' +
        '</div>' +
            '<table class="table table-bordered table-stripped" id="query_result_table">' +
                '<thead><th>地点</th><th>巡检状态</th><th>实到时间</th><th>人员</th><th>事件</th></thead>' +
                '<tbody></tbody>' +
            '</table>' +
        '</div>')

    $.get(
        "/data/multiDayScheduleData",
        null,
        function(data, status){
            data = eval(data)
            console.log("show_result_query_multi_day_schedule")
            //console.log(data)
            var select$ = $("#query_result_multi_day_schedule_line_select")
            for(var i=0;i<data.length;i++){
                select$.append(
                    "<option>" +
                        data[i].line+","+
                        data[i].start_time+','+
                        data[i].end_time+","+
                        data[i].daily_start_time+
                    "</option>"
                )
            }

            query_and_show_mds()
        }
    )

    $('#query_result_multi_day_schedule_line_select').change(function(){
        query_and_show_mds()
    })
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

    $('#query_result input').each(function(){
        $(this).blur(function(){
            if($(this).val() == ''){
                $(this).val('2013-11-02 01:01:01')
            }
        })

        $(this).focus(function(){
            if($(this).val() == '2013-11-02 01:01:01'){
                $(this).val('')
            }
        })
    })

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
                var animate = PatrolAnimate('map_animation', data)
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
    else if(schedule == "有顺序计划"){
        var line = line_data.split(',')[0]
        var start_time = line_data.split(',')[1]
    }
    else{   //无顺序计划
        var line = line_data.split(',')[0]
        var start_time = line_data.split(',')[1]
        var end_time = line_data.split(',')[2]
    }
}


function show_mh(){
    var mss$ = $('#result_query_map_schedule_select')
    var select$ = $("#result_query_map_line_select")
    select$.empty()
    if(mss$.val() == '多天计划'){
        $.get(
            "/data/multiDayScheduleData",
            null,
            function(data, status){
                data = eval(data)
                var select$ = $("#result_query_map_line_select")
                for(var i=0;i<data.length;i++){
                    select$.append(
                        "<option>" +
                            data[i].line+","+
                            data[i].start_time+','+
                            data[i].end_time +','+
                            data[i].daily_start_time +
                        "</option>"
                    )
                }

                query_and_show_mh()
            }
        )
    }
    else if(mss$.val() == "有顺序计划"){
        $.get(
            "/data/orderedScheduleData",
            null,
            function(data, status){
                data = eval(data)
                var select$ = $("#result_query_map_line_select")
                for(var i=0;i<data.length;i++){
                    select$.append(
                        "<option>" +
                            data[i].line+","+
                            data[i].start_time+
                        "</option>"
                    )
                }
                query_and_show_mh()
            }
        )

    }
    else{
        $.get(
            "/data/unorderedScheduleData",
            null,
            function(data, status){
                data = eval(data)
                var select$ = $("#result_query_map_line_select")
                for(var i=0;i<data.length;i++){
                    select$.append(
                        "<option>" +
                            data[i].line+","+
                            data[i].start_time+','+
                            data[i].end_time +
                        "</option>"
                    )
                }
                query_and_show_mh()
            }
        )
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
            divEditor.createChild(
                '<select id="result_query_map_schedule_select" class="selectpicker" style="width:100px !important;">' +
                    '<option>多天计划</option>' +
                    '<option>有顺序计划</option>' +
                    '<option>无顺序计划</option>' +
                '</select>' +
                '<select id="result_query_map_line_select" class="selectpicker" style="width:300px !important"></select>' +
                '<span id="result_query_map_start_btn" class="btn">开始演示</span>' +
                '<span id="result_query_map_pause_btn" class="btn">暂停演示</span>' +
                '<span id="result_query_map_continue_btn" class="btn">继续演示</span>' +
                '<span id="result_query_map_prev_btn" class="btn">前一条</span>' +
                '<span id="result_query_map_next_btn" class="btn">后一条</span>' +
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

            Ext.get('div-editor-left').createChild(
                '<div id="map_container" style="background-image: url(/static/images/geograph.png)">' +
////                    '<img id="map_img" class="geograph" src="/static/images/geograph.png"/>' +
                '</div>' +
                '<div id="map_animation"></div>'
            )

            $('#div-editor-left').width(parseInt(parseFloat($('#div-editor-map').width())*0.59))
            $('#map_container').width($('#div-editor-left').width())
            $('#map_container').height($('#div-editor-left').height() - 30)

            $("#map_info_table").append(
                "<tbody>" +
                    "<tr>" +
                        "<td>姓名：</td><td><input /></td>" +
                    "</tr>" +
                    "<tr>" +
                        "<td>地点：</td><td><input /></td>" +
                    "</tr>" +
                    "<tr>" +
                        "<td>时间：</td><td><input /></td>" +
                    "</tr>" +
                    "<tr>" +
                        "<td>地点编号：</td><td><input /></td>" +
                    "</tr>" +
                    "<tr>" +
                        "<td>状态：</td><td><input /></td>" +
                    "</tr>" +
                "</tbody>")

            show_mh()

            $('#result_query_map_schedule_select').change(function(){
                show_mh()
            })

            $('#result_query_map_line_select').change(function(){
                query_and_show_mh()
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

            show_temperature_humidity('div-editor-left')

            $.get(
                "/data/temperatureHumidityDevice",
                null,
                function(data, status){
                    $('#temp_hum_device_select').empty()
                    var data = eval(data)
                    for(var i=0;i<data.length;i++){
                        $('#temp_hum_device_select').append('<option>'+data[i].position+'</option>')
                    }
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

function show_realtime_temperature_humidity(element){
    $.get(
        "/get/temphumpositioncard",
        null,
        function(data, status){
            var data = eval(data)
            for(var i=0;i<data.length;i++){
                console.log(data)
            }
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

            // auto-fit map_img to parent's width and height
            var img$ = $('#map_img')
            var save_img_width = img$.width()
            var save_img_height = img$.height()
            var width_height_rate = parseFloat(save_img_width)/parseFloat(save_img_height)
            img$.width($(img$.parent()).width())
            if(parseInt(img$.width()/width_height_rate) > img$.height()){
                img$.height($(img$.parent()).height())
            }
            else{
                img$.height(parseInt(img$.width()/width_height_rate))
            }

            show_realtime_temperature_humidity('div-editor-left')
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
//        xAxis: [{
//            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
//                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
//        }],
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
//            {
//                name: '湿度',
//                color: '#4572A7',
//                type: 'spline',
//                yAxis: 1,
//                data: [4.99, 7.15, 10.64, 12.92, 14.40, 17.60, 13.56, 14.85, 21.64, 19.41, 9.56, 5.44],
//                tooltip: {
//                    valuePrefix: '% '
//                }
//            },
//            {
//                name: '温度',
//                color: '#89A54E',
//                type: 'spline',
//                data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
//                tooltip: {
//                    valueSuffix: '°C'
//                }
//            }
        ]
    });

    chart.series.push({
        name: '湿度',
        color: '#4572A7',
        type: 'spline',
        yAxis: 1,
        data: data['temperature'],
        tooltip: {
            valuePrefix: '% '
        }
    })

    chart.series.push({
        name: '温度',
        color: '#89A54E',
        type: 'spline',
        data: data['humidity'],
        tooltip: {
            valueSuffix: '°C'
        }
    })

    return chart
}

/* Show Temperaure and Humidity
* */
function show_temperature_humidity(div_id){
    var parentWidth = $('#'+div_id).width()
    var parentHeight = $('#'+div_id).height()

    //@TODO: get temperature data and show
//    $.get(
//        "",
//
//    )
}

