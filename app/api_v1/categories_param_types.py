from flask import request
from . import api
from .. import mysql
from ..models.category_param_type import CategoryParamType
from ..decorators import json, paginate


@api.route('/categories_param_types/', methods=['GET'])
@json
@paginate('CategoriesParamTypes')
def get_categories_param_types():
    return CategoryParamType.query


@api.route('/categories_param_types/<int:id>', methods=['GET'])
@json
def get_category_param_type(id):
    return CategoryParamType.query.get_or_404(id)


@api.route('/categories_param_types/', methods=['POST'])
@json
def new_category_param_type():
    category_param_type = CategoryParamType()
    category_param_type.import_data(request.json)
    mysql.session.add(category_param_type)
    mysql.session.commit()
    return {}, 201


@api.route('/categories_param_types/<int:id>', methods=['PUT'])
@json
def edit_category_param_type():
    category_param_type = CategoryParamType.query.get_or_404(id)
    category_param_type.import_data(request.json)
    mysql.session.add(category_param_type)
    mysql.session.commit()
    return {}


@api.route('/categories_param_types/<int:id>', methods=['DELETE'])
@json
def delete_category_param_type(id):
    category_param_type = CategoryParamType.query.get_or_404(id)
    mysql.session.delete(category_param_type)
    mysql.session.commit()
    return {}
