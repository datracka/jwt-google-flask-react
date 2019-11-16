from oauthlib.oauth2 import WebApplicationClient
import os
import time
import json
import requests

from google.auth import jwt
import hashlib

class Authentication:

    def __init__(self, req):
        self.authorization_endpoint = "https://accounts.google.com/o/oauth2/v2/auth"
        self.token_endpoint = "https://www.googleapis.com/oauth2/v4/token"
        self.url = req.url
        self.base_url = req.base_url
        self.full_path = req.full_path
        self.redirect_url = f'{req.url}/callback'
        self.args = req.args
        self.client_id = os.getenv('GOOGLE_CLIENT_ID')
        self.client_secret = os.getenv('GOOGLE_CLIENT_SECRET')
        self.client = WebApplicationClient(os.getenv('GOOGLE_CLIENT_ID'))
        self.scopes = [
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/drive",
            "https://www.googleapis.com/auth/spreadsheets"
        ]
        self.tokens_json = {}

    def google_login(self):
        state = hashlib.sha256(os.urandom(1024)).hexdigest()

        request_uri = self.client.prepare_request_uri(
            self.authorization_endpoint,
            redirect_uri=self.redirect_url,
            state=state,
            scope=self.scopes
        )

        return { 'request_uri': request_uri, 'state': state}

    def google_login_callback(self):
        code = self.args.get('code')
        token_url, headers, body = self.client.prepare_token_request(self.token_endpoint,
                                                                     code=code,
                                                                     authorization_response=self.url,
                                                                     redirect_url=self.base_url)
       ## TODO handle error unauthorized!
        
        token_response = requests.post(
                token_url,
                headers=headers,
                data=body,
                auth=(self.client_id,
                      self.client_secret)
            )
            
        self.tokens_json = token_response.json()
        user_data = jwt.decode(self.tokens_json['id_token'], verify=False)
      
        return {
                'user_data': user_data, 
                'jwt': self.tokens_json['id_token'], 
                'access_token': self.tokens_json['access_token']
            }

    def get_access_token(self):
        return self.tokens_json