from .. import mysql
from ..exceptions import ValidationError


class Activity(mysql.Model):
    __tablename__ = 'activities'
    ActivityId = mysql.Column(mysql.Integer, primary_key=True, nullable=False)
    ActivityTitle = mysql.Column(mysql.String(45), nullable=False)
    ActivityDescription = mysql.Column(mysql.Text, nullable=False)
    ActivityWorkCode = mysql.Column(mysql.String(45), nullable=False)
    ActivityDeadline = mysql.Column(mysql.DateTime, nullable=False)
    ActivityPriority = mysql.Column(mysql.Integer, mysql.ForeignKey('priorities.PriorityId'), nullable=False)
    ActivityStatus = mysql.Column(mysql.Integer, mysql.ForeignKey('status.StatusId'), nullable=False)
    ActivityType = mysql.Column(mysql.Integer, mysql.ForeignKey('activitiestypes.TypeId'), nullable=False)
    ActivityEmployee = mysql.Column(mysql.Integer, mysql.ForeignKey('employees.EmployeeId'), nullable=False)
    ActivityEditable = mysql.Column(mysql.Boolean, nullable=False)

    def export_data(self):
        return {
            'ActivityId': self.ActivityId,
            'ActivityTitle': self.ActivityTitle,
            'ActivityDescription': self.ActivityDescription,
            'ActivityWorkCode': self.ActivityWorkCode,
            'ActivityDeadline': self.ActivityDeadline,
            'ActivityPriority': self.ActivityPriority,
            'ActivityStatus': self.ActivityStatus,
            'ActivityType': self.ActivityType,
            'ActivityEmployee': self.ActivityEmployee,
            'ActivityEditable': self.ActivityEditable
        }

    def import_data(self, data):
        try:
            self.ActivityTitle = data['ActivityTitle']
            self.ActivityDescription = data['ActivityTitle']
            self.ActivityWorkCode = data['ActivityTitle']
            self.ActivityDeadline = data['ActivityTitle']
            self.ActivityPriority = data['ActivityTitle']
            self.ActivityStatus = data['ActivityTitle']
            self.ActivityType = data['ActivityTitle']
            self.ActivityEmployee = data['ActivityTitle']
            self.ActivityEditable = data['ActivityTitle']
        except KeyError as e:
            raise ValidationError('Invalid activity: missing ' + e.args[0])
        return self
