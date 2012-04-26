$(function(){
  
  var round = 1;
  var gridSize;
  var totalMines;
  var clicks;
  var flagsCount;
  setGame();

  //set the grid size and # of mines based on the users input or set to default
  function setGame(){
    if ($("#grid").val() < 5){
      gridSize = 5;
    } else if ($("#grid").val() > 16){
      gridSize = 16;
    } else {
      gridSize = $("#grid").val();
    }
    if ($("#mines").val() < 0){
      totalMines = 1;
    } else if ($("#mines").val() >= (gridSize*gridSize)){
      totalMines = ((gridSize*gridSize)-1);
    } else {
      totalMines = $("#mines").val();
    }
    flagsCount = totalMines;
    clicks = 0;
    createBoxes();
  }
  
  function createBoxes(){
    var rows = 0;
    var topRow = 0;
    var bottomRow = 0;
    var grid = 0;
    //set the grid size
    while (grid < gridSize){
      $('#boxes').append("<div id='row"+(grid+1)+"' class='round"+round+"'></div>");
      grid++;
    }
    //create the top row of tiles
    $('#row1').append("<span class='box top-left'><div class='number'></div></span>");
    while (topRow < (gridSize-2)){
      $('#row1').append("<span class='box top'><div class='number'></div></span>");
      topRow++;
    }
    $('#row1').append("<span class='box top-right'><div class='number'></div></span>");  
    //create the center rows of tiles
    while (rows < (gridSize-2)){
      var centerRow = 0;
      $('#row'+(rows+2)).append("<span class='box left'><div class='number'></div></span>");
      while (centerRow < (gridSize-2)){
        $('#row'+(rows+2)).append("<span class='box'><div class='number'></div></span>");
        centerRow++;
      }
      $('#row'+(rows+2)).append("<span class='box right'><div class='number'></div></span>");
      rows++;
    }
    //create the bottom row of tiles
    $('#row'+gridSize).append("<span class='box bottom-left'><div class='number'></div></span>");
    while (bottomRow < (gridSize-2)){
      $('#row'+gridSize).append("<span class='box bottom'><div class='number'></div></span>");
      bottomRow++;
    }
    $('#row'+gridSize).append("<span class='box bottom-right'><div class='number'></div></span>");
    setBoxes();
  }
  
  //give each box a coordinate id
  function setBoxes(){
    var b = 0;
    var $boxes = $('.box');
    while (b < (gridSize*gridSize)){
      $boxes.eq(b).attr('id', b+1);
      b++;
    }   
    var s = 0;
    var $numbers = $('.number');
    while (s < (gridSize*gridSize)){
      $numbers.eq(s).text(s+1);
      s++;
    }
    mines = new Array;
    $("#counterNum").text(totalMines);
    bindBoxEvents();
  }
  
  //randomly designate which ten boxes are mines
  function setMines(firstClick){
    while (mines.length < totalMines){
      var coord = (Math.floor(Math.random()*(gridSize*gridSize))+1);
      //make sure that a mine isn't set to the same tile twice
      //and that the first tile clicked isn't a mine
      if (jQuery.inArray(coord, mines) === -1 && coord != firstClick){
        mines.push(coord);
      }
    }
  }
  
  $('#image').mouseenter(function(){
    $('#newGame').animate({opacity: .9}, 300);
  }).mouseleave(function(){
    $('#newGame').animate({opacity: .2}, 300);
  });
  
  //reset the game board
  $('#image').click(function(){
    $('#image').removeClass('explode win');
    $('.round'+round+'').remove();
    round++;
    setGame();
  });
  
  $('#cheat').mouseenter(function(){
    $('#cheat').animate({opacity: .9}, 300);
  }).mouseleave(function(){
    $('#cheat').animate({opacity: .1}, 300);
  });
  
  $('#cheat').click(function(){
    cheat();
  });
  
  //prevent menu from appearing so a right click can be used to place a flag
  $('#boxes').bind('contextmenu', function(e){
      e.preventDefault();
      return false;
  });
  
  function bindBoxEvents(){
    $('.box').mousedown(function(){
      $("#image").addClass("concerned");
      if (clicks === 0){
        setMines(this.id);
      }
    });

    //check each of the selected tile's neighbors to provide the count of adjacent mines
    $(".box").mouseup(function(e){
      $("#image").removeClass("concerned");
      //if a left click is performed on a tile without a flag...
      if (e.which === 1 & !$("#"+this.id).hasClass('flagged')){
        neighbors = new Array;
        if ($("#"+this.id).hasClass("top")){
          var foo = parseInt(this.id);
          neighbors.push(right(foo));
          neighbors.push(downRight(foo));
          neighbors.push(down(foo));
          neighbors.push(downLeft(foo));
          neighbors.push(left(foo));
          var closeMines = 0;
          var n = 0;
          while (n < 5){
            if (jQuery.inArray(neighbors[n], mines) != -1){
              closeMines++;
            }
            n++;
          }
          $("#"+this.id+" .number").text(closeMines);
          $("#"+this.id+" .number").css("opacity", "1")

        } else if ($("#"+this.id).hasClass("top-right")){
          var foo = parseInt(this.id);
          neighbors.push(down(foo));
          neighbors.push(downLeft(foo));
          neighbors.push(left(foo));
          var closeMines = 0;
          var n = 0;
          while (n < 3){
            if (jQuery.inArray(neighbors[n], mines) != -1){
              closeMines++;
            }
            n++;
          }
          $("#"+this.id+" .number").text(closeMines);
          $("#"+this.id+" .number").css("opacity", "1")   
        } else if ($("#"+this.id).hasClass("right")){
          var foo = parseInt(this.id);
          neighbors.push(upLeft(foo));
          neighbors.push(up(foo));
          neighbors.push(down(foo));
          neighbors.push(downLeft(foo));
          neighbors.push(left(foo));
          var closeMines = 0;
          var n = 0;
          while (n < 5){
            if (jQuery.inArray(neighbors[n], mines) != -1){
              closeMines++;
            }
            n++;
          }
          $("#"+this.id+" .number").text(closeMines);
          $("#"+this.id+" .number").css("opacity", "1") 
        } else if ($("#"+this.id).hasClass("bottom-right")){
          var foo = parseInt(this.id);
          neighbors.push(upLeft(foo));
          neighbors.push(up(foo));
          neighbors.push(left(foo));
          var closeMines = 0;
          var n = 0;
          while (n < 3){
            if (jQuery.inArray(neighbors[n], mines) != -1){
              closeMines++;
            }
            n++;
          }
          $("#"+this.id+" .number").text(closeMines);
          $("#"+this.id+" .number").css("opacity", "1")
        } else if ($("#"+this.id).hasClass("bottom")){
          var foo = parseInt(this.id);
          neighbors.push(upLeft(foo));
          neighbors.push(up(foo));
          neighbors.push(upRight(foo));
          neighbors.push(right(foo));
          neighbors.push(left(foo));
          var closeMines = 0;
          var n = 0;
          while (n < 5){
            if (jQuery.inArray(neighbors[n], mines) != -1){
              closeMines++;
            }
            n++;
          }
          $("#"+this.id+" .number").text(closeMines);
          $("#"+this.id+" .number").css("opacity", "1")
        } else if ($("#"+this.id).hasClass("bottom-left")){
          var foo = parseInt(this.id);
          neighbors.push(up(foo));
          neighbors.push(upRight(foo));
          neighbors.push(right(foo));
          var closeMines = 0;
          var n = 0;
          while (n < 3){
            if (jQuery.inArray(neighbors[n], mines) != -1){
              closeMines++;
            }
            n++;
          }
          $("#"+this.id+" .number").text(closeMines);
          $("#"+this.id+" .number").css("opacity", "1")
        } else if ($("#"+this.id).hasClass("left")){
          var foo = parseInt(this.id);
          neighbors.push(up(foo));
          neighbors.push(upRight(foo));
          neighbors.push(right(foo));
          neighbors.push(downRight(foo));
          neighbors.push(down(foo));
          var closeMines = 0;
          var n = 0;
          while (n < 5){
            if (jQuery.inArray(neighbors[n], mines) != -1){
              closeMines++;
            }
            n++;
          }
          $("#"+this.id+" .number").text(closeMines);
          $("#"+this.id+" .number").css("opacity", "1")
        } else if ($("#"+this.id).hasClass("top-left")){
          var foo = parseInt(this.id);
          neighbors.push(right(foo));
          neighbors.push(downRight(foo));  
          neighbors.push(down(foo));
          var closeMines = 0;
          var n = 0;
          while (n < 3){
            if (jQuery.inArray(neighbors[n], mines) != -1){
              closeMines++;
            }
            n++;
          }
          $("#"+this.id+" .number").text(closeMines);
          $("#"+this.id+" .number").css("opacity", "1");
        } else {
          var foo = parseInt(this.id);
          neighbors.push(upLeft(foo));
          neighbors.push(up(foo));
          neighbors.push(upRight(foo));
          neighbors.push(right(foo));
          neighbors.push(downRight(foo));
          neighbors.push(down(foo));
          neighbors.push(downLeft(foo));
          neighbors.push(left(foo));
          var closeMines = 0;
          var n = 0;
          while (n < 8){
            if (jQuery.inArray(neighbors[n], mines) != -1){
              closeMines++;
            }
            n++;
          }
          $("#"+this.id+" .number").text(closeMines);
          $("#"+this.id+" .number").css("opacity", "1");
        }
      //remove a flag if a flagged tile is right clicked
      } else if (e.which === 3 & $("#"+this.id).hasClass('flagged')){
        $("#"+this.id).css("background-color", "ghostwhite").removeClass("flagged");
        flagsCount++;
        $("#counterNum").text(flagsCount);
      //flag a tile
      } else if (e.which === 3 & !$("#"+this.id).hasClass('flagged')){
        $("#"+this.id).css("background-color", "red").addClass("flagged");
        flagsCount--;
        $("#counterNum").text(flagsCount);
        if (flagsCount === 0){
          $('#check').animate({opacity: 1}, 300);
        } else {
          $('#check').css("opacity", ".2");
        }
      }
    });

    $(".box").mouseup(function(e){
      //if a clicked tile isn't flagged, change the tile color or end the game 
      if (e.which === 1 & !$("#"+this.id).hasClass('flagged')){
        if (jQuery.inArray(parseInt(this.id), mines) !== -1){
          $("#"+this.id).css("background-color", "black");
          explodeMines();
        } else {
          if (!$("#"+this.id).hasClass('clicked')){
            $("#"+this.id).addClass('clicked');
            $("#"+this.id).css("background-color", "white");
            clicks++;
          }
          if (clicks === ((parseInt(gridSize)*parseInt(gridSize))-parseInt(totalMines))){
            checkFlags();
          }
        }
      }
    });
  }
  
  function explodeMines(){
    var l = 0;
    while (l < totalMines){
      $("#"+mines[l]).css("background-color", "black");
      l++;
    }
    $("#image").addClass("explode");
  }
  
  function checkFlags(){
    w = 0;
    while (w < totalMines){
      $("#"+mines[w]).css("background-color", "green");
      w++;
    }
    $("#image").addClass("win");
  }
  
  function cheat(){
    if (mines.length === 0){
      setMines();
    }
    var m = 0;
    $(".flagged").css("background-color", "ghostwhite");
    while (m < totalMines){
      $("#"+mines[m]).css("background-color", "red");
      m++;
    }
    flagsCount = 0;
    $("#counterNum").text(flagsCount);
  }
  
  //functions to check which tiles are the selected tile's neighbors
  function upLeft(x){
    ans = x - (parseInt(gridSize)+1);
    return ans;
  }
  
  function up(x){
    ans = x - parseInt(gridSize);
    return ans;
  }
  
  function upRight(x){
    ans = x - (parseInt(gridSize)-1);
    return ans;
  }
  
  function right(x){
    ans = x + 1;
    return ans;
  }
  
  function downRight(x){
    ans = x + (parseInt(gridSize)+1);
    return ans;
  }
  
  function down(x){
    ans = x + parseInt(gridSize);
    return ans;
  }
  
  function downLeft(x){
    ans = x + (parseInt(gridSize)-1);
    return ans;
  }
  
  function left(x){
    ans = x - 1;
    return ans;
  }    
});