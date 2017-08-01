from sqlalchemy import Column, DateTime, Integer, String, Boolean
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Post(Base):
    __tablename__  = 'Comp'
    id = Column(Integer, primary_key=True)
    category= Column(String)
    title= Column(String(100))
    description= Column(String(140))
    votes= Column(Integer, default=0)
    option_id = relationship("Options")
    # ADD YOUR FIELD BELOW ID

class Options(Base):
    __tablename__  = 'Options'
    id = Column(Integer, primary_key=True)
    option= Column(String(30))
    pic_url=Column(String)
    opvote=Column(Integer)
    post_id=Column(Integer, ForeignKey('post.id'))
    
# IF YOU NEED TO CREATE OTHER TABLE 
# FOLLOW THE SAME STRUCTURE AS YourModel
engine= create_engine('sqlite:///lecture.db')
Base.metadata.create_all(engine)