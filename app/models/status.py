from .. import mysql
from ..exceptions import ValidationError


class Status(mysql.Model):
    __tablename__ = 'status'
    StatusId = mysql.Column(mysql.Integer, primary_key=True, nullable=False)
    StatusName = mysql.Column(mysql.String(45), nullable=False)

    def export_data(self):
        return {
            'StatusId': self.StatusId,
            'StatusName': self.StatusName
        }

    def import_data(self, data):
        try:
            self.StatusName = data['StatusName']
        except KeyError as e:
            ValidationError('Invalid component: missing ' + e.args[0])
        return self
