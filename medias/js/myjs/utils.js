/*This file create some small tricks*/

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


/*
* 在目标上显示鼠标的坐标
* */
$.fn.show_mouse_axis = function(){
    var ret = this

    var tooltip_id = ret.attr('id')+'_tooltip'
    ret.hover(function(e){  //鼠标移上事件
        var tooltipHtml = "<div class='mouse_move_tooltip' id='"+tooltip_id+"'></div>"; //创建提示框

        $(this).parent().append(tooltipHtml); //添加到页面中

        $("#"+tooltip_id).css({
            "top": e.offsetY+ "px",
            "left": e.offsetX + "px"
        }).show("fast"); //设置提示框的坐标，并显示
    }, function(){  //鼠标移出事件
        $("#"+tooltip_id).remove();  //移除弹出框
    }).mousemove(function(e){   //跟随鼠标移动事件
            console.log(e.offsetX+','+ e.offsetY)
            $("#"+tooltip_id).css({
                "top": e.offsetY + 10 + "px",
                "left": e.offsetX + 10 + "px"
            }).html("").html('x:'+ e.offsetX+'; y:'+ e.offsetY)
    });

    return ret
}

function register_show_axis(ele_id){
    var tooltip_id = ele_id+'_tooltip'
    $('#'+ele_id).hover(function(e){  //鼠标移上事件
        var tooltipHtml = "<div class='mouse_move_tooltip' id='"+tooltip_id+"'></div>"; //创建提示框

        $(this).parent().append(tooltipHtml); //添加到页面中

        $("#"+tooltip_id).css({
            "top": e.offsetY+ "px",
            "left": e.offsetX + "px"
        }).show("fast"); //设置提示框的坐标，并显示
    }, function(){  //鼠标移出事件
        $("#"+tooltip_id).remove();  //移除弹出框
    }).mousemove(function(e){   //跟随鼠标移动事件
            console.log(e.offsetX+','+ e.offsetY)
            $("#"+tooltip_id).css({
                "top": e.offsetY + 10 + "px",
                "left": e.offsetX + 10 + "px"
            }).html("").html('x:'+ e.offsetX+'; y:'+ e.offsetY)
    });
}

/*
* 将图片img_id自适应DIV parent_id的宽高
* */
$.fn.img_auto_fit = function(){
    var ret = this
    console.log('func auto_fit_map_img')
    var parent_width = ret.parent().width()

    // auto-fit map_img to parent's width and height

    ret.on('load', function(){
            var save_img_width = $(this)[0].naturalWidth
            var save_img_height = $(this)[0].naturalHeight
            var width_height_rate = parseFloat(save_img_width)/parseFloat(save_img_height)
            console.log('width_height_rate:'+width_height_rate)

            $(this).height(parent_width)
            var target_width = parseInt($(this).height()*width_height_rate)

            if(target_width > parent_width){
                $(this).width(parent_width)
                $(this).height(parseInt($(this).width()/width_height_rate))
            }
            else{
                $(this).width(target_width)
            }
        }
    )

    return ret
}

function auto_fit_img(img_id, parent_id){
    console.log('func auto_fit_map_img')
    var parent_width = $('#'+parent_id).width()

    // auto-fit map_img to parent's width and height
    var img$ = $('#'+img_id)

    img$.on('load', function(){
            var save_img_width = $(this)[0].naturalWidth
            var save_img_height = $(this)[0].naturalHeight
            console.log($(this))
            var width_height_rate = parseFloat(save_img_width)/parseFloat(save_img_height)
            console.log('width_height_rate:'+width_height_rate)

            $(this).height(parent_width)
            var target_width = parseInt($(this).height()*width_height_rate)

            if(target_width > parent_width){
                $(this).width(parent_width)
                $(this).height(parseInt($(this).width()/width_height_rate))
            }
            else{
                $(this).width(target_width)
            }
        }
    )
}


/*
* 将Input设置默认值
* */
$.fn.set_input_default = function(default_value){
    var ret = this

    console.log('func set_input_default')
    console.log(ret)

    ret.each(function(){
        $(this).val(default_value)
    })

    ret.each(function(){
        $(this).blur(function(){
            if($(this).val() == ''){
                $(this).val(default_value)
            }
        })

        $(this).focus(function(){
            if($(this).val() == default_value){
                $(this).val('')
            }
        })
    })

    return ret
}


function set_input_default(input_jquery_selector, default_value){
    $(input_jquery_selector).each(function(){
        $(this).val(default_value)
    })

    $(input_jquery_selector).each(function(){
        $(this).blur(function(){
            if($(this).val() == ''){
                $(this).val(default_value)
            }
        })

        $(this).focus(function(){
            if($(this).val() == default_value){
                $(this).val('')
            }
        })
    })
}