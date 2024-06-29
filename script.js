/*
NAME: Ali Sattar Jabbar Qattan, UMass Lowell Computer Science, ali_qattan@student.uml.edu
DATE: 06/28/2024 
GUI Assignment: Scrabble 
Copyright (c) 2024 by Qattan.  All rights reserved.  May be freely copied or excerpted for 
educational purposes with credit to the author.
updated by aLI June 28th
Methods and what they do:

initializeTilePool():     Creates and shuffles the initial pool of Scrabble tiles.
shuffle(array):           Randomizes the order of elements in an array using the Fisher-Yates algorithm.
initializeBoard():        Creates the 15x15 Scrabble board grid and initializes bonus squares.
initializeBonusSquares(): Adds CSS classes to the board squares for different bonus types.
distributeTiles():        Fills empty slots in the tile holder with new tiles from the pool.
calculateScore():         Computes the score for the current word on the board, considering bonus squares.
getDroppedLetters():      Retrieves the letters of tiles currently placed on the Scrabble board.
refillTileHolder():       Calls distributeTiles() to add new tiles to empty slots in the tile holder.
restartGame():            Resets the game state, clearing the board and tile holder, resetting the score, and redistributing tiles.
*/


$(document).ready(function () {
    $('#tile-holder-container').insertAfter('#scrabble-board-container');
    $('#submit-score').addClass('styled-button');

    var tilePool = [];

    const bonusSquares = { // hardcoding this bs cause I don't see a particular patten for any (well there is but it I can't see it)
        doubleLetterScore: [3, 11, 36, 38, 45, 52, 59, 92, 96, 98, 102, 116, 108, 122, 126, 128, 132, 165, 172, 179, 186, 188, 213, 221],
        tripleLetterScore: [20, 24, 76, 80, 84, 88, 136, 140, 144, 148, 200, 204],
        doubleWordScore: [16, 28, 32, 42, 48, 56, 64, 70, 154, 160, 168, 176, 182, 192, 196, 208],
        tripleWordScore: [0, 7, 14, 105, 119, 210, 217, 224]
    };

    function initializeTilePool() { // randomize the tiles
        tilePool = [];
        for (var letter in ScrabbleTiles) {
            var tile = ScrabbleTiles[letter];
            for (var i = 0; i < tile["number-remaining"]; i++) {
                tilePool.push({ letter: letter, value: tile.value });
            }
        }
        shuffle(tilePool);
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function initializeBoard() { // does what it and just makes a 15 by 15 grid on top of the board
        var grid = '';
        for (var i = 0; i < 15; i++) {
            for (var j = 0; j < 15; j++) {
                grid += '<div class="droppable"></div>';
            }
        }
        $('.scrabble-grid').html(grid);
        initializeBonusSquares();
    }

    function initializeBonusSquares() {    // does the stupid bonus squares
        $('.scrabble-grid .droppable').each(function (index) {
            if (bonusSquares.doubleLetterScore.includes(index)) {
                $(this).addClass('double-letter');
            } else if (bonusSquares.tripleLetterScore.includes(index)) {
                $(this).addClass('triple-letter');
            } else if (bonusSquares.doubleWordScore.includes(index)) {
                $(this).addClass('double-word');
            } else if (bonusSquares.tripleWordScore.includes(index)) {
                $(this).addClass('triple-word');
            }
        });
    }

    function distributeTiles() {  // when the user wants to drop a tile in, this is what handles it
        var tileHolder = $('#tile-holder-container .grid .droppable');
        tileHolder.each(function () {
            if (!$(this).find('.draggable').length && tilePool.length > 0) {
                var tile = tilePool.pop();
                $(this).html('<img class="draggable" src="Scrabble_Tile_' + tile.letter + '.jpg" alt="' + tile.letter + '">');
                $(this).data('value', tile.value);

                $(this).find('.draggable').draggable({ // uses jquery to validate if a move is valid or not (if not then reject move)
                    cursor: "move",
                    revert: "invalid",
                    start: function () {
                        $(".droppable").addClass("highlight");
                    },
                    stop: function () {
                        $(".droppable").removeClass("highlight");
                    }
                });
            }
        });
    }

    function calculateScore() { // simply just calculates the score (this does NOT detect words just letters soooooooooo ¯\_(ツ)_/¯)
        let score = 0;
        let wordMultiplier = 1;

        $('.scrabble-grid .droppable').each(function () {
            const tile = $(this).find('.draggable');
            if (tile.length) {
                const letter = tile.attr('alt');
                let letterScore = ScrabbleTiles[letter].value;

                if ($(this).hasClass('double-letter')) {
                    letterScore *= 2;
                } else if ($(this).hasClass('triple-letter')) {
                    letterScore *= 3;
                }

                score += letterScore;

                if ($(this).hasClass('double-word')) {
                    wordMultiplier *= 2;
                } else if ($(this).hasClass('triple-word')) {
                    wordMultiplier *= 3;
                }
            }
        });

        return score * wordMultiplier;
    }

    function getDroppedLetters() {
        let letters = [];
        $('.scrabble-grid .droppable').each(function () {
            const tile = $(this).find('.draggable');
            if (tile.length) {
                letters.push(tile.attr('alt'));
            }
        });
        return letters;
    }

    function refillTileHolder() {
        distributeTiles();
    }

    function restartGame() {
        $('.scrabble-grid .droppable').empty();
        $('#tile-holder-container .grid .droppable').empty();
        $('#score').text('Score: 0');
        initializeTilePool();
        distributeTiles();
    }
    initializeTilePool();
    initializeBoard();
    distributeTiles();
    $(".droppable").droppable({
        accept: ".draggable",
        drop: function (event, ui) {
            var draggedTile = ui.draggable;
            var droppedOn = $(this);
            if (droppedOn.find('.draggable').length > 0) {
                return;
            }
            draggedTile.detach().css({ top: 0, left: 0 }).appendTo(droppedOn);
            draggedTile.css({
                position: 'relative',
                top: '0px',
                left: '0px'
            });
            draggedTile.draggable({
                containment: droppedOn,
                cursor: "move"
            });
        }
    });

    $('#submit-score').click(function () {
        const score = calculateScore();
        const letters = getDroppedLetters();

        let currentScore = parseInt($('#score').text().split(': ')[1]);
        $('#score').text('Score: ' + (currentScore + score));

        refillTileHolder();

        console.log('Dropped letters:', letters);
    });
    $('<button id="restart-game">Restart Game</button>').insertAfter('#submit-score');
    $('#restart-game').click(function () {
        restartGame();
    });
});