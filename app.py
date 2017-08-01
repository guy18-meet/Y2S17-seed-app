    # flask imports
from flask import Flask, render_template, request, redirect, url_for
app = Flask(__name__)
import sys

# SQLAlchemy
from model import Base, Comp, Options
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


# setup
app = Flask(__name__)
engine = create_engine('sqlite:///project.db')
Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()

@app.route ('/add_poll',methods=['GET', 'POST'])
def add_poll():
    if request.method == 'GET':
    	return render_template('addpoll.html')
    else:
        new_poll=Post(id=poll_id,category=request.form.get('category'),title=request.form.get('title'),description=request.form.get('description'),votes=request.form.get('votes'))
        new_option1=Options(option=request.form.get('option1'),pic_url=request.form.get('pic_url1'))
        new_option2=Options(option=request.form.get('option2'),pic_url=request.form.get('pic_url2'))
        if request.form.get(pic_url3)!="":
            new_option3=Options(option=request.form.get('option3'),pic_url=request.form.get('pic_url3'))
        if request.form.get(pic_url3)!="":
            new_option4=Options(option=request.form.get('option4'),pic_url=request.form.get('pic_url4'))

        #.add(new_poll,new_options)
        #session.commit()
        return redirect(url_for('myfeed.html'))
        
        




@app.route('/vote/<int:poll_id>')
def vote(poll_id):
    comp = session.query(Comp).filter_by(id=poll_id).first()
    comp.votes = comp.votes + 1
    session.commit()
    return redirect(url_for('my_feed'))


@app.route('/')
def my_feed():
    comps = session.query(Comp).all()
    return render_template('myfeed.html', comps= comps)


@app.route('/<string:category>')
def my_feed_category(category):
    comps = session.query(Comp).filter_by(category=category).all()
    return render_template('myfeed.html', comps=comps)



