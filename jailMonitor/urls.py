from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    url(r'^$', 'views.basic.home', name='home'),
    url(r'^data/(.*)$', 'views.basic.data', name='data'),

    url(r'^add/positioncard/$', 'positions.views.add_position_card'),
    url(r'^update/positioncard/$', 'positions.views.update_position_card'),
    url(r'^add/temphumpositioncard/$', 'temphum.views.add_temp_hum_position_card'),
    url(r'^update/temphumpositioncard/', 'temphum.views.update_temp_hum_position_card'),
    url(r'^get/positioncard/$', 'positions.views.get_position_card'),
    url(r'^get/temphumpositioncard/$', 'temphum.views.get_temp_hum_position_card'),
    url(r'^get/position/mapping/$', 'positions.views.get_position_mapping'),
    url(r'^get/temphumposition/mapping/$', 'temphum.views.get_temp_hum_position_mapping'),
    url(r'^add/position/mapping/$', 'positions.views.add_position_mapping'),
    url(r'^add/temphumposition/mapping/.*$', 'temphum.views.add_temp_hum_position_mapping'),
    # url(r'^storedata/(^\/)*$', 'views.basic.getData', name='getData'),
    url(r'^get/excel/persons/$', 'persons.views.get_persons_excel', name="createPersonsExcel"),
    url(r'^get/excel/lines/$', 'lines.views.get_lines_excel', name="getLinesExcel"),
    url(r'^get/excel/positions/$', 'positions.views.get_positions_excel', name="getPositionsExcel"),
    url(r'/get/excel/temphumdevices/', 'temphum.views.get_temp_hum_devices_excel', name="getTempHumDevicesExcel"),
    url(r'^get/excel/multidayschedule/$', 'schedules.views.get_multi_day_schedule_excel', name="getMultiDayScheduleExcel"),
    url(r'^get/excel/orderedschedule/$', 'schedules.views.get_ordered_schedule_excel', name="getOrderedScheduleExcel"),
    url(r'^get/excel/unorderedschedule/$', 'schedules.views.get_unordered_schedule_excel', name="getUnorderedScheduleExcel"),

    url(r"^get/recent/temphum/", 'temphum.views.get_recent_temphum'),

    # Result query
    url(r"^get/query/multidayschedule/$", 'schedules.views.get_query_multi_day_schedule'),
    url(r"^get/query/orderedschedule/$", 'schedules.views.get_query_ordered_schedule'),
    url(r"^get/query/unorderedschedule/$", 'schedules.views.get_query_unordered_schedule'),
    # url(r"^get/query/alarm/$", 'schedules.views.get_query_multi_day_schedule'),
    # url(r"^get/query/multidayschedule/$", 'schedules.views.get_query_multi_day_schedule'),
    # url(r"^get/query/multidayschedule/$", 'schedules.views.get_query_multi_day_schedule'),
    # url(r"^get/query/multidayschedule/$", 'schedules.views.get_query_multi_day_schedule'),
    url(r"^get/map/multiDayScheduleData.*$", 'schedules.views.get_map_multi_day_schedule'),

    url(r'^upload/map/$', 'views.basic.upload_map'),

    #login
    url(r'^login/$', 'django.contrib.auth.views.login', {'template_name': 'login.html'}),
    url(r'^logout/$', 'django.contrib.auth.views.logout', {'next_page': '/login/'}),
    # url(r'^jailMonitor/', include('jailMonitor.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
)
