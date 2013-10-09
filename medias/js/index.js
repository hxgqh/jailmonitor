/**
 * Created with PyCharm.
 * User: xiaoghu
 * Date: 13-10-8
 * Time: PM3:05
 * To change this template use File | Settings | File Templates.
 */

Ext.require([
    'Ext.layout.container.*',
    'Ext.resizer.Splitter',
    'Ext.fx.target.Element',
    'Ext.fx.target.Component',
    'Ext.window.Window',
    'Ext.app.Portlet',
    'Ext.app.PortalColumn',
    'Ext.app.PortalPanel',
    'Ext.app.Portlet',
    'Ext.app.PortalDropZone',
    'Ext.app.GridPortlet',
    'Ext.app.ChartPortlet',
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*',
    'Ext.state.*',
    'Ext.form.*'
]);

Ext.onReady(function(){
    Ext.create('Ext.app.Portal');

    //Get data from backend
//    Ext.get()

    setTimeout('lineEditor()',1000);
});