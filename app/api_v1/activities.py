from flask import request
from . import api
from .. import mysql
from ..models.activity import Activity
from ..decorators import json, paginate


@api.route('/activities/', methods=['GET'])
@json
@paginate('Activities')
def get_activities():
    return Activity.query


@api.route('/activities/<int:id>', methods=['GET'])
@json
def get_activity(id):
    return Activity.query.get_or_404(id)


@api.route('/activities/', methods=['POST'])
@json
def new_activity():
    activity = Activity()
    activity.import_data(request.json)
    mysql.session.add(activity)
    mysql.session.commit()
    return {}, 201


@api.route('/activities/<int:id>', methods=['PUT'])
@json
def edit_activity():
    activity = Activity.query.get_or_404(id)
    activity.import_data(request.json)
    mysql.session.add(activity)
    mysql.session.commit()
    return {}


@api.route('/activities/<int:id>', methods=['DELETE'])
@json
def delete_activity(id):
    activity = Activity.query.get_or_404(id)
    mysql.session.delete(activity)
    mysql.session.commit()
    return {}
