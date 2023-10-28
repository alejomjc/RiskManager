from bson import json_util
from flask import Flask, request, jsonify, Response
from flask_pymongo import PyMongo, ObjectId
from flask_cors import CORS

app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://localhost:27017/gestionriesgosdb'
mongo = PyMongo(app)

CORS(app)
db = mongo.db.riesgos


@app.route('/riesgos', methods=['GET'])
def get_riesgos():
    riesgos = []
    for riesgo in db.find():
        riesgos.append({
            '_id': str(ObjectId(riesgo['_id'])),
            'name': riesgo['name']
        })
    return jsonify(riesgos)


@app.route('/riesgo/<id>', methods=['GET'])
def get_riesgo(id):
    riesgo = db.find_one({'_id': ObjectId(id)})
    response = json_util.dumps(riesgo)
    return Response(response, mimetype="application/json")


@app.route('/riesgo/create', methods=['POST'])
def create_riesgo():
    riesgo = db.insert_one({
        'name': request.json['name']
    })
    return jsonify(str(ObjectId(riesgo.inserted_id)))


@app.route('/riesgo/<id>', methods=['PUT'])
def update_riesgo(id):
    db.update_one({'_id': ObjectId(id)}, {'$set': {
        'name': request.json['name']
    }})
    return jsonify({'message': 'Usuario Actualizado'})


@app.route('/riesgo/<id>', methods=['DELETE'])
def delete_riesgo(id):
    db.delete_one({'_id': ObjectId(id)})
    return jsonify({'message': 'Riesgo eliminado'})


if __name__ == '__main__':
    app.run(debug=True)
