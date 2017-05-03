from flask import request
from . import api
from .. import mysql
from ..models.component import Component
from ..decorators import json, paginate


@api.route('/components/', methods=['GET'])
@json
@paginate('Components')
def get_components():
    return Component.query


@api.route('/components/<int:id>', methods=['GET'])
@json
def get_component(id):
    return Component.query.get_or_404(id)


@api.route('/components/', methods=['POST'])
@json
def new_component():
    component = Component()
    component.import_data(request.json)
    mysql.session.add(component)
    mysql.session.commit()
    return {}, 201


@api.route('/components/<int:id>', methods=['PUT'])
@json
def edit_component():
    component = Component.query.get_or_404(id)
    component.import_data(request.json)
    mysql.session.add(component)
    mysql.session.commit()
    return {}


@api.route('/components/<int:id>', methods=['DELETE'])
@json
def delete_component(id):
    component = Component.query.get_or_404(id)
    mysql.session.delete(component)
    mysql.session.commit()
    return {}
