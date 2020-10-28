import json
import os
import sys

class _Config():
  """
  Singleton class containing data we need from the documentation.
  Use Config() to access.
  """
  _instance = None

  def __init__(self):
    try:
      with open(os.path.dirname(os.path.realpath(__file__)) + '/config.json') as f:
        config = json.loads(f.read())
        self._timezone = config['timezone']
        self._lastSlot = config['lastSlot']
        self._dayCount = config['dayCount']

    except Exception as e:
      print(e)
      print('Couldn\'t load \'config.json\', see error above. Exiting.')
      sys.exit()

def Config():
  if _Config._instance is None:
    _Config._instance = _Config()
  return _Config._instance
