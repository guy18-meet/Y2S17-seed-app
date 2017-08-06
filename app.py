    # flask imports
from flask import Flask, render_template, request, redirect, url_for
app = Flask(__name__)
import sys

# SQLAlchemy
from model import Base, Post, Option
from sqlalchemy import create_engine, desc
from sqlalchemy.orm import sessionmaker


# setup
app = Flask(__name__)
engine = create_engine('sqlite:///project.db')
Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()

@app.route('/')
def my_feed():
    posts=session.query(Post).order_by("id desc").all()
    return render_template('myfeed.html', posts = posts)

@app.route('/pop')
def my_feed_pop():
    posts=session.query(Post).order_by("votes desc").all()
    return render_template('myfeed.html', posts = posts)

    

@app.route ('/add_poll',methods=['GET', 'POST'])
def add_poll():
    if request.method == 'GET':
    	return render_template('addpoll.html')
    else:
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
        new_options = [new_option1, new_option2]
        if opt3!=None:
            new_option3=Option(option=opt3,pic_url=url3)
            session.add(new_option3)
            new_options.append(new_option3)
        if opt4!=None:
            new_option4=Option(option=opt4,pic_url=url4)
            session.add(new_option4)
            new_options.append(new_option4)

        new_category    = request.form.get('category')
        new_title       = request.form.get('usertitle')
        new_description = request.form.get('user_description')


        new_poll=Post(category=new_category,title=new_title,
            description=new_description, 
            options = new_options)
        

        session.add(new_poll,new_option2)
        session.add(new_option1)
        session.commit()
        return redirect(url_for('my_feed'))
        
        

#categories routing:
@app.route('/sports')
def cat1():
    
    catpost1=session.query(Post).filter_by(category="sports").order_by('id desc').all()
    return render_template('myfeed.html', posts = catpost1)

@app.route('/lifestyle')
def cat2():
    catpost2=session.query(Post).filter_by(category="lifestyle").order_by('id desc').all()
    return render_template('myfeed.html', posts = catpost2)

@app.route('/fashion')
def cat3():
    catpost3=session.query(Post).filter_by(category="fashion").order_by('id desc').all()
    return render_template('myfeed.html', posts = catpost3)

@app.route('/cars')
def cat4():
    catpost4=session.query(Post).filter_by(category="cars").order_by('id desc').all()
    return render_template('myfeed.html', posts = catpost4)

@app.route('/advices')
def cat5():
    catpost5=session.query(Post).filter_by(category="advice").order_by('id desc').all()
    return render_template('myfeed.html', posts = catpost5)

@app.route('/other')
def cat6():
    catpost6=session.query(Post).filter_by(category="other").order_by('id desc').all()
    return render_template('myfeed.html', posts = catpost6)

@app.route('/food')
def cat7():
    catpost7=session.query(Post).filter_by(category="food").order_by('id desc').all()
    return render_template('myfeed.html', posts = catpost7)

@app.route('/politics')
def cat8():
    catpost8=session.query(Post).filter_by(category="politics").order_by('id desc').all()
    return render_template('myfeed.html', posts = catpost8)

@app.route('/politics')
def cat9():
    catpost9=session.query(Post).filter_by(category="technology").order_by('id desc').all()
    return render_template('myfeed.html', posts = catpost9)

@app.route('/vote/<int:poll_id>',methods=['GET', 'POST'])
def vote(poll_id):
    post = session.query(Post).filter_by(id=poll_id).first()
    post.votes += 1
    tot_votes=post.votes
    
    # Capture which one is being voted on
    voted_on = request.form.get('vote')
    voted_on_option = session.query(Option).filter_by(id=voted_on).first()
    voted_on_option.opvote += 1




    session.commit()
    return redirect(url_for('my_feed'))

@app.route('/about')
def aboutus():
    return render_template('us.html',logo="file:///home/student/Desktop/Y2S17-seed-app/static/meet.png")


@app.route('/<string:category>')
def my_feed_category(category):
    posts = session.query(Post).filter_by(category=category).all()
    return render_template('myfeed.html', posts=posts)


Base.metadata.create_all()
