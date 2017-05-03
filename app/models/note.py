from .. import mysql
from ..exceptions import ValidationError


class Note(mysql.Model):
    __tablename__ = 'notes'
    NoteId = mysql.Column(mysql.Integer,
                          primary_key=True,
                          nullable=True)
    NoteParent = mysql.Column(mysql.Integer,
                              mysql.ForeignKey('productions.ProductionId'),
                              mysql.ForeignKey('activities.ActivityId'),
                              nullable=False)
    NoteText = mysql.Column(mysql.Text,
                            nullable=False)
    NoteEmployeeCreation = mysql.Column(mysql.Integer,
                                        nullable=False)
    NoteEmployeeModification = mysql.Column(mysql.Integer,
                                            nullable=False)
    NoteDateCreation = mysql.Column(mysql.DateTime,
                                    nullable=False)
    NoteDateModification = mysql.Column(mysql.DateTime,
                                        nullable=False)

    def data_export(self):
        return {
            'NoteId': self.NoteId,
            'NoteParent': self.NoteParent,
            'NoteText': self.NoteText,
            'NoteEmployeeCreation': self.NoteEmployeeCreation,
            'NoteEmployeeModification': self.NoteEmployeeModification,
            'NoteDateCreation': self.NoteDateCreation,
            'NoteDateModification': self.NoteDateModification
        }

    def import_data(self, data):
        try:
            self.NoteParent = data['NoteParent']
            self.NoteText = data['NoteText']
            self.NoteEmployeeCreation = data['NoteEmployeeCreation']
            self.NoteEmployeeModification = data['NoteEmployeeModification']
            self.NoteDateCreation = data['NoteDateCreation']
            self.NoteDateModification = data['NoteDateModification']
        except KeyError as e:
            ValidationError('Invalid note: missing ' + e.args[0])
        return self
