from flask import Flask,redirect,request,jsonify
from flask_bcrypt import Bcrypt
from connection import mydb
app=Flask(__name__)
from authentication import authentication
from event import event
from flask_cors import CORS
from tickets import tickets
bcrypt=Bcrypt(app)


cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.register_blueprint(authentication,url_prefix="/auth")
app.register_blueprint(event,url_prefix='/event')
app.register_blueprint(tickets,url_prefix="/ticket")

# app.register_blueprint(lender,url_prefix="/lend")

# app.register_blueprint(root,url_prefix="/admin")



@app.route('/')
def home():
    con=mydb.cursor(dictionary=True)
    con.execute("select * from users")
    res=con.fetchall()
    print(res)
    return "<h1>hello</h1>"
if (__name__=="__main__"):
    app.run(debug=True)