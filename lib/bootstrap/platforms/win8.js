/**
 *  @win8.js
 *  @version: 1.00
 *  @author: Jesse Freeman
 *  @date: May 2012
 *  @copyright (c) 2012 Jesse Freeman, under The MIT License (see LICENSE)
 *
 */

ig.module(
    'bootstrap.platforms.win8'
)
    .requires(
    'impact.input',
    'impact.game'
)

    .defines(function ()
    {

        //TODO need to set up logic for resizing the game correctly for win8, showing touch controls and winjs specific logic
        var sizes = {
            small: { width: 240, height: 160, scale: 2 },
            medium: { width: 240, height: 160, scale: 2 },
            large: { width: 240, height: 160, scale: 4 },
            default: { width: 240, height: 155, scale: 5 }
        };

        ig.gameSize = sizes.default;

        var app = WinJS.Application;
        var activation = Windows.ApplicationModel.Activation;

        app.onactivated = function (args) {
            if (args.detail.kind === activation.ActivationKind.launch) {
                if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                    // TODO: This application has been newly launched. Initialize
                    // your application here.
                    ig.startNewGame();
                } else {
                    // TODO: This application has been reactivated from suspension.
                    // Restore application state here.
                }
                args.setPromise(WinJS.UI.processAll());
            }
        };

        ig.Input.inject({
            bindTouch: function (selector, action) {
                var element = ig.$(selector);

                var that = this;
                element.addEventListener('MSPointerDown', function (ev) {
                    that.touchStart(ev, action);
                }, false);

                element.addEventListener('MSPointerUp', function (ev) {
                    that.touchEnd(ev, action);
                }, false);
            },
        })

        WinJS.Application.onsettings = function (e) {
            console.log("open settings", e);
            ig.game.togglePause(true);
            //Example adding help to the win8 charms
            //          e.detail.applicationcommands = { "help": { title: "Help", href: "/html/help.html" } };
            //          WinJS.UI.SettingsFlyout.populateSettings(e);
        };

    });
