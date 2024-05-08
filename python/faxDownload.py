# Untested
# Download received fax locally
print "+++ Start."
faxMedia = 'https://www.tigerfarmpress.com/StacyDavid/netscape-fountain2a.jpg'
def receiveAction():
    fileReq = requests.get(faxMedia)
    with open('localFile.pdf', 'wb') as f: 
        f.write(fileReq.content)
    return ('OK', 200)
print "+ receiveAction(): ", receiveAction()
print "+++ Exit."
