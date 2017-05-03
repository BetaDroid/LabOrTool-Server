from flask import request
from . import api
from .. import mysql
from ..models.project import Project
from ..decorators import json, paginate


@api.route('/projects/', methods=['GET'])
@json
@paginate('Projects')
def get_projects():
    return Project.query


@api.route('/projects/<int:id>', methods=['GET'])
@json
def get_project(id):
    return Project.query.get_or_404(id)


@api.route('/projects/', methods=['POST'])
@json
def new_project():
    project = Project()
    project.import_data(request.json)
    mysql.session.add(project)
    mysql.session.commit()
    return {}, 201


@api.route('/projects/<int:id>', methods=['PUT'])
@json
def edit_project():
    project = Project.query.get_or_404(id)
    project.import_data(request.json)
    mysql.session.add(project)
    mysql.session.commit()
    return {}


@api.route('/projects/<int:id>', methods=['DELETE'])
@json
def delete_projects(id):
    project = Project.query.get_or_404(id)
    mysql.session.delete(project)
    mysql.session.commit()
    return {}
