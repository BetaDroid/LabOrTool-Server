from .. import mysql
from ..exceptions import ValidationError


class Company(mysql.Model):
    __tablename__ = 'companies'
    CompanyId = mysql.Column(mysql.Integer, primary_key=True, nullable=False)
    CompanyName = mysql.Column(mysql.String(45), nullable=False)
    CompanyNote = mysql.Column(mysql.Text, nullable=True)

    def export_data(self):
        return {
            'CompanyId': self.CompanyId,
            'CompanyName': self.CompanyName,
            'CompanyNote': self.CompanyNote
        }

    def import_data(self, data):
        try:
            self.CompanyName = data['CompanyName']
            self.CompanyNote = data['CompanyNote']
        except KeyError as e:
            raise ValidationError('Invalid company: missing ' + e.args[0])
        return self
