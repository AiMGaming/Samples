renk1= ( "#45622FBE" );
renk2= ( "#02622FBE" );
renk3= ( "#232C31" );
renk4= ( "#25fffff" );
renk5= ( "#622FBE" );
renk6= ( "#6658CF" );
renk7= ( "#256658CF" );


space = app.GetFreeSpace( "internal" );
timer = setInterval( Draw, 1000/30 );
model = app.GetModel();
country=app.GetCountry()

app.SetScreenMode( "Full");
app.PreventScreenLock(!0)
app.SetOrientation( "Portait" );

function OnStart() 
{

    //Lock screen orientation to Portrait.
    app.SetOrientation( "Portrait" );
   
    lay = app.CreateLayout( "Absolute" ,"VCenter, FillXY");
 
    cam1 = app.CreateCameraView( 1, 1,"front");
    cam = app.CreateCameraView( 1 ,1 );

    cam.SetPictureSize( 1024, 768 );
    cam.SetPosition( 0, 0.06);
    cam.SetOnReady( cam_OnReady );
    cam.GetColorEffects("");
    cam.SetFocusMode( "macro" );
    lay.AddChild(cam);


    laycanvas = app.CreateLayout( "Linear", "Hrizontal,FillX" );
    canvas = app.CreateImage( null, 1, 0.25);
    canvas.SetBackColor( "#25ff0000" ); 
    canvas.SetPosition( 0, 0.060);
    canvas.SetAutoUpdate( false );
    lay.AddChild( canvas );
    
    
 
    app.SetMenu(" Light Off 1m, Light Off 3m, Light Off 5m ");
    
    Açık = app.CreateImage( "Img/112.png",0.20);
    Kapalı = app.CreateImage( "Img/111.png",0.20);
    
    
    
    banner=app.CreateLayout("Linear","FillXY")
    banner.SetSize(1,.06)
    banner.SetBackColor( renk6);
    lay.AddChild(banner);
   
    txt = app.CreateText( "FlashLight ", 0.8, 0.2, "FontAwesome" );
    txt.SetTextColor("#ffffff");
    txt.SetMargins( 0, 0.02, 0,0 );
    txt.SetTextSize( 19 );
    banner.AddChild( txt )
    
    
    btnTog = app.CreateImage( "Img/111.png" ,0.25,"Vcenter");
    btnTog.SetMargins( 0, 0.48, 0, 0 )
    btnTog.SetPosition( 0.38, 0.65);
    btnTog.Toggle = false;
    btnTog.SetOnTouchDown(btnToggle);
    lay.AddChild( btnTog );
    




    imgbtn = app.CreateImage( "Img/info.png", 0.31); 
    imgbtn.SetBackGradient( renk6,renk2)
    imgbtn.SetPosition( 0.35, 0.32);
    imgbtn.SetMargins( 0, 0, 0.003, 0 );
    imgbtn.SetOnTouchDown(Bilgi);
    lay.AddChild( imgbtn );




    imgbtn = app.CreateImage( "Img/time.png", 0.31); 
    imgbtn.SetBackGradient( renk6,renk2)
    imgbtn.SetPosition( 0.67, 0.32);
    imgbtn.SetMargins( 0, 0, 0.003, 0 );
    imgbtn.SetOnTouchDown(menu);
    lay.AddChild( imgbtn );



    muteImg = app.CreateImage( "Img/soff.png",0.31); 
    muteImg .SetMargins( 0, 0.05 ,0, 0 );
    unmuteImg = app.CreateImage( "Img/son.png",0.31);
    unmuteImg .SetMargins( 0, 0.05, 0, 0 );
    btn = app.CreateImage( "Img/son.png" ,0.31);
    btn.SetBackGradient( renk6,renk2)
    btn.SetPosition( 0.03, 0.32);
    btn.SetMargins( 0, 0, 0.003, 0 );
    btn.Toggle = false;
    btn.SetOnTouchDown(btnToggle2);
    lay.AddChild( btn );



    bilgi = app.CreateButton("SeloSoft™",1, 0.01,"FillX");
    bilgi.SetBackGradient( renk6,renk2)
    bilgi.SetPosition( 0, 0.93);
    bilgi.SetOnTouch(moreapp);
    bilgi.SetTextSize( 16 );
    bilgi.SetMargins( 0, 0.02, 0, 0 );  
    bilgi.SetTextColor( "#ffffff" ); 
    bilgi.SetTextSize( 18 );
    lay.AddChild( bilgi );



    btn = app.CreateButton( "Snap");
    btn.SetPosition( 0, 0.93);
    btn.SetBackGradient( renk6,renk2)
    btn.SetOnTouch(foto);
    lay.AddChild( btn );

    player = app.CreateMediaPlayer();   
    player.SetFile( "Snd/on.mp3" );

    player1 = app.CreateMediaPlayer();   
    player1.SetFile( "Snd/off.mp3" );

    
    günlük()
    app.AddLayout( lay);



} 

//Called when camera is ready.
function cam_OnReady()
{    
    cam.StartPreview();
    cam.SetFlash( true );  
    btnTog.SetImage( Açık );
    btnTog.Toggle = true;
}


function btnToggle(ev)
{
   this.Toggle = ! this.Toggle;
   if(this.Toggle){
      this.SetImage(Açık);
      banner.Animate("SlideFromBottom");
     // cam.SetBackColor(renk3);   
    player.Play(); 
    app.ShowPopup("On","Bottom,Short"); 
     cam.SetFlash( true); 
   } else{
      this.SetImage(Kapalı);
      banner.Animate("SlideFromBottom");
     // cam.SetBackColor(renk2);
      player1.Play(); 
      cam.SetFlash(false ); 
      app.ShowPopup("Off","Bottom,Short"); 
   }

}




function menu( item)
{
   var seçim = "Light off after 1 minute.,Light off after 3 minute.,Light off after 5 minute.,Light off after 10 minute." 
    seç = app.CreateListDialog( "Set Auto OFF", seçim, "" );
    seç.SetOnTouch(OnMenu); 

}


function OnMenu( item)
{
    if( item=="Light off after 1 minute." )
    {
        Light1()
        app.ShowPopup("Will turn off after 1 minute.","Bottom,Short");
    }
    else if( item=="Light off after 3 minute." )
    {
       Light2()
       app.ShowPopup("Will turn off after 3 minute.","Bottom,Short");
    }
    else if( item=="Light off after 5 minute." ) 
    {
     Light3() 
     app.ShowPopup("Will turn off after 5 minute.","Bottom,Short");
    }
    else if( item=="Light off after 10 minute." )
    app.ShowPopup("Will turn off after 10 minute.","Bottom,Short");
    {
     Light4()   
    }
}




function Light1()
{
  cam.SetFlash( true); 
  btnTog.SetImage( Açık );
  btnTog.Toggle = true;
  setTimeout( " cam.SetFlash(false );", 60000);
  
 } 



function Light2()
{
  cam.SetFlash( true);
  btnTog.SetImage( Açık );
  btnTog.Toggle = true;
  setTimeout( " cam.SetFlash(false );", 180000);  
 
} 





function Light3()
{
  cam.SetFlash( true);
  btnTog.SetImage( Açık );
  btnTog.Toggle = true;
  setTimeout( " cam.SetFlash(false );", 300000);  
 
} 



function Light4()
{
  cam.SetFlash( true);
  btnTog.SetImage( Açık );
  btnTog.Toggle = true;
  setTimeout( " cam.SetFlash(false );", 600000);  
 
} 



function btnToggle2(ev){
   this.Toggle = ! this.Toggle;
   if(this.Toggle){
      this.SetImage(muteImg); 
       mute_OnTouch() 
      app.ShowPopup("Volume OFF");
   } else{
      this.SetImage(unmuteImg);
      unmute_OnTouch() 
      app.ShowPopup("Volume ON");
   }
}






 function  mute_OnTouch()  
{
   player.SetVolume(0,0); 
   player1.SetVolume(0,0);
   
}



 function  unmute_OnTouch(value)  
{
     
    player.SetVolume(1,0 ); 
    player1.SetVolume(1,0);
}



function Draw()
{

    canvas.Clear();
    Drawtime1(); 
    info()
    canvas.Update();
    
}


function Drawtime1()
{
    var d = new Date();
    var minute = d.getMinutes();
    var hr = d.getHours();
    var min = (("0" + minute).slice(-2));
    canvas.SetTextSize( 65 );
    canvas.SetLineWidth( 5 );
    canvas.DrawLine( 1, 0 );
    canvas.SetPaintColor( "#ffffff"  );
    canvas.DrawText(hr + ":" + min, 0.06, 0.61);
    canvas.DrawLine( 1, 1, 0, 1 );
}


function info()
{
    
    
    var zaman= new Date();
    var gun=zaman.getDate();
    var ay=zaman.getMonth();
     ay = ay + 1;
    var yil=zaman.getFullYear();
    
    canvas.SetTextSize( 17 );
    canvas.SetPaintColor( "#fffff0"  );
    canvas.DrawText(model, 0.10, 0.90);
    canvas.DrawText(gun + "/" + ay, 0.10, 0.80);
    canvas.DrawText(country, 0.62, 0.90);
    canvas.DrawLine( 1, 1, 0, 1 );
   
}


function günlük()
 {

 var d = new Date();
 var saat = d.getHours();
      
    
if(saat >6 && saat< 18) 
{

    g= app.CreateImage( "Img/gun.png", 0.25); 
    g.SetPosition( 0.65, 0.11);
    g.SetMargins( 0, 0, 0.003, 0 );
    lay.AddChild(g)

 } 

else
{ 
    g= app.CreateImage( "Img/ay.png", 0.20); 
    g.SetPosition( 0.65, 0.11);
    g.SetMargins( 0, 0, 0.003, 0 );
    lay.AddChild(g)
}
}



function foto()
{
  cam.TakePicture( "/sdcard/FlashFoto.jpg" );
  app.ShowPopup("Photo saved");
} 


function moreapp()
{
    app.OpenUrl("https://play.google.com/store/apps/developer?id=SeloSoft")
    }


function Bilgi()
{
    
    About = app.CreateDialog( "FlashL" );
    layAbout = app.CreateLayout( "linear", "vertical,fillxy" );
    resim = app.CreateImage( "Img/logo1.png",0.4);
    resim.SetMargins( 0, 0.01, 0,-0.1 );
    txt = app.CreateText( "Publisher by SeloSoft\nPowered by DroidScript", 0.8, 0.2, "Multiline" );
    txt.SetTextColor("#ffffff");
    txt.SetMargins( 0, 0.099, 0,-0.1 );
    txt.SetTextSize( 15 );
    layAbout.AddChild( resim )
    layAbout.AddChild( txt )
    About.AddLayout( layAbout );
    About.Show();
    
}












