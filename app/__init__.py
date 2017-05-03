import os
from flask import Flask, g, request
from flask.ext.sqlalchemy import SQLAlchemy
from .decorators import json, no_cache
from flask_cors import CORS, cross_origin

mysql = SQLAlchemy()


def create_app(config_name):
    app = Flask(__name__)
    CORS(app)

    cfg = os.path.join(os.getcwd(), 'config', config_name + '.py')
    app.config.from_pyfile(cfg)

    mysql.init_app(app)

    from .api_v1 import api as api_blueprint

    app.register_blueprint(api_blueprint, url_prefix='/api/v1')

    @app.after_request
    def after_request(rv):
        headers = getattr(g, 'headers', {})
        rv.headers.extend(headers)
        return rv

    from .auth import auth

    @app.route('/get-auth-token', methods=['GET'])
    @cross_origin()
    @auth.login_required
    @no_cache
    @json
    def get_auth_token():
        return {'Token': g.user.generate_auth_token()}

    from .models.user import User

    @app.route('/registration', methods=['POST'])
    @json
    def new_registration():
        user = User()
        user.import_data(request.json)
        data = mysql.engine.execute("SELECT Username FROM users WHERE Username = '%s';" % user.Username)
        count = 0
        for x in data:
            count += 1
        if count == 0:
            user.UserRole = 3
            mysql.session.add(user)
            mysql.session.commit()
            add = True
        else:
            add = False

        return {
            'Add': add
        } if add is True else {
            'Error': 'Duplication',
            'Message': 'The username already exist. Choose another username.'
        }

    return app
