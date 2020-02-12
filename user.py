
class User(db.Model):
	uid = db.Column(db.Integer, primary_key=True)
	username = db.Column(db.String(100), unique=True, nullable=False)
	password = db.Column(db.String(256), nullable=False)
	
	def __rep__(self):
		return '' % self.username