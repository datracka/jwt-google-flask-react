from server import db
from google.auth import jwt
from graphql import GraphQLError
from datetime import datetime
import server.constants as c
import re

def validate_header(info):
    try:
        authorization = info.context.headers['Authorization']
        auth = re.sub(r'Bearer ', '', authorization)
    except:
        raise GraphQLError(c.TOKEN_NOT_EXISTS)

    token = jwt.decode(auth, verify=False)
    expiration_time = token['exp']       
    if expiration_time < datetime.now().timestamp():
        raise GraphQLError(c.TOKEN_EXPIRED)
    
    if not User.query.filter_by(uuid=token['sub']).first():
        raise GraphQLError(c.USER_DOES_NOT_EXIST)
    return token

def insert_or_update(data):
    
    name = data['user_data']['name']
    email = data['user_data']['email']
    email_verified = data['user_data']['email_verified']
    picture = data['user_data']['picture']
    locale = data['user_data']['locale']    
    expiration_time = data['user_data']['exp']    
    issued_time = data['user_data']['iat']    
    uuid = data['user_data']['sub']
    jwt = data['jwt']
    
    user_by_uuid = User.query.filter_by(uuid=uuid).first()
    if not user_by_uuid:
        user = User(name=name, email=email, 
        email_verified=email_verified, picture=picture, locale=locale, 
        expiration_time=expiration_time, issued_time=issued_time, 
        uuid=uuid, jwt=jwt)
        db.session.add(user)
    else: ## user exists already token is refreshed
        user_by_uuid.expiration_time = expiration_time
        user_by_uuid.issued_time = issued_time
        user_by_uuid.jwt = jwt
    db.session.commit()

def delete(user_data):        
    try:
        user = User.query.filter_by(uuid=user_data['sub']).first()
        db.session.delete(user)
        db.session.commit()
    except:
        GraphQLError(c.ERROR_USER_DELETE)

class User(db.Model):

    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=False, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    email_verified = db.Column(db.Boolean, unique=False, nullable=False)
    picture = db.Column(db.String, unique=False, nullable=True)
    locale = db.Column(db.String, unique=False, nullable=True)
    expiration_time = db.Column(db.Integer, unique=False, nullable=True)
    issued_time = db.Column(db.Integer, unique=False, nullable=True)
    uuid = db.Column(db.String, unique=True, nullable=False)
    jwt = db.Column(db.String, unique=True, nullable=False)

    def __init__(self, name, email, email_verified, picture, locale, expiration_time, issued_time, uuid, jwt):
        self.name = name
        self.email = email
        self.email_verified = email_verified
        self.picture = picture
        self.locale = locale
        self.expiration_time = expiration_time
        self.issued_time = issued_time
        self.uuid = uuid
        self.jwt = jwt

    def __repr__(self):
        return '<User %r>' % self.name

