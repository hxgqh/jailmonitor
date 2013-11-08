/*
* 本文件依赖Raphael.js
* */
 var PatrolAnimate = function(render, data){
    if(render){
        this.render = render
    }
    else{
        this.render = ''
    }

    if(data){
        this.data = data
    }
    else{
        this.data = {}
    }

    this.draw = function(){
        try{
            console.log(data)
            var rect_size = 20

            var render$ = $('#'+render)
            var width = render$[0].clientWidth
            var height = render$[0].clientHeight

            width = parseInt(parseFloat($('#div-editor-map')[0].clientWidth)*0.59)

            var paper=Raphael(render, width, height)
            paper.image('/static/images/geograph.png',0,0,width,height)
    //        var t=paper.text(150,150,"Hello from 陈三");

            var last_p = null
            var position
            for(var i=0;i<data['line'].length;i++){
                position = data['line'][i]
                console.log(position)

                var x = parseInt(position['x'])
                var y = parseInt(position['y'])

                // draw line
                if(last_p){
                    try{
                        var start_x = last_p['x']
                        var start_y = last_p['y']
                        var path = paper.path(
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

                // draw position
                try{
                    var p = paper.rect(x,y,rect_size,rect_size,0);
                    p.attr('stroke-width', '3px')
                    p.attr('stroke', '#ffffff')
                    p.attr('fill', '#ff0000')
//                    p.attr('class', 'position-div')
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

    return this
}

PatrolAnimate.prototype.start = function(){

    return this
}

PatrolAnimate.prototype.end = function(){

    return this
}

PatrolAnimate.prototype.continue = function(){

    return this
}

PatrolAnimate.prototype.prev = function(){

}

PatrolAnimate.prototype.next = function(){

}