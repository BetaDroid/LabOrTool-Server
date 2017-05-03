from .. import mysql
from ..exceptions import ValidationError


class CategoryParamType(mysql.Model):
    __tablename__ = 'categoriesparamtypes'
    CategoryParamTypeId = mysql.Column(mysql.Integer, primary_key=True, nullable=False)
    CategoryParamTypeName = mysql.Column(mysql.String(45), nullable=False)
    CategoryParamTypeCategory = mysql.Column(mysql.Integer, mysql.ForeignKey('categories.CategoryId'), nullable=False)
    CategoryParamTypeUnit = mysql.Column(mysql.Integer, mysql.ForeignKey('units.UnitId'), nullable=False)
    CategoryParamTypeOrder = mysql.Column(mysql.String(45), nullable=False)
    CategoryParamTypeNote = mysql.Column(mysql.Text, nullable=True)

    def export_data(self):
        return {
            'CategoryParamTypeId': self.CategoryParamTypeId,
            'CategoryParamTypeName': self.CategoryParamTypeName,
            'CategoryParamTypeCategory': self.CategoryParamTypeCategory,
            'CategoryParamTypeUnit': self.CategoryParamTypeUnit,
            'CategoryParamTypeOrder': self.CategoryParamTypeOrder,
            'CategoryParamTypeNote': self.CategoryParamTypeNote
        }

    def import_data(self, data):
        try:
            self.CategoryParamTypeName = data['CategoryParamTypeName']
            self.CategoryParamTypeCategory = data['CategoryParamTypeCategory']
            self.CategoryParamTypeUnit = data['CategoryParamTypeUnit']
            self.CategoryParamTypeOrder = data['CategoryParamTypeOrder']
            self.CategoryParamTypeNote = data['CategoryParamTypeNote']
        except KeyError as e:
            raise ValidationError('Invalid category parameter type: missing ' + e.args[0])
        return self
