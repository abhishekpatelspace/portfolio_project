import urllib.request
import json
with urllib.request.urlopen('https://api.countapi.xyz/hit/abhishekpatelspace/portfolio_visits') as resp:
    print(resp.status)
    print(resp.read().decode())
