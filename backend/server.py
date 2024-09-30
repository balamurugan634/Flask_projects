from flask import Flask,redirect,request,jsonify
from flask_bcrypt import Bcrypt
from connection import mydb
app=Flask(__name__)
from authentication import authentication
bcrypt=Bcrypt(app)


app.register_blueprint(authentication,url_prefix="/auth")



@app.route('/')
def home():
    con=mydb.cursor(dictionary=True)
    con.execute("select * from users")
    res=con.fetchall()
    print(res)
    return "<h1>hello</h1>"
if (__name__=="__main__"):
    app.run(debug=True)