from flask import Flask, render_template
from flask_socketio import SocketIO, emit
from jwcrypto import jwt, jwk
import sqlite3

app = Flask(__name__)
socketio = SocketIO(app)


connection = sqlite3.connect('sample_game.db')
db_cursor = connection.cursor()

server_key = jwk.JWK(generate='oct', size=256)


@app.route("/")
def MainMenu():
	return render_template('index.html')

@app.route("/auth")
def Authenticate():
	token = jwt.JWT(header={'alg': 'HS256'}, claims={'user_id': '1'})
	token.make_signed_token(server_key)
	claims = VerifyToken(token.serialize())
	return { 'jwt': token.serialize(), 'claims': claims }

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
	socketio.run(app)
