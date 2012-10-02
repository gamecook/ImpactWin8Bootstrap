
ig.module(
    'game.resident-raver.entities.platform'
)
    .requires(
    'bootstrap.entities.base-platform'

)
    .defines(function ()
    {

        EntityPlatform = EntityBasePlatform.extend({
            _wmIgnore: false,
            animSheet:new ig.AnimationSheet('images/games/resident-raver/elevator.png', 32, 10),
            size:{x:32, y:10},
            init: function(x, y, settings)
            {
                this.parent(x, y, settings);

                this.addAnim('idle', 1, [0]);
            }
        })

    })