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
                html: '<img class="logo" src="/static/images/jinhui.png"/>'+'<div class="system-name">智能监狱管理系统</div>'
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

                    items: [{
                        html: content,
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
                                        divEditor.first().remove()
                                    }
                                    catch(err){}

                                    lineEditor()
                                }
                                catch(err){
                                    console.log(err)
                                }
                            }
                        }
                    },{
                        title:'多天计划设置',
                        html: content,
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
                                        divEditor.first().remove()
                                    }
                                    catch(err){}

                                    multiDayScheduleEditor()
                                }
                                catch(err){
                                    console.log(err)
                                }
                            }
                        }
                    },{
                        title:'有顺序计划设置',
                        html: content,
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
                                        divEditor.first().remove()
                                    }
                                    catch(err){}

                                    orderedScheduleEditor()
                                }
                                catch(err){
                                    console.log(err)
                                }
                            }
                        }
                    },{
                        title:'无顺序计划设置',
                        html: content,
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
                                        divEditor.first().remove()
                                    }
                                    catch(err){}

                                    unorderedScheduleEditor()
                                }
                                catch(err){
                                    console.log(err)
                                }
                            }
                        }
                    },{
                        title:'地图设置',
                        html: content,
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
                                        divEditor.first().remove()
                                    }
                                    catch(err){}

                                    //@TODO:Add code here
                                }
                                catch(err){
                                    console.log(err)
                                }
                            }
                        }
                    }]
                },{
                    id: 'app-portal',
                    xtype: 'portalpanel',
                    region: 'center',
                    items: [{
                        id: 'col-1',
                        items: [{
                                id: 'table-editor',
//                                xtype: 'editorgrid',
                                title: '线路设置',
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
