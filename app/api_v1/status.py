from flask import request
from . import api
from .. import mysql
from ..models.status import Status
from ..decorators import json, paginate


@api.route('/status/', methods=['GET'])
@json
@paginate('Status')
def get_all_status():
    return Status.query


@api.route('/status/<int:id>', methods=['GET'])
@json
def get_status(id):
    return Status.query.get_or_404(id)


@api.route('/status/', methods=['POST'])
@json
def new_status():
    status = Status()
    status.import_data(request.json)
    mysql.session.add(status)
    mysql.session.commit()
    return {}, 201


@api.route('/status/<int:id>', methods=['PUT'])
@json
def edit_status():
    status = Status.query.get_or_404(id)
    status.import_data(request.json)
    mysql.session.add(status)
    mysql.session.commit()
    return {}


@api.route('/status/<int:id>', methods=['DELETE'])
@json
def delete_status(id):
    status = Status.query.get_or_404(id)
    mysql.session.delete(status)
    mysql.session.commit()
    return {}
