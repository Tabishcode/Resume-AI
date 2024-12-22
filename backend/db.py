import pyodbc
import json

try:
    # Replace with your actual Azure SQL Database connection string
    conn_str = 'Driver={ODBC Driver 18 for SQL Server};Server=vitalhubserver.database.windows.net;Database=PersonalDB;Uid=saqlain;Pwd=5241MAfhh$#@;'

    # Connect to the database
    conn = pyodbc.connect(conn_str)

    # Create a cursor object using the connection
    cursor = conn.cursor()

    # Example query to test the connection
    cursor.execute('SELECT * FROM dbo.resumes')
    rows = cursor.fetchall()

    if not rows:
            print("No rows returned.")
    else:
        for row in rows:
            d = json.loads(row[1])
            print(d["Name"])

except pyodbc.Error as e:
    print(f"Error: {e}")