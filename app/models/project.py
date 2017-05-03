from .. import mysql
from ..exceptions import ValidationError


class Project(mysql.Model):
    __tablename__ = 'projects'
    ProjectId = mysql.Column(mysql.Integer, primary_key=True, nullable=False)
    ProjectName = mysql.Column(mysql.String(45), nullable=False)
    ProjectDescription = mysql.Column(mysql.Text, nullable=False)
    ProjectNote = mysql.Column(mysql.Text, nullable=True)

    def export_data(self):
        return {
            'ProjectId': self.ProjectId,
            'ProjectName': self.ProjectName,
            'ProjectDescription': self.ProjectDescription,
            'ProjectNote': self.ProjectNote
        }

    def import_data(self, data):
        try:
            self.ProjectName = data['ProjectName']
            self.ProjectDescription = data['ProjectDescription']
            self.ProjectNote = data['ProjectDescription']
        except KeyError as e:
            ValidationError('Invalid project: missing ' + e.args[0])
        return self
