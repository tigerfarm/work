use WWW::Twilio::API;
print "+++ Start.\n";
my $twilio = WWW::Twilio::API->new(AccountSid => $ENV{'ACCOUNT_SID'},
                                   AuthToken  => $ENV{'AUTH_TOKEN'});
print "+ Make an outbound voice phone call.\n";
print "+ TOKEN_HOST: " . $ENV{'TOKEN_HOST'} . "\n";
$theURL = 'https://' . $ENV{'TOKEN_HOST'} . '/saypolly';
print "+ theURL: " . $theURL . "\n";
$response = $twilio->POST( 'Calls',
                           From => $ENV{'PHONE_NUMBER1'},
                           To   => $ENV{'PHONE_NUMBER2'},
                           Url  => $theURL);
print $response->{content};
print "\n";
print "+++ Start.\n";
