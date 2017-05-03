from flask import request
from . import api
from .. import mysql
from ..models.employee_role import EmployeeRole
from ..decorators import json, paginate


@api.route('/employees_roles/', methods=['GET'])
@json
@paginate('Categories')
def get_employees_roles():
    return EmployeeRole.query


@api.route('/employees_roles/<int:id>', methods=['GET'])
@json
def get_employee_role(id):
    return EmployeeRole.query.get_or_404(id)


@api.route('/employees_roles/', methods=['POST'])
@json
def new_employee_role():
    employee_role = EmployeeRole()
    employee_role.import_data(request.json)
    mysql.session.add(employee_role)
    mysql.session.commit()
    return {}, 201


@api.route('/employees_roles/<int:id>', methods=['PUT'])
@json
def edit_employee_role():
    employee_role = EmployeeRole.query.get_or_404(id)
    employee_role.import_data(request.json)
    mysql.session.add(employee_role)
    mysql.session.commit()
    return {}


@api.route('/employees_roles/<int:id>', methods=['DELETE'])
@json
def delete_employee_role(id):
    employee_role = EmployeeRole.query.get_or_404(id)
    mysql.session.delete(employee_role)
    mysql.session.commit()
    return {}
