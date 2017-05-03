from flask import request
from . import api
from .. import mysql
from ..models.production import Production
from ..decorators import json, paginate


@api.route('/productions/', methods=['GET'])
@json
@paginate('Productions')
def get_productions():
    return Production.query


@api.route('/productions/<int:id>', methods=['GET'])
@json
def get_production(id):
    return Production.query.get_or_404(id)


@api.route('/productions/', methods=['POST'])
@json
def new_production():
    production = Production()
    production.import_data(request.json)
    mysql.session.add(production)
    mysql.session.commit()
    return {}, 201


@api.route('/productions/<int:id>', methods=['PUT'])
@json
def edit_production():
    production = Production.query.get_or_404(id)
    production.import_data(request.json)
    mysql.session.add(production)
    mysql.session.commit()
    return {}


@api.route('/productions/<int:id>', methods=['DELETE'])
@json
def delete_production(id):
    production = Production.query.get_or_404(id)
    mysql.session.delete(production)
    mysql.session.commit()
    return {}
