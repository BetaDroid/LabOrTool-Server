from .. import mysql
from ..exceptions import ValidationError


class Bom(mysql.Model):
    __tablename__ = 'boms'
    BomId = mysql.Column(mysql.Integer, primary_key=True, nullable=False)
    BomBoard = mysql.Column(mysql.Integer, nullable=False)
    BomRevision = mysql.Column(mysql.String(45), nullable=False)
    BomDate = mysql.Column(mysql.DateTime, nullable=False)
    BomNote = mysql.Column(mysql.Text, nullable=True)

    def export_data(self):
        return {
            'BomId': self.BomId,
            'BomBoard': self.BomBoard,
            'BomRevision': self.BomRevision,
            'BomDate': self.BomDate,
            'BomNote': self.BomNote
        }

    def import_data(self, data):
        try:
            self.BomBoard = data['BomBoard']
            self.BomRevision = data['BomRevision']
            self.BomDate = data['BomDate']
            self.BomNote = data['BomNote']
        except KeyError as e:
            raise ValidationError('Invalid bom: missing ' + e.args[0])
        return self
