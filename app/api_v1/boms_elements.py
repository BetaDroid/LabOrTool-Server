from flask import request
from . import api
from .. import mysql
from ..models.bom_element import BomElement
from ..decorators import json, paginate


@api.route('/boms_elements/', methods=['GET'])
@json
@paginate('BomsElements')
def get_boms_elements():
    return BomElement.query


@api.route('/boms_elements/<int:id>', methods=['GET'])
@json
def get_bom_element(id):
    return BomElement.query.get_or_404(id)


@api.route('/boms_elements/', methods=['POST'])
@json
def new_bom_element():
    bom_element = BomElement()
    bom_element.import_data(request.json)
    mysql.session.add(bom_element)
    mysql.session.commit()
    return {}, 201


@api.route('/boms_elements/<int:id>', methods=['PUT'])
@json
def edit_bom_element():
    bom_element = BomElement.query.get_or_404(id)
    bom_element.import_data(request.json)
    mysql.session.add(bom_element)
    mysql.session.commit()
    return {}


@api.route('/boms_elements/<int:id>', methods=['DELETE'])
@json
def delete_bom_element(id):
    bom_element = BomElement.query.get_or_404(id)
    mysql.session.delete(bom_element)
    mysql.session.commit()
    return {}
