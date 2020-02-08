from flask import Flask
import sqlite3

app = Flask(__name__)

connection = sqlite3.connect('sample_game.db')
game_cursor = connection.cursor()

@app.route("/")
def MainMenu():
	return "main_menu"


@app.route("/game/<game_id>", methods=['GET'])
def GetGame(game_id):
	return "Playing game: " + game_id

@app.route("/ships/<game_id>", methods=['GET'])
def GetPlayerShips(game_id):
	return "Player ships available in game: " + game_id
	
@app.route("/endturn/<game_id>/<player_id>", methods=['POST'])
def EndTurn(game_id, player_id):
	return "Ending turn for player: " + player_id + " in game: " + game_id
	
@app.route("/moveship/<game_id>/<ship_id>", methods=['POST'])
def MoveShip(game_id, ship_id):
	return "Moving ship: " + ship_id + " in game: " + game_id

@app.route("/targets/<game_id>/<ship_id>", methods=['GET'])
def GetTargets(game_id, ship_id):
	return "Ship: " + ship_id + " has available targets"

@app.route("/attack/<game_id>/<ship_id>/<target_id>", methods=['POST'])
def AttackTarget(game_id, ship_id, target_id):
	return "Attacking ship: " + target_id + " with ship: " + ship_id + " in game: " + game_id
	
