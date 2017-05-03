from .. import mysql
from ..exceptions import ValidationError


class Production(mysql.Model):
    __tablename__ = 'productions'
    ProductionId = mysql.Column(mysql.Integer, primary_key=True, nullable=False)
    ProductionActivity = mysql.Column(mysql.Integer, nullable=False)
    ProductionBoard = mysql.Column(mysql.Integer, nullable=False)
    ProductionQuantity = mysql.Column(mysql.Integer, nullable=False)
    ProductionDescription = mysql.Column(mysql.Text, nullable=False)
    ProductionWorkCode = mysql.Column(mysql.String(45), nullable=False)
    ProductionOutputCode = mysql.Column(mysql.String(45), nullable=False)
    ProductionDeadline = mysql.Column(mysql.DateTime, nullable=False)
    ProductionEmployee = mysql.Column(mysql.Integer, nullable=False)
    ProductionManufacturer = mysql.Column(mysql.Integer, nullable=False)
    ProductionStatus = mysql.Column(mysql.Integer, nullable=False)

    def export_data(self):
        return {
            'ProductionId': self.ProductionId,
            'ProductionActivity': self.ProductionActivity,
            'ProductionBoard': self.ProductionBoard,
            'ProductionQuantity': self.ProductionQuantity,
            'ProductionDescription': self.ProductionDescription,
            'ProductionWorkCode': self.ProductionWorkCode,
            'ProductionOutputCode': self.ProductionOutputCode,
            'ProductionDeadline': self.ProductionDeadline,
            'ProductionEmployee': self.ProductionEmployee,
            'ProductionManufacturer': self.ProductionManufacturer,
            'ProductionStatus': self.ProductionStatus
        }

    def import_data(self, data):
        try:
            self.ProductionActivity = data['ProductionActivity']
            self.ProductionBoard = data['ProductionBoard']
            self.ProductionQuantity = data['ProductionQuantity']
            self.ProductionDescription = data['ProductionDescription']
            self.ProductionWorkCode = data['ProductionWorkCode']
            self.ProductionOutputCode = data['ProductionOutputCode']
            self.ProductionDeadline = data['ProductionDeadline']
            self.ProductionEmployee = data['ProductionEmployee']
            self.ProductionManufacturer = data['ProductionManufacturer']
            self.ProductionStatus = data['ProductionStatus']
        except KeyError as e:
            raise ValidationError('Invalid production: missing ' + e.args[0])
        return self
