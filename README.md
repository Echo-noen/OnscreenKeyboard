# OnscreenKeyboard
A really bad electron app that shows an on-screen keyboard because my brain likes the animations.

[![A video showing me using the app.](ONSCREENTEST.gif)](ONSCREENTEST.gif)

### Why you should not use it (or at least, why you should change the code if you want to use it)
I may not know anything about software engineering or cybersecurity, but having a python script that acts as basically a keylogger just screams spyware.
This was supposed to only be for me though so I did not care. If you want to remake this app maybe try a different approach.
Also this only works for the italian keyboard layout. Why you ask? Because it's the layout my actual keyboard is in, and also I'm too lazy/can't be bothered to figure out how to add support for other keyboard layouts. Like I saw some functions that may help? But like - no. I'm tired and I got my finals coming up.
Up until 10 minutes ago there were a lot of bugs regarding the shift keys and their behavior with pressing animation/state of both the keys themselves and the keys that were modified by the keypress. I do not guarantee this version is bug free.

Other things:
- [x] ~~ALT GR button does not work (python sends 'null' when pressed and idk why)~~ Fixed
- [] Super key also doesn't work but I feel like that's a bit more understandable
- [x] ~~May be a me thing but FN also didn't want to work~~ Either ALT GR works or FN and I chose the bst option

### Why did I decide to make a keylogger (and by make I mean steal the code from my friends)
Because iohook/iohook2/node-global-key-listener would not install or work for some reason??? And I really wanted to make this work even if you were not focused on the app so there ya go.

### Why did I post it publicly
No idea but like enjoy.

## How to run
`npm test` to start the electron application
`python handholder.py` to start the keylogger thingie (it gets worse everytime I say it help)

I'm using Arch Linux and pip would not work so I created like a virtual environment with `python -m venv python` and sent every python command through `python/bin/python scriptName.py`. Also did you know I don't particularly like python?

The makeshift server thing also connects to 0.0.0.0 I'm pretty sure which I feel like is bad but it would refuse to connect to localhost so here we are

Uuh that's it. This was a bad idea but idc! Enjoy the nice keyboard (also fuck css that #keyboardContainer::before pseudoelement sucked ass to figure out how to make correctly, but everything is fixed with making more and more container divs!!!)
