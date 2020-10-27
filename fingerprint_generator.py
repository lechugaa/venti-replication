from hashlib import sha1
import sys
import zlib


def archive_file(file_path, log, index, compress=False, block_size=4096):

    fingerprints = []
    f = open(file_path, 'rb')

    block = f.read(block_size)
    while block:
        fingerprint = get_fingerprint(block)
        fingerprints.append(fingerprint)

        if fingerprint not in index:
            if compress:
                block = zlib.compress(block)
            log.append(block)
            index[fingerprint] = len(log) - 1

        block = f.read(block_size)

    f.close()

    return fingerprints


def get_fingerprint(block):
    digestor = sha1()
    digestor.update(block)
    return digestor.hexdigest()
