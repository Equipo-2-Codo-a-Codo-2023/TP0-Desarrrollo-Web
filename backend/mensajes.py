#instalar ocn pip install mysql-connector-python
import mysql.connector

# no es necesario instalar, es parte del sistema de python
import datetime

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
