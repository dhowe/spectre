import urllib.request as request
import json
import os

from os.path import join, dirname
from dotenv import load_dotenv

route = '/api/users/current/';

dotenv_path = join(dirname(__file__), '../../client/.env')

load_dotenv(dotenv_path)

host = os.getenv('REACT_APP_API_HOST') or 'localhost'
port = os.getenv('REACT_APP_API_PORT') or '8083'
clientid = os.getenv('REACT_APP_CLIENT_ID')

endpoint = 'http://' +host + ':' + port + route + clientid
print (endpoint)

with request.urlopen(endpoint) as response:
  if response.getcode() == 200:
    source = response.read()
    data = json.loads(source)
    print(data)
  else:
    print('An error occurred')
