from flask import request
from . import api
from .. import mysql
from ..models.user_role import UserRole
from ..decorators import json, paginate


@api.route('/users_roles/', methods=['GET'])
@json
@paginate('UsersRoles')
def get_users_roles():
    return UserRole.query


@api.route('/users_roles/<int:id>', methods=['GET'])
@json
def get_user_role(id):
    return UserRole.query.get_or_404(id)


@api.route('/users_roles/', methods=['POST'])
@json
def new_user_role():
    user_role = UserRole()
    user_role.import_data(request.json)
    mysql.session.add(user_role)
    mysql.session.commit()
    return {}, 201


@api.route('/users_roles/<int:id>', methods=['PUT'])
@json
def edit_user_role():
    user_role = UserRole.query.get_or_404(id)
    user_role.import_data(request.json)
    mysql.session.add(user_role)
    mysql.session.commit()
    return {}


@api.route('/users_roles/<int:id>', methods=['DELETE'])
@json
def delete_user_role(id):
    user_role = UserRole.query.get_or_404(id)
    mysql.session.delete(user_role)
    mysql.session.commit()
    return {}
