$(document).ready(acceptKeyToMove);

function buildTrack(size) {
  for(var i = 0; i < size; i++) {
    $('tr.strip').append('<td></td>');
  }
}

function gameOver() {
  return $('tr.strip td:last-child').hasClass('active');
}

function getWinner() {
  return $('tr.strip td:last-child.active').parent().attr("id");
}

function acceptKeyToMove() {
  buildTrack(35);
  var startTime = (new Date().getTime() / 1000 );
  $(document).keyup(function(event) {
    if (gameOver()) {
      $(document).unbind('keyup');
      var endTime = (new Date().getTime() / 1000 );
      var duration = (endTime - startTime);
      var winnerId = getWinner();
      var data = {game_id: gameId, duration: duration, winner_id: winnerId};
      $.post('/game_over', data, function(response){
        $('body').append(response);
      });
      // var playAgain = confirm("GAME OVER! TIME OF: " + (winTime) + " S, PLAY AGAIN?");
      // if (playAgain) { location.reload(); }
    }
    else {
      event.preventDefault();
      var key = event.which;
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
  });
}
