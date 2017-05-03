from flask import request
from . import api
from .. import mysql
from ..models.activity_type import ActivityType
from ..decorators import json, paginate


@api.route('/activities_types/', methods=['GET'])
@json
@paginate('ActivitiesTypes')
def get_activities_types():
    return ActivityType.query


@api.route('/activities_types/<int:id>', methods=['GET'])
@json
def get_activity_type(id):
    return ActivityType.query.get_or_404(id)


@api.route('/activities_types/', methods=['POST'])
@json
def new_activity_type():
    activity_type = ActivityType()
    activity_type.import_data(request.json)
    mysql.session.add(activity_type)
    mysql.session.commit()
    return {}, 201


@api.route('/activities_types/<int:id>', methods=['PUT'])
@json
def edit_activity_type():
    activity_type = ActivityType.query.get_or_404(id)
    activity_type.import_data(request.json)
    mysql.session.add(activity_type)
    mysql.session.commit()
    return {}


@api.route('/activities_types/<int:id>', methods=['DELETE'])
@json
def delete_activity_type(id):
    activity_type = ActivityType.query.get_or_404(id)
    mysql.session.delete(activity_type)
    mysql.session.commit()
    return {}
