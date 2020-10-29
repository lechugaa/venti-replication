from hashlib import sha1
import sys
import zlib


def archive_file(file_path, log, index, compress=False, block_size=4096):
    fingerprints = []
    block_changes = []
    total_size = 0
    real_size = 0
    f = open(file_path, 'rb')

    block = f.read(block_size)
    while block:
        total_size += size_in_kb(block)
        fingerprint = get_fingerprint(block)
        fingerprints.append(fingerprint)

        if compress:
            block = zlib.compress(block)

        if fingerprint in index:
            block_changes.append((fingerprint, block, False))
        else:
            log.append(block)
            index[fingerprint] = len(log) - 1
            block_changes.append((fingerprint, block, True))
            real_size += size_in_kb(block)

        block = f.read(block_size)

    f.close()

    return fingerprints, block_changes, total_size, real_size


def get_fingerprint(block):
    digestor = sha1()
    digestor.update(block)
    return digestor.hexdigest()


def size_in_kb(block):
    return sys.getsizeof(block) / 1024
