from flask import request
from . import api
from .. import mysql
from ..models.priority import Priority
from ..decorators import json, paginate


@api.route('/priorities/', methods=['GET'])
@json
@paginate('Priorities')
def get_priorities():
    return Priority.query


@api.route('/priorities/<int:id>', methods=['GET'])
@json
def get_priority(id):
    return Priority.query.get_or_404(id)


@api.route('/priorities/', methods=['POST'])
@json
def new_priority():
    priority = Priority()
    priority.import_data(request.json)
    mysql.session.add(priority)
    mysql.session.commit()
    return {}, 201


@api.route('/priorities/<int:id>', methods=['PUT'])
@json
def edit_priority():
    priority = Priority.query.get_or_404(id)
    priority.import_data(request.json)
    mysql.session.add(priority)
    mysql.session.commit()
    return {}


@api.route('/priorities/<int:id>', methods=['DELETE'])
@json
def delete_priority(id):
    priority = Priority.query.get_or_404(id)
    mysql.session.delete(priority)
    mysql.session.commit()
    return {}
