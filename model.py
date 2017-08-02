from sqlalchemy import Column, DateTime, Integer, String, Boolean, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

class Post(Base):
    __tablename__  = 'post'
    id          = Column(Integer, primary_key=True)
    category    = Column(String)
    title       = Column(String(100))
    description = Column(String(140))
    votes       = Column(Integer, default=0)
    options     = relationship("Option")
    
    # ADD YOUR FIELD BELOW I

class Option(Base):
    __tablename__ = 'option'
    id      = Column(Integer, primary_key=True)
    option  = Column(String(30))
    pic_url = Column(String)
    opvote  = Column(Integer, default=0)
    post    = Column(Integer, ForeignKey('post.id'))
    
# IF YOU NEED TO CREATE OTHER TABLE 

# FOLLOW THE SAME STRUCTURE AS YourModel 	
