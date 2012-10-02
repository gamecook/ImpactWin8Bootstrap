ig.module(
    'game.resident-raver.resident-raver'
)
    .requires(
    'game.resident-raver.config', // All of the game's settings
    'bootstrap.game-harness',
    'game.resident-raver.levels.broward',
    'game.resident-raver.levels.bryan',
    'game.resident-raver.levels.cawthon',
    'game.resident-raver.levels.degraff',
    'game.resident-raver.levels.deviney',
    'game.resident-raver.levels.dorman',
    'game.resident-raver.levels.dorms',
    'game.resident-raver.levels.gilchrist',
    'game.resident-raver.levels.kellum',
    'game.resident-raver.levels.landis',
    'game.resident-raver.levels.reynolds',
    'game.resident-raver.levels.salley',
    'game.resident-raver.levels.smith',
    // Need to import zombies since we dynamically spawn them
    'game.resident-raver.entities.zombie-a',
    'game.resident-raver.entities.zombie-b',
    'game.resident-raver.entities.zombie-c',
    'game.resident-raver.entities.zombie-d',
    'game.resident-raver.entities.zombie-e',
    'game.resident-raver.plugins.stats',
    'game.resident-raver.plugins.local-storage'
)

    .defines(function ()
    {

        MyGame.inject({
            exitedLevel: false,
            gravity:340,
            currentLevelName:"dorms",
            levelCounter:0,
            showStats: true,
            cameraOffsetY: 0,
            init: function()
            {
                this.parent();
            },
            loadLevel:function (data)
            {
                if(this.light)
                    ig.game.lightManager.removeLight(this.light);

                // Reset Default Values
                this.defaultInstructions = "none";
                this.showStats = true;
                var defaultWeapon = 0;

                this.currentLevel = data;

                //TODO I need to connect this up correctly
                var cameraMinY = this.showStats ? -16 : 0;

                this.parent(data);

                this.levelCounter++;

                // Track Level
                this.tracking.trackPage("/game/load/level/"+this.currentLevelName);

                // Looks for
                var settings = this.getEntityByName("settings");
                if (settings) {
                    // Set properties supported by game engine if overriden by setting entity
                    if (settings.showStats)
                        this.showStats = settings.showStats == "true" ? true : false;

                    if (settings.defaultInstructions)
                        this.defaultInstructions = settings.defaultInstructions;

                    if (settings.defaultWeapon)
                        defaultWeapon = settings.defaultWeapon;

                    if (settings.cameraMinY)
                        cameraMinY = Number(settings.cameraMinY);

                    //TODO add default weapon settings
                }
                else {
                    // Reset value
                }

                //If there are no stats make sure the player doesn't have a weapon
                if (this.showStats) {
                    //ig.game.stats.ammo = 10;
                    this.player.makeInvincible();

                    //for testing
                    //defaultWeapon = 5;
                    this.player.equip(defaultWeapon, true);
                }

                // By default this is set to "none"
                if(this.defaultInstructions != "none")
                    this.displayCaption(this.defaultInstructions, 7);

            },
            exitLevel: function (data) {
                //Kills player and sets exitedLevel value to true
                this.exitedLevel = true;
                this.player.kill(true);
            },
            reloadLevel: function () {
                if (this.exitedLevel) {
                    ig.system.setGame(StartScreen);
                } else {
                    this.parent();
                }
            },
            onPause: function(){
                this.stats.score = (this.stats.doors * 50) + (this.stats.kills * 5);
                this.parent();

                //console.log("camera", this.camera.pos, this.camera.offset);
            },
            showDeathMessage: function()
            {
                // Show the game over menu
                this.showMenu(new StatMenu("Game Over!"));
                this.parent();
            }
        })

        StartScreen.inject({
            instructText:new ig.Font('images/bootstrap//04b03.font.png'),
            background:new ig.Image('images/games/resident-raver/screen-bg.png'),
            mainCharacter:new ig.Image('images/games/resident-raver/screen-main-character.png'),
            title: new ig.Image('images/games/resident-raver/game-title.png'),
            drawScreen:function ()
            {

                if (Windows.UI.ViewManagement.ApplicationView.value == 2) {
                    this.background.draw(-25, 0);
                    this.mainCharacter.draw(-25, 0);
                } else {

                    this.background.draw(0, 0);
                    this.mainCharacter.draw(0, 0);
                    this.title.draw(ig.system.width - this.title.width, 0);
                    var x = ig.system.width / 2,
                        y = ig.system.height - 10;


                    var text = 'Press Anywhere To Start!';

                    this.instructText.draw(text, x + 40, y, ig.Font.ALIGN.CENTER);
                }
            },
            update: function () {
                if (ig.input.pressed('continue') && Windows.UI.ViewManagement.ApplicationView.value == 2) {
                    Windows.UI.ViewManagement.ApplicationView.tryUnsnap();
                } else {
                    this.parent();
                }
            },

        })

    });
