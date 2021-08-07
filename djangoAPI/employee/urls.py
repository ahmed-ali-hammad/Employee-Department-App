from django.urls import path
from .views import *

from django.conf.urls.static import static
from django.conf import settings

app_name = "employee"

urlpatterns = [
    path("department/", departmentAPI, name="department"),
    path("employee/", employeeAPI, name="employee"),
    path("employee/save-file/", save_file, name="save_file"),
    # path("department/api/", departmentRestAPI, name="department_rest_api"),
    # path("department/apiview/", APIView.as_view(), name="department_rest_api_view"),
]
