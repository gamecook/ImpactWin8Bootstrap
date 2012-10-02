ig.module(
    'game.resident-raver.entities.chair'
)
    .requires(
    'impact.sound',
    'game.resident-raver.entities.crate',
    'game.resident-raver.entities.destructible'
)
    .defines(function () {
        EntityChair = EntityDestructible.extend({
            _wmIgnore: false,
            bloodColorOffset:3,
            animSheet:new ig.AnimationSheet('images/games/resident-raver/chair.png', 8, 15),
            size:{x:8, y:8},
            offset: {x:0, y:5},
            hitHardSFX: new ig.Sound( 'sounds/bootstrap/HitHard.*' ),
            deathSFX: new ig.Sound( 'sounds/bootstrap/Death.*' ),
            receiveDamage:function(value, from) {
                this.parent(value, from);

                if (this.health > 0) {
                    this.hitHardSFX.play();
                }
            }
        })
    });