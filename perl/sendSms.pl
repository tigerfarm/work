use WWW::Twilio::API;
print "+++ Start.\n";
my $twilio = WWW::Twilio::API->new(AccountSid => $ENV{'ACCOUNT_SID'},
                                   AuthToken  => $ENV{'AUTH_TOKEN'});
print "+ Send an SMS message.\n";
$response = $twilio->POST( 'SMS/Messages',
                           From => $ENV{'PHONE_NUMBER1'},
                           To   => $ENV{'PHONE_NUMBER2'},
                           Body  => "Hello from Perl.");
print $response->{content};
print "\n";
print "+++ Start.\n";
