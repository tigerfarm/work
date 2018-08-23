<html>
<head>
<title>JSP HTTP Header Tool</title>
</head>
<body>
<h2>JSP HTTP Header Tool</h2>
<h3>HTTP Request</h3>
<%-- First, get the first line of the HTTP request  --%>
<p><%= request.getMethod() %>&nbsp;<%= request.getRequestURI() %>&nbsp;<%= request.getProtocol() %></p>
<h3>Form Parameters Passed and their values</h3>
<p>
<%-- Get the names of the parameters passed form the form.  Then walk through the list --%>
<% java.util.Enumeration e2 = request.getParameterNames(); %>
<% while (e2.hasMoreElements()){ %>
	<% String name = (String) e2.nextElement(); %>
		<b>Param: </b><%= name %>  <b>Param Value(s): </b>
		<% 	String[] dataList = request.getParameterValues(name);
			int count = dataList.length;
			int i = 0;
			while (i < count ){  %>
		<%=	"[" + dataList[i] + "]" %>
		<%		i++;
			} 	%><br>
	<% } %>

</p>
<p>
<h3>Web Server Info</h3>
<%-- Each of these informational values can be obtained from the Request object --%>
<b>Web Server Name:</b> <%= request.getServerName() %> <br>
<b>Web Server Port:</b> <%= request.getServerPort() %> <br>
<b>Browser address:</b> <%= request.getRemoteAddr() %> <br>
<b>Browser Host Name:</b> <%= request.getRemoteHost() %><br>
<b>Request URI:</b> <%= request.getRequestURI() %><br>
<b>Query Sting:</b> <%= request.getQueryString() %><br>
<b>Path Info: </b> <%= request.getPathInfo() %><br>
<b>Path Translated:</b> <%= request.getPathTranslated() %><br>
</p>
<h3>HTTP Header (Not in order)</h3>
<%-- Like we did with the form values, get the header names pass in, and walk through the list --%>
<% java.util.Enumeration e = request.getHeaderNames(); %>
<p>
<% while (e.hasMoreElements()){ %>
	<% String name = (String) e.nextElement(); %>
		<b><%= name %>:</b> <%= request.getHeader(name) %><br>
	<% } %>
</p>
</body>
</html>