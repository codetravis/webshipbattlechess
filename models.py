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

class Game(Base):
	__tablename__ = 'games'

	id = Column(Integer, primary_key=True)
	turn = Column(Integer)
	active_player = Column(Integer)

	def __init__(self, turn=0, active_player=0):
		self.turn = turn
		self.active_player = active_player

	def __rep__(self):
		return '' % self.id

class Ship(Base):
	__tablename__  = 'ships'

	id = Column(Integer, primary_key=True)
	name = Column(String(255))
	hull = Column(String(100))
	shields_front = Column(Integer)
	shields_rear = Column(Integer)
	shields_right = Column(Integer)
	shields_left = Column(Integer)
	x = Column(Integer)
	y = Column(Integer)
	facing = Column(Integer)
	
	def __init__(self, name="", hull="", x=0, y=0, facing=0):
		self.name = name
		self.hull = hull
		self.shields_front = 0
		self.shields_rear = 0
		self.shields_right = 0
		self.shields_left = 0
		self.x = x
		self.y = y
		self.facing = facing

	def __rep__(self):
		return  '' % self.hull

