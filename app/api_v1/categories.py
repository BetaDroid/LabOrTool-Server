from flask import request
from . import api
from .. import mysql
from ..models.category import Category
from ..decorators import json, paginate


@api.route('/categories/', methods=['GET'])
@json
@paginate('Categories')
def get_categories():
    return Category.query


@api.route('/categories/<int:id>', methods=['GET'])
@json
def get_category(id):
    return Category.query.get_or_404(id)


@api.route('/categories/', methods=['POST'])
@json
def new_category():
    category = Category()
    category.import_data(request.json)
    mysql.session.add(category)
    mysql.session.commit()
    return {}, 201


@api.route('/categories/<int:id>', methods=['PUT'])
@json
def edit_category():
    category = Category.query.get_or_404(id)
    category.import_data(request.json)
    mysql.session.add(category)
    mysql.session.commit()
    return {}


@api.route('/categories/<int:id>', methods=['DELETE'])
@json
def delete_category(id):
    category = Category.query.get_or_404(id)
    mysql.session.delete(category)
    mysql.session.commit()
    return {}
