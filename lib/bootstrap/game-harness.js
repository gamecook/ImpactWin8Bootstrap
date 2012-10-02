ig.module(
    'bootstrap.game-harness'
)
    .requires(
    'impact.game',
    'impact.font',
    'bootstrap.bootstrap' // Import the bootstrap
)

.defines(function () {

    // Setup some custom code for all ig.Game classes to include
    ig.Game.inject({
        tracking: null,
        // Default init function for all game classes
        init: function()
        {
            
            // TODO need to make sure the canvas is the correct size and resize the game if needed

            // Create a default tracking instance
            this.tracking = new Tracking(ig.config.system.trackingID);

            // Reset all input bindings
            ig.input.unbindAll();


            //ig.input.bindTouch('#canvas', "continue");
            // Make sure we have keys to bind
            if(ig.config.system.input)
            {

                var key;
                var keys = ig.config.system.input.keys;
                var bindProperty = ig.ua.mobile ? "bindTouch" : "bind";

                // Bind keys
                for (key in keys)
                {
                    
                    ig.input.bind(ig.KEY[key], keys[key]);
                }

                if (window.navigator.msPointerEnabled) {
                    var touchTargets = ig.config.system.input.touch;
                    for (key in touchTargets) {

                        ig.input.bindTouch(key, touchTargets[key]);
                    }
                }
            }
            else
            {
                //TODO need to add some kind of error message if no config values are found
            }

            window.addEventListener("resize", this.onViewStateChanged);

        },
        onViewStateChanged: function (eventArgs) {

            var viewStates = Windows.UI.ViewManagement.ApplicationViewState;
            var newViewState = Windows.UI.ViewManagement.ApplicationView.value;

            //TODO need to tell if we are in game over state or pause state when we return from a snap
           
            var scale = 5;//Math.floor(window.innerHeight / 155);
            var maxWidth = (window.innerWidth > 1366) ? 1366 : window.innerWidth;
            var maxHeight = (window.innerHeight > 786) ? 786 : window.innerHeight;
            var width = Math.floor(maxWidth / scale) - 1;
            var height = Math.floor(maxHeight / scale) - 1;
            
            var controls = document.getElementById("controls");

            ig.system.resize(width, height, scale);

            if (newViewState === viewStates.snapped) {
                // is snapped
                
                document.getElementById('controls').style.visibility = "hidden";

            } else if (newViewState === viewStates.filled) {
                // is filled
                //ig.system.resize(width, height, scale);
                document.getElementById('controls').style.visibility = "visible";
            } else if (newViewState === viewStates.fullScreenLandscape) {
                // is full screen
                document.getElementById('controls').style.visibility = "visible";
            }
            
            if (ig.game.camera) {
                ig.game.configureCamera();
                ig.game.camera.update();
            }
            ig.game.togglePause(true);
        }
    })

    // This is going to be our default Game class
    MyGame = ig.Game.extend({
        gravity: ig.config.system.gravity, // Get gravity from config
        levelTimer:new ig.Timer(),
        stats:null,
        isGameOver:false,
        defaultCaption:'',

        /**
         * Main function
         */
        init:function ()
        {
            // Make sure we call parent init since I injected code into ig.Game
            this.parent();

            // Load the level
            this.loadLevelByFileName(ig.config.system.defaultLevel);

            // Create Background Music
            ig.music.add(ig.config.system.backgroundMusic);
            ig.music.volume = ig.config.system.backgroundMusicVolume;
            ig.music.play();

            // Set game volume
            ig.Sound.volume = ig.config.system.soundVolume;
            
            // If the device supports touch then show the control overlay
            if(window.navigator.msPointerEnabled)
                document.getElementById('controls').style.visibility = "visible";
        },
        loadLevel:function (data)
        {

            // Reset Default Values
            //this.defaultCaption = ig.config.text.defaultCaption; //TODO should this be left in here?

            //this.stats = {time:0, deaths:0};
            this.parent(data);

            // Track Level
            this.tracking.trackPage("/game/load/level/" + this.currentLevelName);

            this.levelTimer.reset();

            //TODO this could be cleaned up a little better
            if(this.defaultInstructions)
            {
                switch(this.defaultInstructions.toLowerCase())
                {
                    case "none":case "":
                        //do nothing
                        break;
                    default:
                        this.displayCaption(this.defaultInstructions, 7); //TODO need to make this configurable
                }
            }

        },
        update:function ()
        {

            this.parent();

            if (Windows.UI.ViewManagement.ApplicationView.value != 2) {
                if (this.paused) {
                    if (ig.input.state('quit')) {
                        ig.system.setGame(StartScreen);
                    }
                }

                //TODO maybe this should be moved into the PauseMenu logic? Also it now listens to continue instead of pause on win8
                if (ig.input.state('continue') && !this.isGameOver) {
                    this.togglePause();
                }

                if (ig.input.state('continue') && this.isGameOver) {
                    this.reloadLevel();
                }
            }

        },
        togglePause:function(override)
        {
            // Force togglePause to not dissable pause if in snapped view
            if (Windows.UI.ViewManagement.ApplicationView.value == 2)
                override = true;

            this.parent(override);
        },
        onPause:function ()
        {
            this.parent();
            this.levelTimer.pause();
            this.hideCaption();
            if (window.navigator.msPointerEnabled)
                document.getElementById('controls').style.visibility = "hidden";
        },
        onResume:function()
        {
            this.parent();
            this.levelTimer.unpause();
            if (window.navigator.msPointerEnabled)
                document.getElementById('controls').style.visibility = "visible";
        },
        onPlayerDeath:function ()
        {
            // Set the isGameOver and pause value to false
            this.isGameOver = this.paused = true;

            this.showDeathMessage();
        },
        showDeathMessage: function()
        {
            // Show the game over menu
            //this.showMenu(new Menu("Game Over"));
        },
        reloadLevel:function ()
        {
            this.isGameOver = false;
            if (this.paused)
                this.togglePause();

            this.loadLevelByFileName(this.currentLevelName, true)
        }
    })

    // This is a simple template for the start screen. Replace the draw logic with your own artwork
    StartScreen = ig.Game.extend({
        instructText:new ig.Font('images/bootstrap/04b03.font.png'),
        init:function ()
        {
            // Call parent since I injected logic into the ig.Game class for key binding
            this.parent();

            // Create tracking
            if (this.tracking)
            {
                //Pull the tracking code from the config file
                this.tracking = new Tracking(ig.config.system.trackingID);

                // By default track the new gaem screen as a page
                this.tracking.trackPage("/game/new-game-screen");
            }

            document.getElementById('controls').style.visibility = "hidden";

        },
        update:function ()
        {
            if (ig.input.pressed('continue'))
            {
                ig.system.setGame(MyGame);
            }
            this.parent();
        },
        draw:function ()
        {
            this.parent();

            this.drawScreen();
        },
        drawScreen: function()
        {
            //TODO this should be coming from the config
            var text = !ig.ua.mobile ? 'Press Spacebar To Start!' : 'Press Anywhere To Start!' //TODO need to have this configured better for touch controls

            this.instructText.draw(text, ig.system.width * .5, ig.system.height * .5, ig.Font.ALIGN.CENTER);
        }

    })

});
