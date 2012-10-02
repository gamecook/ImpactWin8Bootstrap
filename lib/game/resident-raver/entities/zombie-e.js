ig.module(
    'game.resident-raver.entities.zombie-e'
)
    .requires(
    'game.resident-raver.entities.base-zombie'
)
    .defines(function () {
        EntityZombieE = EntityBaseZombie.extend({
            _wmIgnore: false,
            animSheet:new ig.AnimationSheet('images/games/resident-raver/zombies.png', 17, 17),
            size: {x: 6, y:14},
            offset: { x: 6, y: 3 },
            speed: 5,
            health: 30,
            setupAnimation:function (offset) {
                offset = (offset * 6) + 56;
                this.addAnim('walk', .1, [0+offset,1+offset,2+offset,3+offset,4+offset,5+offset,6+offset]);
            }
            //TODO need to make this really strong
        })
    })