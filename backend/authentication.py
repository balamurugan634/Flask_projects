from flask import Blueprint,request,jsonify
from connection import mydb
from flask_bcrypt import Bcrypt
bcrypt=Bcrypt()


authentication=Blueprint("authentication",__name__)


@authentication.route('/register',methods=['POST'])
def register():
    try:
        data=request.json
        user_name=data.get("name")
        user_pass=data.get("pass")
        
        con=mydb.cursor(dictionary=True)
        query1="select * from users where name like %s"
        con.execute(query1,[user_name])
        invalid_user=con.fetchone()
        if invalid_user:
          return jsonify({"msg":"user already exist"}),400
        else:
            hashed_pass=bcrypt.generate_password_hash(user_pass)
            query2="insert into users(name,password,role) values(%s,%s,%s)"
            con.execute(query2,[user_name,hashed_pass,"customer"])
            mydb.commit()
            return jsonify({"msg":"user created"}),201
    except Exception as e:  
        return jsonify({"error":str(e)}),500
    
    
    
@authentication.route('/login',methods=['POST'])
def login():
    try:
        data=request.json
        user_name=data.get("name")
        user_pass=data.get("pass")
        
        con=mydb.cursor(dictionary=True)
        query1="select * from users where name like %s"
        con.execute(query1,[user_name])
        valid_user=con.fetchone()
        print(valid_user['password'])
        print(user_pass)
        if valid_user:
        #   return jsonify({"msg":"user already exist"}),400
            is_valid=bcrypt.check_password_hash(valid_user['password'],user_pass)
            print(is_valid)
            if is_valid:
                return jsonify({"msg":"login success"}),200
            else:
                return jsonify({"msg":"invalid credentials"}),300
        else:
            
            return jsonify({"msg":"user not exist"}),300
    except Exception as e:  
        return jsonify({"error":str(e)}),500