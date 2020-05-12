# Message Threads

Message threads, where you want to know which message a person is replying to, so that you can route back to the appropriate chat room.

For example, you send 2 SMS messages to a person and they send you one reply, and you want to know which message they are replying to. Unfortunately, SMS does not have this capability because it's a stateless protocol. SMS does not have the concept of message threads that is found in email.

Rather phone number meta data, another approach is to use multiple Twilio phone numbers, each to be used as a message thread. Following is a scenario for you to see if this will work for you.

+ Buy a list of Twilio phone numbers to use for multiple message message.
+ Before sending a message, check your database to see if there is already an active message thread sent to the to-phone number.
+ If no, use the first message thread Twilio phone number from your list.
+ If yes, use the second message thread Twilio phone number from your list.
+ Once the message is sent, in your database, store the to-phone number, with the message thread Twilio phone number, and the message identifier.

When a message is received, match the following:
1. The message thread Twilio phone number.
2. The person's phone number

The 2 values will get you the message thread identifier.

Once the message thread is complete, remove that message thread Twilio phone number, for that user (their to-phone number) from the database. Then the message thread Twilio phone number can be used again, for the next message thread, with this person's phone number.

The number of Twilio phone numbers required, is the maximum number of active message threads per user. If you have a maximum of 5 message threads active at one time (for one person's phone number), the cost would be $5/month for Twilio phone numbers.

The number of phone numbers required, is the maximum number of active questions per user.

--------------------------------------------------------------------------------

Cheers...
