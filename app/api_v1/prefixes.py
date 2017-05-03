from flask import request
from . import api
from .. import mysql
from ..models.prefix import Prefix
from ..decorators import json, paginate


@api.route('/prefixes/', methods=['GET'])
@json
@paginate('Prefixes')
def get_prefixes():
    return Prefix.query


@api.route('/prefixes/<int:id>', methods=['GET'])
@json
def get_prefix(id):
    return Prefix.query.get_or_404(id)


@api.route('/prefixes/', methods=['POST'])
@json
def new_prefix():
    prefix = Prefix()
    prefix.import_data(request.json)
    mysql.session.add(prefix)
    mysql.session.commit()
    return {}, 201


@api.route('/prefixes/<int:id>', methods=['PUT'])
@json
def edit_prefix():
    prefix = Prefix.query.get_or_404(id)
    prefix.import_data(request.json)
    mysql.session.add(prefix)
    mysql.session.commit()
    return {}


@api.route('/prefixes/<int:id>', methods=['DELETE'])
@json
def delete_prefix(id):
    prefix = Prefix.query.get_or_404(id)
    mysql.session.delete(prefix)
    mysql.session.commit()
    return {}
