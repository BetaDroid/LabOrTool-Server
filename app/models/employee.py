from .. import mysql
from ..exceptions import ValidationError


class Employee(mysql.Model):
    __tablename__ = 'employees'
    EmployeeId = mysql.Column(mysql.Integer, primary_key=True, nullable=False)
    EmployeeName = mysql.Column(mysql.String(45), nullable=False)
    EmployeeSurname = mysql.Column(mysql.String(45), nullable=False)
    EmployeeUser = mysql.Column(mysql.Integer, mysql.ForeignKey('users.UserId'), nullable=False)
    EmployeeRole = mysql.Column(mysql.Integer, mysql.ForeignKey('employeesroles.EmployeeRoleId'), nullable=False)
    EmployeeCompany = mysql.Column(mysql.Integer, mysql.ForeignKey('companies.CompanyName'), nullable=False)
    EmployeeActive = mysql.Column(mysql.Boolean, nullable=True)
    EmployeeNote = mysql.Column(mysql.Text, nullable=True)

    def export_data(self):
        return {
            'EmployeeId': self.EmployeeId,
            'EmployeeName': self.EmployeeName,
            'EmployeeSurname': self.EmployeeSurname,
            'EmployeeUser': self.EmployeeUser,
            'EmployeeRole': self.EmployeeRole,
            'EmployeeCompany': self.EmployeeCompany,
            'EmployeeActive': self.EmployeeActive,
            'EmployeeNote': self.EmployeeNote
        }

    def import_data(self, data):
        try:
            self.EmployeeName = data['EmployeeName']
            self.EmployeeSurname = data['EmployeeSurname']
            self.EmployeeUser = data['EmployeeUser']
            self.EmployeeRole = data['EmployeeRole']
            self.EmployeeCompany = data['EmployeeCompany']
            self.EmployeeActive = data['EmployeeActive']
            self.EmployeeNote = data['EmployeeNote']
        except KeyError as e:
            raise ValidationError('Invalid employee: missing ' + e.args[0])
        return self
