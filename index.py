from flask import Flask, render_template, request, url_for, redirect, flash, session, abort
from flask_socketio import SocketIO, emit
from jwcrypto import jwt, jwk
from flask_sqlalchemy import sqlalchemy, SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import sqlite3

app = Flask(__name__)
socketio = SocketIO(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///{db}'.format(db='sample_game.db')

#connection = sqlite3.connect('sample_game.db')
#db_cursor = connection.cursor()

server_key = jwk.JWK(generate='oct', size=256)

db = SQLAlchemy(app)

class User(db.Model):
	uid = db.Column(db.Integer, primary_key=True)
	email = db.Column(db.String(100), unique=True, nullable=False)
	password = db.Column(db.String(256), nullable=False)
	
	def __rep__(self):
		return '' % self.email

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
			return user.uid
	return 0

@socketio.on("game")
def GetGame(game_id):
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

if(__name__ == '__main__'):
	db.create_all()
	socketio.run(app)
