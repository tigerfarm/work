print "+++ Start."

import requests
aSession = requests.Session()
response = aSession.get('https://tigerfarmpress.com/hello.txt')
print "+ Response: ", response.text

print "+++ Exit."
