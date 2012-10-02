ig.module(
    'game.resident-raver.entities.crate'
)
    .requires(
    'bootstrap.entities.base-player',
    'impact.sound',
    'bootstrap.plugins.impact.caption',
    'game.resident-raver.entities.destructible'
)
    .defines(function () {
        EntityCrate = EntityDestructible.extend({
            _wmIgnore: false,
            bloodColorOffset:3,
            animSheet:new ig.AnimationSheet('images/games/resident-raver/crate.png', 10, 10),
            size: { x: 10, y: 10 },
            offset: {x: 0, y: -2},
            health:10,
            hitHardSFX: new ig.Sound( 'sounds/bootstrap/HitHard.*' ),
            deathSFX: new ig.Sound('sounds/bootstrap/Death.*'),
            setupAnimation: function (offset) {
                this.parent(offset);
                if (offset == 1) {
                    this.health = 30;
                    this.bloodColorOffset = 4;
                }
            },
            receiveDamage:function(value, from) {
                this.parent(value, from);
                if (this.health > 0) {
                    this.hitHardSFX.play();
                }
            }
        })
    });