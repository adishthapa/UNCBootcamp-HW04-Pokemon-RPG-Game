$(document).ready(function(){

    // The name of the player's Pokemon
    var player;
    // The max hp of the player's Pokemon
    var max_player_hp;
    // The current hp of the player's Pokemon
    var player_hp;
    // The initial attack damage of the player's Pokemon
    var player_attack;
    // The current attack damage of the player's Pokemon
    var current_attack;
    // The name of the cpu Pokemon
    var cpu;
    // The max hp of the cpu Pokemon
    var max_cpu_hp;
    // The current hp of the cpu Pokemon
    var cpu_hp;
    // The counter attack damage of the cpu Pokemon
    var cpu_counter;
    // An array that keeps track of the fights so far
    var fights = [];
    // Checks to see if there is a fight going on or not
    var fighting = false;
    // Checks to see if the current game has ended or not
    var end = false;

    // Bulbasaur Object
    var bulbasaur = {
        name : "Bulbasaur",
        hp: 100,
        attack: 15,
        counter: 5,
        img: "assets/images/bulbasaur.png",
        bg: "assets/images/grass.gif",
        color: "#7EC8AC",
        sound: "assets/sounds/bulbasaur.wav"
    }

     // Charmander Object
     var charmander = {
        name: "Charmander",
        hp: 150,
        attack: 5,
        counter: 20,
        img: "assets/images/charmander.png",
        bg: "assets/images/fire.gif",
        color: "#F47931",
        sound: "assets/sounds/charmander.wav"
    }

    // Squirtle Object
    var squirtle = {
        name: "Squirtle",
        hp: 120,
        attack: 8,
        counter: 15,
        img: "assets/images/squirtle.png",
        bg: "assets/images/water.gif",
        color: "#96D4CF",
        sound: "assets/sounds/squirtle.wav"
    }

    // Pikachu Object
    var pikachu = {
        name: "Pikachu",
        hp: 180,
        attack: 3,
        counter: 25,
        img: "assets/images/pikachu.png",
        bg: "assets/images/lightning.gif",
        color: "#FFD44A",
        sound: "assets/sounds/pikachu.mp3"
    }

    // Function that resets the game
    function reset() {
        document.getElementById("background-music").setAttribute("src", "assets/sounds/title.mp3");
        $("body").css({
            "background-image": "url('./assets/images/background1.png')"
        });
        $(".main").hide();
        $(".final").hide();
        $(".bulbasaur-col").show();
        $(".charmander-col").show();
        $(".squirtle-col").show();
        $(".pikachu-col").show();
        $("#attack").text("Attack!");
        $("#comments").html("");
        $(".start").show();
        fights = [];
        fighting = false;
        end = false;
    }

    // Function that occurs when the player chooses their Pokemon
    function startGame(pokemon) {
        document.getElementById("background-music").setAttribute("src", "assets/sounds/battle.mp3");
        document.getElementById("pokemon-sound").setAttribute("src", pokemon.sound);
        $("body").css({
            "background-image": "url('./" + pokemon.bg + "')"
        }); 
        $("#player h5").css({
            "background-color": pokemon.color
        });
        $(".player-img1").attr("src", pokemon.img);
        $(".player-img1").attr("id", pokemon.name.toLowerCase() + "1");
        $(".player-img2").attr("id", pokemon.name.toLowerCase() + "2");
        $("#player-name").text(pokemon.name);

        player = pokemon.name;
        player_hp = pokemon.hp;
        max_player_hp = pokemon.hp;
        player_attack = pokemon.attack;
        current_attack = pokemon.attack;

        $("#player-hp").html("HP: " + player_hp);
        $("#player .progress-bar").css("width","100%").attr("aria-valuemax", player_hp).attr("aria-valuenow", player_hp); 

        $("." + pokemon.name.toLowerCase() + "-col").hide();
        $("#cpu").hide();
        $(".start").hide();
        $(".main").show();
    };

    // Function that occurs when the player chooses their Opponent
    function setFighter(pokemon) {
        document.getElementById("pokemon-sound").setAttribute("src", pokemon.sound);
        $("#comments").html("");
        $("body").css({
            "background-image": "url('./" + pokemon.bg + "')"
        }); 
        $("#cpu h5").css({
            "background-color": pokemon.color
        });
        $(".cpu-img1").attr("src", pokemon.img);
        $(".cpu-img1").attr("id", pokemon.name.toLowerCase() + "1");
        $(".cpu-img2").attr("id", pokemon.name.toLowerCase() + "2");
        $("#opponent").text(pokemon.name);
        $("#cpu-name").text(pokemon.name);

        cpu = pokemon.name;
        cpu_hp = pokemon.hp;
        max_cpu_hp = pokemon.hp;
        cpu_counter = pokemon.counter;

        $("#cpu-hp").html("HP: " + cpu_hp);
        $("#cpu .progress-bar").css("width","100%").attr("aria-valuemax", cpu_hp).attr("aria-valuenow", cpu_hp); 

        $("." + pokemon.name.toLowerCase() + "-col").hide();
        $("#cpu").show();

        fights.push(pokemon);
        fighting = true;

        if (fights.length == 3) {
            $(".final").show();
        }
    }

    // Function that occurs when the player attacks their Opponent
    function battle() {
        cpu_hp -= current_attack;
        player_hp -= cpu_counter;
        if (cpu_hp <= 0) {
            if (fights.length === 3) {
                document.getElementById("background-music").setAttribute("src", "assets/sounds/victory.mp3");
                $("#comments").html("<p>Congrats! You did it! You Won!</p>")
                $("#attack").text("Restart Game");
                $("#cpu").hide();
                end = true;
            } else {
                $("#comments").html("<p>You have defeated " + cpu + "! Please choose another Pokemon to Battle!</p>")
                $("#cpu").hide();
                player_hp += cpu_counter;
                current_attack += player_attack;
                fighting = false;
            }
        } else if (player_hp <= 0) {
            document.getElementById("background-music").setAttribute("src", "assets/sounds/loss.mp3");
            player_hp = 0;
            $("#player-hp").html("HP: " + player_hp);
            $("#cpu-hp").html("HP: " + cpu_hp);
            $("#player .progress-bar").css("width","0%").attr("aria-valuenow", player_hp);
            $("#cpu .progress-bar").css("width", ((cpu_hp/max_cpu_hp)*100) + "%").attr("aria-valuenow", cpu_hp);  
            $("#comments").html("<p>Your Pokemon has lost the battle. Please try again!</p>")
            $("#attack").text("Restart Game");
            end = true;
        } else {
            $("#player-hp").html("HP: " + player_hp);
            $("#cpu-hp").html("HP: " + cpu_hp);
            $("#player .progress-bar").css("width", ((player_hp/max_player_hp)*100) + "%").attr("aria-valuenow", player_hp); 
            $("#cpu .progress-bar").css("width", ((cpu_hp/max_cpu_hp)*100) + "%").attr("aria-valuenow", cpu_hp); 
            $("#comments").html("<p>Your " + player + " has attacked " + cpu + " for " + current_attack + " damage. " + cpu + " has attacked " + player + " back for " + cpu_counter + " damage.</p>");
            current_attack += player_attack;
        }
    }

    // Initial reset of the game
    reset();

    // Looks for initial selection of Bulbasaur
    $(".bulbasaur-js1").on("click", function() {
        startGame(bulbasaur);
    });

    // Looks for initial selection of Charmander
    $(".charmander-js1").on("click", function() {
        startGame(charmander);
    });

    // Looks for initial selection of Squirtle
    $(".squirtle-js1").on("click", function() {
        startGame(squirtle);
    });

    // Looks for initial selection of Pikachu
    $(".pikachu-js1").on("click", function() {
        startGame(pikachu);
    });

    // Looks for opponent selection of Bulbasaur
    $(".bulbasaur-js2").on("click", function() {
        if (fighting === false) {
            setFighter(bulbasaur);
        }
    });

    // Looks for opponent selection of Charmander
    $(".charmander-js2").on("click", function() {
        if (fighting === false) {
            setFighter(charmander);
        }
    });

    // Looks for opponent selection of Squirtle
    $(".squirtle-js2").on("click", function() {
        if (fighting === false) {
            setFighter(squirtle);
        }
    });

    // Looks for opponent selection of Pikachu
    $(".pikachu-js2").on("click", function() {
        if (fighting === false) {
            setFighter(pikachu);
        }
    });

    // Looks for attack made by the player
    $("#attack").on("click", function() {
        if (end) {
            reset();
        } else {
            if (fighting === false) {
                if (fights.length === 0) {
                    $("#comments").html("<p>Please select a Pokemon to Battle!</p>");
                } 
            } else {
                battle();
            }
        }
    });
    

});