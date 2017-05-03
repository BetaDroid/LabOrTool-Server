from flask import request
from . import api
from .. import mysql
from ..models.location import Location
from ..decorators import json, paginate


@api.route('/locations/', methods=['GET'])
@json
@paginate('Locations')
def get_locations():
    return Location.query


@api.route('/locations/<int:id>', methods=['GET'])
@json
def get_location(id):
    return Location.query.get_or_404(id)


@api.route('/categories/', methods=['POST'])
@json
def new_location():
    location = Location()
    location.import_data(request.json)
    mysql.session.add(location)
    mysql.session.commit()
    return {}, 201


@api.route('/locations/<int:id>', methods=['PUT'])
@json
def edit_location():
    location = Location.query.get_or_404(id)
    location.import_data(request.json)
    mysql.session.add(location)
    mysql.session.commit()
    return {}


@api.route('/locations/<int:id>', methods=['DELETE'])
@json
def delete_location(id):
    location = Location.query.get_or_404(id)
    mysql.session.delete(location)
    mysql.session.commit()
    return {}
