from flask import Blueprint,request,jsonify,send_file
from connection import mydb
from datetime import datetime
import openpyxl
from io import BytesIO
event=Blueprint("event",__name__)
def generate_excel_file():
    workbook = openpyxl.Workbook()
    sheet = workbook.active

    data = [
        ["title", "description", "location","date","capacity"],
        

    ]

    for row in data:
        sheet.append(row)

   
    buffer = BytesIO()
    workbook.save(buffer)
    buffer.seek(0)

    return buffer
@event.route('/addevent',methods=['POST'])

def addevent():
    try:
        data=request.json
        print(data)
        for row in data:
            sp_date=row['date'].split('-')
            op=sp_date[::-1]
            to_send='-'.join(op)
           
            query1="insert into events(event_title,description,location,event_date,capacity,created_at) values(%s,%s,%s,%s,%s,now())"
            con=mydb.cursor(dictionary=True)
            con.execute(query1,[row['title'],row['description'],row['location'],to_send,row['capacity']])
            
            mydb.commit()
        
        return jsonify({"success":True,"msg":"event added"})
    except Exception as e:
        return jsonify({"error":str(e)})
   
        
        
@event.route('/update_event/<id>',methods=['GET','POST'])

def update_event(id):
    try:
        con=mydb.cursor(dictionary=True)
        if request.method=='POST':
            data=request.json
            event_title=data.get('event_title')
            event_description=data.get('description')
            event_location=data.get('location')
            event_date=data.get('event_date')
            event_capacity=data.get('capacity')
          
            query2='update events set event_title=%s,description=%s,location=%s,event_date=%s,capacity=%s where event_id=%s'
            con.execute(query2,[event_title,event_description,event_location, event_date,event_capacity,id])
            
            mydb.commit()
            return jsonify({'success':True,'msg':'updated successfully'}),200
        
       
        query1="select * from events where event_id=%s"
        con.execute(query1,[id])
        res=con.fetchone()
        return jsonify(res),200              
       
    except Exception as e:
        return jsonify({"error":str(e)}),500
   
        
@event.route('/allevents',methods=['GET'])
def get_all_events():
    try:
        con=mydb.cursor(dictionary=True)
        query1="select * from events"
        con.execute(query1)
        res=con.fetchall()
        return jsonify(res),200 
    except Exception as e:
        return jsonify({"error":str(e)}),500
    
@event.route('/delevent/<id>',methods=['POST'])

def delete_event(id):
    try:
        con=mydb.cursor(dictionary=True)
        query2="select * from events where event_id=%s"
        con.execute(query2,[id])
        res=con.fetchone()
        if res:
            query1="delete from events where event_id=%s"
            con.execute(query1,[id])
            mydb.commit()
            return jsonify({"success":True,"msg":"event deleted"}),200
        else:
            return jsonify({"success":False,"msg":"event not exist"}),300
    except Exception as e:
        return jsonify({"error":str(e)}),500
    
@event.route('/recentevent',methods=['GET'])
def recent_event():
    try:
       con=mydb.cursor(dictionary=True)
       query1="select * from events order by created_at desc"
       con.execute(query1)
       result=con.fetchall()
       return jsonify({"success":True,"result":result})
    except Exception as e:
        return jsonify({"error":str(e)}),500
    
@event.route('/detail/<id>',methods=['GET'])
def event_detail(id):
    try:
       con=mydb.cursor(dictionary=True)
       query1="select * from events where event_id=%s"
       con.execute(query1,[id])
       result=con.fetchone()
       return jsonify({"success":True,"result":result})
    except Exception as e:
        return jsonify({"error":str(e)}),500
    
@event.route('/recentusers',methods=['GET'])
def recent_users():
    try:
       con=mydb.cursor(dictionary=True)
       query1="select * from users order by created_at desc"
       con.execute(query1)
       result=con.fetchall()
       return jsonify({"success":True,"result":result})
    except Exception as e:
        return jsonify({"error":str(e)}),500
@event.route('/download',methods=['GET']) 
def download_excel():
    excel_file = generate_excel_file()

    return send_file(excel_file, as_attachment=True, download_name='data.xlsx', mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
