from flask import Blueprint,request,jsonify
from connection import mydb

lender=Blueprint("lender",__name__)


@lender.route('/lendbook',methods=['POST'])

def lendbook():
    try:
        user=request.args.get("user")
        bookid=request.args.get("bk")
        con=mydb.cursor(dictionary=True)
        query1="select * from books where bk_id=%s"
        con.execute(query1,[bookid])
        valid_bk=con.fetchone()
        if valid_bk:
            available=valid_bk['stocks']
            if available > 0:
                query2="update books set stocks=%s where bk_id=%s"
                con.execute(query2,[valid_bk['stocks']-1,bookid])
                mydb.commit()
                query3="insert into lender(bk_id,cust_id) values(%s,%s) "
                con.execute(query3,[bookid,user])
                mydb.commit()
                return jsonify({"msg":"books lended"}),200
            else:
                 return jsonify({"msg":"books out of stock"}),300
        else:
            return jsonify({"msg":"book unavilable"}),300
        
    except Exception as e:
        return jsonify({"error":str(e)})

@lender.route('/returnbook',methods=['POST'])

def returnbook():
    try:
        user=request.args.get("user")
        bookid=request.args.get("bk")
    except Exception as e:
        return jsonify({"error":str(e)})

