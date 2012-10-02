/**
 *
 * TODO need to explain how this works here
 *
 */

ig.module(
    'game.main'
)
    .requires(
    'plugins.impact-splash-loader.impact-splash-loader',
    'game.resident-raver.resident-raver',
    /*'game.jetroid.jetroid',*/
    'bootstrap.platforms.win8'
   /*,'impact.debug.debug'*/
)

.defines(function () {

    // This is to help with debugging. Simply set killAllSounds to true in the config when testing locally
    if (ig.config.system.killAllSounds)
        ig.Sound.enabled = false;
    
    //TODO maybe I need to detect the display mode here?
    var scale = 5;
    var maxWidth = (window.innerWidth > 1366) ? 1366 : window.innerWidth;
    var maxHeight = (window.innerHeight > 786) ? 786 : window.innerHeight;
    var width = Math.floor(maxWidth / scale) - 1;
    var height = Math.floor(maxHeight / scale) - 1;

    ig.startNewGame = function () { ig.main('#canvas', StartScreen, 60, width, height, scale, ig.ImpactSplashLoader); };

});
