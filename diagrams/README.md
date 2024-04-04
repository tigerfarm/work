# Notes

--------------------------------------------------------------------------------
## Using the Twilio Studio Capture Payment Widget


Following are the steps I used to successfully make a payment for a dollar amount entered by the caller (DTMF). 
The payment is made in a Studio flow using a Capture Payments widget, shows up in the Stripe payment section.

+ I created a Stripe account as recommended in the tutorial:

Stripe account registration: https://dashboard.stripe.com/register

Nice tutorial, very complete, straight forward to implement:

https://www.twilio.com/docs/voice/tutorials/how-capture-your-first-payment-using-pay

+ I configured my Twilio account as described in the tutorial, such as enabling PCI Mode which is required to get the Studio Capture Payments widget to show.
    Important note, when configuring your Twilio Stripe Connector, use Mode: test.
    This will allow you to test your setup and test the following Studio flow using a Visa test phone numbers.
+ I developed a Studio flow which includes a Gather, to gather the dollar amount the person wants to pay (see screen print below).
    Note, in the Capture Payments widget, I set "Request Postal Code?" to No.
+ I configured a Twilio phone number to use the Pay Studio flow.
+ I called the phone number. The Gather widget asked me to enter a dollar amount, which I did.
+ The Capture Payments widget asked me for my credit card details. I used a Visa test card number:
````
Test visa card # 4012888888881881, which is: 4012 8x8s 1881
Expiration date: 1219
Security code: 123
````
Sample from the tutorial:
````
Enter text Credit card number: 4242 4242 4242 4242
Expiry date (MM/YY): 12 20 (pick a date in the future)
Zip code: 94105
CVC security code: 333
````
+ My payment was confirmed.
+ Check my Stripe account dashboard payments. The payment was listed:

https://dashboard.stripe.com/test/payments

Note, the flow doesn't handle cents at this time.

--------------------------------------------------------------------------------
## Cents

The flow sample is only for dollars.

Suggestions:
+ Ask the caller if they want to pay an option such as:
the current amount owed or a minimum amount, and give them the full amount (dollars and cents)
that would be used in the Capture Payments widget.
+ In one Gather, ask for the dollars; and in another Gather, ask for the cents.
Then put them together for the Capture Payments widget: payment amount.

--------------------------------------------------------------------------------
Studio flow screen print:

<img src="Studio-Payment.jpg" width="400"/>

Pay data flow diagram

<img src="https://s3.amazonaws.com/com.twilio.prod.twilio-docs/images/pay-diagram-1-final.width-1600.png" width="400"/>

--------------------------------------------------------------------------------

Cheers...
