# flask imports
from flask import Flask, render_template, request, redirect, url_for

# SQLAlchemy
from model import Base, YourModel
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
    
	comps = session.query(Comp).all()
    return render_template('my_feed.html', comps=comps)

@app.route('/<str:category>')
def my_feed_category():
    
	comps = session.query(Comp).filter_by(category=category).all()
    return render_template('my_feed.html', comps=comps)
    



@app.route ('/',methods=['GET', 'POST'])
def add_poll():
	 return render_template('addpoll.html')
	pass


@app.route('/pass')
    def random():
        pass