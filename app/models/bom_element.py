from .. import mysql
from ..exceptions import ValidationError


class BomElement(mysql.Model):
    __tablename__ = 'bomselements'
    BomElementId = mysql.Column(mysql.Integer, primary_key=True, nullable=False)
    BomElementComponent = mysql.Column(mysql.String(45), nullable=False)
    BomElementSchemeReference = mysql.Column(mysql.String(45), nullable=False)
    BomElementBom = mysql.Column(mysql.Integer, nullable=False)
    BomElementMounted = mysql.Column(mysql.String(45), nullable=False)
    BomElementSupplied = mysql.Column(mysql.String(45), nullable=False)

    def export_data(self):
        return {
            'BomElementId': self.BomElementId,
            'BomElementComponent': self.BomElementComponent,
            'BomElementSchemeReference': self.BomElementSchemeReference,
            'BomElementBom': self.BomElementBom,
            'BomElementMounted': self.BomElementMounted,
            'BomElementSupplied': self.BomElementSupplied
        }

    def import_data(self, data):
        try:
            self.BomElementComponent = data['BomElementComponent']
            self.BomElementSchemeReference = data['BomElementSchemeReference']
            self.BomElementBom = data['BomElementBom']
            self.BomElementMounted = data['BomElementMounted']
            self.BomElementSupplied = data['BomElementSupplied']
        except KeyError as e:
            raise ValidationError('Invalid bom element: missing ' + e.args[0])
        return self
