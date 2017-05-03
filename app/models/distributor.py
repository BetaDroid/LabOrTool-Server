from .. import mysql
from ..exceptions import ValidationError


class Distributor(mysql.Model):
    __tablename__ = 'distributors'
    DistributorId = mysql.Column(mysql.Integer, primary_key=True, nullable=False)
    DistributorName = mysql.Column(mysql.String(45), nullable=False)
    DistributorWebSite = mysql.Column(mysql.Text, nullable=False)

    def export_data(self):
        return {
            'Id': self.DistributorId,
            'Name': self.DistributorName,
            'WebSite': self.DistributorWebSite
        }

    def import_data(self, data):
        try:
            self.DistributorId = data['Id']
            self.DistributorName = data['Name']
            self.DistributorWebSite = data['WebSite']
        except KeyError as e:
            raise ValidationError('Invalid distributor: missing ' + e.args[0])
        return self
