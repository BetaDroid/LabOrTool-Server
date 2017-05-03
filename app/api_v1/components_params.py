from flask import request
from . import api
from .. import mysql
from ..models.component_param import ComponentParam
from ..decorators import json, paginate


@api.route('/components_params/', methods=['GET'])
@json
@paginate('ComponentsParams')
def get_components_params():
    return ComponentParam.query


@api.route('/components_params/<int:id>', methods=['GET'])
@json
def get_component_param(id):
    return ComponentParam.query.get_or_404(id)


@api.route('/components_params/', methods=['POST'])
@json
def new_component_param():
    component_param = ComponentParam()
    component_param.import_data(request.json)
    mysql.session.add(component_param)
    mysql.session.commit()
    return {}, 201


@api.route('/components_params/<int:id>', methods=['PUT'])
@json
def edit_component_param():
    component_param = ComponentParam.query.get_or_404(id)
    component_param.import_data(request.json)
    mysql.session.add(component_param)
    mysql.session.commit()
    return {}


@api.route('/components_params/<int:id>', methods=['DELETE'])
@json
def delete_component_param(id):
    component_param = ComponentParam.query.get_or_404(id)
    mysql.session.delete(component_param)
    mysql.session.commit()
    return {}
