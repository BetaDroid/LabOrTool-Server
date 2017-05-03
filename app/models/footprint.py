from .. import mysql
from ..exceptions import ValidationError


class Footprint(mysql.Model):
    __tablename__ = 'footprints'
    FootprintId = mysql.Column(mysql.Integer, primary_key=True, nullable=False)
    FootprintName = mysql.Column(mysql.String(45), nullable=False)
    FootprintLink = mysql.Column(mysql.Text, nullable=False)

    def export_data(self):
        return {
            'FootprintId': self.FootprintId,
            'FootprintName': self.FootprintName,
            'FootprintLink': self.FootprintLink
        }

    def import_data(self, data):
        try:
            self.FootprintName = data['FootprintName']
            self.FootprintLink = data['FootprintLink']
        except KeyError as e:
            raise ValidationError('Invalid footprint: missing ' + e.args[0])
        return self
