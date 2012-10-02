ig.module( 'game.resident-raver.levels.deviney' )
.requires( 'impact.image','game.resident-raver.entities.elevator','game.resident-raver.entities.zombie-c','bootstrap.entities.void','game.resident-raver.entities.tv','game.resident-raver.entities.chair','game.resident-raver.entities.crate','game.resident-raver.entities.player','game.resident-raver.entities.trash','bootstrap.entities.outofbounds','game.resident-raver.entities.desk','bootstrap.entities.spawner','game.resident-raver.entities.powerup-spawner' )
.defines(function(){
LevelDeviney=/*JSON[*/{"entities":[{"type":"EntityElevator","x":112,"y":170,"settings":{"target":{"1":"floor3","2":"floor2","3":"floor1"}}},{"type":"EntityZombieC","x":158,"y":195},{"type":"EntityVoid","x":160,"y":64,"settings":{"size":{"x":16,"y":32},"name":"door2","spawnEntity":"EntityZombieA"}},{"type":"EntityTv","x":88,"y":190,"settings":{"spriteOffset":1}},{"type":"EntityVoid","x":208,"y":160,"settings":{"size":{"x":16,"y":32},"name":"door8","spawnEntity":"EntityZombieA"}},{"type":"EntityChair","x":180,"y":153},{"type":"EntityCrate","x":52,"y":54},{"type":"EntityPlayer","x":20,"y":178,"settings":{"name":"player"}},{"type":"EntityVoid","x":0,"y":-16,"settings":{"name":"settings","defaultInstructions":"Welcome To Deviney Hall"}},{"type":"EntityCrate","x":196,"y":54,"settings":{"spriteOffset":1}},{"type":"EntityTrash","x":100,"y":86,"settings":{"spriteOffset":1}},{"type":"EntityOutofbounds","x":0,"y":252,"settings":{"size":{"x":256,"y":16}}},{"type":"EntityVoid","x":32,"y":160,"settings":{"size":{"x":16,"y":32},"name":"door7","spawnEntity":"EntityZombieA"}},{"type":"EntityZombieC","x":226,"y":115},{"type":"EntityVoid","x":80,"y":128,"settings":{"size":{"x":16,"y":32},"name":"door5","spawnEntity":"EntityZombieA"}},{"type":"EntityTrash","x":196,"y":182},{"type":"EntityVoid","x":112,"y":168,"settings":{"size":{"x":32,"y":48},"floor":1,"name":"floor1"}},{"type":"EntityDesk","x":84,"y":200},{"type":"EntityVoid","x":80,"y":64,"settings":{"size":{"x":16,"y":32},"name":"door1","spawnEntity":"EntityZombieA"}},{"type":"EntityVoid","x":112,"y":120,"settings":{"size":{"x":32,"y":48},"name":"floor2"}},{"type":"EntityVoid","x":208,"y":96,"settings":{"size":{"x":16,"y":32},"name":"door4","spawnEntity":"EntityZombieA"}},{"type":"EntityVoid","x":112,"y":56,"settings":{"size":{"x":32,"y":48},"name":"floor3"}},{"type":"EntityVoid","x":32,"y":96,"settings":{"size":{"x":16,"y":32},"name":"door3","spawnEntity":"EntityZombieA"}},{"type":"EntityVoid","x":160,"y":128,"settings":{"size":{"x":16,"y":32},"name":"door6","spawnEntity":"EntityZombieA"}},{"type":"EntitySpawner","x":120,"y":-28,"settings":{"name":"weapons","target":{"1":"door1","2":"door2","3":"door3","4":"door4","5":"door5","6":"door6","7":"door7","8":"door8"},"spawnEntity":"EntityDoor","maxPool":1,"delay":2}},{"type":"EntityPowerupSpawner","x":120,"y":-4,"settings":{"name":"zombies","size":{"x":16,"y":12},"spawnEntity":"EntityZombieA","delay":3,"maxPool":40}}],"layer":[{"name":"main","width":16,"height":14,"linkWithCollision":false,"visible":1,"tilesetName":"images/games/resident-raver/dorm-tiles-red.png","repeat":false,"preRender":true,"distance":"1","tilesize":16,"foreground":false,"data":[[27,27,27,27,27,27,27,5,5,27,27,27,27,27,27,27],[27,5,5,5,15,17,17,17,17,17,17,18,5,5,5,27],[27,7,5,5,25,2,2,2,2,2,2,26,7,5,5,27],[27,15,17,18,5,5,5,9,10,5,5,5,15,17,18,27],[27,23,2,24,7,6,7,9,10,7,6,5,23,2,26,27],[27,5,5,5,15,16,18,9,10,15,16,18,5,5,5,27],[27,7,6,7,21,2,2,9,10,23,2,14,7,6,5,27],[27,15,16,18,5,5,5,9,10,5,5,5,15,16,18,27],[27,25,2,22,7,6,7,9,10,5,6,7,23,2,24,27],[27,5,5,5,15,16,18,9,10,8,16,18,5,5,5,27],[27,7,6,7,25,2,26,9,10,23,2,24,5,6,5,27],[27,15,16,18,5,5,5,9,10,5,5,5,15,16,18,27],[27,23,2,24,15,17,18,9,10,15,17,18,21,2,24,27],[27,34,34,34,2,2,2,9,10,2,2,2,34,34,34,27]]},{"name":"details","width":16,"height":14,"linkWithCollision":false,"visible":1,"tilesetName":"images/games/resident-raver/dorm-tiles-details.png","repeat":false,"preRender":true,"distance":"1","tilesize":16,"foreground":false,"data":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,24,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,14,0,22,0,0,7,0,0,9,0,0,0,0,0,0],[0,0,0,0,1,0,17,0,0,19,0,20,0,0,0,0],[0,0,25,0,11,0,27,0,0,8,0,0,0,0,0,0],[0,3,0,4,0,0,0,0,0,0,0,0,1,0,0,0],[0,13,0,14,19,20,40,0,0,18,0,0,11,0,0,0],[0,0,0,0,26,0,2,0,0,1,0,0,0,0,0,0],[0,0,0,0,13,0,27,0,0,11,0,0,0,0,0,0],[0,1,0,0,0,0,0,0,0,0,0,0,5,0,6,0],[0,11,0,0,0,30,27,0,0,8,0,0,15,0,16,0],[0,0,0,0,20,40,37,0,0,28,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},{"name":"collision","width":16,"height":14,"linkWithCollision":false,"visible":0,"tilesetName":"","repeat":false,"preRender":false,"distance":1,"tilesize":16,"foreground":false,"data":[[1,1,1,1,1,1,1,23,23,1,1,1,1,1,1,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,1,1,1,1,1,1,1,1,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,1,1,1,0,0,1,1,1,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,1,1,1,0,0,1,1,1,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1],[1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1]]}]}/*]JSON*/;
LevelDevineyResources=[new ig.Image('images/games/resident-raver/dorm-tiles-red.png'), new ig.Image('images/games/resident-raver/dorm-tiles-details.png')];
});