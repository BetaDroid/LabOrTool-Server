from .. import mysql
from ..exceptions import ValidationError


class UserRole(mysql.Model):
    __tablename__ = 'usersroles'
    UserRoleId = mysql.Column(mysql.Integer, primary_key=True, nullable=False)
    UserRoleName = mysql.Column(mysql.String(45), nullable=False)
    UserRoleNote = mysql.Column(mysql.Text, nullable=True)

    def export_data(self):
        return {
            'UserRoleId': self.UserRoleId,
            'UserRoleName': self.UserRoleName,
            'UserRoleNote': self.UserRoleNote
        }

    def import_data(self, data):
        try:
            self.UserRoleName = data['UserRoleName']
            self.UserRoleNote = data['UserRoleNote']
        except KeyError as e:
            raise ValidationError('Invalid user role: missing ' + e.args[0])
        return self
