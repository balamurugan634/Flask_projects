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
                query4="select * from lender where bk_id=%s and cust_id=%s"
                con.execute(query4,[bookid,user])
                already_exist=con.fetchone()
                if already_exist:
                    query2="update books set stocks=%s where bk_id=%s"
                    con.execute(query2,[valid_bk['stocks']-1,bookid])
                    mydb.commit()
                    query5="update lender set status=%s where cust_id=%s and bk_id=%s"
                    con.execute(query5,['lended',user,bookid])
                    return jsonify({"msg":"books lended"}),200

                else:
                    query2="update books set stocks=%s where bk_id=%s"
                    con.execute(query2,[valid_bk['stocks']-1,bookid])
                    mydb.commit()
                    query3="insert into lender(bk_id,cust_id,status) values(%s,%s,%s) "
                    con.execute(query3,[bookid,user,"lended"])
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
        con=mydb.cursor(dictionary=True)
        
        query1="select * from lender where bk_id=%s and cust_id=%s"
        con.execute(query1,[bookid,user])
        valid_res=con.fetchone()
        if valid_res:
            query2="update lender set status=%s where cust_id=%s and bk_id=%s"
            con.execute(query2,['returned',user,bookid])
            mydb.commit()
            query4="update books set stocks=%s where bk_id=%s"
            query3="select * from books where bk_id=%s"
            con.execute(query3,[bookid])
            book=con.fetchone()
            con.execute(query4,[book['stocks']+1,bookid])
            mydb.commit()
            return jsonify({"msg":"return success"}),200
        else:
            return jsonify({"msg":"invalid book"}),300
    except Exception as e:
        return jsonify({"error":str(e)}),500

