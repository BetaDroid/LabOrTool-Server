from flask import request
from . import api
from .. import mysql
from ..models.board import Board
from ..decorators import json, paginate


@api.route('/boards/', methods=['GET'])
@json
@paginate('Boards')
def get_boards():
    return Board.query


@api.route('/boards/<int:id>', methods=['GET'])
@json
def get_board(id):
    return Board.query.get_or_404(id)


@api.route('/boards/', methods=['POST'])
@json
def new_board():
    board = Board()
    board.import_data(request.json)
    mysql.session.add(board)
    mysql.session.commit()
    return {}, 201


@api.route('/boards/<int:id>', methods=['PUT'])
@json
def edit_board():
    board = Board.query.get_or_404(id)
    board.import_data(request.json)
    mysql.session.add(board)
    mysql.session.commit()
    return {}


@api.route('/boards/<int:id>', methods=['DELETE'])
@json
def delete_board(id):
    board = Board.query.get_or_404(id)
    mysql.session.delete(board)
    mysql.session.commit()
    return {}
