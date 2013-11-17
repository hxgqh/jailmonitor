/*
* 本文件依赖Raphael.js
* */
// var PatrolAnimate = function(render, data){
//    if(render){
//        this.render = render
//    }
//    else{
//        this.render = ''
//        this.paper = null
//    }
//
//    if(data){
//        this.data = data
//    }
//    else{
//        this.data = {}
//    }
//
//    this.current_point_index = -1
//
//    this.animate_series = []
//
//    this.hover_rect = null
//
//    this.draw = function(){
//        try{
//            var rect_size = 20
//
//            var render$ = $('#'+render)
//            var width = render$[0].clientWidth
//            var height = render$[0].clientHeight
//
//            width = parseInt(parseFloat($('#div-editor-map')[0].clientWidth)*0.59)
//
//            this.paper=Raphael(render, width, height)
//            this.paper.image('/static/images/geograph.png',0,0,width,height)
//    //        var t=paper.text(150,150,"Hello from 陈三");
//
//            var last_p = null
//            var position
//            var arrow_start_x
//            var arrow_start_y
//            for(var i=0;i<data['line'].length;i++){
//                position = data['line'][i]
//
//                var x = parseInt(position['x'])
//                var y = parseInt(position['y'])
//
//                if(i==0){
//                    arrow_start_x = x
//                    arrow_start_y = y
//                }
//
//                // draw line
//                if(last_p){
//                    try{
//                        var start_x = last_p['x']
//                        var start_y = last_p['y']
//                        var path = this.paper.path(
//                            "m"+
//                                (start_x+rect_size/2)+","+
//                                (start_y+rect_size/2)+
//                            "L"+
//                                (x+rect_size/2)+","+
//                                (y+rect_size/2)
//                        )
//                        path.attr('stroke-width', '3px')
//                    }
//                    catch(err){
//                        console.log("this error: 53")
//                    }
//                }
//                last_p = position
//
//                // draw hover rect
//                this.hover_rect = this.paper.rect(0,0,0,0)
//
//                // draw position
//                try{
//                    var p = this.paper.rect(x,y,rect_size,rect_size,0);
//                    p.attr('stroke-width', '3px')
//                    p.attr('stroke', '#ffffff')
//                    p.attr('fill', '#ff0000')
////                    p.attr('class', 'position-div')
//
//                    //draw hover data
////                    p.hover(
////                        function(e){
////                            var item = e
////                            console.log(item)
////                            var hover_x = item.offsetX
////                            var hover_y = item.offsetY
////                            if(item.x > 250){
////                                hover_x = item.x-250
////                            }
////                            if(item.y > 350){
////                                hover_y = item.y-350
////                            }
////                            this.hover_rect = this.paper.rect(hover_x,hover_y,200,200)
////                            this.hover_rect.attr('stroke-width', '3px')
////                            this.hover_rect.attr('stroke', 'rgba(20,20,20,0.6)')
////                            this.hover_rect.attr('fill', 'rgba(255,255,255,0.6)')
////
////                            //append data in rect
////                            var person_name = ''
////                            var position = ''
////                            var arrive_time = ''
////                            var position_card = ''
////                            var status = ''
////                        },
////                        function(){
////                            this.hover_rect.remove()
////                        })
//                }
//                catch(err){
//                    console.log("this error: 40")
//                }
//            }
//        }
//        catch(err){
//            console.log(err)
//        }
////        t.attr({"font-size":"30px","fill":"blue","stroke":"red","opacity":".5"})
//
//        return this
//    }
//
//    this.start = function(){
//        var data = this.data
//
//        var new_els = []
//
//        try{
//            var rect_size = 20
//
//            var render$ = $('#'+render)
//            var width = render$[0].clientWidth
//            var height = render$[0].clientHeight
//
//            width = parseInt(parseFloat($('#div-editor-map')[0].clientWidth)*0.59)
//
//            var last_p = null
//            var position
//            var arrow_start_x
//            var arrow_start_y
//            for(var i=0;i<data['line'].length;i++){
//                position = data['line'][i]
//                console.log(position)
//
//                var x = parseInt(position['x'])
//                var y = parseInt(position['y'])
//
//                if(i==0){
//                    arrow_start_x = x
//                    arrow_start_y = y
//                }
//
//                // draw line
//                if(last_p){
//                    try{
//                        var start_x = last_p['x']+rect_size/2
//                        var start_y = last_p['y']+rect_size/2
//                        var path = this.paper.path(
//                            "m"+
//                                start_x+","+
//                                start_y+
//                            "l0,0"
//                        )
//                        new_els.push(path)
//                        path.attr('stroke-width', '3px')
//                        path.attr('stroke', 'red')
//
//                        var call_back_func = function(){
//                            console.log(this)
//                            //Show position data here
//
//                        }
//
//                        if(i==data['line'].length-1){
//                            call_back_func = function(){
//                                console.log(this)
//                                //Show position data here
//
//                                console.log('remove all animate els')
//                                for(var i=0;i<new_els.length;i++){
//                                    new_els[i].remove()
//                                }
//                            }
//                        }
//
//                        var animation = Raphael.animation({
//                            path: "m"+
//                                start_x+","+
//                                start_y+
//                                "L"+
//                                    (x+rect_size/2)+","+
//                                    (y+rect_size/2)
//                        }, 3e3, call_back_func)
//                        var animate = path.animate(animation.delay((3*i)*1000))
//                        this.animate_series.push(animate)
//                    }
//                    catch(err){
//                        console.log("this error: 53")
//                    }
//                }
//
//                last_p = position
//
//                //draw position
//                try{
//                    var p = this.paper.rect(x,y,rect_size,rect_size,0);
//                    new_els.push(p)
//                    p.attr('stroke-width', '3px')
//                    p.attr('stroke', '#ffffff')
//                    p.attr('fill', '#ff0000')
//                }
//                catch(err){
//                    console.log("this error: 40")
//                }
//            }
//        }
//        catch(err){
//            console.log(err)
//        }
//        return this
//    }
//
//    this.pause = function(){
//        for(var i=0;i<this.animate_series.length;i++){
//            this.animate_series[i].pause()
//        }
//    }
//
//    this.resume = function(){
//        for(var i=0;i<this.animate_series.length;i++){
//            this.animate_series[i].resume()
//        }
//    }
//
//    this.prev = function(){
//
//    }
//
//    this.next = function(){
//
//    }
//
//    return this
//}


$.fn.update_realtime_patrol_table = function(data){
    var t_body$ = $(this.children().eq(1))
    console.log(t_body$)
    var bak_html = t_body$.html()
    t_body$.html('')
    t_body$.html(
        '<tr>' +
            '<td>'+data.arrive_time+'</td>' +
            '<td>'+data.position+'</td>' +
            '<td>'+data.person+'</td>' +
        '</tr>' +
        bak_html
    )
//    t_body$.before(
//        '<tr>' +
//            '<td>'+data.arrive_time+'</td>' +
//            '<td>'+data.position+'</td>' +
//            '<td>'+data.person+'</td>' +
//        '</tr>'
//    )
}


var realtime_paper = null
$.fn.RealTimePatrolAnimate = function(data){
    var ret = this
    try{
//        var render = data.render
//        this.render$ = $('#'+data.render)
        var width = this.clientWidth
        var height = this.clientHeight
        if(! realtime_paper){
            realtime_paper = Raphael(this.attr('id'), width, height)
        }
        this.paper = realtime_paper

        this.new_data = data.new_data
        this.old_data = data.old_data
        this.line_color = data.line_color
        this.person = data.person
    }
    catch(err){
        console.log(err)
    }

    this.start = function(){
        console.log('start')
        if(this.new_data['arrive_time'] != this.old_data['arrive_time']){
            var start_x = parseInt(this.old_data['x'])
            var start_y = parseInt(this.old_data['y'])
            var end_x = parseInt(this.new_data['x'])
            var end_y = parseInt(this.new_data['y'])

            var r_path = this.paper.path('m'+start_x+','+start_y)
            r_path.attr('stroke-width', '6px')
            r_path.attr('stroke', 'red')

            var new_data = this.new_data
            var show_r_path = function(){
                var path_string = 'm'+start_x+','+start_y+' L'+end_x+','+end_y
                this.paper.path({path: path_string})
                // Update real time data in table
                $('#map_info_table').update_realtime_patrol_table(new_data)
            }

            var path_string = 'm'+start_x+','+start_y+' L'+end_x+','+end_y
            console.log(path_string)
            //Create animation here
            var animation = Raphael.animation({path: path_string}, 3e3, show_r_path)
            r_path.animate(animation)
        }
    }

    return ret
}

/*
* @param data: an Array like this {
*       render: render_id,
*       data: {
*           'points': [],
*           'path': []
*       }
* }
* */
$.fn.PatrolAnimate = function(data){
    var ret = this

    try{
        var render = data.render
        this.render$ = $('#'+data.render)
        var width = this.render$[0].clientWidth
        var height = this.render$[0].clientHeight
        this.paper=Raphael(render, width, height)

        this.data = data['data']
        this.animate_series = []
        this.time_rect = this.paper.rect(0,0,300,30,0).attr({
            fill: 'rgba(255,255,255,0.6)',
            'stroke': 'none'
        })

        this.time_text = this.paper.text(200,20,'到达时间')
        this.time_text.attr('font-size', '20px')
    }
    catch(err){
        console.log(err)
    }

    this.draw_positions = function(){
        try{
            var rect_size = 20

            var position
            for(var i=0;i<data.data['points'].length;i++){
                position = data.data['points'][i]
                var x = parseInt(position['x'])
                var y = parseInt(position['y'])

                // draw position
                try{
                    var p = this.paper.rect(x,y,rect_size,rect_size,0);
                    p.attr('stroke-width', '3px')
                    p.attr('stroke', '#ffffff')
                    p.attr('fill', '#ff0000')
                }
                catch(err){
                    console.log("this error: 40")
                }
            }
        }
        catch(err){
            console.log(err)
        }
        return this
    }


    this.register_animate = function(i){
        var path = this.data['paths'][i]
        var path_string = ''
        var last_p = new Array()
        for(var j=0;j<path.length;j++){
            var p = path[j]
            if(j==0){
                path_string = 'm'+p[0]+','+p[1]+' '
            }
            else{
                path_string += 'L'+p[0]+','+p[1]+' '
            }

            if(j==path.length-1){
                last_p = p
            }
        }
        path_string += 'z'

        var points = this.data['points']
        var parent_time_text = this.time_text
        var paths = this.data['paths']

        var show_patrol_current_point_data = function(){
            console.log(path)
            console.log(path[path.length-1])
            var x = path[path.length-1][0]
            var y = path[path.length-1][1]
            console.log(x,y)
            parent_time_text.attr('text', points[x+','+y]['arrive_time'])
        }

        var start_x = path[0][0]
        var start_y = path[0][1]
        var r_path = this.paper.path('m'+start_x+','+start_y)
        r_path.attr('stroke-width', '6px')
        r_path.attr('stroke', 'red')
        //Create animation here
        var animation = Raphael.animation({path: path_string}, 3e3, show_patrol_current_point_data)
        var animate = r_path.animate(animation.delay((3*i)*1000))
        this.animate_series.push(animate)
    }


    this.start = function(){
        try{
            for(var i=0;i<this.data['paths'].length;i++){
                ret.register_animate(i)
            }
        }
        catch(err){
            console.log(err)
        }


        return this
    }

    this.pause = function(){
        for(var i=0;i<this.animate_series.length;i++){
            this.animate_series[i].pause()
        }
    }

    this.resume = function(){
        for(var i=0;i<this.animate_series.length;i++){
            this.animate_series[i].resume()
        }
    }

    this.prev = function(){

    }

    this.next = function(){

    }

    return ret
}

