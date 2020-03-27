from database import db_session
from models import Ship
import math

def DistanceToTarget(ship, target_x, target_y):
    return math.sqrt((target_x - ship.x)**2 + (target_y - ship.y)**2)

def IsValidMove(ship, target_x, target_y):
    query = db_session.query(Ship).filter(Ship.game_id == ship.game_id).filter(Ship.x == target_x).filter(Ship.y == target_y)
    ship_at_target = query.one_or_none()
    if(ship_at_target is not None):
        return False
    elif (DistanceToTarget(ship, target_x, target_y) > ship.speed):
        return False
    else:
        return True


def MoveShip(ship_id, target_x, target_y, target_facing):
    query = db_session.query(Ship).filter(Ship.id == ship_id)
    ship = query.one()
    if(IsValidMove(ship, target_x, target_y)):
        ship.x = target_x
        ship.y = target_y
        ship.facing = target_facing
        db_session.commit()
    return ship