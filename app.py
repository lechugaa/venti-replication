import os
from datetime import datetime
from flask import Flask
from flask import jsonify, render_template, request, redirect, send_file, url_for
from helpers import archive_file, timestamp_filename

app = Flask(__name__)

venti_index = {}
venti_log = []
venti_files = {}
venti_changes = []
labels = []
total_sizes = []
real_sizes = []


def update_sizes(total_delta, real_delta):
    total_size = total_sizes[-1] if len(total_sizes) > 0 else 0
    real_size = real_sizes[-1] if len(real_sizes) > 0 else 0
    label = f"{datetime.now().strftime('%H:%M:%S')}"

    labels.append(label)
    total_sizes.append(total_size + total_delta)
    real_sizes.append(real_size + real_delta)


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html',
                           log=venti_log, index=venti_index,
                           files_dict=venti_files, changes=venti_changes,
                           total_size=total_sizes[-1] if len(total_sizes) > 0 else 0,
                           real_size=real_sizes[-1] if len(real_sizes) > 0 else 0)


@app.route('/archive/', methods=['POST'])
def archive():
    if request.files:
        files = request.files.getlist("uploaded_files")

        compress = request.form.get("enable_compression")
        compress = (compress == 'on') if compress else False

        block_size = request.form.get("block_size")
        block_size = int(block_size) * 1024 if block_size else 4096

        venti_changes.clear()
        total_delta = 0
        real_delta = 0

        for file in files:
            filename = timestamp_filename(file.filename)
            file_path = f'./temporal_files/{filename}'
            file.save(file_path)
            fingerprints, changes, total_i_delta, real_i_delta = archive_file(file_path=file_path,
                                                                              log=venti_log,
                                                                              index=venti_index,
                                                                              compress=compress,
                                                                              block_size=block_size)
            venti_files[filename] = fingerprints
            total_delta += total_i_delta
            real_delta += real_i_delta
            for change in changes:
                venti_changes.append(change)
            os.remove(file_path)

        update_sizes(total_delta, real_delta)

    return redirect(url_for('index'))


@app.route('/delete_log/', methods=['GET'])
def delete_log():
    venti_index.clear()
    venti_log.clear()
    venti_files.clear()
    venti_changes.clear()
    labels.clear()
    total_sizes.clear()
    real_sizes.clear()

    return redirect(url_for('index'))


@app.route('/historical_data/', methods=['GET'])
def get_historical_data():
    return jsonify([labels, total_sizes, real_sizes])


@app.route('/download_block/<block_id>/', methods=['GET'])
def download_block(block_id):
    log_index = int(block_id)

    file_path = f"./temporal_files/block-file.txt"
    f = open(file_path, "wb")
    f.write(venti_log[log_index])
    f.close()

    return send_file(file_path, as_attachment=True)


if __name__ == '__main__':
    app.run()
