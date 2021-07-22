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

--------------------------------------------------------------------------------
### Getting Started

When I went through the Twilio computer initial setup, I called my computer: dave.

When allowing a new downloaded app,
+ Apple/System Preferences/Security & Privacy
+ Click/enable Allow apps ...

Getting the laptop to stay on when lid is closed:
+ Apple/System Preferences/Battery/Schedule
+ Enable: Startup or wake, Every Day. I set at: 8:00AM.

#### Mac to/from Mac transfer

From old computer to the new one, I used SMB, which is finicky.
Mark suggested using Google docs upload/download.

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

--------------------------------------------------------------------------------
### Install brew, Twilio SDK, and Twilio CLI.

+ Install brew.
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
...
- Add Homebrew to your PATH in /Users/dave/.bash_profile:
    echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> /Users/dave/.bash_profile
    eval "$(/opt/homebrew/bin/brew shellenv)
...

+ Run the following to add command to run brew in a terminal.
$ echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> /Users/dave/.bash_profile

#### Install Twilio SDK

Reference:
https://www.twilio.com/docs/twilio-cli/quickstart

$ brew tap twilio/brew && brew install twilio
...
$ twilio
...
VERSION
  twilio-cli/2.25.0 darwin-arm64 node-v16.4.2
...

+ Confirm the install and environment variables by listing Twilio account phone number.
$ twilio api:core:incoming-phone-numbers:list
SID                                 Phone Number   Friendly Name                     
PN ...
...

--------------------------------------------------------------------------------
### Languages

````
$ java -version
java version "16.0.1" 2021-04-20

$ node -v
v16.4.2

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
--------------------------------------------------------------------------------
### PHP

$ php -version
...
PHP 7.3.24-(to be removed in future macOS) (cli) (built: May  8 2021 09:40:34) ( NTS )
Copyright (c) 1997-2018 The PHP Group
Zend Engine v3.3.24, Copyright (c) 1998-2018 Zend Technologies

Downloaded the new version
https://github.com/twilio/twilio-php

Use the following require to replace the older version:
require __DIR__ . '/../../twilio-php-main/src/Twilio/autoload.php';
// require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';

--------------------------------------------------------------------------------
### C#, Xamarin, Git

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
### Arduino IDE

I downloaded, unzipped, moved it to Applications and it ran.
The serial port worked fine.

Then I installed the USB serial device drivers

--------------------------------------------------------------------------------
eof
