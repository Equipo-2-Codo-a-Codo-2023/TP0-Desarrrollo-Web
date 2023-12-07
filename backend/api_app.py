from flask import Flask, request, jsonify

from flask_cors import CORS

import mysql.connector

import datetime

app =  Flask(__name__)

CORS(app, resource = {r"/*": {"origins": "*"}})

class Mensaje:

    def __init__(self, host, user, password, database):
        self.conn = mysql.connector.connect(
        host = host,
        user = user,
        password = password
    )

        self.cursor = self.conn.cursor()

        try:
            self.cursor.execute(f"USE {database}")
        except mysql.connector.Error as err:
            if err.errno == mysql.connector.errorcode.ER_BAD_DB_ERROR:
                self.cursor.execute(f"CREATE DATABASE {database}")
                self.conn.database = database
            else:
                raise err
        
        self.cursor.execute ('''CREATE TABLE IF NOT EXISTS mensajes (
	        id INT NOT NULL AUTO_INCREMENT , 
	        email VARCHAR(60) NOT NULL , 
	        asunto VARCHAR(60) NOT NULL , 
	        mensaje VARCHAR(500) NOT NULL , 
	        fecha_envio DATETIME NOT NULL , 
	        leido BOOLEAN NOT NULL , 
	        gestion VARCHAR(500) NULL , 
	        fecha_gestion DATETIME NULL ,
	        PRIMARY KEY (`id`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
            ''')
        self.conn.commit()
        self.cursor.close()
        self.cursor = self.conn.cursor(dictionary=True)
    
    def enviar_mensaje(self, email, asunto, mensaje):
        sql = "INSERT INTO mensajes (email, asunto, mensaje, fecha_envio) VALUES ( %s, %s, %s, %s)"
        fecha_envio = datetime.datetime.now()
        valores = (email, asunto, mensaje, fecha_envio)
        self.cursor.execute(sql, valores)
        self.conn.commit()
        return True
    
    def listar_mensajes(self):
        self.cursor.execute("SELECT * FROM mensajes")
        mensajes = self.cursor.fetchall()
        return mensajes
    
    def responder_mensaje(self, id, gestion):
        fecha_gestion = datetime.datetime.now()
        sql = "UPDATE mensajes SET leido = 1, gestion = %s, fecha_gestion = %s WHERE id = %s"
        valores = (gestion, fecha_gestion, id)
        self.cursor.execute(sql, valores)
        self.conn.commit()
        return self.cursor.rowcount > 0
    
    def eliminar_mensaje(self, id):
        self.cursor.execute(f"DELETE FROM mensajes WHERE id = {id}")
        self.conn.commit()
        return self.cursor.rowcount > 0 
    
    def mostrar_mensaje(self, id):
        self.cursor.execute(f"SELECT email, asunto, mensaje, fecha_envio, leido, gestion, fecha_gestion FROM mensajes WHERE id = {id}")
        return self.cursor.fetchone()

mensaje = Mensaje("localhost", "root", "", "clientes")

@app.route("/mensajes", methods=["GET"])
def listar_mensajes():
    respuesta = mensaje.listar_mensajes()
    return jsonify(respuesta)

@app.route("/mensajes", methods=["POST"])
def agregar_producto():
    email = request.form["email"]
    asunto = request.form["asunto"]
    consulta = request.form["mensaje"]

    if mensaje.enviar_mensaje( email, asunto, consulta):
        return jsonify({"mensaje": "Mensaje agregado"}), 201
    else:
        return jsonify({"mensaje": "No fue posible agregar el mensaje"}), 200

@app.route("/mensajes/<int:id>", methods=["PUT"])
def responder_mensajes(id):
    gestion = request.form.get("gestion")

    if mensaje.responder_mensaje(id, gestion):
        return jsonify({"mensaje": "Mensaje Modificado"}), 201
    else:
        return jsonify({"mensaje": "Mensaje no encontrado"}), 400
        
        
    




if __name__ == "__main__":
    app.run(debug=True)