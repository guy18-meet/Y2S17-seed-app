from sqlalchemy import Column, DateTime, Integer, String, Boolean, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

class Comp(Base):
    __tablename__  = 'comp'
    id = Column(Integer, primary_key=True)
    category= Column(String)
    title= Column(String(100))
    description= Column(String(140))
    votes= Column(Integer, default=0)
    option_id = relationship("Options")
    
    # ADD YOUR FIELD BELOW ID

class Options(Base):
    __tablename__  = 'options'
    id = Column(Integer, primary_key=True)
    option= Column(String(30))
    pic_url=Column(String)
    opvote=Column(Integer)
    post_id=Column(Integer, ForeignKey('comp.id'))
    
# IF YOU NEED TO CREATE OTHER TABLE 

# FOLLOW THE SAME STRUCTURE AS YourModel 	
