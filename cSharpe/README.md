# CSharpe Programing Environment

I found a list on compilers on [Wikipedia](http://www.mono-project.com/download/).
Ethan confirmed the Mono compiler works.

Downloaded and installed: MonoFramework-MDK-5.0.1.1.macos10.xamarin.universal.pkg

--------------------------------------------------------------------------------
## Testing

Create a local project repository directory on your computer.
````
$ mono --version
Mono JIT compiler version 5.0.1.1 (2017-02/5077205 Thu May 18 16:11:37 EDT 2017)
Copyright (C) 2002-2014 Novell, Inc, Xamarin Inc and Contributors. www.mono-project.com
	TLS:           normal
	SIGSEGV:       altstack
	Notification:  kqueue
	Architecture:  x86
	Disabled:      none
	Misc:          softdebug 
	LLVM:          yes(3.6.0svn-mono-master/8b1520c)
	GC:            sgen (concurrent by default)

$ mkdir csharpe
$ cd csharpe/
$ vi hello.cs
using System;
public class HelloWorld
{
    static public void Main ()
    {
        Console.WriteLine ("Hello World");
    }
}

$ mcs hello.cs 
$ ls -l
total 16
-rw-r--r--  1 dthurston  410487729   135 Jun 21 15:28 hello.cs
-rwxr-xr-x  1 dthurston  410487729  3072 Jun 21 15:28 hello.exe
$ mono hello.exe 
Hello Mono World
$ 
````

--------------------------------------------------------------------------------
## Xamarin Studio

Recommend by Alex, I [downloaded](http://www.monodevelop.com/download/)
XamarinStudio-6.1.2.44.dmg

+ Install
+ Start, allow update and restart.
+ Create a New Solution/Console Project
+ By default, it creates the Hello World program.
+ Click the run icon (top window bar right pointing triangle).
+ Or Build.

Run from command line:
````
$ mono /Users/user/Projects/Hello/Hello/bin/Debug/Hello.exe
Hello World!
$
````
--------------------------------------------------------------------------------
## Install Twilio into Xamarin Studio

NuGet set up instructions:
http://lastexitcode.com/blog/2014/06/22/NuGetPowerShellConsoleForXamarinStudio/

[Downloaded](http://addins.monodevelop.com/Project/Index/121)
MonoDevelop 6.2, Mac
MonoDevelop.PackageManagement.Extensions-0.12.mpack

Install NuGet:
+ From the Xamarin Studio menu, select Xamarin Studio/Add-in Manager
+ Search: nuget, and select NuGet Package Management, click Install from file.
+ Select the downloaded file: MonoDevelop.PackageManagement.Extensions-0.12.mpack
+ The package installs.
+ Restart.
+ Select: View/Pads/Package Console Extension. The tool opens in the bottom of the window.
+ Get the command to run in the Console from:
https://www.nuget.org/packages/Twilio
````
PM> Install-Package Twilio -Version 5.5.1
...
Successfully installed 'Twilio 5.5.1' to Hello
PM> 
````

### Test

Create new Console Solution/project.
+ In the project, right-click Packages, click Add Packages.
+ Search: Twilio, and click the check box to select the Twilio REST API helper library.
+ Click Add Package.

Sample program:
````
using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;
using System.Collections.Generic;

namespace twSendSms
{
	class MainClass
	{
		public static void Main(string[] args)
		{
			Console.WriteLine("+++ Start: twSendSms");

			var accountSid = "ACae0e356ccba96d16d8d4f6f9518684a3";
			var authToken = "d396d26bc92ad7562763410a1ad1c89d";
			TwilioClient.Init(accountSid, authToken);

			var message = MessageResource.Create(
				to: new PhoneNumber("+16504837603"),
				from: new PhoneNumber("+18182103863"),
				body: "Hello from C#"
			);
			Console.WriteLine(message.Sid);

			Console.WriteLine("+++ Exit: twSendSms");
		}
	}
}
````
Run it, and it works!

From the IDE menu, select: File/New Solution/Console project, click Next.
+ Project Name: twGather, Solution Name: twGather, click Create.
+ In the project, right-click on Packages, click Add Packages.
+ Search: Twilio, and click the check box to select the Twilio REST API helper library.
+ Click Add Package.

For reference, [twilio-csharp](https://github.com/twilio/twilio-csharp).

--------------------------------------------------------------------------------
Cheers...
