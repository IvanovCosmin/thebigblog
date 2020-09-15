from mongoengine import Document
from mongoengine.fields import *


class Postares(Document):
    meta = {"strict": False}
    autori = ListField(StringField())
    tags = ListField(StringField())
    titlu = StringField()
    continut = StringField()
