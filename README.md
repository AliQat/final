# Scrabble Game

## Overview
This project implements a simple Scrabble game using HTML, CSS, and jQuery UI. Players can drag and drop tiles onto a board, score points based on tile values and bonus squares, and submit their scores.

## Features
- **Dynamic Board**: Generates a 15x15 grid with bonus squares for double/triple letter and word scores.
- **Tile Distribution**: Randomly distributes tiles from a predefined set onto a player's rack.
- **Score Calculation**: Computes scores based on the position of tiles and bonus squares.
- **Restart Game**: Allows resetting the game state to start a new game.

## Methods and Functionality
### initializeTilePool()
Creates and shuffles the initial pool of Scrabble tiles.

### shuffle(array)
Randomizes the order of elements in an array using the Fisher-Yates algorithm.

### initializeBoard()
Creates the 15x15 Scrabble board grid and initializes bonus squares.

### initializeBonusSquares()
Adds CSS classes to the board squares for different bonus types.

### distributeTiles()
Fills empty slots in the tile holder with new tiles from the pool.

### calculateScore()
Computes the score for the current word on the board, considering bonus squares.

### getDroppedLetters()
Retrieves the letters of tiles currently placed on the Scrabble board.

### refillTileHolder()
Calls distributeTiles() to add new tiles to empty slots in the tile holder.

### restartGame()
Resets the game state, clearing the board and tile holder, resetting the score, and redistributing tiles.

## What I did not accomplish
1. it cannot reckon words
2. it is finicky at times
3. I am confused about how scrabble is played so I think I may got some stuff wrong

# THAT IS ALL BYE BYE
