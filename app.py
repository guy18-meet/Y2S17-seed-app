    # flask imports
from flask import Flask, render_template, request, redirect, url_for
app = Flask(__name__)
import sys

# SQLAlchemy
from model import Base, Post, Option
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


# setup
app = Flask(__name__)
engine = create_engine('sqlite:///project.db')
Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()

@app.route('/')
def my_feed():
    # posts=session.query(Post).all()
    posts = [
        {
        "title": "My first post","category": "wepo", "description": "car wepowe wer", "votes": 3,
        "options": [
            {"option": "option one", "pic_url": "photo.jpg", "opvote":4},
            {"option": "option two", "pic_url": "photo.jpg", "opvote":4}
        ]
        }, {
        "title": "My second post","category": "wepo", "description": "car wepowe wer", "votes": 3,
        "options": [
            {"option": "option one", "pic_url": "photo.jpg", "opvote":4},
            {"option": "option two", "pic_url": "photo.jpg", "opvote":4}
        ]
        }
    ]
    return render_template('myfeed.html', posts = posts)


@app.route ('/add_poll',methods=['GET', 'POST'])
def add_poll():
    if request.method == 'GET':
    	return render_template('addpoll.html')
    else:
        categ=request.form.get('category')
        titlevar=request.form.get('title')
        desc=request.form.get('description')

        new_poll=Post(category=categ,title=titlevar,description=desc)
        opt1=request.form.get('option1')
        url1=request.form.get('pic_url1')
        opt2=request.form.get('option2')
        url2=request.form.get('pic_url2')
        new_option1=Option(option=opt1,pic_url=url1)
        new_option2=Option(option=opt2,pic_url=url2)
        url3=request.form.get('pic_url3')
        opt3=request.form.get('option3')
        url4= request.form.get('pic_url4')
        opt4=request.form.get('option4')
        if url3!=None:
            new_option3=Option(option=opt3,pic_url=url3)
            session.add(new_option3)
        elif url4!=None:
            new_option4=Option(option=opt4,pic_url=url4)
            session.add(new_option4)

        session.add(new_poll,new_option2)
        session.add(new_option1)
        session.commit()
        return redirect(url_for('my_feed'))
        
        

#categories routing:
@app.route('/sports')
def cat1():
    
    catpost1=session.query(Post).filter_by(category="sports").all()
    return render_template('myfeed.html', posts = catpost1)

@app.route('/lifestyle')
def cat2():
    catpost2=session.query(Post).filter_by(category="lifestyle").all()
    return render_template('myfeed.html', posts = catpost2)

@app.route('/fashion')
def cat3():
    catpost3=session.query(Post).filter_by(category="fashion").all()
    return render_template('myfeed.html', posts = catpost3)

@app.route('/cars')
def cat4():
    catpost4=session.query(Post).filter_by(category="cars").all()
    return render_template('myfeed.html', posts = catpost4)

@app.route('/advices')
def cat5():
    catpost5=session.query(Post).filter_by(category="advices").all()
    return render_template('myfeed.html', posts = catpost5)

@app.route('/other')
def cat6():
    catpost6=session.query(Post).filter_by(category="other").all()
    return render_template('myfeed.html', posts = catpost6)


@app.route('/vote/<int:poll_id>',methods=['GET', 'POST'])

def vote(poll_id):
    post = session.query(Post).filter_by(id=poll_id).first()
    post.votes = post.votes + 1
    post.option_id.opvotes = post.option_id.opvotes +1
    session.commit()
    return redirect(url_for('my_feed'))




@app.route('/<string:category>')
def my_feed_category(category):
    posts = session.query(Post).filter_by(category=category).all()
    return render_template('myfeed.html', posts=posts)


Base.metadata.create_all()
