from flask import jsonify
from ..exceptions import ValidationError
from . import api


@api.errorhandler(ValidationError)
def bad_request(e):
    response = jsonify({'Status': 400, 'Error': 'Bad Request',
                        'Message': e.args[0]})
    response.status_code = 400
    return response


@api.app_errorhandler(404)
def not_found(e):
    response = jsonify({'Status': 404, 'Error': 'Not Found',
                        'Message': 'Invalid resource URI'})
    response.status_code = 404
    return response


@api.errorhandler(405)
def method_not_supported(e):
    response = jsonify({'Status': 405, 'Error': 'Method Not Supported',
                        'Message': 'The method is not supported'})
    response.status_code = 405
    return response


@api.app_errorhandler(500)
def internal_server_error(e):
    response = jsonify({'Status': 500, 'Error': 'Internal Server Error',
                        'Message': e.args[0]})
    response.status_code = 500
    return response
