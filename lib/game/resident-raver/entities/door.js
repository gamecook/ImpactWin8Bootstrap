/**
 *  @door.js
 *  @version: 1.00
 *  @author: Jesse Freeman
 *  @date: May 2012
 *  @copyright (c) 2012 Jesse Freeman, under The MIT License (see LICENSE)
 *
 */

ig.module(
    'game.resident-raver.entities.door'
)
    .requires(
    'impact.entity',
    'impact.sound',
    'bootstrap.entities.base-door',
    'bootstrap.entities.base-player'
)
    .defines(function ()
    {
        EntityDoor = EntityBaseDoor.extend({
            _wmIgnore: false,
            animSheet:new ig.AnimationSheet('images/games/resident-raver/door.png', 16, 32),
            size:{x:16, y:32},
            doorSFX:new ig.Sound('sounds/bootstrap/OpenDoor.*'),
            weapons: 5,
            doorDelay: 10,
            doorDelayTimer:null,
            spawner: null,
            spawnZombieDelayTimer: null,
            spawnZombieDelay: 10,
            spawnEntity: null,
            init: function(x, y, settings)
            {
                this.parent(x, y, settings);

                this.addAnim('idle', 1, [0], true);
                this.addAnim('open', .1, [0, 1, 2, 3, 2, 1, 0], true);
                this.addAnim('locked', 1, [4], true);

                var target = ig.game.getEntityByName(settings.target)
                if (target) {
                    this.spawnEntity = target.spawnEntity ? target.spawnEntity : null;
                    if (this.spawnEntity) {
                        this.spawnZombieDelayTimer = new ig.Timer();
                    }
                }
            },
            open: function(value)
            {
                this.parent(value);
                this.currentAnim = this.anims.open;
                this.currentAnim.rewind();
                this.doorSFX.play();
            },
            onOpen: function(value)
            {
                // Randomly pick a weapon
                if(this.target)
                    this.target.equip(Math.floor(Math.random() * this.weapons) + 1);

                //TODO this is probably expensive, we can just reset it
                this.doorDelayTimer = new ig.Timer();

                // Make sure we don't spawn an entity when the player is in the door
                this.spawnZombieDelayTimer = null;

                // Moved this below the equip code to make sure it doesn't throw an error if no target exists
                this.parent(value);
            },
            update: function()
            {
                this.parent();
                if (this.currentAnim == this.anims.open)
                {
                    if (this.currentAnim.loopCount)
                    {
                        if (this.isClosing)
                            this.onClose();
                        if (this.isOpening)
                        {
                            if(this.isSpawning)
                                this.onSpawnEntityOnClose();
                            else
                                this.onOpen()
                        }
                    }
                }

                if(this.doorDelayTimer)
                {
                    var timeLeft = Math.round(this.doorDelay - this.doorDelayTimer.delta())
                    if ((this.doorDelayTimer.delta() > this.doorDelay/2) && timeLeft >= 0){
                        ig.game.displayCaption("Exit Door In " + timeLeft,.1);
                    }
                    if (this.doorDelayTimer.delta() > this.doorDelay) {
                        this.target.exitDoor();
                    }
                }

                if (this.spawnZombieDelayTimer) {
                    if (this.spawnZombieDelayTimer.delta() > this.spawnZombieDelay) {
                        
                        this.spawnEntityOnClose(); //TODO probably need to fast forward the animation since we don't call open first and also make sure it doesn't give the player a score
                    }
                }
            },
            spawnEntityOnClose: function ()
            {
                this.spawnZombieDelayTimer = null;
                this.isSpawning = this.isOpening = true;
                this.currentAnim = this.anims.open;
                this.currentAnim.rewind();
                this.doorSFX.play();

            },
            onSpawnEntityOnClose: function ()
            {
                //console.log("Spawn zombie");
                ig.game.spawnEntity(this.spawnEntity, this.pos.x + (this.size.x * .5), this.pos.y + (this.size.y * .5));
                this.kill();
            },
            close:function ()
            {
                this.parent();
                this.currentAnim = this.anims.open;
                this.currentAnim.rewind();
                this.doorSFX.play();
                this.doorDelayTimer = null;
            },
            activate:function (value)
            {
                if (!value)
                {
                    this.currentAnim = this.anims.idle;
                } else
                {
                    this.currentAnim = this.anims.locked;
                }
                this.parent(value);
            },
            onClose: function()
            {
                this.parent();
                this.kill();
            },
            kill: function()
            {
                this.parent();
                if(this.spawner)
                    this.spawner.removeItem();
            }
        })

    });