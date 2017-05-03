from .. import mysql
from ..exceptions import ValidationError


class ActivityType(mysql.Model):
    __tablename__ = 'activitiestypes'
    ActivityTypeId = mysql.Column(mysql.Integer, primary_key=True, nullable=False)
    ActivityTypeName = mysql.Column(mysql.String(45), nullable=False)
    ActivityTypeNote = mysql.Column(mysql.Text, nullable=True)

    def export_data(self):
        return {
            'ActivityTypeId': self.ActivityTypeId,
            'ActivityTypeName': self.ActivityTypeName,
            'ActivityTypeNote': self.ActivityTypeNote
        }

    def import_data(self, data):
        try:
            self.ActivityTypeName = data['ActivityTypeName']
            self.ActivityTypeNote = data['ActivityTypeNote']
        except KeyError as e:
            raise ValidationError('Invalid activity type: missing ' + e.args[0])
        return self
