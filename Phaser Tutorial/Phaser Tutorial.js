/* 
   This sample will get you started with the official online Phaser tutorial
   found here:-  http://phaser.io/tutorials/making-your-first-phaser-game/index
     
   You can skip the 'Requirements' section and jump straight to Part2 of the 
   tutorial because we've got everything setup for you and we're ready to rock!
   
   Note: Check out our downloadable Phaser demo to find out how to use the 
   orientation sensor instead of the keyboard to move your character around.
*/

//Called when application is started.
function OnStart()
{
    //Lock screen orientation to Landscape.
    app.SetOrientation( "Landscape" ); 
    
    //Set full screen game mode.
    app.SetScreenMode( "Game" );
    
	//Create a layout with objects vertically centered.
	lay = app.CreateLayout( "linear", "Horizontal,VCenter,FillXY" );

	//Create a web control.
	web = app.CreateWebView( 1,1, "NoScrollbar" );
	web.SetBackColor( "black" );
	lay.AddChild( web );
	
	//Add layout to app.	
	app.AddLayout( lay );
	
	//Switch off debugging for max performance.
	//(console.log call will still work)
    app.SetDebugEnabled( false );
    
    //Load Phaser tutorial.
    web.LoadUrl( "Game.html" );
}

