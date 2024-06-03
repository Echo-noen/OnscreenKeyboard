# OnscreenKeyboard
A really bad electron app that shows an on-screen keyboard because my brain likes the animations.

### Why you should not use it (or at least, why you should change the code if you want to use it)
I may not know anything about software engineering or cybersecurity, but having a python script that acts as basically a keylogger just screams spyware.
This was supposed to only be for me though so I did not care. If you want to remake this app mayube try a different approach.

### Why did I decide to make a keylogger (and by make I mean steal the code from my friends)
Because iohook/iohook2/node-global-key-listener would not for some reason??? And I really wanted to make this work even if you were not focused on the app so there.

### Why did I post it publicly
No idea but like enjoy.

## How to run
`npm test` to start the electron application
`python handholder.py` to start the keylogger thingie (it gets worse everytime I say it help)

I'm using Arch Linux and pip would not work so I created like a virtual environment with `python -m venv`

The makeshift server thing also connects to 0.0.0.0 I'm pretty sure which I feel like is bad but it would refuse to connect to localhost so here we are

Uuh that's it. This was a bad idea but idc! Enjoy the nice keyboard (also fuck css that #keyboardContainer::before pseudoelement sucked ass to figure out how to make correctly, but everything is fixed with making more and more container divs!!!)
