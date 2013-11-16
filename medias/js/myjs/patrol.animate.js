/*
* 本文件依赖Raphael.js
* */
 var PatrolAnimate = function(render, data){
    if(render){
        this.render = render
    }
    else{
        this.render = ''
        this.paper = null
    }

    if(data){
        this.data = data
    }
    else{
        this.data = {}
    }

    this.current_point_index = -1

    this.animate_series = []

    this.hover_rect = null

    this.draw = function(){
        try{
            var rect_size = 20

            var render$ = $('#'+render)
            var width = render$[0].clientWidth
            var height = render$[0].clientHeight

            width = parseInt(parseFloat($('#div-editor-map')[0].clientWidth)*0.59)

            this.paper=Raphael(render, width, height)
            this.paper.image('/static/images/geograph.png',0,0,width,height)
    //        var t=paper.text(150,150,"Hello from 陈三");

            var last_p = null
            var position
            var arrow_start_x
            var arrow_start_y
            for(var i=0;i<data['line'].length;i++){
                position = data['line'][i]

                var x = parseInt(position['x'])
                var y = parseInt(position['y'])

                if(i==0){
                    arrow_start_x = x
                    arrow_start_y = y
                }

                // draw line
                if(last_p){
                    try{
                        var start_x = last_p['x']
                        var start_y = last_p['y']
                        var path = this.paper.path(
                            "m"+
                                (start_x+rect_size/2)+","+
                                (start_y+rect_size/2)+
                            "L"+
                                (x+rect_size/2)+","+
                                (y+rect_size/2)
                        )
                        path.attr('stroke-width', '3px')
                    }
                    catch(err){
                        console.log("this error: 53")
                    }
                }
                last_p = position

                // draw hover rect
                this.hover_rect = this.paper.rect(0,0,0,0)

                // draw position
                try{
                    var p = this.paper.rect(x,y,rect_size,rect_size,0);
                    p.attr('stroke-width', '3px')
                    p.attr('stroke', '#ffffff')
                    p.attr('fill', '#ff0000')
//                    p.attr('class', 'position-div')

                    //draw hover data
//                    p.hover(
//                        function(e){
//                            var item = e
//                            console.log(item)
//                            var hover_x = item.offsetX
//                            var hover_y = item.offsetY
//                            if(item.x > 250){
//                                hover_x = item.x-250
//                            }
//                            if(item.y > 350){
//                                hover_y = item.y-350
//                            }
//                            this.hover_rect = this.paper.rect(hover_x,hover_y,200,200)
//                            this.hover_rect.attr('stroke-width', '3px')
//                            this.hover_rect.attr('stroke', 'rgba(20,20,20,0.6)')
//                            this.hover_rect.attr('fill', 'rgba(255,255,255,0.6)')
//
//                            //append data in rect
//                            var person_name = ''
//                            var position = ''
//                            var arrive_time = ''
//                            var position_card = ''
//                            var status = ''
//                        },
//                        function(){
//                            this.hover_rect.remove()
//                        })
                }
                catch(err){
                    console.log("this error: 40")
                }
            }
        }
        catch(err){
            console.log(err)
        }
//        t.attr({"font-size":"30px","fill":"blue","stroke":"red","opacity":".5"})

        return this
    }

    this.start = function(){
        var data = this.data

        var new_els = []

        try{
            var rect_size = 20

            var render$ = $('#'+render)
            var width = render$[0].clientWidth
            var height = render$[0].clientHeight

            width = parseInt(parseFloat($('#div-editor-map')[0].clientWidth)*0.59)

            var last_p = null
            var position
            var arrow_start_x
            var arrow_start_y
            for(var i=0;i<data['line'].length;i++){
                position = data['line'][i]
                console.log(position)

                var x = parseInt(position['x'])
                var y = parseInt(position['y'])

                if(i==0){
                    arrow_start_x = x
                    arrow_start_y = y
                }

                // draw line
                if(last_p){
                    try{
                        var start_x = last_p['x']+rect_size/2
                        var start_y = last_p['y']+rect_size/2
                        var path = this.paper.path(
                            "m"+
                                start_x+","+
                                start_y+
                            "l0,0"
                        )
                        new_els.push(path)
                        path.attr('stroke-width', '3px')
                        path.attr('stroke', 'red')

                        var call_back_func = function(){
                            console.log(this)
                            //Show position data here

                        }

                        if(i==data['line'].length-1){
                            call_back_func = function(){
                                console.log(this)
                                //Show position data here

                                console.log('remove all animate els')
                                for(var i=0;i<new_els.length;i++){
                                    new_els[i].remove()
                                }
                            }
                        }

                        var animation = Raphael.animation({
                            path: "m"+
                                start_x+","+
                                start_y+
                                "L"+
                                    (x+rect_size/2)+","+
                                    (y+rect_size/2)
                        }, 3e3, call_back_func)
                        var animate = path.animate(animation.delay((3*i)*1000))
                        this.animate_series.push(animate)
                    }
                    catch(err){
                        console.log("this error: 53")
                    }
                }

                last_p = position

                //draw position
                try{
                    var p = this.paper.rect(x,y,rect_size,rect_size,0);
                    new_els.push(p)
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

    return this
}

(function($){
    /*
    * @param data: an Array like this {
    *       render: render_id,
    *       data: {
    *           'points': [],
    *           'path': []
    *       }
    * }
    * */
    $.PatrolAnimate = function(data){
        var ret = this

        var current_point_index = -1

        var animate_series = []

        var hover_rect = null

        this.draw_positions = function(){
            try{
                var rect_size = 20

                var render$ = $('#'+data.render)
                var width = render$[0].clientWidth
                var height = render$[0].clientHeight
//                var width = parseInt(parseFloat(render$.parent()[0].clientWidth)*0.59)

                this.paper=Raphael(render, width, height)

                var last_p = null
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

        this.start = function(){
            for(var i=0;i<data['paths'].length;i++){
                var path = data['path'][i]
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

                /*
                *
                * */
                var show_patrol_current_point_data= function(){
                    var last_p_data = data['points'][last_p[0]+','+last_p[1]]
                    var item_list = ['person', 'position', 'position_card', 'arrive_time']
                    for(var i=0;i<item_list.length;i++){
                        $('#patrol_history_point_'+item_list[i]).val(last_p_data[item_list[i]])
                    }
                }

                //Create animation here
                var animation = Raphael.animation({path: path}, 3e3, show_patrol_current_point_data)
                var animate = path.animate(animation.delay((3*i)*1000))
                this.animate_series.push(animate)
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
})(jQuery)

