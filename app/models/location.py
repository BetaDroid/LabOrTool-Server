from .. import mysql
from ..exceptions import ValidationError


class Location(mysql.Model):
    __tablename__ = 'locations'
    LocationId = mysql.Column(mysql.Integer, primary_key=True, nullable=False)
    LocationPosition = mysql.Column(mysql.String(45), nullable=False)
    LocationContainer = mysql.Column(mysql.String(45), nullable=False)
    LocationSubContainer = mysql.Column(mysql.String(45), nullable=False)

    def export_data(self):
        return {
            'LocationId': self.LocationId,
            'LocationPosition': self.LocationPosition,
            'LocationContainer': self.LocationContainer,
            'LocationSubContainer': self.LocationSubContainer
        }

    def import_data(self, data):
        try:
            self.LocationPosition = data['LocationPosition']
            self.LocationContainer = data['LocationContainer']
            self.LocationSubContainer = data['LocationSubContainer']
        except KeyError as e:
            raise ValidationError('Invalid location: missing ' + e.args[0])
        return self
