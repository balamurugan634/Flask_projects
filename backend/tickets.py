from flask import Blueprint,request,jsonify
from connection import mydb
tickets=Blueprint("tickets",__name__)

@tickets.route('/bookticket/<id>',methods=['POST'])

def book_ticket(id):
    try:
        data=request.json
        print(data)
        con=mydb.cursor(dictionary=True)
        listitem=data.get('users')
        booker_id=data.get('bk_id')
        print(booker_id)
        print(listitem)
        
        query1="insert into tickets(holder_name,event_id,booker_id,phone,status,created_at) values(%s,%s,%s,%s,%s,now())"
        query3="select capacity from events where event_id=%s"
        query2="update events set capacity=%s where event_id=%s"
        for item in listitem:
            con.execute(query3,[id])
            res=con.fetchone()
            con.execute(query1,[item['name'],id,booker_id,item['phone'],"booked"])
            mydb.commit()
            con.execute(query2,[int(res['capacity'])-1,id])
            mydb.commit()
        con.close()
        return jsonify({"success":True,"msg":"ticket booked"}),201
    except Exception as e:
        return jsonify({"error":str(e)}),500
    
@tickets.route('/update/<id>',methods=['GET','POST'])
def update_ticket(id):
    try:
        con=mydb.cursor(dictionary=True)
        if request.method=='POST':
            data=request.json
            holder_name=data.get('holder_name')
            phone=data.get('phone')
            # booker_id=data.get('user_id')
            
            query2="update tickets set holder_name=%s,phone=%s where ticket_id=%s"
            con.execute(query2,[holder_name,phone,id])
            mydb.commit()
            return jsonify({'success':True,'msg':'updated successfully'}),200
        
       
        query1="select * from tickets where ticket_id=%s"
        con.execute(query1,[id])
        res=con.fetchone()
        return jsonify(res),200 
    except Exception as e:
        return jsonify({"error":str(e)}),500
    
@tickets.route('/cancelticket/<id>',methods=['POST'])

def cancel_ticket(id):
    try:
        con=mydb.cursor(dictionary=True)
        query1="select * from tickets where ticket_id=%s"
        con.execute(query1,[id])
        res=con.fetchone()
        if res:
            query4="select * from events where event_id=%s"
            con.execute(query4,[res['event_id']])
            res2=con.fetchone()
            query2="update tickets set status=%s where ticket_id=%s"
            con.execute(query2,["cancelled",id])
            mydb.commit()
            query3="update events set capacity=%s where event_id=%s"
            con.execute(query3,[int(res2['capacity'])+1,res['event_id']]) 
            mydb.commit()
            return jsonify({'success':True,'msg':'cancelled successfully'}),200
    except Exception as e:
        return jsonify({"error":str(e)}),500
    
@tickets.route('/alltickets',methods=['GET'])
def getalltickets():
    try:
        con=mydb.cursor(dictionary=True)
        query1="select tickets.holder_name,tickets.ticket_id,tickets.phone,users.name,events.event_title,events.location,events.description,events.event_date from tickets inner join users on tickets.booker_id = users.user_id inner join events on tickets.event_id=events.event_id "
        con.execute(query1)
        res=con.fetchall()
        return jsonify({"success":True,"result":res}),200
    except Exception as e:
        return jsonify({"error":str(e)}),500
    
@tickets.route('/mytickets/<id>',methods=['GET'])
def getmytickets(id):
    try:
        con=mydb.cursor(dictionary=True)
        query1="select count(ticket_id),tickets.event_id,events.event_title,events.location from tickets inner join events on tickets.event_id=events.event_id where tickets.booker_id=%s and tickets.status=%s  group by event_id;"
        con.execute(query1,[id,"booked"])
        res=con.fetchall()
        print(res)
        # if res:
        #     for result in res:
        #         query2="select tickets.holder_name,tickets.phone,events.event_title,events.location,events.description,events.event_date from tickets inner join users on tickets.booker_id = %s inner join events on %s=events.event_id "
        #         con.execute(query2,[id,res['event_id']])
        #         res2=con.fetchall()
        return jsonify({"success":True,"result":res}),200
    except Exception as e:
        return jsonify({"error":str(e)}),500
    
@tickets.route('/geteventticket',methods=['GET'])

def get_individual_tickets():
    try:
        user=request.args.get('user')
        event=request.args.get('event')
        print(user,event)
        query1="select ticket_id,holder_name,phone from tickets where event_id=%s and booker_id=%s"
        con=mydb.cursor(dictionary=True)
        con.execute(query1,[event,user])
        res=con.fetchall()
        return jsonify({"success":True,"result":res}),200
    except Exception as e:
        return jsonify({"error":str(e)}),500

@tickets.route('/recenttickets',methods=['GET'])
def recent_tickets():
    try:
       con=mydb.cursor(dictionary=True)
       query1=" select tickets.holder_name,tickets.phone,events.event_title,events.event_date,users.name from tickets inner join events on tickets.event_id=events.event_id inner join users on tickets.booker_id=users.user_id order by tickets.created_at desc"
       con.execute(query1)
       result=con.fetchall()
       return jsonify({"success":True,"result":result})
    except Exception as e:
        return jsonify({"error":str(e)}),500