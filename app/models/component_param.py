from .. import mysql
from ..exceptions import ValidationError


class ComponentParam(mysql.Model):
    __tablename__ = 'componentparams'
    ComponentParamId = mysql.Column(mysql.Integer, primary_key=True, nullable=False)
    ComponentParamComponent = mysql.Column(mysql.String(45), mysql.ForeignKey('components.ComponentCode'), nullable=False)
    ComponentParamCategoryParamType = mysql.Column(mysql.Integer, mysql.ForeignKey('categoriesparamtypes.CategoryParamTypeId'), nullable=False)
    ComponentParamValue = mysql.Column(mysql.String(45), nullable=False)
    ComponentParamPrefix = mysql.Column(mysql.Integer, mysql.ForeignKey('prefixes.PrefixId'), nullable=False)
    ComponentParamNote = mysql.Column(mysql.Text, nullable=True)

    def export_data(self):
        return {
            'ComponentParamId': self.ComponentParamId,
            'ComponentParamComponent': self.ComponentParamComponent,
            'ComponentParamCategoryParamType': self.ComponentParamCategoryParamType,
            'ComponentParamValue': self.ComponentParamValue,
            'ComponentParamPrefix': self.ComponentParamPrefix,
            'ComponentParamNote': self.ComponentParamNote
        }

    def import_data(self, data):
        try:
            self.ComponentParamComponent = data['ComponentParamComponent']
            self.ComponentParamCategoryParamType = data['ComponentParamCategoryParamType']
            self.ComponentParamValue = data['ComponentParamValue']
            self.ComponentParamPrefix = data['ComponentParamPrefix']
            self.ComponentParamNote = data['ComponentParamNote']
        except KeyError as e:
            raise ValidationError('Invalid component parameter: missing ' + e.args[0])
        return self
