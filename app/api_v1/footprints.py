from flask import request
from . import api
from .. import mysql
from ..models.footprint import Footprint
from ..decorators import json, paginate


@api.route('/footprints/', methods=['GET'])
@json
@paginate('Footprints')
def get_footprints():
    return Footprint.query


@api.route('/footprints/<int:id>', methods=['GET'])
@json
def get_footprint(id):
    return Footprint.query.get_or_404(id)


@api.route('/footprints/', methods=['POST'])
@json
def new_footprint():
    footprint = Footprint()
    footprint.import_data(request.json)
    mysql.session.add(footprint)
    mysql.session.commit()
    return {}, 201


@api.route('/footprints/<int:id>', methods=['PUT'])
@json
def edit_footprint():
    footprint = Footprint.query.get_or_404(id)
    footprint.import_data(request.json)
    mysql.session.add(footprint)
    mysql.session.commit()
    return {}


@api.route('/footprint/<int:id>', methods=['DELETE'])
@json
def delete_footprint(id):
    footprint = Footprint.query.get_or_404(id)
    mysql.session.delete(footprint)
    mysql.session.commit()
    return {}
