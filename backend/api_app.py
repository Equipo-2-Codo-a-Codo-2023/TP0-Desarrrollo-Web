#--------------------------------------------------------------------
from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import os
import time, datetime
#--------------------------------------------------------------------


app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}}) 

class Mensaje:

    def __init__(self, host, user, password, database):
        self.conn = mysql.connector.connect(
            host=host,
            user=user,
            password=password
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
        self.cursor.execute('''CREATE TABLE IF NOT EXISTS mensajes (
            id int(11) NOT NULL AUTO_INCREMENT,
            email varchar(60) NOT NULL,
            asunto varchar(50) NOT NULL,
            mensaje varchar(500) NOT NULL,
            fecha_envio datetime NOT NULL,
            leido tinyint(1) NOT NULL,
            gestion varchar(500) DEFAULT NULL,
            fecha_gestion datetime DEFAULT NULL,
            PRIMARY KEY(`id`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
            ''')
        self.conn.commit()
        self.cursor.close()
        self.cursor = self.conn.cursor(dictionary=True)
        
    def enviar_mensaje(self, email, asunto, consulta):
        sql = "INSERT INTO mensajes(email, asunto, mensaje, fecha_envio) VALUES (%s, %s, %s, %s)"
        fecha_envio = datetime.datetime.now()
        valores = (email, asunto, consulta, fecha_envio)
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
         sql = f"SELECT id,email, asunto, mensaje, fecha_envio, leido, gestion, fecha_gestion FROM mensajes WHERE id = {id}"
         self.cursor.execute(sql)
         return self.cursor.fetchone()


mensaje = Mensaje(host='P4B10.mysql.pythonanywhere-services.com', user='P4B10', password='grupo06cac', database='mensajes')



@app.route("/mensajes", methods=["GET"])
def listar_mensajes():
    respuesta = mensaje.listar_mensajes()
    return jsonify(respuesta)

@app.route("/mensajes", methods=["POST"])
def agregar_consulta():
    asunto = request.form['asunto']
    email = request.form['email']
    consulta = request.form['mensaje']  

    if mensaje.enviar_mensaje(email,asunto, consulta):
        return jsonify({"mensaje": "Mensaje agregado"}), 201
    else:
        return jsonify({"mensaje": "No fue posible registrar el mensaje"}), 400
  
@app.route("/mensajes/<int:id>", methods=["PUT"])
def responder_mensaje(id):
    gestion = request.form.get("gestion")
    
    if mensaje.responder_mensaje(id, gestion):
        return jsonify({"mensaje": "Mensaje modificado"}), 200
    else:
        return jsonify({"mensaje": "Mensaje no encontrado"}), 403

#--------------------------------------------------------------------
if __name__ == "__main__":
    app.run(debug=True)



