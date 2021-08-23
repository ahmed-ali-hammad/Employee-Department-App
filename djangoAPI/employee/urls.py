from django.urls import path
from .views import *




app_name = "employee"

urlpatterns = [
    path("departments/", departmentAPI, name="department"),
    path("employees/", employeeAPI, name="employee"),
    path("employee/save-file/", save_file, name="save_file"),
    # path("department/api/", departmentRestAPI, name="department_rest_api"),
    # path("department/apiview/", APIView.as_view(), name="department_rest_api_view"),
]


