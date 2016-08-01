
//Global variables.
var autoRotate = true;

//List of molecules.
var molecules = 
[
	"Ethanol", "Aspirin", "Caffeine", "Nicotine", "LSD",  		
	"Cocaine", "Cholesterol", "Lycopene", "Glucose",
	"Cubane", "Fluorite", "Buckyball" 
]

//Called when application is started. 
function OnStart() 
{ 
    //Lock screen orientation to Portrait.
	app.SetOrientation( "Portrait" );
	
	//Create a layout with objects vertically centered. 
	lay = app.CreateLayout( "linear", "VCenter,FillXY" );
	lay.SetBackColor( "#222222" );

	//Create a web control. 
	web = app.CreateWebView( 0.95, 0.8 ); 
	web.SetBackColor( "#000000" );
	web.SetOnProgress( web_OnProgess );
	lay.AddChild( web ); 
	 
	//Create horizontal sub-layout for buttons. 
	layHoriz = app.CreateLayout( "linear", "Horizontal" );	 
	 
	//Create spinner.
    spin = app.CreateSpinner( molecules, 0.7 );
    spin.SetOnChange( LoadMolecule );
    spin.SelectItem( "Caffeine" );
    layHoriz.AddChild( spin );
	 
    btn = app.CreateButton( "[fa-pause]", 0.1,-1, "FontAwesome" );
    btn.SetOnTouch( ToggleRotate );
    layHoriz.AddChild( btn );
  
	//Add horizontal layout to main layout. 
	lay.AddChild( layHoriz ); 
	 
	//Add layout to app.	 
	app.AddLayout( lay ); 
	
	//Load main page.
	web.LoadUrl( "Main.html" ); 
} 

//Monitor page load progress.
function web_OnProgess( progress )
{
	if( progress==100 ) 
	    LoadMolecule( "caffeine" );
}

//Load a molecule.
function LoadMolecule( item ) 
{ 
    web.Execute( "loadMolecule( \"Misc/" + item.toLowerCase() + ".pdb\" );" );
    app.TextToSpeech( item );
} 

//Toggle auto-rotation.
function ToggleRotate()
{
    autoRotate = !autoRotate;
    web.Execute( "rotate(" + autoRotate + ")" );
    btn.SetText( autoRotate ? "[fa-pause]" : "[fa-play]" ); 
}


