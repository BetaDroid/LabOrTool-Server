from .. import mysql
from ..exceptions import ValidationError


class Unit(mysql.Model):
    __tablename__ = 'units'
    UnitId = mysql.Column(mysql.Integer, primary_key=True, nullable=False)
    UnitName = mysql.Column(mysql.String(45), nullable=False)
    UnitShortName = mysql.Column(mysql.String(5), nullable=False)
    UnitNote = mysql.Column(mysql.Text, nullable=True)

    def export_data(self):
        return {
            'UnitId': self.UnitId,
            'UnitName': self.UnitName,
            'UnitShortName': self.UnitShortName,
            'UnitNote': self.UnitNote
        }

    def import_data(self, data):
        try:
            self.UnitName = data['UnitName']
            self.UnitShortName = data['UnitShortName']
            self.UnitNote = data['UnitNote']
        except KeyError as e:
            raise ValidationError('Invalid unit: missing ' + e.args[0])
        return self
