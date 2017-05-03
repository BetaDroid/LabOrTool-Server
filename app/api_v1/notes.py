from flask import request
from . import api
from .. import mysql
from ..models.note import Note
from ..decorators import json, paginate


@api.route('/notes/', methods=['GET'])
@json
@paginate('Notes')
def get_notes():
    return Note.query


@api.route('/notes/<int:id>', methods=['GET'])
@json
def get_note(id):
    return Note.query.get_or_404(id)


@api.route('/notes/', methods=['POST'])
@json
def new_note():
    note = Note()
    note.import_data(request.json)
    mysql.session.add(note)
    mysql.session.commit()
    return {}, 201


@api.route('/notes/<int:id>', methods=['PUT'])
@json
def edit_note():
    note = Note.query.get_or_404(id)
    note.import_data(request.json)
    mysql.session.add(note)
    mysql.session.commit()
    return {}


@api.route('/notes/<int:id>', methods=['DELETE'])
@json
def delete_note(id):
    note = Note.query.get_or_404(id)
    mysql.session.delete(note)
    mysql.session.commit()
    return {}
