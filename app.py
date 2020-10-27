import os
from flask import Flask
from flask import jsonify, render_template, request
from fingerprint_generator import archive_file

app = Flask(__name__)

venti_index = {}
venti_log = []


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/archive/', methods=['POST'])
def archive():
    fingerprints = {}
    if request.files:
        files = request.files.getlist("uploaded_files")
        for file in files:
            file_path = f'./temporal_files/{file.filename}'
            file.save(file_path)
            fingerprints[file.filename] = archive_file(file_path, venti_log, venti_index)
            os.remove(file_path)

    return jsonify(fingerprints)


if __name__ == '__main__':
    app.run()
