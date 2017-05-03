from flask import request
from . import api
from .. import mysql
from ..models.company import Company
from ..decorators import json, paginate


@api.route('/companies/', methods=['GET'])
@json
@paginate('Companies')
def get_companies():
    return Company.query


@api.route('/companies/<int:id>', methods=['GET'])
@json
def get_company(id):
    return Company.query.get_or_404(id)


@api.route('/companies/', methods=['POST'])
@json
def new_company():
    company = Company()
    company.import_data(request.json)
    mysql.session.add(company)
    mysql.session.commit()
    return {}, 201


@api.route('/companies/<int:id>', methods=['PUT'])
@json
def edit_company():
    company = Company.query.get_or_404(id)
    company.import_data(request.json)
    mysql.session.add(company)
    mysql.session.commit()
    return {}


@api.route('/categories/<int:id>', methods=['DELETE'])
@json
def delete_company(id):
    company = Company.query.get_or_404(id)
    mysql.session.delete(company)
    mysql.session.commit()
    return {}
