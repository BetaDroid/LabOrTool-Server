from .. import mysql
from flask import current_app
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from werkzeug.security import generate_password_hash, check_password_hash
from ..exceptions import ValidationError


class User(mysql.Model):
    __tablename__ = 'users'
    Id = mysql.Column(mysql.Integer, primary_key=True, nullable=False)
    Username = mysql.Column(mysql.String(64), nullable=False)
    Password = mysql.Column(mysql.String(128), nullable=False)

    def export_data(self):
        return {
            'Id': self.Id,
            'Username': self.Username,
            'Password': self.Password,
        }

    def import_data(self, data):
        try:
            self.Id = data['Id']
            self.Username = data['Username']
            self.set_password(data['Password'])
        except KeyError as e:
            raise ValidationError('Invalid user: missing ' + e.args[0])
        return self

    def set_password(self, password):
        self.Password = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.Password, password)

    def generate_auth_token(self, expires_in=43200):
        s = Serializer(current_app.config['SECRET_KEY'], expires_in=expires_in)
        return s.dumps({'Id': self.Id}).decode('utf-8')

    @staticmethod
    def verify_auth_token(token):
        s = Serializer(current_app.config['SECRET_KEY'])
        try:
            data = s.loads(token)
        except:
            return None
        return User.query.get(data['Id'])
