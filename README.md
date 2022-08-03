# BatBoy

Week 3 project

# Description

Batboy is a character whom I found online and purchased for $5. I named him BatBoy to suit the theme of our projects, being on Team DC, ironically this characters attacks include a bat, hence Batboy. The objective is to either roll or attack, using 'a' and 's' to destroy Marvel Heroes. The character has full mobility of the canvas being able to move left and right aswell as up and down. I have set the max score to be 50 points and a time limit of 120 seconds to obtain this score. You win either by obtaining this score, even if you have lost all of your 9 lives. The lose condition is not obtaining the score given in the time limit or the amount of lives you have. 

# MVP 
- game has character which can move around the canvas
- has a roll attack and hit attack
- enemies appear from the right of the screen
- losing your lives or reaching the time limit will end the game
- Enemies increase or decrease depending on speed of chracter

# Data structure
For my own ease of editing and configuring I applied a state design stucture placing all instances within classes in seperate files. Being able to export classes I could easily use them where needed.

## main.js
- includes the main game class
  - this initiates the constructor with all the properties of the game 
- initiates the canvas and updates and draws using context and delta time.
- animates using request animation frame 

## player.js
- handles the player class
  - imports the playerState, collisions and floater classes
- update function using input and delta time as arguments
- draw context using 9 arguments as sprite sheet was used for frame animation
- onGround() detects when the player is on the ground 
- setState() uses the playerStates to update the players animation
- checkCollision() sets the parameters of what instances a collision occurs and what to do when it happens

## playerStates.js
- instantiated using enums for ease of reference
- class state which is parent to all states
- classes which use parent constructors and super() are instantiating the state which the character is in
- enter() initiates where on the sprite sheet this state is to be drawn
- handleInput() handles what conditions need to be met to enter said state

## input.js
- handles all the input controls
- has conditions for a window.eventListener for a keydown event 
- uses an empty array to store input keys and removes once input executes

## enemies.js
- enemy class which is parent to neemy types
- update() handles frames for enemy sprites and when to delete the enemy
- draw() with 9 arguments for sprite sheet for each enemy
- includes 3 enemy types which can be extended e.g. enemy class > flying enemy class > flying enemy 1, flying enemy 2 , flying enemy 3...
- enemies have different update() or draw() respecitvely for enemy behaviour

## background.js
- here is the layer parent class with parameters
- these past to child background class which initiates parameters respectively for each background layer creating parallax background effect

## collision.js
- handles the effect for a collision and how it is drawn for each instance of collision

## effects.js
- class of effects
- has 3 children 
- one is dust effect using simple built arc function and math.PI to create circles which look like dust when running
- effect of splash which is used for a dive attack when in air
- effect of named fire as initially was fire but changed to theme to use when atatcking.
  - uses a variable angle and math.Sin to create a flowing effect

## points.js
- draw the end winning or losing message
- plays a sound for a win or lose and pauses music at the instance of gameOver
- sets timeout to reload page when win or lose occurs

## message.js
- simple class to draw floater messages when enemy is hit.
- fades away to the game score as a +1

# links
### git ...
### slides ...

