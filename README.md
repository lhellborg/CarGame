#Car Game
This is a game made to play without internetconnection for example when travelling.
##How to play
You can play it in many different ways:
-Check the pictures and see if you can spot them outside the window. Press the card and get points. Most points win when travel is over or when time is out.
-Make all pictures the same by pressing the cards. Least scores win.
-Make all pictures the same but the score should be as close to 10 as possible (or any other number). 
-Make up your own game and challenge the family.

##Buttons
`3PICTURES` 3 different cards and score will be set to 0.
`6PICTURES` 6 different cards and score will be set to 0.

Use the `CHANGE1` button to change one card and get a -1 score.

`RESET SCORE` set the score to 0.
`START TIMER` start the countdown of the timer. 
`STOP TIMER` stop the timer.

###Add to your home screen iOS device
Launch the `Safari` browser on Apple’s iOS and navigate to the website or web page you want to add to your home screen, `https://lhellborg.github.io/testCarGame/`. Tap the `Share` button on the browser’s toolbar — that’s the *rectangle with an arrow pointing upward*. It’s on the bar at the top of the screen on an iPad, and on the bar at the bottom of the screen on an iPhone or iPod Touch. Tap the Add to Home Screen icon in the Share menu that's the *rectangle with a + sign* in.

###Add to your home screen Android
Launch `Chrome` for Android and open the website or web page you want to pin to your home screen, `https://lhellborg.github.io/testCarGame/`. Tap the `menu` button and tap `Add to homescreen`. You’ll be able to enter a name for the shortcut and then Chrome will add it to your home screen.

###How to build
From the `src` code:
- download `package.json`, `gulpfile.js`and the `src` folder and put in a _directory_ of your choice on your computer
- direct yourself to _the directory_ that you choosed in the terminal and run `npm install`. This will create a file `node-modules`in your directory with the files you need to run `gulp`.
- run `gulp todist`, which will _minify_ all of the **css and js** files and put them in a directory called `dist` in the correct folders. It will also copy all the other files to their correct destinations.
- run `gulp serve` to run from the `app` directory or `gulp serve:dist` to run from the compressed and minified dist directory. This will run the Public transportation app on localhost port 9099. 