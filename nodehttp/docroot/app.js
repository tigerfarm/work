// -----------------------------------------------------------------
function goAvailable() {
    logger("goAvailable(): update worker's activity to: Available.");
    setActivityStatus("Available");
}
function goOffline() {
    logger("goOffline(): update worker's activity to: Offline.");
    setActivityStatus("Offline");
}

function setActivityStatus(workerActivity) {
    $("div.trStatus").html(workerActivity);
}

// -----------------------------------------------------------------------------
// Sample Ajax call.
function trToken() {
    clearMessages();
    clientId = $("#clientid").val();
    if (clientId === "") {
        $("div.msgClientid").html("<b>Required</b>");
        logger("- Required: Client id.");
        return;
    }
    tokenPassword = $("#tokenPassword").val();
    if (tokenPassword === "") {
        $("div.msgTokenPassword").html("<b>Required</b>");
        logger("- Required: Token password.");
        return;
    }
    // Since, programs cannot make an Ajax call to a remote resource,
    // Need to do an Ajax call to a local program that goes and gets the token.
    // logger("Refresh the TaskRouter token using client id: " + clientId + "&tokenPassword=" + tokenPassword);
    logger("Refresh the TaskRouter token using client id: " + clientId);
    $("div.trMessages").html("Refreshing token, please wait.");
    $.get("generateTrToken.php?tokenPassword=" + tokenPassword + "&clientid=" + clientId, function (theResponse) {
        if (theResponse.startsWith('0')) {
            $("div.trMessages").html("Invalid password.");
            return;
        }
        if (theResponse.startsWith('1')) {
            $("div.trMessages").html("Missing client identity.");
            return;
        }
        $("div.trMessages").html("TaskRouter token received.");
        $("div.msgClientid").html("TaskRouter Token id: " + clientId);
        logger("The response: " + theResponse);
        $("div.msgTokenPassword").html("TaskRouter Token refreshed");
    })
            .fail(function () {
                logger("- Error refreshing the TaskRouter token.");
                return;
            });
}

// -----------------------------------------------------------------
function setTrButtons(workerActivity) {
    logger("setTrButtons, Worker activity: " + workerActivity);
    $("div.trMessages").html("Current status: " + workerActivity);
    switch (workerActivity) {
        case "init":
            $('#btn-online').prop('disabled', true);
            $('#btn-offline').prop('disabled', true);
            break;
        case "Available":
            $('#btn-online').prop('disabled', true);
            $('#btn-offline').prop('disabled', false);
            break;
        case "Offline":
            $('#btn-online').prop('disabled', false);
            $('#btn-offline').prop('disabled', true);
            break;
    }
}

// -----------------------------------------------------------------
// eof