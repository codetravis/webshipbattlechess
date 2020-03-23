from flask import Flask, render_template, request, url_for, redirect, flash, session, abort
from flask_socketio import SocketIO, emit
from jwcrypto import jwt, jwk
from werkzeug.security import generate_password_hash, check_password_hash
from database import db_session, init_db
from models import User, Game, Ship
import sqlalchemy
import json

app = Flask(__name__, static_url_path='')
socketio = SocketIO(app)

server_key = jwk.JWK(generate='oct', size=256)

@app.teardown_appcontext
def shutdown_session(exception=None):
	db_session.remove()

@app.route("/main_menu")
def MainMenu():
	return render_template('index.html')

@app.route("/", methods=['GET', 'POST'])
def Authenticate():
	if(request.method == 'POST'):
		email = request.form['email']
		password = request.form['password']
		user_id = VerifyLogin(email, password)
		token = jwt.JWT(header={'alg': 'HS256'}, claims={'user_id': user_id})
		token.make_signed_token(server_key)
		claims = VerifyToken(token.serialize())
		return { 'jwt': token.serialize(), 'claims': claims }
	
	return render_template('login.html')

def VerifyLogin(email, password):
	user = User.query.filter_by(email=email).first()
	if(user):
		if (check_password_hash(user.password, password)):
			return user.id
	return 0

@socketio.on("new_game")
def CreateNewGame(data):
	user_claims = json.loads(VerifyToken(data['token']))
	print(user_claims)
	user_id = user_claims['user_id']
	# join existing game with empty player slot or create new game
	game_id = 0
	emit( "game", { 'game_id': game_id })

@socketio.on("game")
def GetGame(data):
	user_claims = json.loads(VerifyToken(data['token']))
	user_id = user_claims['user_id']
	# get game id of existing game this player is a part of
	game_id = 0
	emit( "game", { 'game_id': game_id })

@socketio.on("ships")
def GetPlayerShips(data):
	user_claims = json.loads(VerifyToken(data['token']))
	user_id = user_claims['user_id']
	game_id = data['game_id']
	emit( "ship_list", { 'ships': [] })
	
@socketio.on("end_turn")
def EndTurn(data):
	user_claims = json.loads(VerifyToken(data['token']))
	user_id = user_claims['user_id']
	game_id = data['game_id']
	emit( "end_turn", { 'turn': 0, 'active_player': 0 })
	
@socketio.on("move_ship")
def MoveShip(data):
	user_claims = json.loads(VerifyToken(data['token']))
	user_id = user_claims['user_id']
	game_id = data['game_id']
	ship_id = data['ship_id']
	move_target = data['move_target']
	emit("move_ship", { 'ship_id': 0, 'new_location': { 'x': 0, 'y': 0 } })

@socketio.on("get_targets")
def GetTargets(data):
	user_claims = json.loads(VerifyToken(data['token']))
	user_id = user_claims['user_id']
	game_id = data['game_id']
	ship_id = data['ship_id']
	emit("show_targets", { 'targets': [] })

@socketio.on("attack_ship")
def AttackTarget(data):
	user_claims = json.loads(VerifyToken(data['token']))
	user_id = user_claims['user_id']
	game_id = data['game_id']
	ship_id = data['ship_id']
	emit("update_ships", { 'attacker': {}, 'defender': {} })

@socketio.on("perform_action")
def PerformAction(data):
	user_claims = json.loads(VerifyToken(data['token']))
	user_id = user_claims['user_id']
	game_id = data['game_id']
	ship_id = data['ship_id']
	action = data['action']
	emit("update_ship", { 'ship': {} })

def VerifyToken(token):
	read_token = jwt.JWT(key=server_key, jwt=token)
	return read_token.claims

def SetupDemoDBData():
	init_db()
	new_user_one = User(email="testone@evolvingdeveloper.com", password=generate_password_hash('password', 'sha256'))
	new_user_two = User(email="testtwo@evolvingdeveloper.com", password=generate_password_hash('password', 'sha256'))
	db_session.add(new_user_one)
	db_session.add(new_user_two)
	try:
		db_session.commit()
	except sqlalchemy.exc.IntegrityError:
		print("demo users already exist")

if(__name__ == '__main__'):
	SetupDemoDBData()
	socketio.run(app)
