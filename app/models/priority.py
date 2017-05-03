from .. import mysql
from ..exceptions import ValidationError


class Priority(mysql.Model):
    __tablename__ = 'priorities'
    PriorityId = mysql.Column(mysql.Integer, primary_key=True, nullable=False)
    PriorityName = mysql.Column(mysql.String(45), nullable=False)

    def export_data(self):
        return {
            'PriorityId': self.PriorityId,
            'PriorityName': self.PriorityName
        }

    def import_data(self, data):
        try:
            self.PriorityName = data['PriorityName']
        except KeyError as e:
            raise ValidationError('Invalid priority: missing ' + e.args[0])
        return self
