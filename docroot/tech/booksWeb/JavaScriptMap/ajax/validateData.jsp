<%
    String returnString = "";
    boolean isError = false;
    if (request.getParameter("userid")==null || request.getParameter("userid")=="" ) {
        returnString = "<br>Userid is required.";
        isError = true;
    }
    if (request.getParameter("password")==null || request.getParameter("password")=="" ) {
        returnString = returnString + "<br>Password is required.";
        isError = true;
    }
    if (isError) {
        out.print("Error messages:" + returnString); // Return the data to the caller.
        return;
    }
    if (request.getParameter("userid").compareTo("abc")==0
    &&  request.getParameter("password").compareTo("def")==0 ) {
        out.print("loginSuccess.jsp"); // Return the data to the caller.
        return;
    }
    returnString = request.getParameter("userid") + ":" + request.getParameter("password");
    out.print("Userid and password are not validate: " + returnString); // Return the data to the caller.
%>
