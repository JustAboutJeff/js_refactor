(function(window) {
  $(document).ready(function(){
    var player1 = new Player($('.strip:nth-child(1)').attr("id"),$('.strip:nth-child(1)').data("initials"));
    var player2 = new Player($('.strip:nth-child(2)').attr("id"),$('.strip:nth-child(2)').data("initials"));

    var game = new Game();

    buildTrack(35);

    $(document).on('keyup', function(event) {
      game.onKeyUp(event.which);
    });
  });

var counter = 0;

function Game() {
  this.onKeyUp = function(key) {
    counter ++;
    if (counter === 1) {
      this.startTime = new Date().getTime();
    }
    if (this.gameOver()) {
      $(document).unbind('keyup');
      this.postResults();
    }
    else {
      event.preventDefault();
      switch(key) {
        case 192: //RED BIKE, KEY = `
          $('.strip:nth-child(1) > td.active').removeClass('active').next().addClass('active');
          break;
        case 90: //BLUE BIKE, KEY = z
          $('.strip:nth-child(2) > td.active').removeClass('active').next().addClass('active');
          break;
        case 220: //GREEN BIKE, KEY = \
          $('.strip:nth-child(3) > td.active').removeClass('active').next().addClass('active');
          break;
        case 191: //YELLOW BIKE, KEY = /
          $('.strip:nth-child(4) > td.active').removeClass('active').next().addClass('active');
          break;
        default:
          break;
      }
    }
  },
  this.gameOver = function () {
    return $('tr.strip td:last-child').hasClass('active');
  },
  this.getWinner = function () {
    return $('tr.strip td:last-child.active').parent().attr("id");
  },
  this.postResults = function() {
    var endTime = new Date().getTime();
    this.duration = ((endTime - this.startTime) / 1000 );
    var winnerId = this.getWinner();
    var data = { game_id: gameId, duration: this.duration, winner_id: winnerId };
    $.post('/game_over', data, function(response){ $('body').append(response); });
  }
};

function buildTrack(size) {
  for(var i = 0; i < size; i++) {
    $('tr.strip').append('<td></td>');
  }
}

function Player(id,initials,position) {
  this.id = id;
  this.initials = initials;
  this.position = position;
}

}(window));



