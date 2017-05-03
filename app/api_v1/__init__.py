from flask import Blueprint
from ..auth import auth_token
from flask_cors import CORS

api = Blueprint('api', __name__)
CORS(api)


@api.before_request
@auth_token.login_required
def before_request():
    pass


@api.after_request
def after_request(rv):
    return rv

from . import activities, activities_types, boards, boms, boms_elements, categories, categories_param_types,\
              companies, components, components_params, distributors, employees, employees_roles, errors, footprints,\
              locations, manufacturers, notes, prefixes, priorities, productions, projects, status, units, users,\
              users_roles
