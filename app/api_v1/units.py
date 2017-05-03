from flask import request
from . import api
from .. import mysql
from ..models.unit import Unit
from ..decorators import json, paginate


@api.route('/units/', methods=['GET'])
@json
@paginate('Units')
def get_units():
    return Unit.query


@api.route('/units/<int:id>', methods=['GET'])
@json
def get_unit(id):
    return Unit.query.get_or_404(id)


@api.route('/units/', methods=['POST'])
@json
def new_unit():
    unit = Unit()
    unit.import_data(request.json)
    mysql.session.add(unit)
    mysql.session.commit()
    return {}, 201


@api.route('/units/<int:id>', methods=['PUT'])
@json
def edit_unit():
    unit = Unit.query.get_or_404(id)
    unit.import_data(request.json)
    mysql.session.add(unit)
    mysql.session.commit()
    return {}


@api.route('/units/<int:id>', methods=['DELETE'])
@json
def delete_unit(id):
    unit = Unit.query.get_or_404(id)
    mysql.session.delete(unit)
    mysql.session.commit()
    return {}
