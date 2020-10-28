import os
from flask import Flask
from flask import render_template, request, redirect, url_for
from venti import archive_file

app = Flask(__name__)

venti_index = {}
venti_log = []
venti_files = {}
venti_changes = []


@app.route('/',  methods=['GET'])
def index():
    return render_template('index.html',
                           log=venti_log, index=venti_index, files_dict=venti_files, changes=venti_changes)


@app.route('/archive/', methods=['POST'])
def archive():
    if request.files:
        files = request.files.getlist("uploaded_files")
        venti_changes.clear()
        for file in files:
            file_path = f'./temporal_files/{file.filename}'
            file.save(file_path)
            fingerprints, changes = archive_file(file_path, venti_log, venti_index)
            venti_files[file.filename] = fingerprints
            for change in changes:
                venti_changes.append(change)
            os.remove(file_path)

    return redirect(url_for('index'))


if __name__ == '__main__':
    app.run()
