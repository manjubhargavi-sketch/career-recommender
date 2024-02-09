from flask import Flask, request, jsonify,render_template
from flask_cors import CORS
import pandas as pd
import json
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder

app = Flask(__name__)
CORS(app)

df = pd.read_csv('pred.csv')

result_mapping = {'Physicist': 1, 'Legal consultant': 2, 'Mathematician': 3, 'Accountant': 4,
                   'Technician': 5, 'Clothing label': 6, 'Paramedics': 7, 'Doctor': 8, 'Management': 9,
                   'Biotechnology': 10, 'Clinical Clinical Psychology': 11, 'Software Engineering': 12,
                   'Bio Informatics': 13}
result_mapping_reverse = {v: k for k, v in result_mapping.items()}
df['result'] = df['result'].map(result_mapping)
df['percentage'] = df['percentage'].apply(lambda x: int(x.split('-')[0]))

df = df.dropna(subset=['result'])

X = df.drop('result', axis=1)
y = df['result']
X_train, _, y_train, _ = train_test_split(X, y, test_size=0.2, random_state=42)

encoder = OneHotEncoder(drop='first', sparse=False)
X_encoded = encoder.fit_transform(X_train[['hobby', 'group', 'subject', 'strength', 'weakness']])
model = RandomForestClassifier()
model.fit(X_encoded, y_train)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        
        user_input = request.get_json()
        print("Received user_input:", user_input)

        if not user_input:
            raise ValueError("Empty user input")

        inpt = pd.DataFrame([user_input])
        print("Input DataFrame:", inpt)
        
        inp=inpt.drop('percentage',axis=1)
     
        features_for_encoding = inp[['hobby', 'group', 'subject', 'strength', 'weakness']]
        inp_encoded = encoder.transform(features_for_encoding)
        
        if inp_encoded is None:
            print("error")
            raise ValueError("Failed to encode input")
        
        prediction = model.predict(inp_encoded)
       
        print("Predictions:", prediction)
        result = result_mapping_reverse.get(prediction[0], 'Unknown')
        print("Mapped Result:", result)
        return jsonify({'predictions': result})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
