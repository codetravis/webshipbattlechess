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
		return "<User(id='%s', email='%s')>" % (
			self.id, self.email)

class Game(Base):
	__tablename__ = 'games'

	id = Column(Integer, primary_key=True)
	turn = Column(Integer)
	active_player = Column(Integer)

	def __init__(self, turn=0, active_player=0):
		self.turn = turn
		self.active_player = active_player

	def __rep__(self):
		return "<User(id='%s', turn='%s', active_player='%s')>" % (
			self.id, self.turn, self.active_player)

class Player(Base):
	__tablename__ = 'players'

	game_id = Column(Integer, primary_key=True)
	player_id = Column(Integer, primary_key=True)
	user_id = Column(Integer)

	def __init__(self, game_id, player_id, user_id):
		self.game_id = game_id
		self.player_id = player_id
		self.user_id = user_id

	def __rep__(self):
		return "<User(game_id='%s', player_id='%s', user_id='%s')>" % (
			self.game_id, self.player_id, self.user_id)

class Ship(Base):
	__tablename__  = 'ships'

	id = Column(Integer, primary_key=True)
	owner = Column(Integer)
	game_id = Column(Integer)
	name = Column(String(255))
	hull = Column(String(100))
	shields_front = Column(Integer)
	shields_rear = Column(Integer)
	shields_right = Column(Integer)
	shields_left = Column(Integer)
	x = Column(Integer)
	y = Column(Integer)
	facing = Column(Integer)
	
	def __init__(self, owner=0, game_id=0, name="", hull="", x=0, y=0, facing=0):
		self.owner = owner
		self.game_id = game_id
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
		return "<User(id='%s', hull='%s', owner='%s', game_id='%s', x='%s', y='%s')>" % (
			self.id, self.hull, self.owner, self.game_id, self.x, self.y)

