from .. import mysql
from ..exceptions import ValidationError


class Manufacturer(mysql.Model):
    __tablename__ = 'manufacturers'
    ManufacturerId = mysql.Column(mysql.Integer, primary_key=True, nullable=False)
    ManufacturerName = mysql.Column(mysql.String(45), nullable=False)
    ManufacturerWebSite = mysql.Column(mysql.Text, nullable=False)

    def export_data(self):
        return {
            'ManufacturerId': self.ManufacturerId,
            'ManufacturerName': self.ManufacturerName,
            'ManufacturerWebSite': self.ManufacturerWebSite
        }

    def import_data(self, data):
        try:
            self.ManufacturerName = data['ManufacturerName']
            self.ManufacturerWebSite = data['ManufacturerWebSite']
        except KeyError as e:
            raise ValidationError('Invalid manufacturer: missing ' + e.args[0])
        return self
