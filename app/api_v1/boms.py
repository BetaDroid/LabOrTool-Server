from flask import request
from . import api
from .. import mysql
from ..models.bom import Bom
from ..decorators import json, paginate


@api.route('/boms/', methods=['GET'])
@json
@paginate('Boms')
def get_boms():
    return Bom.query


@api.route('/boms/<int:id>', methods=['GET'])
@json
def get_bom(id):
    return Bom.query.get_or_404(id)


@api.route('/boms/', methods=['POST'])
@json
def new_bom():
    bom = Bom()
    bom.import_data(request.json)
    mysql.session.add(bom)
    mysql.session.commit()
    return {}, 201


@api.route('/boms/<int:id>', methods=['PUT'])
@json
def edit_bom():
    bom = Bom.query.get_or_404(id)
    bom.import_data(request.json)
    mysql.session.add(bom)
    mysql.session.commit()
    return {}


@api.route('/boms/<int:id>', methods=['DELETE'])
@json
def delete_bom(id):
    bom = Bom.query.get_or_404(id)
    mysql.session.delete(bom)
    mysql.session.commit()
    return {}
