var init_test_potrol_animate_data = function(){
    var data = {
        'line': {

        },
        'patrol_history': {

        }
    }

    for(var i=0;i<10;i++){
        data['line']['position'+i] = {
            'name': 'line1',
            'order': i+1,
            'position': 'position'+i,
            'position_card': '第'+(i+1)+'张地点卡',
            'x': (i+1)*20,
            'y': (i+1)*20
        }
    }

    for(var i=0;i<7;i++){
        data['patrol_history']['position'+i] = {
            time: '2013-11-07 8:'+(i)*8+':00',
            person: 'person'+(i+1)
        }
    }

    return data
}