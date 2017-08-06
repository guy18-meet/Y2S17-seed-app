from model import Base, Post, Option
from sqlalchemy import create_engine, desc
from sqlalchemy.orm import sessionmaker
engine = create_engine('sqlite:///project.db')
Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()

option_1 = Option(option = "Option 1", pic_url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVIbDxcOrnASQRdLQUeudBCifn7D_nQGUpIeXsnNEaST_rDzv9VIcQPws")
option_2 = Option(option = "Option 2", pic_url = "http://www.prieteni.ro/uploads/albumfoto/396711_353820_wy_s_300x300.gif")

new_post = Post(category = 'Category 1', title = "Title 1", description = "Description 1", options = [option_1, option_2])