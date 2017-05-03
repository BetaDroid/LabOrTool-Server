from .. import mysql
from ..exceptions import ValidationError


class Category(mysql.Model):
    __tablename__ = 'categories'
    CategoryId = mysql.Column(mysql.Integer, primary_key=True, nullable=False)
    CategoryName = mysql.Column(mysql.String(45), nullable=False)
    CategoryNote = mysql.Column(mysql.Text, nullable=True)

    def export_data(self):
        return {
            'CategoryId': self.CategoryId,
            'CategoryName': self.CategoryName,
            'CategoryNote': self.CategoryNote
        }

    def import_data(self, data):
        try:
            self.CategoryName = data['CategoryName']
            self.CategoryNote = data['CategoryNote']
        except KeyError as e:
            raise ValidationError('Invalid category: missing ' + e.args[0])
        return self
