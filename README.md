# GuitaReact

<p align="center">
  <img src="./src/images/guitareact_logo.png" width="300">
</p>

This is a web app was built by me and for me lol. But to be honest anyone who wants to learn more about programming (Focus on React.js) or knows to play some instrument or both, this project would be good for you. The goal of this project is save the songs that you want to play, and play the song list randomly, besides that you can play the original song or a backing track (Using the Youtube API).

If you are a musician( or programmer who likes to play music with some instrument) and you know to play some songs that you only know or just learned a few seconds ago, you can use GuitaReact and theses cases:
- You can Sign In / Sign Up
- Add songs you want to play (Adding the song’s and artist’s/band’s name)
- You can update your song list (Edit, Delete songs of your list).
- You can play your song list in three ways:
  - Song Random Version 1: You will play the song list randomly and will appear the song title and the artist’s/band’s name only
  - Song Random Version 2: You will play the song list  randomly and will appear the song title and artist’s/band’s name + you will play the video (with other 3 options to play) + you have the option to change the original music to backing track music
  - Song Random Version 3: You will have the same features than the Version 2 but with other 5 options to play

If you want to run this project you have to do these things first:
- Download or clone this project
- You have to install all the dependencies to make the project runs correctly. The command to install them is this:
```
yarn install
```
- Before you run the project you have to get the api from Youtube (This makes work the version 2 and 3 of the project)  you can get more info about it **[here](https://developers.google.com/youtube)**. Once you get the api you will paste the key on youtube.js file
Also with Firebase (In this project Firebase will handle the sign in/sign up, log out, add, edit and delete music) you need to configure it to make the project works correctly. You can check more info **[here](https://firebase.google.com/docs/web/setup)**

Example of how the firebase config looks on the project:
```js
const config = {
 apiKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
 authDomain: "xxxxxxxxxx.firebaseapp.com",
 databaseURL: "https://xxxxxxxxxxxxx.firebaseio.com",
 projectId: "xxxxxxxxxxxxxxxxxxx",
 storageBucket: "xxxxxxxxxxxxxxx.appspot.com",
 messagingSenderId: "xxxxxxxxxxxxxxx",
 appId: "1:917921401083:web:abe13672f96a58b0ef085e",
 measurementId: "G-CCBRGG99XR"
}
```
- Once you get everything installed and prepared the firebase and youtube files you can run the project with this command:
```
yarn start
```
The version 3 on GuitaReact I used **[react-image-gallery](https://www.npmjs.com/package/react-image-gallery)** it is a good dependency if you want to use some galleries on any project you going to build. Probably there is another one better, but this one helped me to built the version 3 as I wanted it.

## You can check the GuitaReact demo **[HERE!](https://guitareactvone.web.app/)**

I hope you enjoy this project, and feel free to use the demo or this code project as you want. Any new feature you considerate for this project I’ll be open to listen.
