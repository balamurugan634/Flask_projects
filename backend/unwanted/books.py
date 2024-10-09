from flask import Blueprint,request,jsonify
from connection import mydb

books=Blueprint("books",__name__)

@books.route('/newbook',methods=['POST'])

def create_book():
    try:
        data=request.json
        book_name=data.get("bk_name")
        author_name=data.get("author")
        bk_stocks=data.get("stocks")
        
        con=mydb.cursor(dictionary=True)
        query1="select * from books where bk_name like %s"
        con.execute(query1,[book_name])
        exist_bk=con.fetchone()
        if exist_bk:
            return jsonify({"msg":"book already exist"}),300
        else:
            query2="insert into books(bk_name,author,stocks,created_at) values(%s,%s,%s,now())"
            con.execute(query2,[book_name,author_name,bk_stocks])
            mydb.commit()
            return  jsonify({"msg":"book added successfully"}),201

    except Exception as e:
        return jsonify({"error":str(e)}),500       

@books.route('/allbooks',methods=['GET'])

def getallbooks():
    try:
        query1="select * from books"
        con=mydb.cursor(dictionary=True)
        con.execute(query1)
        result=con.fetchall()
        return jsonify(result),200
    except Exception as e:
        return jsonify({"error":str(e)}),500
    
@books.route('/mybooks/<id>',methods=['GET'])

def mybooks(id):
    try:
        query1="select books.bk_name,books.author,lender.status from lender inner join books on lender.bk_id = books.bk_id where lender.cust_id=%s;"
        con=mydb.cursor(dictionary=True)
        con.execute(query1,[id])
        result=con.fetchall()
        return jsonify(result),200
    except Exception as e:
        return jsonify({"error":str(e)}),500
        