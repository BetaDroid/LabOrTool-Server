from flask import request
from . import api
from .. import mysql
from ..models.employee import Employee
from ..decorators import json, paginate


@api.route('/employees/', methods=['GET'])
@json
@paginate('Employees')
def get_employees():
    return Employee.query


@api.route('/employees/<int:id>', methods=['GET'])
@json
def get_employee(id):
    return Employee.query.get_or_404(id)


@api.route('/employees/', methods=['POST'])
@json
def new_employee():
    employee = Employee()
    employee.import_data(request.json)
    mysql.session.add(employee)
    mysql.session.commit()
    return {}, 201


@api.route('/employees/<int:id>', methods=['PUT'])
@json
def edit_employee():
    employee = Employee.query.get_or_404(id)
    employee.import_data(request.json)
    mysql.session.add(employee)
    mysql.session.commit()
    return {}


@api.route('/employees/<int:id>', methods=['DELETE'])
@json
def delete_employee(id):
    employee = Employee.query.get_or_404(id)
    mysql.session.delete(employee)
    mysql.session.commit()
    return {}
