from flask import Flask, session
from twilio.twiml.messaging_response import MessagingResponse

SECRET_KEY = 'a secret key'
app = Flask(__name__)
app.config.from_object(__name__)

@app.route('/', methods=['GET', 'POST'])
def hello():
    return "+ Commands: /show /inc /clear"

@app.route('/show', methods=['GET', 'POST'])
def doShow():
    return "+ Show session counter: " + str(session.get('counter', 0))

@app.route('/inc', methods=['GET', 'POST'])
def doInc():
    session['counter'] = session.get('counter', 0) + 1
    return "+ Increment counter: " + str(session.get('counter', 0))

@app.route('/clear', methods=['GET', 'POST'])
def doClear():
    session.clear()
    return "+ Reset counter: " + str(session.get('counter', 0))

@app.route('/sms', methods=['GET', 'POST'])
def doSms():
    session['counter'] = session.get('counter', 0) + 1
    resp = MessagingResponse()
    resp.message("+ Response counter: " + str(session.get('counter', 0)))
    return str(resp)
    # Sample resp: <?xml version="1.0" encoding="UTF-8"?><Response><Message>+ Response counter: 100</Message></Response>

if __name__ == '__main__':
    app.run(debug=True,port=8000)
    
