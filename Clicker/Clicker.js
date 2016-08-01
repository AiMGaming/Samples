//Location for the clicker's image.
var clickerImg = "/Sys/Img/Droid1.png";

//All sounds were obtained from http://soundbible.com, a royalty free sound effects site.
//Pop sound when clicking the image
pop = app.CreateMediaPlayer();
pop.SetFile("Snd/pop.mp3");

//Open and closing sounds
open = app.CreateMediaPlayer();
open.SetFile("Snd/open.mp3");
close = app.CreateMediaPlayer();
close.SetFile("Snd/close.mp3");

//Cha-chind sound
chaching = app.CreateMediaPlayer();
chaching.SetFile("Snd/cha-ching.mp3");

//Location for saving and loading the data.
var directory = "/sdcard/Clicker";

//Variables for money and income.
var currency = "£"; 
    //The currency used throughout the game
var money = 0;
    //Starting money
var income = 0;
    //Starting income (money gained per 'incomeTimer' seconds
var incomeTimer = 5;
    //In seconds!
var normalMultiplier = 1;
    //Starting tap multiplier (how much money gained per tap)

//Variables for upgrades.
    //Starting list of the owned upgrades
var ownedUpgrades = [];
    //Upgrade names MUST BE THE SAME LENGTH AS 'descriptionUpgrades'
var allUpgrades = ["Light Prod", "Double Touch", "Magic Touch", "Golden Touch", "Hulk Fist"];
    //Descriptions of all of the upgrades MUST BE THE SAME LENGTH AS 'allUpgrades'
var descriptionUpgrades = ["A light prod, pathetic.", "Double time! More like it.", "This is some wizard stuff...", "You really have the golden touch.", "Hulk... SMASH!"];
    //Prices for the upgrades
var priceUpgrades = [50, 200, 1500, 3000, 10000];   
    //How much money per tap it will give the player
var multiplierUpgrades = [2, 5, 8, 15, 50];
    //Boolean for the opening and closing of the menu.
var upgradesOpen = false;

//Variables for companies.
    //A list for the amount of companies that the player owns.
var quantityCompanies = [0, 0, 0, 0, 0, 0];
    //Company names MUST BE THE SAME LENGTH AS 'descriptionCompanies'
var allCompanies = ["Diggin' for Dirt", "Shed Co.", "Homes Ltd.", "Small Lot Inc.", "Floormart", "DroidScript Hotel"];
    //Company descriptions MUST BE THE SAME LENGTH AS 'allCompanies'
var descriptionCompanies = ["A small dirt digging company founded in a back yard.", "Sells sheds. Nothing more.", "Nice family homes for affordable prices!", "A small lot rental company, a big company for such small space.", "This company is 'FLAWLESS', get it?", "Owned by the legendary Dave Smart, all hail the lord."];
    //The starting prices for the companies
var priceCompanies = [100, 1000, 2500, 5000, 15000, 50000];
    //The income which the companies will give the player per purchase
var incomeCompanies = [5, 10, 20, 50, 150, 500];
    //Boolean for the opening and closing of the menu.
var companiesOpen = false;

//Copies the variables from above for data resetting
var defaultmoney = money;
var defaultincome = income;
var defaultnormalMultiplier = normalMultiplier;
var defaultownedUpgrades = ownedUpgrades;
var defaultquantityCompanies = quantityCompanies;
var defaultpriceCompanies = priceCompanies;

var backcount = 0;

//Called when application is started.
function OnStart()
{
    //Force portrait mode and disable normal back key function.
    app.SetOrientation( "Portrait" );
    app.EnableBackKey( false );

    //Create a universal layout.
    lay = app.CreateLayout( "Linear", "VCenter,FillXY" );
    
    //Create a layout for the money display.
    moneyLay = app.CreateLayout( "Linear", "VCenter,FillX" );
    moneyLay.SetSize( 1, 0.1 );
    moneyLay.SetBackColor( "#FF90C695" );
    
    //Create text for the amount of money.
    moneyDisplay = app.CreateText( "<b>" + currency + money + "</b>", 1, -1, "html" );
    moneyDisplay.SetTextSize( 22 );
    moneyDisplay.SetTextColor( "#F5D76E" );
    moneyDisplay.SetOnTouchDown( tapMoney );
    moneyLay.AddChild( moneyDisplay );
    
    //Create a layout for the clicker of the game.
    clickerLay = app.CreateLayout( "Linear", "VCenter,FillX" );
    clickerLay.SetSize( 1, 0.8 );

    //Create an image for the clicker and add it to the layout.
    clicker = app.CreateImage( clickerImg, 0.5 );
    clicker.SetOnTouchDown( tapClicker );
    clickerLay.AddChild( clicker );
    
    //Create a layout for the bottom menu.
    menuLay = app.CreateLayout( "Linear", "Horizontal,VCenter,FillX" );
    menuLay.SetSize( 1, 0.1 );
    
    //Create buttons for the menus.
    upgradesButton = app.CreateButton( "Upgrades", 0.5, 0.1 );
    upgradesButton.SetBackColor( "#E74C3C" );
    upgradesButton.SetOnTouch( openUpgrades );
    menuLay.AddChild( upgradesButton );
    companiesButton = app.CreateButton( "Companies", 0.5, 0.1 );
    companiesButton.SetBackColor( "#5C97BF" );
    companiesButton.SetOnTouch( openCompanies );
    menuLay.AddChild( companiesButton );
    
    //Upgrades menu layout and objects.
    upgradesLay = app.CreateLayout( "Linear", "FillXY" );
    upgradesLay.SetBackColor( "#D04436" );
    upgradesLay.SetVisibility( "Hide" );
    upgradesHeader = app.CreateLayout( "Linear", "Horizontal,VCenter,FillX" );
    upgradesHeader.SetBackColor( "#C0392B" );
    upgradesHeader.SetSize( 1, 0.1 );
    upgradesLay.AddChild( upgradesHeader );
    upgradesTitle = app.CreateText( "Upgrades", 1, -1 );
    upgradesTitle.SetOnTouchUp( closeUpgrades );
    upgradesTitle.SetTextSize( 26 );
    upgradesTitle.SetTextColor( "#FEFEFE" );
    upgradesHeader.AddChild( upgradesTitle );
    upgradesScroller = app.CreateScroller( 1, 0.9 );
    upgradesLay.AddChild( upgradesScroller );
    
    upgradesList = app.CreateLayout( "Linear", "FillX" );
    upgradesList.SetSize( 1, 0.9 );
    upgradesScroller.AddChild( upgradesList );
    
    //Adds the upgrades and their details into the layer automatically.
    for( i = 0; i < allUpgrades.length; i++ )
    {
        currentButton = app.CreateButton( allUpgrades[i], 1, 0.2 );
        currentButton.SetBackColor( "#E74C3C" );
        currentButton.SetTextSize( 22 );
        currentButton.SetMargins( 0, 0, 0, 0.005 );
        currentButton.SetOnTouch( showUpgradeDescription );
        upgradesList.AddChild( currentButton );
    }
    
    //Companies menu layout and objects.
    companiesLay = app.CreateLayout( "Linear", "FillXY" );
    companiesLay.SetBackColor( "#5388AC" );
    companiesLay.SetVisibility( "Hide" );
    companiesHeader = app.CreateLayout( "Linear", "Horizontal,VCenter,FillX" );
    companiesHeader.SetBackColor( "#1E8BC3" );
    companiesHeader.SetSize( 1, 0.1 );
    companiesLay.AddChild( companiesHeader );
    companiesTitle = app.CreateText( "Companies", 1, -1 );
    companiesTitle.SetOnTouchUp( closeCompanies );
    companiesTitle.SetTextSize( 26 );
    companiesTitle.SetTextColor( "#FEFEFE" );
    companiesHeader.AddChild( companiesTitle );
    companiesScroller = app.CreateScroller( 1, 0.9 );
    companiesLay.AddChild( companiesScroller );
    
    companiesList = app.CreateLayout( "Linear", "FillX" );
    companiesList.SetSize( 1, 0.9 );
    companiesScroller.AddChild( companiesList );
    
    //Adds the upgrades and their details into the layer automatically.
    for( i = 0; i < allCompanies.length; i++ )
    {
        currentButton = app.CreateButton( allCompanies[i], 1, 0.2 );
        currentButton.SetBackColor( "#5C97BF" );
        currentButton.SetTextSize( 22 );
        currentButton.SetMargins( 0, 0, 0, 0.005 );
        currentButton.SetOnTouch( showCompanyDescription );
        companiesList.AddChild( currentButton );
    }
    
    //Add layouts to app.
    lay.AddChild( moneyLay );
    lay.AddChild( clickerLay );
    lay.AddChild( menuLay );
    app.AddLayout( lay );
    app.AddLayout( upgradesLay );
    app.AddLayout( companiesLay );
    
    load();
    
    //Gives the player their income every 'incomeTimer' amount of seconds
    startIncome = setInterval( incomeGive, 1000*incomeTimer );
}

function OnBack(){
    if( upgradesOpen == true)
    {
        closeUpgrades();
    }
    else if( companiesOpen == true )
    {
        closeCompanies();
    }
    else
    {
        timer = 1
        counter = setInterval( Timer, 1000/1 );
        backcount++;
        if( backcount >= 2 )
        {
            app.Exit();
        }
        else
        {
            app.ShowPopup( "Press back again to exit", "Bottom" );
        }
    }
}

function load ()
{
    //If the save file exists, load it, otherwise use the starting variables
    if( app.FileExists( directory + "/data.txt" ))
    {
        loadedSave = app.ReadFile( directory + "/data.txt" );
        parsedSave = loadedSave.split(/\r\n|\n/);
        money = parseInt(parsedSave[0]);
        income = parseInt(parsedSave[1]);
        ownedUpgrades = parsedSave[2].split(",").map(String);
        quantityCompanies = parsedSave[3].split(",").map(Number);
        priceCompanies = parsedSave[4].split(",").map(Number);
        //for( i = 0; i < allUpgrades.length; i++ )
        //{
            
        //}
        //if( ownedUpgrades[ownedUpgrades.length-1] != allUpgrades[0] )
        //if( allUpgrades.indexOf( ownedUpgrades[ownedUpgrades.length-1] == -1 ) )
        if( ownedUpgrades[1] != allUpgrades[0] )
        {
            normalMultiplier = defaultnormalMultiplier;
        }
        else
        {
            normalMultiplier = multiplierUpgrades[ownedUpgrades.length-2];
        }
        updateMoney();
    }
}

function save ()
{
    //Makes the directory in case it hasn't already
    app.MakeFolder( directory );
    //Saves the file
    app.WriteFile( directory + "/data.txt", money + "\n" + income + "\n" + ownedUpgrades + "\n" + quantityCompanies + "\n" + priceCompanies );
}

function tapClicker ()
{
    //Gives the player money for clicking the Android
    money += normalMultiplier;
    //Calls the function to visually update the player's money
    updateMoney();
    pop.Stop();
    pop.Play();
}

function incomeGive ()
{
    //Gives the player their income from their companies
    money += income;
    //Calls the function to visually update the player's money
    updateMoney();
}

function updateMoney ()
{
    //Sets the money, at the top of the game, to the correct amount
    moneyDisplay.SetHtml( "<b>" + currency + money + "</b>" );
    //Saves the data
    save();
}

function openUpgrades ()
{
    //Plays sound
    open.Stop();
    open.Play();
    upgradesOpen = true;
    //Pulls the upgrades section up from the bottom
    upgradesLay.Animate( "SlideFromBottom" );
}

function closeUpgrades ()
{
    //Plays sound
    close.Stop();
    close.Play();
    //Pushes the upgrades section down to the bottom
    upgradesLay.Animate( "SlideToBottom" );
    upgradesOpen = false;
}

function ownsUpgrade ( upgrade )
{
    //If the upgrade is in the owned and all upgrades lists... (way around array.includes(obj))
    if( ownedUpgrades[allUpgrades.indexOf(upgrade)] == allUpgrades[allUpgrades.indexOf(upgrade)] )
    {
        //Alerts the user that they own the upgrade
        app.ShowPopup("You already own this upgrade!");
        return false;
    }
    else
    {
        return true;
    }
}

function showUpgradeDescription ()
{
    //Gets the information about the selected upgrade
    lastButton = app.GetLastButton();
    upgradeName = lastButton.GetText();
    upgradeDescription = descriptionUpgrades[allUpgrades.indexOf( upgradeName )];
    upgradePrice = priceUpgrades[allUpgrades.indexOf( upgradeName )];
    upgradeMultiplier = multiplierUpgrades[allUpgrades.indexOf( upgradeName )];
    
    //Checks whether the user already has already bought this upgrade
    if( ownsUpgrade( upgradeName ) )
    {
        //Creates a nice-looking popup
        popup = app.CreateDialog( "", "NoTitle" );
        popupLay = app.CreateLayout( "Linear", "VCenter" );
        popupLay.SetSize( 0.9, -1 );
        popup.AddLayout( popupLay );
        popupTitle = app.CreateLayout( "Linear", "VCenter" );
        popupTitle.SetBackColor( "#C0392B" );
        popupTitle.SetSize( 0.9, 0.1 );
        popupName = app.CreateText( upgradeName +  " - " + currency + upgradePrice, 0.9, -1 )
        popupName.SetTextSize( 24 );
        popupName.SetTextColor( "#FEFEFE" );
        popupTitle.AddChild( popupName );
        popupLay.AddChild( popupTitle );
        popupDescription = app.CreateText( upgradeDescription + "\n" + currency + upgradeMultiplier + " per click!", 1, -1, "Multiline" );
        popupDescription.SetTextColor( "#EEEEEE" );
        popupDescription.SetBackColor( "#E74C3C" );
        popupDescription.SetTextSize( 20 );
        popupDescription.SetPadding( 0.01, 0.01, 0.01, 0.01 );
        popupLay.AddChild( popupDescription );
        popupBuy = app.CreateButton( "Buy", 1, 0.1 );
        popupBuy.SetTextSize( 22 );
        popupBuy.SetBackColor( "#C0392B" );
        popupBuy.SetOnTouch( buyUpgrade );
        popupLay.AddChild( popupBuy );
        popup.Show();
    }
}

function buyUpgrade()
{
    //If the user has purchased the previous upgrade, allow them to buy it.
    if( ownedUpgrades[ownedUpgrades.length - 1] == allUpgrades[allUpgrades.indexOf(upgradeName)-1] || ownedUpgrades[ownedUpgrades.length - 1] == "" && upgradeName == allUpgrades[0] )
    {
        if( money >= upgradePrice )
        {
            ownedUpgrades[ownedUpgrades.length] = upgradeName;
            money -= upgradePrice;
            updateMoney();
            popup.Hide();
            normalMultiplier = upgradeMultiplier;
            app.ShowPopup( "Upgrade purchased successfully!" );
            chaching.Stop();
            chaching.Play();
        }
        else
        {
            popup.Hide();
            app.ShowPopup( "Insufficient funds" );
        }
    }
    else if ( ownedUpgrades.indexOf(upgradeName) != -1)
    {
        popup.Hide();
    	    app.ShowPopup( "You already own this upgrade!" );
    }
    else
    {
        popup.Hide();
        app.ShowPopup( "You need to buy the previous upgrade!" );
    }
}

function openCompanies ()
{
    //Plays sound
    open.Stop();
    open.Play();
    companiesOpen = true;
    //Pull the companies menu from the bottom
    companiesLay.Animate( "SlideFromBottom" );
}

function closeCompanies ()
{
    //Plays sound
    close.Stop();
    close.Play();
    //Push the companies menu to the bottom
    companiesLay.Animate( "SlideToBottom" );
    companiesOpen = false;
}

function showCompanyDescription ()
{
    //Gets information about the selected company
    lastButton = app.GetLastButton();
    companyName = lastButton.GetText();
    companyDescription = descriptionCompanies[allCompanies.indexOf( companyName )];
    companyPrice = priceCompanies[allCompanies.indexOf( companyName )];
    companyIncome = incomeCompanies[allCompanies.indexOf( companyName )];
    companyQuantity = quantityCompanies[allCompanies.indexOf( companyName )];
    
    //Creates a nice-looking popup for it
    popup = app.CreateDialog( "", "NoTitle" );
    popupLay = app.CreateLayout( "Linear", "VCenter" );
    popupLay.SetSize( 0.9, -1 );
    popup.AddLayout( popupLay );
    popupTitle = app.CreateLayout( "Linear", "VCenter" );
    popupTitle.SetBackColor( "#1E8BC3" );
    popupTitle.SetSize( 0.9, 0.1 );
    popupName = app.CreateText( companyName +  " - " + currency + companyPrice, 0.9, -1 )
    popupName.SetTextSize( 24 );
    popupName.SetTextColor( "#FEFEFE" );
    popupTitle.AddChild( popupName );
    popupLay.AddChild( popupTitle );
    popupDescription = app.CreateText( companyDescription + "\n" + currency + companyIncome + " per " + incomeTimer + " seconds!" + "\nYou currently have " + companyQuantity + ".", 1, -1, "Multiline" );
    popupDescription.SetTextColor( "#EEEEEE" );
    popupDescription.SetBackColor( "#5C97BF" );
    popupDescription.SetTextSize( 20 );
    popupDescription.SetPadding( 0.01, 0.01, 0.01, 0.01 );
    popupLay.AddChild( popupDescription );
    popupBuy = app.CreateButton( "Buy", 1, 0.1 );
    popupBuy.SetTextSize( 22 );
    popupBuy.SetBackColor( "#1E8BC3" );
    popupBuy.SetOnTouch( buyCompany );
    popupLay.AddChild( popupBuy );
    popup.Show();
}

function buyCompany ()
{
    //If the player has enough money...
    if( money >= companyPrice )
    {
        //Increase the amount of the company they own by 1
        quantityCompanies[allCompanies.indexOf(companyName)] += 1;
        //Take the money from the player
        money -= companyPrice;
        //Increase the company price by 1.5x
        priceCompanies[allCompanies.indexOf(companyName)] = Math.round(priceCompanies[allCompanies.indexOf(companyName)] * 1.5);
        //Visually updates the player's money
        updateMoney();
        popup.Hide();
        income += companyIncome;
        app.ShowPopup( "Company purchased successfully!" );
        chaching.Stop();
        chaching.Play();
    }
    else
    {
        popup.Hide();
        app.ShowPopup( "Insufficient funds" );
    }
}

tapcount = 0;
function tapMoney()
{
    timer = 1
    counter = setInterval( Timer, 1000*1 );
    tapcount++;
    if( tapcount >= 2 )
    {
        resetData();
    }
    else
    {
        app.ShowPopup( "Tap the money again to reset data...", "Bottom" );
    }
}


function Timer()
{
    if( timer == 0 )
    {
        clearInterval( counter );
        clearInterval(  );
        tapcount = 0;
        backcount = 0;
        return;
    }
    timer--; 
}

function resetData()
{
    money = defaultmoney;
    income = defaultincome;
    normalMultiplier = defaultnormalMultiplier;
    ownedUpgrades = defaultownedUpgrades;
    quantityCompanies = defaultquantityCompanies;
    priceCompanies = defaultpriceCompanies;
    app.DeleteFile( directory + "/data.txt" );
    save();
    load();
    app.ShowPopup( "Your data has been reset!", "Bottom" );
    updateMoney();
}