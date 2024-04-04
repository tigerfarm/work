' Hello world program
' To compile:
' $ vbnc hello.vb
' To run:
' mono hello.exe
'
' How to do command line args:
' strFriendlyName = CmdArgs(0)
' to1 = CmdArgs(1)
' strEventID = CmdArgs(2)
' strBody = CmdArgs(3)
'
Imports System
Class Example
  Overloads Shared Sub Main(ByVal args() As String)
      Console.WriteLine("+ Hello there.")
      Console.WriteLine("+ From Machine Name: " + Environment.MachineName)
  End Sub
End Class
' eof