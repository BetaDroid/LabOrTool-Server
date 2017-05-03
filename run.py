#!/usr/bin/python
from os import environ
from app import create_app, mysql
from app.models.user import User


if __name__ == '__main__':
    app = create_app(environ.get('FLASK_CONFIG', 'production'))
    with app.app_context():
        if User.query.get(1) is None:
            u = User(Username="admin")
            u.set_password("admin")
            mysql.session.add(u)
            mysql.session.commit()
    app.run(threaded=True, host='0.0.0.0', port=5000)
