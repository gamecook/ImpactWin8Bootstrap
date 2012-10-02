ig.module(
    'game.resident-raver.entities.zombie-c'
)
    .requires(
    'game.resident-raver.entities.base-zombie'
)
    .defines(function () {
        EntityZombieC = EntityBaseZombie.extend({
            _wmIgnore: false,
            animSheet: new ig.AnimationSheet('images/games/resident-raver/zombies.png', 17, 17),
            size: { x: 6, y: 14 },
            offset: { x: 6, y: 1 },
            stayOnPlatform: true,
            life: 40,
            blastRadius: 15,
            safeZone: 30,
            inSafeZone: false,
            speed: 7,
            setupAnimation: function (offset) {
                offset = (offset * 6) + 35;
                this.addAnim('walk', .09, [0 + offset, 1 + offset, 2 + offset, 3 + offset, 4 + offset, 5 + offset]);
                
                offset += 7;
                this.addAnim('warningWalk', .07, [0 + offset, 1 + offset, 2 + offset, 3 + offset, 4 + offset, 5 + offset]);

                this.currentAnim = this.anims.walk;
            },
            update: function () {

                this.parent();

                if (ig.game.player) {
                    var dist = this.distanceTo(ig.game.player);
                    //console.log("dist to player ", dist);

                    if (dist < this.blastRadius)
                        this.onExplode();
                    else if (dist > this.blastRadius && dist < this.safeZone) {
                        this.currentAnim = this.anims.warningWalk;
                    }else if (dist > this.safeZone){
                        this.currentAnim = this.anims.walk;
                    }
                }
            },
            onExplode: function () {

                //Make sure we don't go through the normal kill process and give the player a point
                this.outOfBounds();


                // Loop through entities and kill them if they are near
                var entity;
                var entities = ig.game.entities;
                for (var i = 0; i < entities.length; i++) {
                    entity = entities[i];
                    //TODO need to make this configurible and include the player
                    if (entity.type == ig.Entity.TYPE.B || entity.type == ig.Entity.TYPE.A) {
                        var distance = this.distanceTo(entity);
                        if (distance < this.blastRadius)
                            entity.receiveDamage(Math.ceil(this.blastRadius - distance), this);
                    }
                }

                for (var i = 0; i < 10; i++)
                    ig.game.spawnEntity(EntityDeathExplosionParticle, this.pos.x, this.pos.y, { colorOffset: 1 }); //TODO need to make sure this is the correct way to get the color offset

                ig.game.shakeScreen();
            }
            //TODO need to add logic to explode when near the player
        })
    })