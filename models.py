from sqlalchemy import Column, Integer, String
from database import Base

class User(Base):
	__tablename__ = 'users'
	
	id = Column(Integer, primary_key=True)
	email = Column(String(100), unique=True, nullable=False)
	password = Column(String(256), nullable=False)
	
	def __init__(self, email=None, password=None):
		self.email = email
		self.password = password
	
	def __rep__(self):
		return '' % self.email