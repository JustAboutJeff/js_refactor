get '/' do
  erb :welcome
end

post '/' do
  @game = Game.new
  params[:player].each_value do |initials|
    if initials.length == 3
      @player = Player.find_or_create_by_initials( :initials => initials )
      @game.players << @player
    end
  end
  @game.save
    if @game.valid?
      erb :game
    else
      # erb :error
    end
end

get '/game_over/:id' do
  @game = Game.find(params[:id])
  erb :game_over
end

post '/game_over' do
  @game = Game.find(params[:game_id])
  @game.winner = params[:winner_id]
  @game.duration = params[:duration]
  @game.save
  p @game
  erb :game_over, :layout => false
end
