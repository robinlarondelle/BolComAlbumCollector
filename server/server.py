import flask
from flask import request
from flask import Response
import openpyxl

app = flask.Flask(__name__)
app.config["DEBUG"] = True

@app.route('/albums', methods=['POST'])
def add_album_to_excel():
    artist = request.json['artist']
    album = request.json['album']
    link = request.json['link']

    EXCEL_LOCATION = "D:\Documenten\Albums.xlsx"
    book = openpyxl.load_workbook(EXCEL_LOCATION)
    sheet = book['albums']
    sheet.append((artist, album, link))
    print(sheet)
    book.save(EXCEL_LOCATION)
    return Response(status=200)


app.run()
