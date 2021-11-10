--------------------------------------------------------------------------------
# New MacBook Air M1 Notes

I have an Apple Adapter unit that has a USB, HDMI, and Apple connector.
Item description from Amazon.com: 
USB C to HDMI Adapter USB Type C Adapter Multiport AV Converter with 4K HDMI Output USB C Port & USD3.0 
Fasting Charging Port Compatible for MacBook Pro MacBook Air 2019/2018 iPad Pro 2019.

Connected to the Apple Adapter unit
+ USB hub
+ HDMI cable to my 32" TV flat screen monitor.

I use a USB hub to connect devices:
+ Wireless keyboard
+ Mouse
+ Phone charger cable

M1 Air doesn't have fan. I love the quiet.
If the CPU heats up too much, it throttles itself to keep cool.
It runs warm to the touch. I haven't noticed any slow down.
I watched a comparison video between an M1 Air and a MacBook Pro.
The M1 won most tests, only slightly loosing one.

It's suppose to have great battery life. I've left it plugged in, so haven't tested this feature.

I found out that Mac M1 is unable to run Android Studio emulators. 
The workaround is test on actual hardware. My Hello World app runs fine on my phone.
Article on installing the [Android Emulator Preview for the M1 chip](https://medium.com/techiepedia/setting-up-android-emulator-in-m1-mac-fff58ec8bff8).

Here something I really like with the new machine.
For a Zoom session, I open the lid for the camera to work.
After a Zoom session and close the lid.
Here's the part I like, there’s no monitor flash as the video adjusts to the closing of the lid.

--------------------------------------------------------------------------------
### Getting Started

When I went through the Twilio computer initial setup, I called my computer: dave.

When allowing a new downloaded app,
+ Apple/System Preferences/Security & Privacy
+ Click/enable Allow apps ...

Getting the laptop to stay on when lid is closed:
+ Apple/System Preferences/Battery/Schedule
+ Enable: Startup or wake, Every Day. I set at: 8:00AM.

To change keyboard keys,
+ From the Apple menu, select System Preferences/Keyboard/Modifier Keys… button.
+ Enable, Use F1, F2, etc. keys as standard functions. *** Press Fn to use special functions.
    Hopefully, this will stop the case when a cat steps on 1/F1, causing my keyboard to stop working.
+ Select keyboard: USB Receiver for my external keyboard.
+ I swapped functions for the Option Key with Command Key, Option(Z)Key: Command, Command(X)Key: Option.

#### Mac to/from Mac transfer

From old computer to the new one, I used SMB, which is finicky.
Mark suggested using Google docs upload/download.

--------------------------------------------------------------------------------
### Zoom screen share

For screen share:
+ Click the system apple.
+ Click System Preferences/Security & Privacy.
+ On the left, click Screen Recording.
+ Click the lock in the bottom left to allow changes.
+ Click the "+".
++ In the popup, go to the Application directory and click "Zoom.us".
++ Zoom.us will be added and enabled.

You are now ready for Zoom screen sharing.
To confirm, [Host a session](https://twilio.zoom.us/) and click Share.
The pop will display the windows options to be shared.
Note, before running the above, I was given screen share options with question marks on the disabled options.

--------------------------------------------------------------------------------
### Mic

````
Since the internal mic does not work when the lid is closed, I connected an external mic.
I connected my mic to the mixer, into the USB sound card, into a USB hub,
    into the USB to Mac adapter, into the M1 laptop.
Set the System Preference/Sound/Input, selected Type USB.
I lowered the volume to 1/4 and ran tests to get rid of the background buzz.
I restarted the browser. Now works with the browser.

Started a Zoom session (Host a session).
On client startup, select and test the Speaker and Microphone.
Option if in the Zoom client, go to Settings/Audio to set and test the audio.
+ Set Speaker.
+ Set Microphone = USB.

The USB mic is not selectable from Audacity.
+ The MacBook Air mic and ZoomAudioDevice doesn't work.
````

--------------------------------------------------------------------------------
### Configure the terminal
````
+ Start Terminal.
+ Menu item: Terminal/Preferences
+ Change Shells open with: Command:
++ Change from: /bin/zsh to: /bin/bash
++ New windows open with: Same Profile/Same Working Directory
+ Quit Terminal.

% cd
% vi .bash_profile
export BASH_SILENCE_DEPRECATION_WARNING=1
export PS1="/Users/dave/\W $ "

Notes,
Remove the warning: export BASH_SILENCE_DEPRECATION_WARNING=1
Set the prompt:     export PS1="/Users/dave/\W $ "

+ Start Terminal.
+ If prompt is not changed, set to use the bash shell:
/usr/bash

+ Quit Terminal.
+ Start Terminal.
Note, ignore the message, "The default interactive shell is now zsh. ..."

After changing .bash_profile, use the following:
source ~/.profile
````
--------------------------------------------------------------------------------
### Install brew, Twilio Node SDK, and Twilio CLI.

Install brew.
````
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
...
- Add Homebrew to your PATH in /Users/dave/.bash_profile:
    echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> /Users/dave/.bash_profile
    eval "$(/opt/homebrew/bin/brew shellenv)
...
````

Run the following to add command to run brew in a terminal.
````
$ echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> /Users/dave/.bash_profile
````
#### Install Twilio SDK

Reference:
https://www.twilio.com/docs/twilio-cli/quickstart
````
$ brew tap twilio/brew && brew install twilio
...
$ twilio
...
VERSION
  twilio-cli/2.25.0 darwin-arm64 node-v16.4.2
...
````
+ Confirm the install and environment variables by listing Twilio account phone number.
````
$ twilio api:core:incoming-phone-numbers:list
SID                                 Phone Number   Friendly Name                     
PN ...
...
````
--------------------------------------------------------------------------------
### Languages

````
$ java -version
java version "16.0.1" 2021-04-20

$ node -v
v16.4.2
````
Install Twilio SDK. Install Node Express for running Node web servers.
````
$ npm install twilio
$ npm install express
````

PHP
````
$ php -version
...
PHP 7.3.24

$ ruby -version
ruby 2.6.3p62

$ python --version
Python 2.7.16
$ python3 --version
Python 3.8.2
````
Manual Installation of Python Twilio Helper Library.
Note, pip install didn't work for me. Maybe I should have used pip3.

I downloaded: twilio-twilio-python-6.61.0-0-g15ae2b1.zip from

https://github.com/twilio/twilio-python/zipball/main
````
$ python setup.py install
````

Install Heroku CLI
````
$ brew tap heroku/brew && brew install heroku
...
$ heroku login -i
 ›   Warning: Our terms of service have changed: https://dashboard.heroku.com/terms-of-service
heroku: Enter your login credentials
Email: abc@example.com
Password: ********
 ›   Error: Your account has MFA enabled; API requests using basic authentication with email and password are not supported. Please generate an authorization token for API access. 
 ›
 ›   Error ID: vaas_enrolled
````
Don't know if this helped, I log into dashbord, Account settings, Create Authorization.
And created a token.
````
$ heroku update
heroku: Updating CLI... already on latest version: 7.56.1
$ heroku login
heroku: Press any key to open up the browser to login or q to exit: 
Opening browser to https://cli-auth.heroku.com/auth/cli/browser/19...ncQY
Logging in... done
Logged in as abc@example.com
$
````

--------------------------------------------------------------------------------
### PHP
````
$ php -version
...
PHP 7.3.24-(to be removed in future macOS) (cli) (built: May  8 2021 09:40:34) ( NTS )
Copyright (c) 1997-2018 The PHP Group
Zend Engine v3.3.24, Copyright (c) 1998-2018 Zend Technologies
````
Downloaded the new version
https://github.com/twilio/twilio-php

Use the following require to replace the older version:
````
require __DIR__ . '/../../twilio-php-main/src/Twilio/autoload.php';
// require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
````
--------------------------------------------------------------------------------
### C#, Xamarin, Git for GitHub

Xamarin is now integrated into Visual Studio. 
https://docs.microsoft.com/en-us/xamarin/get-started/installation/windows

+ Download
https://dotnet.microsoft.com/learn/xamarin/hello-world-tutorial/intro
+ I downloaded:
VisualStudioForMacInstaller__1737205245.1626116930.dmg

When I installed, I selected the option to install Git.
This is how I got Git on my computer.

Note, I zipped my code repositories from my old computer,
copied the zip to the new computer,
and the git commands worked:
````
$ git add .
$ git commit -am "update"
...
/Users/dave/work $ git push -u origin master
...
````

This also install the Mono compilier.
````
$ mono --version
Mono JIT compiler version 6.12.0.140 (2020-02/51d876a041e Thu Apr 29 10:44:55 EDT 2021)
Copyright (C) 2002-2014 Novell, Inc, Xamarin Inc and Contributors. www.mono-project.com
	TLS:           
	SIGSEGV:       altstack
	Notification:  kqueue
	Architecture:  amd64
	Disabled:      none
	Misc:          softdebug 
	Interpreter:   yes
	LLVM:          yes(610)
	Suspend:       hybrid
	GC:            sgen (concurrent by default)
$ 
````
A quick test for Mono.
````
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
### Android Studio

After install,
+ I created a Hello World app.
+ It would not run.
+ There was a start up warning with a suggestion to start with more memory.
++ I select that option which restarted Studio.
++ The app runs, however, the emulator fails to run.

I added emulator options.
+ Select ..., AVD manage, and add System Images.
++ It installs with Pixel 3.
++ I added Android 11.0 and 7.0.

Then found out that Mac M1 is unable to run Android Studio emulators. 
The workaround is test on actual hardware. My Hello World app runs fine on my phone.

--------------------------------------------------------------------------------
### Install NetBeans

+ Installed recent Java SDK.
+ Installed NetBeans.
+ Modified my startup script (nb.sh) to load environment variables
and start the new NetBeans version.
````
...
/Applications/NetBeans/Apache\ NetBeans\ 12.4.app/Contents/Resources/NetBeans/netbeans/bin/netbeans &
echo .
echo Starting NetBeans...
echo .
````
--------------------------------------------------------------------------------
### Install Xcode

Use Twilio Self Service.
+ On the top bar, click the Twilio icon.
+ Click Self Service.
+ Scroll down and click Xcode Install.
+ In a minute or so, it finishes.
+ Needed to run a license command:
$ sudo xcodebuild -license
+ Then I could open Xcode from Twilio/Self Service/Apps.

--------------------------------------------------------------------------------
### Arduino IDE

I downloaded, unzipped, moved it to Applications and it ran.
The serial port worked fine.

Then I installed the USB serial device drivers

--------------------------------------------------------------------------------
### Squid Proxy

Install Squid.
````
$ brew install squid
...
$ squid --version
Squid Cache: Version 4.17
...
$ squid
2021/10/27 13:20:57| WARNING: Could not determine this machines public hostname. Please configure one or set 'visible_hostname'
$
$ brew services start squid
==> Tapping homebrew/services
...
==> Successfully started `squid` (label: homebrew.mxcl.squid)
$ ps -ef | grep squid
  501 91998     1   0  1:20PM ??         0:00.00 squid
  501 92000 91998   0  1:20PM ??         0:00.08 (squid-1) --kid squid-1
...
$
````
Documentation: http://www.squid-cache.org/Versions/v4/cfgman/

Configuration: https://devopscube.com/setup-and-configure-proxy-server/

--------------------------------------------------------------------------------
### TextExpander

Find the process:
```
$ ps -ef | grep TextExpander
```
Run from commandline:
```
/Applications/TextExpander.app/Contents/MacOS/TextExpander
```
--------------------------------------------------------------------------------
eof
