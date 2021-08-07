from django.db import models


class Department(models.Model):
    department_id = models.AutoField(primary_key=True)
    department_name = models.CharField(max_length=100)

    def __str__(self):
        return self.department_name

    class Meta:
        verbose_name = "Department"


class Employee(models.Model):
    employee_id = models.AutoField(primary_key=True)
    employee_name = models.CharField(max_length=100)
    # department = models.ForeignKey(Department, on_delete=models.CASCADE)
    department = models.CharField(max_length=100)
    date_of_joining = models.DateField(auto_now_add=True)
    photo_file_name = models.CharField(max_length=100)

    def __str__(self):
        return self.employee_name

    class Meta:
        verbose_name = "Employee"
