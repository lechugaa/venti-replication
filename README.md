# Venti Replication

## Introduction

Venti Replication is a Flask web app developed to visualize the Venti network storage system
described by Sean Quinlan and Sean Dorward in their original paper
[S. Quinlan and S. Dorward, Venti: A New Approach to Archival Storage. In Proceedings of the 
USENIX Conference on File And Storage Technologies (FAST), January 2002](https://www.cs.princeton.edu/courses/archive/spr05/cos598E/bib/venti-fast.pdf).


> Venti is a block-level network storage system intended for archival data. 
> The interface to the system is a simple protocol that enables client applications 
> to read and write variable sized blocks of data. Venti itself does not provide the services 
> of a file or backup system, but rather the backend archival storage for these types of applications.

## Requirements

Python 3.0 or higher is required to use the tool along with the Flask libraries. All the requirements are included
in the **requierements.txt** file and the user can execute the following command to install them:

```
pip install -r requirements.txt
```

## Usage

To execute the tool run the following command:
```
python app.py
```

and visit http://127.0.0.1:5000/ on a  modern web browser (Chrome, Safari or Firefox for full capabilities).
