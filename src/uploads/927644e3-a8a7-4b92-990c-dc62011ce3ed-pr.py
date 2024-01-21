import sqlite3
database_file = "./shipment_database.db"
conn = sqlite3.connect(database_file)
conn.execute("INSERT INTO product (id,name) VALUES (?, ?)",(13,"manik") )
conn.commit()