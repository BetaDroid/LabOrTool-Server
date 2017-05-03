from flask import request
from . import api
from .. import mysql
from ..models.distributor import Distributor
from ..decorators import json, paginate


@api.route('/distributors/', methods=['GET'])
@json
@paginate('Distributors')
def get_distributors():
    return Distributor.query


@api.route('/distributors/<int:id>', methods=['GET'])
@json
def get_distributor(id):
    return Distributor.query.get_or_404(id)


@api.route('/distributors/', methods=['POST'])
@json
def new_distributor():
    distributor = Distributor()
    distributor.import_data(request.json)
    mysql.session.add(distributor)
    mysql.session.commit()
    return {}, 201


@api.route('/distributors/<int:id>', methods=['PUT'])
@json
def edit_distributor(id):
    distributor = Distributor.query.get_or_404(id)
    distributor.import_data(request.json)
    mysql.session.add(distributor)
    mysql.session.commit()
    return {}


@api.route('/distributors/<int:id>', methods=['DELETE'])
@json
def delete_distributor(id):
    distributor = Distributor.query.get_or_404(id)
    mysql.session.delete(distributor)
    mysql.session.commit()
    return {}


@api.route('/distributors/', methods=['OPTIONS'])
@json
def test():
    return {}, 204
