from .. import mysql
from ..exceptions import ValidationError


class EmployeeRole(mysql.Model):
    __tablename__ = 'employeesroles'
    EmployeeRoleId = mysql.Column(mysql.Integer, primary_key=True, nullable=False)
    EmployeeRoleName = mysql.Column(mysql.String(45), nullable=False)
    EmployeeRoleNote = mysql.Column(mysql.Text, nullable=True)

    def export_data(self):
        return {
            'EmployeeRoleId': self.EmployeeRoleId,
            'EmployeeRoleName': self.EmployeeRoleName,
            'EmployeeRoleNote': self.EmployeeRoleNote
        }

    def import_data(self, data):
        try:
            self.EmployeeRoleName = data['EmployeeRoleName']
            self.EmployeeRoleNote = data['EmployeeRoleNote']
        except KeyError as e:
            raise ValidationError('Invalid employee role: missing ' + e.args[0])
