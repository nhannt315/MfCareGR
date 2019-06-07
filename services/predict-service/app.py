from flask import Flask, jsonify, make_response, request
import settings
from pyvi import ViTokenizer

from model import magpie

class FileReader(object):
    def __init__(self, filePath, encoder=None):
        self.filePath = filePath
        self.encoder = encoder if encoder != None else 'utf-16le'

    def read_stopwords(self):
        with open(self.filePath, 'r') as f:
            stopwords = set([w.strip().replace(' ', '_') for w in f.readlines()])
        return stopwords

app = Flask(__name__)

stopwords = FileReader(settings.STOP_WORDS).read_stopwords()

def tokenize(content):
    return ViTokenizer.tokenize(content)

def remove_stopwords(content):
    text = ' '.join([word for word in content.split() if word.encode('utf-8') not in stopwords])
    return text


@app.route('/')
def index():
    return "Hello, World"

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    content = data["content"]
    content_fixed = tokenize(content)
    result = magpie.predict_from_text(remove_stopwords(content_fixed))
    return_value = get_tag(result[:20])
    print result[:20]
    return jsonify({'result': return_value})

@app.route('/handle_string', methods=['POST'])
def handle_string():
    data = request.json
    content = data["content"]
    content_fixed = ViTokenizer.tokenize(content)
    result = ' '.join([word for word in content_fixed.split() if word.encode('utf-8') not in stopwords])
    return jsonify({'result': result})

@app.route('/no_stop', methods=['POST'])
def no_stop():
    data = request.json
    content = data["content"]
    result = ViTokenizer.tokenize(content)
    return jsonify({'result': result})


@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)


def get_tag(result_arr):
    result = []
    for ele in result_arr:
        if (ele[1] > 0.2):
           result.append(ele[0])
    if (len(result) == 0):
       if (result_arr[0][1] > 0.12):
           result.append(result_arr[0][0])
    return result

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
