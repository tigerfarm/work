# VB Samples and support files

````
Newtonsoft.Json-10.dll was created using Alex makefile.
Newtonsoft.Json-9.dll was created using Xamarin.

Twilio-5.27.0.dll was created using Alex makefile.
Twilio-5.25.0.dll was created using Xamarin.
````

To view compile options:
````
$ man vbnc
...
The Mono Basic compiler by default only references these assemblies: 
mscorlib.dll, Microsoft.VisualBasic.dll, System.dll and System.Xml.dll.
If you want to reference extra libraries you must
manually specify them using the the -r: command line option.
````
It is possible to compile using a config file.

Sample run:
````
$ vbnc hello.vb
...
$ mono hello.exe 
+ Hello there.
+ From Machine Name: ABC
````

Cheers...