<?php
// When a person connects to a conference, a call SID is returned.
// The call SID is Participant SID.
// 
// --------------------------
// From Owl Client:
// > ++ Make an outgoing call from: david, To: conference:support, Call Type: conference
// > + theConference: support
// > Call connected.
// > + CallSid: CAb737dbb61eece65377dab1a6cbda2278
// > + theCallType: conference
//
// +++ List Conference participants on conference: support
// Call SID: CF6d470e54cf20e7cad1135970049411f8 Name: support
// + Participant SID: CAb737dbb61eece65377dab1a6cbda2278 hold:Not muted:Not
// +++ Exit
// 
// --------------------------
// From Owl Client:
// > reservation.created: You are reserved to handle a call from: +16508661233
// > Customer request, task.attributes.selected_product: support
// > Reservation SID: WR878ea9004077abe3d975291a92b9c598
// > TaskRouter post activity SID: WA0ab3bfa9b0954df4aeca47cd5051799d
// > + Incoming call, CallSid: CA3c8adb76db6ef020161f5046f6d06ae3
// Reservation WR878ea9004077abe3d975291a92b9c598 accepted.
// Conference SID: CF9b09d58cb29e0bcf34c5f72638a06494
// 
// ++ Task Reservation List
// + Task SID: WTc8dfb1b16817e68e44f546db4bf86bf9 selected_product:support assignmentStatus:assigned from:+16508661233
// ++ Task conference:  SID:CF37428c8f856074401abfdcf94b32f3bb customer:CA1c9247eb247a8c2844c4938dfe3421e2
// ++ Task Reservation: accepted david assigned
// 
// +++ List Conference participants on conference: WTc8dfb1b16817e68e44f546db4bf86bf9
// Call SID: CF37428c8f856074401abfdcf94b32f3bb Name: WTc8dfb1b16817e68e44f546db4bf86bf9
// + Participant SID: CA3c8adb76db6ef020161f5046f6d06ae3 hold:Not muted:Not
// + Participant SID: CA1c9247eb247a8c2844c4938dfe3421e2 hold:Not muted:Not
// +++ Exit.
//
if ($argc > 1) {
    $FriendlyName = $argv[1];
} else {
    $FriendlyName = $_REQUEST['FriendlyName'];
}
if ($FriendlyName === null) {
    $FriendlyName = "support";
}
echo "+++ List Conference participants on conference: " . $FriendlyName . "\xA";

require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';

use Twilio\Rest\Client;

$twilio = new Client(getenv('MASTER_ACCOUNT_SID'), getenv('MASTER_AUTH_TOKEN'));

// Given the Conference name, get the conference id.
$conferences = $twilio->conferences->read(
        array(
            "Status" => "in-progress"
        ));
print("Call SID: " . $conferences[0]->sid . " Name: " . $conferences[0]->friendlyName . "\n");
$conferenceSid = $conferences[0]->sid;
// $conferenceSid = "CF9e19fdcf42812d9fb2772960fc8ecb53";

$participants = $twilio->conferences($conferenceSid)->participants->read();
foreach ($participants as $record) {
    $participant = $twilio->conferences($conferenceSid)
            ->participants($record->callSid)
            ->fetch();
    $participantOnHold = "Not";
    if ($participant->hold) {
        $participantOnHold = "OnHold";
    }
    $participantMuted = "Not";
    if ($participant->muted) {
        $participantMuted = "Muted";
    }
    print('+ Participant SID: ' . $record->callSid . " hold:" . $participantOnHold . " muted:" . $participantMuted . "\xA");
}
echo "+++ Exit.\xA";
?>
