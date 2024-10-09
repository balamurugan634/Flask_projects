from flask import Blueprint,jsonify,request
from connection import mydb

root=Blueprint("root",__name__)

@root.route('/dashboard',methods=['GET','POST'])

def dashboard():
    try:
       
        query2="select * from books order by created_at desc"
        query3="select * from lender order by created_at desc"
        con=mydb.cursor(dictionary=True)
        con.execute(query1)
        result1=con.fetchall()
        con.execute(query2)
        result2=con.fetchall()
        con.execute(query3)
        result3=con.fetchall()
        
        
    except Exception as e:
        return jsonify({"error":str(e)}),500
    
@root.route('/allusers',methods=['GET','POST'])

def allusers():
 try:
     query1="select * from users order by created_at desc"
     con=mydb.cursor(dictionary=True)
     con.execute(query1)
     result=con.fetchall()
     
     return jsonify(result),200
 except Exception as e:
        return jsonify({"error":str(e)}),500

@root.route('/allreturns',methods=['GET','POST'])
def allactivity():
 try:    
     query1="select * from lender order by created_at desc"
     con=mydb.cursor(dictionary=True)
     con.execute(query1)
     result=con.fetchall()
     
     return jsonify(result),200
 except Exception as e:
        return jsonify({"error":str(e)}),500


@root.route('/viewbooks',methods=['GET','POST'])
def allbooks():
 try:
     query1="select * from books order by created_at desc"
     con=mydb.cursor(dictionary=True)
     con.execute(query1)
     result=con.fetchall()
     
     return jsonify(result),200
 except Exception as e:
        return jsonify({"error":str(e)}),500
    
    
    
@root.route('/updatebook/<id>',methods=['POST','GET'])

def updatebook(id):
    try:
        data=request.json
        
        bk_name=data.get("bk_name")
        author=data.get("author")
        stocks=data.get("stocks")
        
        query1="select * from books where bk_id=%s"
        con=mydb.cursor(dictionary=True)
        con.execute(query1,[id])
        result1=con.fetchone()
        
        if result1:
           query2="update books set bk_name=%s,author=%s,stocks=%s where bk_id=%s"
           
           con.execute(query2,[bk_name,author,stocks,id]) 
           
           mydb.commit()
           
           return jsonify({"msg":"update success"}),200
           
        else:
            return jsonify({"error":"no record exist"}),300
    except Exception as e:
        return jsonify({"error":str(e)}),500

@root.route('/deletebook/<id>',methods=['GET','POST'])

def deletebook(id):
    try:
        query1="select * from books where bk_id=%s"
        
        con=mydb.cursor()
        con.execute(query1,[id])
        result=con.fetchone()
        if result:
            query2="delete from books where bk_id=%s"
            con.execute(query2,[id])
            mydb.commit()
            return jsonify({"msg":"deleted successfully "}),200
        else:
            return jsonify({"error":"no record exist"}),300
    except Exception as e:
        return jsonify({"error":str(e)}),500
