# http://flask.pocoo.org/docs/1.0/config/
import os


class BaseConfig(object):
    '''
    Base config class
    '''
    DEBUG = True
    TESTING = False
    FLASK_ENV = "development"
    SQLALCHEMY_DATABASE_URI = os.getenv('SQLALCHEMY_DATABASE_URI')
    SQLALCHEMY_TRACK_MODIFICATIONS = 1


class ProductionConfig(BaseConfig):
    '''
    Production specific config
    '''
    DEBUG = False
    FLASK_ENV = "production"


class DevelopmentConfig(BaseConfig):
    '''
    Development environment specific configuration
    '''
    DEBUG = True
    TESTING = True
    FLASK_ENV = "development"
