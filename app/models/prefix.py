from .. import mysql
from ..exceptions import ValidationError


class Prefix(mysql.Model):
    __tablename__ = 'prefixes'
    PrefixId = mysql.Column(mysql.Integer, primary_key=True, nullable=False)
    PrefixName = mysql.Column(mysql.String(45), nullable=False)

    def export_data(self):
        return {
            'PrefixId': self.PrefixId,
            'PrefixName': self.PrefixName
        }

    def import_data(self, data):
        try:
            self.PrefixName = data['PrefixName']
        except KeyError as e:
            raise ValidationError('Invalid prefix: missing ' + e.args[0])
        return self
