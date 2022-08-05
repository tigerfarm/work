----------------------------------------------------------------------------------
# One Mobile Phone Number in Multiple Conversations Notes

### Case using the Same Mobile Phone Number in Multiple Conversations

When having one person (one person's SMS phone number) in multiple conversations,
use multiple Twilio phone numbers.
Each Twilio phone number is mapped to a separate conversation.
````
Unique combination:
 Person's SMS phone number + Twilio phone number >> matched to a conversation
For example:
 Person's SMS phone number +16505551111 + Twilio phone number #1
   >> matched to conversation #1
 Person's SMS phone number +16505551111 + Twilio phone number #2
   >> matched to conversation #2
 Person's SMS phone number +16505552222 + Twilio phone number #1 
   >> matched to conversation #1 
 Person's SMS phone number +16505553333 + Twilio phone number #1 
   >> matched to conversation #2
````
You just need to have the "Person's SMS phone number + Twilio phone number" unique, 
and matched to any one conversation.

Note, the number of Twilio phone numbers required, is the maximum number of active conversations per participant. 
If you have a maximum of 5 conversations at one time (for one person's phone number), 
the cost would be $5/month for 5 Twilio phone numbers.
* The number of phone numbers required, is the maximum number of active questions per user.

----------------------------------------------------------------------------------
Cheers
