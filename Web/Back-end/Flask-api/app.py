from flask import Flask, request, url_for, redirect, render_template, jsonify
from flask_cors import CORS
import pickle
import numpy as np

app = Flask(__name__)
CORS(app)

# Load the trained model
selected_features = ['day', 'month', 'year', 'Temperature', 'RH', 'Rain', 'Classes']
model = pickle.load(open('NewRandomForestDump.pkl', 'rb'))

eqmodel = pickle.load(open('MagPredict.pkl', 'rb'))

@app.route('/')
def hello_world():
    return render_template("forest_fire.html")

@app.route('/eq')
def hello():
    return render_template("earthquake.html")

@app.route('/predict', methods=['POST', 'OPTIONS'])
def predict():
    if request.method == 'OPTIONS':
        return '',200

    data = request.json
    int_features = [int(data[key]) for key in data]
    #final = np.array(int_features).reshape(1, -1)
    #type(final)
    #print(final.shape)
    print(int_features)
    # Make prediction using the trained model
    prediction = model.predict([int_features])
    #print(prediction)
    
    #output = '{0:.{1}f}'.format(prediction[0], 2)

    if prediction == 0:
        response_data = 'Forest is in safe condition'
    else:
        response_data = 'Forest is in danger'

    print(response_data)

    return jsonify({'message' : response_data}),200

@app.route('/eqpredict', methods=['POST', 'OPTIONS'])
def eqpredict():
    if request.method == 'OPTIONS':
        return '', 200
    
    data = request.json
    float_features = [float(data[key]) for key in data]  # Parse input features as floats
    
    # Make prediction using the trained model
    prediction2 = eqmodel.predict([float_features])
    prediction_result = round(prediction2[0],2)
    
    return jsonify({'message': prediction_result}), 200


if __name__ == '__main__':
    app.run(debug=True)
