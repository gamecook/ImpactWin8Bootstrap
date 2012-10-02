ig.module(
    'game.resident-raver.config'
)
    .defines(function ()
    {

        //TODO maybe this needs to be a class so you can inject logic into it?
        ig.config = {
            system:{
                debug:true,
                version:'@version@',
                trackingID:'@tracking@',
                backgroundMusic:'sounds/bootstrap/theme.*',
                backgroundMusicVolume:.5,
                soundVolume:.5,
                killAllSounds:true, /* use this for debugging if you don't want to hear sound when testing */
                devices:{
                    iphone:{width:240, height:160, scale:2},
                    android:{width:240, height:160, scale:2},
                    ipad:{width:240, height:160, scale:4},
                    default:{width:240, height:160, scale:3}
                },
                gravity:300,
                defaultLevel:"dorms.js",
                input: {

                    'keys':{
                        'LEFT_ARROW':'left',
                        'RIGHT_ARROW':'right',
                        'X':'jump',
                        'C':'shoot',
                        'SPACE':'continue',
                        'Q':'quit',
                        'ESC':'pause',
                        'Z':'open'
                    },
                    'touch':{
                        '#buttonLeft': 'left',
                        '#buttonRight':'right',
                        '#buttonJump':'jump',
                        '#buttonShoot':'shoot',
                        '#canvas': 'pause',
                        '#canvas': 'continue'
                    }

                }
            },
            camera:{
                debug:true,
                lightMask:"media/lighting.png",
                trapSizeScale:{x:3, y:3},
                lookAhead:{x:0, y:0}
            },
            //TODO may need to break this up into keys for specific screens

            //TODO should I have touch and keyboard text?
            'text':{
                "defaultCaption":""

            },
            'game':{
                defaultLevel:'day1.js'
            },
            //TODO fix spelling of file names
            sounds:{
                death:"sounds/bootstrap/Death.*",
                elevatorBeep:"sounds/bootstrap/ElvatorBeep.*",
                outOfAmmo:"sounds/bootstrap/Empty.*",
                grenadeBounce:"sounds/bootstrap/GrenadeBounce.*",
                grenadeExplosion:"sounds/bootstrap/GrenadeExplosion.*",
                gunFire:"sounds/bootstrap/GunFire.*",
                hitHard:"sounds/bootstrap/HitHard.*",
                hitSoft:"sounds/bootstrap/HitSoft.*",
                jump:"sounds/bootstrap/Jump.*",
                machineGunFire:"sounds/bootstrap/MachineGunFire.*",
                mineBeep:"sounds/bootstrap/MineBeep.*",
                mineExplosion:"sounds/bootstrap/MineExplosion.*",
                openDoor:"sounds/bootstrap/OpenDoor.*",
                fallToDeath:"sounds/bootstrap/PlayerMonsterFall.*",
                powerUp:"sounds/bootstrap/Powerup.*",
                powerUp2:"sounds/bootstrap/Powerup2.*",
                shotgunFire:"sounds/bootstrap/ShotgunFire.*",
                startGame:"sounds/bootstrap/StartGame.*"
            }
            //TODO maybe add plugins in here?

        };

    });