import json
import os
import sys

class Config():
  def __init__(self):
    try:
      with open(os.path.dirname(os.path.realpath(__file__)) + '/config.json') as f:
        config = json.loads(f.read())
        self.timezone = config['timezone']

    except Exception as e:
      print(e)
      print('Couldn\'t load \'config.json\', see error above. Exiting.')
      sys.exit()
