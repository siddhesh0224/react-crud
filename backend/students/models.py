from django.db import models

class Student(models.Model):
    fname = models.CharField(max_length=50)
    lname = models.CharField(max_length=50)
    rollno = models.CharField(max_length=20, unique=True)
    age = models.IntegerField()
    class_name = models.CharField(max_length=20)
    grade = models.CharField(max_length=5)

    def __str__(self):
        return f"{self.fname} {self.lname}"
