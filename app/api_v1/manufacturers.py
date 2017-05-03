from flask import request
from . import api
from .. import mysql
from ..models.manufacturer import Manufacturer
from ..decorators import json, paginate


@api.route('/manufacturers/', methods=['GET'])
@json
@paginate('Manufacturers')
def get_manufacturers():
    return Manufacturer.query


@api.route('/manufacturers/<int:id>', methods=['GET'])
@json
def get_manufacturer(id):
    return Manufacturer.query.get_or_404(id)


@api.route('/manufacturers/', methods=['POST'])
@json
def new_manufacturer():
    manufacturer = Manufacturer()
    manufacturer.import_data(request.json)
    mysql.session.add(manufacturer)
    mysql.session.commit()
    return {}, 201


@api.route('/manufacturers/<int:id>', methods=['PUT'])
@json
def edit_manufacturer():
    manufacturer = Manufacturer.query.get_or_404(id)
    manufacturer.import_data(request.json)
    mysql.session.add(manufacturer)
    mysql.session.commit()
    return {}


@api.route('/manufacturers/<int:id>', methods=['DELETE'])
@json
def delete_manufacturer(id):
    manufacturer = Manufacturer.query.get_or_404(id)
    mysql.session.delete(manufacturer)
    mysql.session.commit()
    return {}
