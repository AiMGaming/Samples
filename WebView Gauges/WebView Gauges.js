
//Called when application is started.
function OnStart()
{
	//Create a layout with objects vertically centered.
	lay = app.CreateLayout( "linear", "VCenter,FillXY" );	

	//Create a web control to show gauge.
	web = app.CreateWebView( 0.8, 0.4 );
	lay.AddChild( web );
	
	//Create seek bar and add to layout.
	skb = app.CreateSeekBar( 0.6, -1, "" );
	skb.SetMargins( 0,0.1,0,0 );
	skb.SetOnTouch( skb_OnTouch );
	lay.AddChild( skb )

	//Create spinner control to select gauge style.
	var styles = "Speed,Temperature,Delay,Count";
	spinStyle = app.CreateSpinner( styles, 0.5, -1 );
	spinStyle.SetMargins( 0, 0.1, 0, 0 );
	spinStyle.SetOnTouch( spinStyle_OnTouch );
	lay.AddChild( spinStyle );
	
	//Add layout to app.	
	app.AddLayout( lay );
	
	//Load web page.
	web.LoadUrl( "Speed.html" );
}

//Called when user touches seek bar.
function skb_OnTouch( value )
{
	if( spinStyle.GetText()=="Speed" ) 
		web.Execute( "gauge.setValue(" + (220*value/100) + ")" );
		
	else if( spinStyle.GetText()=="Temperature" ) 
		web.Execute( "gauge.setValue(" + (value-50) + ")" );
		
	else if( spinStyle.GetText()=="Delay" ) 
		web.Execute( "gauge.setValue(" + (value*10) + ")" );
	else 
		web.Execute( "gauge.setValue(" + (value) + ")" );
}

//Called shen user touches style spinner.
function spinStyle_OnTouch( item )
{
	web.LoadUrl( item + ".html" );
}

