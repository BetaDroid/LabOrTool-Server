from .. import mysql
from ..exceptions import ValidationError


class Board(mysql.Model):
    __tablename__ = 'boards'
    BoardId = mysql.Column(mysql.Integer, primary_key=True, nullable=False)
    BoardName = mysql.Column(mysql.String(45), nullable=False)
    BoardRevision = mysql.Column(mysql.String(45), nullable=False)
    BoardParticular = mysql.Column(mysql.String(45), nullable=False)
    BoardProject = mysql.Column(mysql.Integer, nullable=False)
    BoardNote = mysql.Column(mysql.Text, nullable=True)

    def export_data(self):
        return {
            'BoardId': self.BoardId,
            'BoardName': self.BoardName,
            'BoardRevision': self.BoardRevision,
            'BoardParticular': self.BoardParticular,
            'BoardProject': self.BoardProject,
            'BoardNote': self.BoardNote
        }

    def import_data(self, data):
        try:
            self.BoardName = data['BoardName']
            self.BoardRevision = data['BoardRevision']
            self.BoardParticular = data['BoardParticular']
            self.BoardProject = data['BoardProject']
            self.BoardNote = data['BoardNote']
        except KeyError as e:
            raise ValidationError('Invalid board: missing ' + e.args[0])
        return self
