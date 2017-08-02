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

post1 = Post(category="lifestyle",title="title", description='nune',votes=20)
opts= Option(option="damn",pic_url="urlurlurl", opvote=12)

session.add(post1)
session.add(opts)
session.commit()

s = session.query(Post).filter_by(id=1).first()
print(s.title)