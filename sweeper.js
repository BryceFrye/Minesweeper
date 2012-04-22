$(function(){
  
  var clicks = 0;
  setBoxes();
  
  //give each box a coordinate id
  function setBoxes(){
    var b = 0;
    var $boxes = $('.box');
    while (b < 64){
      $boxes.eq(b).attr('id', b+1);
      b++;
    }   
    var s = 0;
    var $numbers = $('.number');
    while (s < 64){
      $numbers.eq(s).text(s+1);
      s++;
    }
  }
  
  //randomly designate which ten boxes are mines
  function setMines(firstClick){
    minesCount = 10;
    mines = new Array;
    while (mines.length < 10){
      var coord = (Math.floor(Math.random()*64)+1);
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
    $('.box').css("background-color", "ghostwhite");
    $('.number').css("opacity", "0");
    $('span').removeClass('flagged');
    $('#image').removeClass('explode win')
    $('#check').css("opacity", ".3");
    minesCount = 10;
    $("#counterNum").text(minesCount);
    clicks = 0;
    setBoxes();
  });
  
  $('#cheat').mouseenter(function(){
    $('#cheat').animate({opacity: .9}, 300);
  }).mouseleave(function(){
    $('#cheat').animate({opacity: .1}, 300);
  });
  
  $('#cheat').click(function(){
    cheat();
  });
  
  $('#check').click(function(){
    checkFlags();
  });
  
  //prevent menu from appearing so a right click can be used to place a flag
  $('#boxes').bind('contextmenu', function(e){
      e.preventDefault();
      return false;
  });
  
  $(".box").mousedown(function(){
    $("#image").addClass("concerned");
    if (clicks === 0){
      setMines(this.id);
    }
  });
  
  //check each of the selected tile's neighbors to provide the count of adjacent mines
  $(".box").mouseup(function(e){
    clicks++;
    $("#image").removeClass("concerned");
    //if a left click is performed on a tile without a flag...
    if (e.which === 1 & !$("#"+this.id).hasClass('flagged')){
      neighbors = new Array;
      if ($("#"+this.id).hasClass("top")){
        foo = parseInt(this.id);
        neighbors.push(right(foo));
        neighbors.push(downRight(foo));
        neighbors.push(down(foo));
        neighbors.push(downLeft(foo));
        neighbors.push(left(foo));
        var closeMines = 0;
        var n = 0;
        while (n < 5){
          if (jQuery.inArray(neighbors[n], mines) !== -1){
            closeMines++;
          }
          n++;
        }
        $("#"+this.id+" .number").text(closeMines);
        $("#"+this.id+" .number").css("opacity", "1")
      
      } else if ($("#"+this.id).hasClass("top-right")){
        foo = parseInt(this.id);
        neighbors.push(down(foo));
        neighbors.push(downLeft(foo));
        neighbors.push(left(foo));
        var closeMines = 0;
        var n = 0;
        while (n < 3){
          if (jQuery.inArray(neighbors[n], mines) !== -1){
            closeMines++;
          }
          n++;
        }
        $("#"+this.id+" .number").text(closeMines);
        $("#"+this.id+" .number").css("opacity", "1")   
      } else if ($("#"+this.id).hasClass("right")){
        foo = parseInt(this.id);
        neighbors.push(upLeft(foo));
        neighbors.push(up(foo));
        neighbors.push(down(foo));
        neighbors.push(downLeft(foo));
        neighbors.push(left(foo));
        var closeMines = 0;
        var n = 0;
        while (n < 5){
          if (jQuery.inArray(neighbors[n], mines) !== -1){
            closeMines++;
          }
          n++;
        }
        $("#"+this.id+" .number").text(closeMines);
        $("#"+this.id+" .number").css("opacity", "1") 
      } else if ($("#"+this.id).hasClass("bottom-right")){
        foo = parseInt(this.id);
        neighbors.push(upLeft(foo));
        neighbors.push(up(foo));
        neighbors.push(left(foo));
        var closeMines = 0;
        var n = 0;
        while (n < 3){
          if (jQuery.inArray(neighbors[n], mines) !== -1){
            closeMines++;
          }
          n++;
        }
        $("#"+this.id+" .number").text(closeMines);
        $("#"+this.id+" .number").css("opacity", "1")
      } else if ($("#"+this.id).hasClass("bottom")){
        foo = parseInt(this.id);
        neighbors.push(upLeft(foo));
        neighbors.push(up(foo));
        neighbors.push(upRight(foo));
        neighbors.push(right(foo));
        neighbors.push(left(foo));
        var closeMines = 0;
        var n = 0;
        while (n < 5){
          if (jQuery.inArray(neighbors[n], mines) !== -1){
            closeMines++;
          }
          n++;
        }
        $("#"+this.id+" .number").text(closeMines);
        $("#"+this.id+" .number").css("opacity", "1")
      } else if ($("#"+this.id).hasClass("bottom-left")){
        foo = parseInt(this.id);
        neighbors.push(up(foo));
        neighbors.push(upRight(foo));
        neighbors.push(right(foo));
        var closeMines = 0;
        var n = 0;
        while (n < 3){
          if (jQuery.inArray(neighbors[n], mines) !== -1){
            closeMines++;
          }
          n++;
        }
        $("#"+this.id+" .number").text(closeMines);
        $("#"+this.id+" .number").css("opacity", "1")
      } else if ($("#"+this.id).hasClass("left")){
        foo = parseInt(this.id);
        neighbors.push(up(foo));
        neighbors.push(upRight(foo));
        neighbors.push(right(foo));
        neighbors.push(downRight(foo));
        neighbors.push(down(foo));
        var closeMines = 0;
        var n = 0;
        while (n < 5){
          if (jQuery.inArray(neighbors[n], mines) !== -1){
            closeMines++;
          }
          n++;
        }
        $("#"+this.id+" .number").text(closeMines);
        $("#"+this.id+" .number").css("opacity", "1")
      } else if ($("#"+this.id).hasClass("top-left")){
        foo = parseInt(this.id);
        neighbors.push(right(foo));
        neighbors.push(downRight(foo));  
        neighbors.push(down(foo));
        var closeMines = 0;
        var n = 0;
        while (n < 3){
          if (jQuery.inArray(neighbors[n], mines) !== -1){
            closeMines++;
          }
          n++;
        }
        $("#"+this.id+" .number").text(closeMines);
        $("#"+this.id+" .number").css("opacity", "1");
      } else {
        foo = parseInt(this.id);
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
          if (jQuery.inArray(neighbors[n], mines) !== -1){
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
      minesCount++;
      $("#counterNum").text(minesCount);
    //flag a tile
    } else if (e.which === 3 & !$("#"+this.id).hasClass('flagged')){
      $("#"+this.id).css("background-color", "red").addClass("flagged");
      minesCount--;
      $("#counterNum").text(minesCount);
      if (minesCount === 0){
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
        $("#"+this.id).css("background-color", "white");
      }
    }
  });
  
  function explodeMines(){
    var l = 0;
    while (l < 10){
      $("#"+mines[l]).css("background-color", "black");
      l++;
    }
    $("#image").addClass("explode");
  }
  
  function checkFlags(){
    if (minesCount === 0){
      var f = 0;
      while (f < 10){
        if ($("#"+mines[f]).hasClass("flagged")) {
          f++;
        } else {
          return explodeMines();
        }
      }
      if (f === 10){
        w = 0;
        while (w < 10){
          $("#"+mines[w]).css("background-color", "green");
          w++;
        }
        $("#image").addClass("win");
      } 
    }
  }
  
  function cheat(){
    var m = 0;
    while (m < 10){
      $("#"+mines[m]).css("background-color", "red");
      m++;
    }
    minesCount = 0;
    $("#counterNum").text(minesCount);
  }
  
  //functions to check which tiles are the selected tile's neighbors
  function upLeft(x){
    ans = x - 9;
    return ans;
  }
  
  function up(x){
    ans = x - 8;
    return ans;
  }
  
  function upRight(x){
     ans = x - 7;
     return ans;
  }
  
  function right(x){
    ans = x + 1;
    return ans;
  }
  
  function downRight(x){
    ans = x + 9;
    return ans;
  }
  
  function down(x){
    ans = x + 8;
    return ans;
  }
  
  function downLeft(x){
    ans = x + 7;
    return ans;
  }
  
  function left(x){
    ans = x - 1;
    return ans;
  }    
});