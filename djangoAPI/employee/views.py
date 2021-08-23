from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
from .serializers import *
from .models import *
import json

from django.core.files.storage import default_storage

# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from rest_framework.views import APIView


@csrf_exempt
def departmentAPI(request):
    if request.method == "GET":
        query_set = Department.objects.all()
        serializer = DepartmentSerializer(query_set, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == "POST":
        data = json.loads(request.body)
        serializer = DepartmentSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
        else:
            return JsonResponse({"Message": "data is not valid"}, safe=False)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == "PUT":
        data = json.loads(request.body)
        try:
            department_id = data.get("department_id")
        except:
            return JsonResponse({"message": "No id is passed"})
        department = Department.objects.get(department_id=department_id)
        serializer = DepartmentSerializer(instance=department, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, safe=False)
        return JsonResponse({"Message": "data is not valid"}, safe=False)
    elif request.method == "DELETE":
        department_id = json.loads(request.body).get("department_id")
        department = Department.objects.filter(department_id=department_id)
        if len(department) == 1:
            department[0].delete()
            return JsonResponse({"Message": "Department deleted"}, safe=False)
        return JsonResponse({"Message": "Department doesn't exsist"}, safe=False)


@csrf_exempt
def employeeAPI(request):
    if request.method == "GET":
        query_set = Employee.objects.all()
        serializer = EmployeeSerializer(query_set, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == "POST":
        data = json.loads(request.body)
        department = Department.objects.get(department_name=data["department"])
        data.pop("department")
        serializer = EmployeeSerializer(data=data, partial=True)
        if serializer.is_valid():
            serializer.save(department=department)
        else:
            return JsonResponse({"Message": "data is not valid"}, safe=False)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == "PUT":
        data = json.loads(request.body)
        try:
            employee_id = data.get("employee_id")
        except:
            return JsonResponse({"message": "No id is passed"})
        employee = Employee.objects.get(employee_id=employee_id)
        department = Department.objects.get(department_name=data["department"])
        data.pop("department")
        serializer = EmployeeSerializer(instance=employee, data=data, partial=True)
        if serializer.is_valid():
            serializer.save(department=department)
            return JsonResponse(serializer.data, safe=False)
        return JsonResponse({"Message": "data is not valid"}, safe=False)
    elif request.method == "DELETE":
        employee_id = json.loads(request.body).get("employee_id")
        employee = Employee.objects.filter(employee_id=employee_id)
        if len(employee) == 1:
            employee[0].delete()
            return JsonResponse({"Message": "Employee deleted"}, safe=False)
        return JsonResponse({"Message": "Employee doesn't exsist"}, safe=False)


@csrf_exempt
def save_file(request):
    print(request)
    file = request.FILES["myFile"]
    print(file)
    file_name = default_storage.save(file.name, file)
    return JsonResponse(file_name, safe=False)


# @api_view(["GET", "POST"])
# def departmentRestAPI(request):
#     if request.method == "GET":
#         query_set = Department.objects.all()
#         serializer = DepartmentSerializer(query_set, many=True)
#         return Response(serializer.data)
#     elif request.method == "POST":
#         serializer = DepartmentSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#         else:
#             return Response({"Message": "data is not valid"})
#         return Response(serializer.data)


# class APIView(APIView):
#     def get(self, request):
#         query_set = Department.objects.all()
#         serializer = DepartmentSerializer(query_set, many=True)
#         return Response(serializer.data)

#     def post(self, request):
#         serializer = DepartmentSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#         else:
#             return Response({"Message": "data is not valid"})
#         return Response(serializer.data)
