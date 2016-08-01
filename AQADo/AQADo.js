//Player Related Variables
var name1 = "Player 1";
var name2 = "Player 2";
var player1counter1 = app.CreateImage( "Img/blackcounter.png", -1, 0.06 );
player1counter1.SetOnTouchDown( move11 );
var player1counter2 = app.CreateImage( "Img/blackcounter.png", -1, 0.06 );
player1counter2.SetOnTouchDown( move12 );
var player2counter1 = app.CreateImage( "Img/redcounter.png", -1, 0.06 );
player2counter1.SetOnTouchDown( move21 );
var player2counter2 = app.CreateImage( "Img/redcounter.png", -1, 0.06 );
player2counter2.SetOnTouchDown( move22 );

//Board Related Variables
var layBoardNumbersN = [];
var layBoardSpacesP1C1 = [];
var layBoardSpacesP1C2 = [];
var layBoardSpacesP2C1 = [];
var layBoardSpacesP2C2 = [];

//Dice Related Variables
var dice0 = "Img/dice.png";
var dice1 = "Img/dice1.png";
var dice2 = "Img/dice2.png";
var dice3 = "Img/dice3.png";
var dice4 = "Img/dice4.png";
var diceImg = [dice0, dice1, dice2, dice3, dice4];
var dice1pos = 1;
var dice2pos = 2;
var dice3pos = 3;
var dice4pos = -1;
var diceNumber = 0;
var hasRolled = false;
var moveValid = false;

//Miscellaneous Variables
var curTurn = "player1";
var currentPos;
var newPos;
var toCheck1 = [];
var toCheck2 = [];
var toCheck3 = [];

//Called when application is started.
function OnStart()
{   
    newGame();
    //Startup Options
    app.SetOrientation( "Portrait" );
    app.SetScreenMode( "Full" );
    
    sfx = app.CreateMediaPlayer();
    sfx.SetFile( "Snd/diceroll1.mp3" );
    
    //Game Layer
    layGame = app.CreateLayout( "Linear", "FillXY" );    
    layGame.SetBackColor( "#6C7A89" );
    layGame.SetPadding( 0, 0, 0, 0 ); 
    
    layTop = app.CreateLayout( "Linear", "FillX,Horizontal,Left" );
    layTop.SetSize( 1, -1 );
    layTop.SetPadding( 0.0025, 0.0025, 0.0025, 0.0025 );
    layGame.AddChild( layTop );
    dice = app.CreateImage( "Img/dice.png", -1, 0.075 );
    dice.SetMargins( 0, 0, 0.01, 0 );
    layTop.AddChild( dice );
    message = app.CreateText( "Roll the dice" );
    message.SetTextSize( 30 );
    message.SetTextColor( "#EEEEEE" );
    layTop.AddChild( message );
    
    layBoard = app.CreateLayout( "Linear", "FillX,Horizontal" );
    layBoard.SetSize( 1, 0.66 );
    layBoardNumbers = app.CreateLayout( "Linear" );
    layBoardNumbers.SetSize( 0.2, 1);
    layBoard.AddChild( layBoardNumbers );
    layBoardSpaces = app.CreateLayout( "Linear", "Horizontal" );
    layBoardSpaces.SetSize( 0.8, 1);
    layBoard.AddChild( layBoardSpaces );
    layBoardSpacesP11 = app.CreateLayout( "Linear" );
    layBoardSpaces.AddChild( layBoardSpacesP11 );
    layBoardSpacesP12 = app.CreateLayout( "Linear" );
    layBoardSpaces.AddChild( layBoardSpacesP12 );
    layBoardSpacesP21 = app.CreateLayout( "Linear" );
    layBoardSpaces.AddChild( layBoardSpacesP21 );
    layBoardSpacesP22 = app.CreateLayout( "Linear" );
    layBoardSpaces.AddChild( layBoardSpacesP22 );
    layGame.AddChild( layBoard );
    
    for (i = 0; i < 11; i++)
    {
        layBoardNumbersN[i] = app.CreateLayout( "Linear", "Center" );
        layBoardNumbersN[i].SetSize( 0.2, 0.06 );
        if (i == 10 || i == 8 || i == 6 || i == 4 || i == 2 || i == 0)
        {
            layBoardNumbersN[i].SetBackColor( "#DADFE1" );
        }
        else
        {
            layBoardNumbersN[i].SetBackColor( "#EEEEEE" );
        }
        if (i == 10)
        {
            layBoardNumbersNTxt = app.CreateText( "1 - Start" );
            layBoardNumbersN[i].AddChild( layBoardNumbersNTxt );
        }
        else if (i == 0)
        {
            layBoardNumbersNTxt = app.CreateText( "11 - Finish" );
            layBoardNumbersN[i].AddChild( layBoardNumbersNTxt );
        }
        else
        {
            layBoardNumbersNTxt = app.CreateText( 11 - i );
            layBoardNumbersN[i].AddChild( layBoardNumbersNTxt );
        }
        layBoardNumbersNTxt.SetTextColor( "#22313F" );
        layBoardNumbers.AddChild( layBoardNumbersN[i] );
    }
    
    for (j = 0; j < 4; j++)
    {
        if( j == 0 ){
            for (i = 0; i < 11; i++)
            {
                layBoardSpacesP1C1[i] = app.CreateLayout( "Linear", "Center" );
                layBoardSpacesP1C1[i].SetSize( 0.2, 0.06 );
                if (i == 0 || i == 6 || i == 10)
                {
                    layBoardSpacesP1C1[i].SetBackColor( "#C8F7C5" ); //Light Green
                }
                else if (i == 1 || i == 3 || i == 5 || i == 7 || i == 9)
                {
                    layBoardSpacesP1C1[i].SetBackColor( "#D2D7D3" ); //Dark Grey
                }
                else
                {
                    layBoardSpacesP1C1[i].SetBackColor( "#ECECEC" ); //Light Grey
                }
                layBoardSpacesP11.AddChild( layBoardSpacesP1C1[i] );
            }
        }
        if( j == 1 ){
            for (i = 0; i < 11; i++)
            {
                layBoardSpacesP1C2[i] = app.CreateLayout( "Linear", "Center" );
                layBoardSpacesP1C2[i].SetSize( 0.2, 0.06 );
                if (i == 0 || i == 6 || i == 10)
                {
                    layBoardSpacesP1C2[i].SetBackColor( "#C8F7C5" ); //Light Green
                }
                else if (i == 1 || i == 3 || i == 5 || i == 7 || i == 9)
                {
                    layBoardSpacesP1C2[i].SetBackColor( "#D2D7D3" ); //Dark Grey
                }
                else
                {
                    layBoardSpacesP1C2[i].SetBackColor( "#ECECEC" ); //Light Grey
                }
                layBoardSpacesP12.AddChild( layBoardSpacesP1C2[i] );
            }
        }
        if( j == 2 ){
            for (i = 0; i < 11; i++)
            {
                layBoardSpacesP2C1[i] = app.CreateLayout( "Linear", "Center" );
                layBoardSpacesP2C1[i].SetSize( 0.2, 0.06 );
                if (i == 0 || i == 6 || i == 10)
                {
                    layBoardSpacesP2C1[i].SetBackColor( "#C8F7C5" ); //Light Green
                }
                else if (i == 1 || i == 3 || i == 5 || i == 7 || i == 9)
                {
                    layBoardSpacesP2C1[i].SetBackColor( "#D2D7D3" ); //Dark Grey
                }
                else
                {
                    layBoardSpacesP2C1[i].SetBackColor( "#ECECEC" ); //Light Grey
                }
                layBoardSpacesP21.AddChild( layBoardSpacesP2C1[i] );
            }
        }
        if( j == 3 ){
            for (i = 0; i < 11; i++)
            {
                layBoardSpacesP2C2[i] = app.CreateLayout( "Linear", "Center" );
                layBoardSpacesP2C2[i].SetSize( 0.2, 0.06 );
                if (i == 0 || i == 6 || i == 10)
                {
                    layBoardSpacesP2C2[i].SetBackColor( "#C8F7C5" ); //Light Green
                }
                else if (i == 1 || i == 3 || i == 5 || i == 7 || i == 9)
                {
                    layBoardSpacesP2C2[i].SetBackColor( "#D2D7D3" ); //Dark Grey
                }
                else
                {
                    layBoardSpacesP2C2[i].SetBackColor( "#ECECEC" ); //Light Grey
                }
                layBoardSpacesP22.AddChild( layBoardSpacesP2C2[i] );
            }
        }
    }
    
    //Player Labels
    //Player 1 label
    layPlayer1label = app.CreateLayout( "Linear", "VCenter,Horizontal,FillX" );
    layPlayer1label.SetMargins( 0, 0, 0, 0 );
    layPlayer1label.SetSize( 1, 0.05 );
    layPlayer1label.SetPadding( 0, 0.005, 0, 0.005 );
    layPlayer1label.SetBackColor( "#F1A9A0" );
    
    Player1counter = app.CreateImage( "Img/blackcounter.png", -1, 0.04 );
    Player1counter.SetMargins( 0, 0, 0.005, 0 );
    layPlayer1label.AddChild( Player1counter );
    Player1label = app.CreateText( name1, -1, 0.04 );
    Player1label.SetTextColor( "#22313F" );
    layPlayer1label.AddChild( Player1label );
    layGame.AddChild( layPlayer1label );
    
    //Player 2 label
    layPlayer2label = app.CreateLayout( "Linear", "VCenter,Horizontal,FillX" );
    layPlayer2label.SetMargins( 0, 0, 0, 0.0025 );
    layPlayer2label.SetSize( 1, 0.05 );
    layPlayer2label.SetPadding( 0, 0.005, 0, 0.005 );
    layPlayer2label.SetBackColor( "#ECECEC" );
    
    Player2counter = app.CreateImage( "Img/redcounter.png", -1, 0.04 );
    Player2counter.SetMargins( 0, 0, 0.005, 0 );
    layPlayer2label.AddChild( Player2counter );
    Player2label = app.CreateText( name2, -1, 0.04 );
    Player2label.SetTextColor( "#22313F" );
    layPlayer2label.AddChild( Player2label );
    layGame.AddChild( layPlayer2label );

    //Roll Dice Button
    btnRollDice = app.CreateButton ( "Roll Dice", 1, 0.06 );
    btnRollDice.SetBackColor( "#EEEEEE" );
    btnRollDice.SetTextColor( "#22313F" );
    btnRollDice.SetOnTouch( rollDice );
    layGame.AddChild( btnRollDice );

    //Quit Button
    btnQuitGame = app.CreateButton( "Quit", 1, 0.06 );
    btnQuitGame.SetBackColor( "#22313F" );
    btnQuitGame.SetTextColor( "#EEEEEE" );
    btnQuitGame.SetOnTouch( confirmReturnToMenu );
    layGame.AddChild( btnQuitGame );
    
    layBoardSpacesP1C1[10].AddChild( player1counter1 );
    layBoardSpacesP1C2[10].AddChild( player1counter2 );
    layBoardSpacesP2C1[10].AddChild( player2counter1 );
    layBoardSpacesP2C2[10].AddChild( player2counter2 );
    //Game Layer
    //
    //
    //
    //Menu Layer
    laySlide = app.CreateLayout( "Linear", "FillXY" );
    laySlide.SetPadding( 0, 0, 0, 0 ); 
    laySlide.SetBackColor( "#6C7A89" );
    laySlide.SetVisibility( "Show" );
    
    menuLogo = app.CreateImage( "Img/AQADo.png", 0.5, -1 );
    menuLogo.SetMargins( 0, 0.05, 0, 0.025 );
    laySlide.AddChild( menuLogo );
    
    menuInstr = app.CreateImage( "Img/Question.png", 0.15, -1 );
    menuInstr.SetMargins( 0, 0, 0, 0.05 );
    menuInstr.SetOnTouchDown( showInstructions );
    laySlide.AddChild( menuInstr );
    
    //Create button and add to main layout.
    btnPlay = app.CreateButton( "Play Game", 1, 0.06 );
    btnPlay.SetBackColor( "#EEEEEE" );
    btnPlay.SetTextColor( "#22313F" );
    btnPlay.SetOnTouch( startGame );
    laySlide.AddChild( btnPlay );
    
    btnQuit = app.CreateButton( "Quit", 1, 0.06 );
    btnQuit.SetBackColor( "#22313F" );
    btnQuit.SetTextColor( "#EEEEEE" );
    btnQuit.SetOnTouch( exitGame );
    btnQuit.SetMargins( 0, 0, 0, 0.05 );
    laySlide.AddChild( btnQuit );
    
    entrPlay1NameLbl = app.CreateText( "Enter Player 1 Name" );
    entrPlay1NameLbl.SetTextColor( "#ECECEC" );
    entrPlay1NameLbl.SetSize( 1, 0.035 );
    laySlide.AddChild( entrPlay1NameLbl );
    entrPlay1NameTxt = app.CreateTextEdit( name1, 1, 0.06 );
    entrPlay1NameTxt.SetBackColor( "#EEEEEE" );
    entrPlay1NameTxt.SetTextColor( "#22313F" );
    entrPlay1NameTxt.SetMargins( 0, 0, 0, 0.01 );
    laySlide.AddChild( entrPlay1NameTxt );
    
    entrPlay2NameLbl = app.CreateText( "Enter Player 2 Name" );
    entrPlay2NameLbl.SetTextColor( "#ECECEC" );
    entrPlay2NameLbl.SetSize( 1, 0.035 );
    laySlide.AddChild( entrPlay2NameLbl );
    entrPlay2NameTxt = app.CreateTextEdit( name2, 1, 0.06 );
    entrPlay2NameTxt.SetBackColor( "#EEEEEE" );
    entrPlay2NameTxt.SetTextColor( "#22313F" );
    laySlide.AddChild( entrPlay2NameTxt );
    
    //Menu Layer
    
    //Add layouts to app.    
    app.AddLayout( layGame );
    app.AddLayout( laySlide );
}

function confirmReturnToMenu()
{
    confirmQuit = app.CreateYesNoDialog( "Return to the menu?" );
    confirmQuit.SetOnTouch( confirm2ReturnToMenu );
}

function confirm2ReturnToMenu( choice )
{
    if( choice == "Yes" )
    {
        returnToMenu();
    }
    else {};
}

function returnToMenu()
{
    laySlide.Animate( "SlideFromLeft" );
    clearGame();
}

function clearGame()
{
    if( curTurn == "player2" ){
        turnSwitch();
    }
    diceNumber = 0;
    updateDice();
    hasRolled = false;
    moveValid = true;
    updateMessage();
    for( i = 0; i < 4; i++ )
    {
        for( j = 0; j < 11; j++ )
        {
            if( i == 0 )
            {
               if( layBoardSpacesP1C1[j].GetChildOrder( player1counter1 ) != -1 )
               {
                   layBoardSpacesP1C1[j].RemoveChild( player1counter1 );
               }
               if( layBoardSpacesP1C2[j].GetChildOrder( player1counter2 ) != -1 )
               {
                   layBoardSpacesP1C2[j].RemoveChild( player1counter2 );
               }
               if( layBoardSpacesP2C1[j].GetChildOrder( player2counter1 ) != -1 )
               {
                   layBoardSpacesP2C1[j].RemoveChild( player2counter1 );
               }
               if( layBoardSpacesP2C2[j].GetChildOrder( player2counter2 ) != -1 )
               {
                   layBoardSpacesP2C2[j].RemoveChild( player2counter2 );
               }
            }
        }
    }
    layBoardSpacesP1C1[10].AddChild( player1counter1 );
    layBoardSpacesP1C2[10].AddChild( player1counter2 );
    layBoardSpacesP2C1[10].AddChild( player2counter1 );
    layBoardSpacesP2C2[10].AddChild( player2counter2 );
    
}

function showInstructions()
{
    dlgInstr = app.CreateDialog( "Rules" );
    instrLay = app.CreateLayout( "linear", "FillXY,vertical,Center" );
    instrLay.SetBackColor( "#FEFEFE" );
    rulesTxt = app.CreateText( "Overview:\nAQADo is a turn-based game which consists of two players competing against one another to get both of their counters to the end of the board. The player will move the amount of spaces shown on the dice, but a four moves back a space.\n\nKnockdown:\nIf a player lands one of their counters onto a space which contains the opponent's piece, the opponent's piece is knocked to the start.\n\nSafe-Zones:\nSafe-zones are highlighted on the board with a light green colour. These spaces will prevent the 'knockdown' from happening on them.\n\nWinning:\nA player will win when they get both of their counters to the final space, 11, which is marked 'Finish' on the board.", 0.9, -1, "Multiline" );
    rulesTxt.SetTextColor( "#22313F" );
    instrLay.AddChild( rulesTxt );
    closeInstrBtn = app.CreateButton( "Close", 1, -1 );
    closeInstrBtn.SetOnTouch( hideInstructions );
    closeInstrBtn.SetBackColor( "#22313F" );
    closeInstrBtn.SetTextColor( "#FEFEFE" );
    instrLay.AddChild( closeInstrBtn );
    dlgInstr.AddLayout( instrLay );
    dlgInstr.Show();
}

function hideInstructions()
{
    dlgInstr.Hide();
}

function startGame()
{
    clearGame();
    laySlide.Animate( "SlideToLeft" );
    pushNames();
    updateNames();
}

function exitGame()
{
    app.Exit();
}

function pushNames()
{
    if( entrPlay1NameTxt.GetText() != "" )
    {
        name1 = entrPlay1NameTxt.GetText();
    }
    if( entrPlay2NameTxt.GetText() != "" )
    {
        name2 = entrPlay2NameTxt.GetText();
    }
}

function updateNames()
{
    Player1label.SetText( name1 );
    Player2label.SetText( name2 );
}

function newGame()
{
    /*player1counter1.SetPosition();
    player1counter2.SetPosition();
    player2counter1.SetPosition();
    player2coutner2.SetPosition();*/
}

function updateMessage()
{
    if(hasRolled == false)
    {
        message.SetText( "Roll the dice" );
        message.SetTextColor( "#EEEEEE");
    }
    else if(moveValid == true && hasRolled == true)
    {
        message.SetText( "Touch a counter" );
        message.SetTextColor( "#EEEEEE" );
    }
    else if(moveValid == false)
    {
        message.SetText( "No move possible" );
        message.SetTextColor( "#CF000F");
    }
}

function rollDice()
{
    if( hasRolled == false )
    {
        sfx.Stop();
        sfx.Play();
        diceNumber = Math.floor((Math.random() * 4) + 1);
        updateDice();
        validateMove();
        hasRolled = true;
        updateMessage();
    }
    else if( moveValid == false )
    {
        turnSwitch();
        diceNumber = 0
        updateDice();
        hasRolled = false;
        updateMessage();
        moveValid = true;
    }
}

function updateDice()
{
    dice.SetImage( diceImg[diceNumber], -1, 0.075 );
}

function validateMove()
{
    if( curTurn == "player1" ){
        if( diceNumber == 4 ){
            if( layBoardSpacesP1C1[10].GetChildOrder( player1counter1 ) == 0 )
            {
                if( layBoardSpacesP1C2[10].GetChildOrder( player1counter2 ) == 0 )
                {
                    moveValid = false;
                }
            }
        }
        else
        {
            moveValid = true;
        }
    }
    if( curTurn == "player2" ){
        if( diceNumber == 4 ){
            if( layBoardSpacesP2C1[10].GetChildOrder( player2counter1 ) == 0 )
            {
                if( layBoardSpacesP2C2[10].GetChildOrder( player2counter2 ) == 0 )
                {
                    moveValid = false;
                }
            }
        }
        else
        {
            moveValid = true;
        }
    }
}

function turnSwitch()
{
    if( curTurn == "player1" ){
        curTurn = "player2";
        layPlayer2label.SetBackColor( "#F1A9A0" );
        layPlayer1label.SetBackColor( "#ECECEC" );
    }
    else {
        curTurn = "player1";
        layPlayer1label.SetBackColor( "#F1A9A0" );
        layPlayer2label.SetBackColor( "#ECECEC" );
    }
}

function move11()
{
    if( curTurn == "player1" && hasRolled == true )
    {
        if( layBoardSpacesP1C1[10].GetChildOrder( player1counter1 ) != -1 && diceNumber == 4 )
        {
            app.ShowPopup( "Cannot move counters behind the start." );
        }
        else if( layBoardSpacesP1C1[0].GetChildOrder( player1counter1 ) != -1 && diceNumber != 4 )
        {
            app.ShowPopup( "Cannot move counters beyond the finish." );
        }
        else
        {
            performMove( player1counter1 );
        }
    }
}

function move12()
{
    if( curTurn == "player1" && hasRolled == true )
    {
        if( layBoardSpacesP1C2[10].GetChildOrder( player1counter2 ) != -1 && diceNumber == 4 )
        {
            app.ShowPopup( "Cannot move counters behind the start." );
        }
        else if( layBoardSpacesP1C2[0].GetChildOrder( player1counter2 ) != -1 && diceNumber != 4 )
        {
            app.ShowPopup( "Cannot move counters beyond the finish." );
        }
        else
        {
            performMove( player1counter2 );
        }
    }
}
function move21()
{
    if( curTurn == "player2" && hasRolled == true )
    {
        if( layBoardSpacesP2C1[10].GetChildOrder( player2counter1 ) != -1 && diceNumber == 4 )
        {
            app.ShowPopup( "Cannot move counters behind the start." );
        }
        else if( layBoardSpacesP2C1[0].GetChildOrder( player2counter1 ) != -1 && diceNumber != 4 )
        {
            app.ShowPopup( "Cannot move counters beyond the finish." );
        }
        else
        {
            performMove( player2counter1 );
        }
    }
}
function move22()
{
    if( curTurn == "player2" && hasRolled == true )
    {
        if( layBoardSpacesP2C2[10].GetChildOrder( player2counter2 ) != -1 && diceNumber == 4 )
        {
            app.ShowPopup( "Cannot move counters behind the start." );
        }
        else if( layBoardSpacesP2C2[0].GetChildOrder( player2counter2 ) != -1 && diceNumber != 4 )
        {
            app.ShowPopup( "Cannot move counters beyond the finish." );
        }
        else
        {
            performMove( player2counter2 );
        }
    }
}

function checkSame( counter, newposition )
{
    var samecounter;
    if( counter == player1counter1 ){toCheck3 = layBoardSpacesP1C2;samecounter = player1counter2;}
    if( counter == player1counter2 ){toCheck3 = layBoardSpacesP1C1;samecounter = player1counter1;}
    if( counter == player2counter1 ){toCheck3 = layBoardSpacesP2C2;samecounter = player2counter2;}
    if( counter == player2counter2 ){toCheck3 = layBoardSpacesP2C1;samecounter = player2counter1;}
    
    if( toCheck3[newposition].GetChildOrder( samecounter ) == -1 || (((newposition == 6) || newposition == 0) || newposition == 10) )
    {
        return false;
    }
    else
    {
        return true;
    }
}

function performMove( counter )
{
    if( counter == player1counter1 ){toCheck1 = layBoardSpacesP1C1;samecounter = player1counter2;}
    if( counter == player1counter2 ){toCheck1 = layBoardSpacesP1C2;samecounter = player1counter1;}
    if( counter == player2counter1 ){toCheck1 = layBoardSpacesP2C1;samecounter = player2counter2;}
    if( counter == player2counter2 ){toCheck1 = layBoardSpacesP2C2;samecounter = player2counter1;}
    
    if( moveValid == true )
    {
        for( i = 0; i < 11; i++ )
        {
            if( toCheck1[i].GetChildOrder( counter ) == 0 )
            {
                currentPos = i;
                break;
            }
        }
        if( diceNumber == 1){ newPos = currentPos - dice1pos; }
        else if( diceNumber == 2){ newPos = currentPos - dice2pos; }
        else if( diceNumber == 3){ newPos = currentPos - dice3pos; }
        else if( diceNumber == 4){ newPos = currentPos - dice4pos; }
        
        if( newPos < 0 )
        {
            newPos = 0;
        }
        
        if( checkSame( counter, newPos ) == false )
        {
            if( counter == player1counter1){ layBoardSpacesP1C1[currentPos].RemoveChild(player1counter1);layBoardSpacesP1C1[newPos].AddChild(player1counter1);}
            else if( counter == player1counter2){ layBoardSpacesP1C2[currentPos].RemoveChild(player1counter2);layBoardSpacesP1C2[newPos].AddChild(player1counter2);}
            else if( counter == player2counter1){ layBoardSpacesP2C1[currentPos].RemoveChild(player2counter1);layBoardSpacesP2C1[newPos].AddChild(player2counter1);}
            else if( counter == player2counter2){ layBoardSpacesP2C2[currentPos].RemoveChild(player2counter2);layBoardSpacesP2C2[newPos].AddChild(player2counter2);}
            
            diceNumber = 0;
            updateDice();
            hasRolled = false;
            updateMessage();
            turnSwitch();
            checkKnockdown( counter );
            checkWinner();
        }
        else
        {
            app.ShowPopup( "Cannot move your counters onto the same position.");
        }
    }
    else
    {
        diceNumber = 0;
        updateDice();
        hasRolled = false;
        updateMessage();
        turnSwitch();
        checkKnockdown( counter );
        checkWinner();
    }
        
}

function checkKnockdown( currentcounter )
{
    var opcounter1;
    var opcounter2;
    
    if( currentcounter == player1counter1 || currentcounter == player1counter2 ){toCheck1 = layBoardSpacesP2C1;toCheck2 = layBoardSpacesP2C2;opcounter1 = player2counter1;opcounter2 = player2counter2;}
    if( currentcounter == player2counter1 || currentcounter == player2counter2 ){toCheck1 = layBoardSpacesP1C1;toCheck2 = layBoardSpacesP1C2;opcounter1 = player1counter1;opcounter2 = player1counter2;}
    
    if( newPos == 6 || newPos == 0 )
    {}
    else
    {
        if( toCheck1[newPos].GetChildOrder( opcounter1 ) != -1 )
        {
            if( currentcounter == player1counter1 || currentcounter == player1counter2 )
            {
                layBoardSpacesP2C1[newPos].RemoveChild( player2counter1 );layBoardSpacesP2C1[10].AddChild( player2counter1 );
            }
            if( currentcounter == player2counter1 || currentcounter == player2counter2 )
            {
                layBoardSpacesP1C1[newPos].RemoveChild( player1counter1 );layBoardSpacesP1C1[10].AddChild( player1counter1 );
            }
        }
        if( toCheck2[newPos].GetChildOrder( opcounter2 ) != -1 )
        {
            if( currentcounter == player1counter1 || currentcounter == player1counter2 )
            {
                layBoardSpacesP2C2[newPos].RemoveChild( player2counter2 );layBoardSpacesP2C2[10].AddChild( player2counter2 );
            }
            if( currentcounter == player2counter1 || currentcounter == player2counter2 )
            {
                layBoardSpacesP1C2[newPos].RemoveChild( player1counter2 );layBoardSpacesP1C2[10].AddChild( player1counter2 );
            }
        }
    }
}

function checkWinner()
{
    if( layBoardSpacesP1C1[0].GetChildOrder( player1counter1 ) != -1 && layBoardSpacesP1C2[0].GetChildOrder( player1counter2 ) != -1 )
    {
        app.Alert( name1 + " is the winner!" );
        returnToMenu();
        clearGame();
    }
    
    if( layBoardSpacesP2C1[0].GetChildOrder( player2counter1 ) != -1 && layBoardSpacesP2C2[0].GetChildOrder( player2counter2 ) != -1 )
    {
        app.Alert( name2 + " is the winner!" );
        returnToMenu();
        clearGame();
    }
}