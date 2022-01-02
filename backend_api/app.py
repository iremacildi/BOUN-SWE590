from flask import Flask, jsonify, request
from flask_cors import CORS
import sentiment

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
cors = CORS()

cors.init_app(app, resources={r"/*": {"origins": "*"}})

@app.route('/')
def index():
    return 'Service is running.'

@app.route('/sentiment-analysis', methods=['POST'])
def sentiment_analysis():
    data = request.get_json()
    input_text = data['inputText']
    input_lang = data['inputLanguage']
    response = sentiment.get_sentiment(input_text, input_lang)
    return jsonify(response)