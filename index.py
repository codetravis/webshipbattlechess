from flask import Flask, render_template, request, url_for, redirect, flash, session, abort
from flask_socketio import SocketIO, emit
from jwcrypto import jwt, jwk
from werkzeug.security import generate_password_hash, check_password_hash
from database import db_session, init_db
from models import User
import json

app = Flask(__name__)
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
	emit( "game", { 'game_id': 0 })

@socketio.on("game")
def GetGame(data):
	user_claims = VerifyToken(token)
	user_id = user_claims['user_id']
	emit( "game", { 'game_id': game_id })

@app.route("/ships/<game_id>", methods=['GET'])
def GetPlayerShips(game_id):
	return "Player ships available in game: " + game_id
	
@app.route("/endturn", methods=['POST'])
def EndTurn(game_id, player_id):
	return "Ending turn for player: " + player_id + " in game: " + game_id
	
@app.route("/moveship", methods=['POST'])
def MoveShip(game_id, ship_id):
	return "Moving ship: " + ship_id + " in game: " + game_id

@app.route("/targets/<game_id>/<ship_id>", methods=['GET'])
def GetTargets(game_id, ship_id):
	return "Ship: " + ship_id + " has available targets"

@app.route("/attack", methods=['POST'])
def AttackTarget(game_id, ship_id, target_id):
	return "Attacking ship: " + target_id + " with ship: " + ship_id + " in game: " + game_id

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
