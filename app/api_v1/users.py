from flask import request
from . import api
from .. import mysql
from ..models.user import User
from ..decorators import json, paginate


@api.route('/users/', methods=['GET'])
@json
@paginate('Users')
def get_users():
    return User.query


@api.route('/users/<int:id>', methods=['GET'])
@json
def get_user(id):
    return User.query.get_or_404(id)


@api.route('/users/', methods=['POST'])
@json
def new_user():
    user = User()
    user.import_data(request.json)
    mysql.session.add(user)
    mysql.session.commit()
    return {}, 201


@api.route('/users/<int:id>', methods=['PUT'])
@json
def edit_user(id):
    user = User.query.get_or_404(id)
    user.import_data(request.json)
    mysql.session.add(user)
    mysql.session.commit()
    return {}


@api.route('/users/<int:id>', methods=['DELETE'])
@json
def delete_user(id):
    user = User.query.get_or_404(id)
    mysql.session.delete(user)
    mysql.session.commit()
    return {}
