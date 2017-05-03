from .. import mysql
from ..exceptions import ValidationError


class Component(mysql.Model):
    __tablename__ = 'components'
    ComponentCode = mysql.Column(mysql.String(45), primary_key=True, nullable=False)
    ComponentName = mysql.Column(mysql.String(45), nullable=False)
    ComponentManufacturer = mysql.Column(mysql.Integer, mysql.ForeignKey('manufacturers.ManufacturerId'), nullable=False)
    ComponentPartNumber = mysql.Column(mysql.String(45), nullable=False)
    ComponentDistributorCode = mysql.Column(mysql.String(45), nullable=False)
    ComponentDistributor = mysql.Column(mysql.Integer, mysql.ForeignKey('distributors.DistributorId'), nullable=False)
    ComponentPrice = mysql.Column(mysql.Float, nullable=False)
    ComponentLocation = mysql.Column(mysql.Integer, mysql.ForeignKey('locations.LocationId'), nullable=False)
    ComponentDatasheet = mysql.Column(mysql.String(45), nullable=False)
    ComponentFootprint = mysql.Column(mysql.Integer, mysql.ForeignKey('footprints.FootprintId'), nullable=False)
    ComponentCategory = mysql.Column(mysql.Integer, mysql.ForeignKey('categories.CategoryId'), nullable=False)
    ComponentNote = mysql.Column(mysql.Text, nullable=True)

    def export_data(self):
        return {
            'ComponentCode': self.ComponentCode,
            'ComponentName': self.ComponentName,
            'ComponentManufacturer': self.ComponentManufacturer,
            'ComponentPartNumber': self.ComponentPartNumber,
            'ComponentDistributorCode': self.ComponentDistributorCode,
            'ComponentDistributor': self.ComponentDistributor,
            'ComponentPrice': self.ComponentPrice,
            'ComponentLocation': self.ComponentLocation,
            'ComponentDatasheet': self.ComponentDatasheet,
            'ComponentFootprint': self.ComponentFootprint,
            'ComponentCategory': self.ComponentCategory,
            'ComponentNote': self.ComponentNote
        }

    def import_data(self, data):
        try:
            self.ComponentCode = data['ComponentCode']
            self.ComponentName = data['ComponentName']
            self.ComponentManufacturer = data['ComponentManufacturer']
            self.ComponentPartNumber = data['ComponentPartNumber']
            self.ComponentDistributorCode = data['ComponentDistributorCode']
            self.ComponentDistributor = data['ComponentDistributor']
            self.ComponentPrice = data['ComponentPrice']
            self.ComponentLocation = data['ComponentLocation']
            self.ComponentDatasheet = data['ComponentDatasheet']
            self.ComponentFootprint = data['ComponentFootprint']
            self.ComponentCategory = data['ComponentCategory']
            self.ComponentNote = data['ComponentNote']
        except KeyError as e:
            raise ValidationError('Invalid component: missing ' + e.args[0])
        return self
