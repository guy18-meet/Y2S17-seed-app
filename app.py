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
    comps= session.query(Comp).all()
    return render_template('myfeed.html',comps=comps)

@app.route('/recent/<int:post_id>',methods=['GET', 'POST'])
def my_feed_recent(post_id):
	comps = session.query(comps).filter_by(id=post_id).first()
    if request.method == 'GET':
        return render_template("my_feed_recent.html", comps=comps)
    else:
      
      new_category= request.form.get('category')
      new_title= request.form.get('title')
      new_description= request.form.get('description')
      new_votes=request.form.get('votes')
      new_show_location = request.form.get('show_location')
      new_location= request.form.get('location')
      return redirect(url_for('my_feed'))

    pass

@app.route('/pass')
    def random():
        pass