from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    url(r'^$', 'views.basic.home', name='home'),
    url(r'^data/(.*)$', 'views.basic.data', name='data'),
    # url(r'^storedata/(^\/)*$', 'views.basic.getData', name='getData'),

    #login
    (r'^login/$', 'django.contrib.auth.views.login', {'template_name': 'login.html'}),
    (r'^logout/$', 'django.contrib.auth.views.logout', {'next_page': '/login/'}),
    # url(r'^jailMonitor/', include('jailMonitor.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
)
