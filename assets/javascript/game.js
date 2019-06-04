$(document).ready(function(){

    var player_hp;
    var player_attack;
    var cpu_hp;
    var cpu_attack;
    var cpu_counter;
    var fights = [];

    var bulbasaur = {
        name : "Bulbasaur",
        hp: 100,
        attack: 10,
        counter: 5,
        img: "assets/images/bulbasaur.png",
        bg: "assets/images/grass.gif",
        color: "#7EC8AC"
    }

    var squirtle = {
        name: "Squirtle",
        hp: 120,
        attack: 8,
        counter: 10,
        img: "assets/images/squirtle.png",
        bg: "assets/images/water.gif",
        color: "#96D4CF"
    }

    var charmander = {
        name: "Charmander",
        hp: 150,
        attack: 6,
        counter: 15,
        img: "assets/images/charmander.png",
        bg: "assets/images/fire.gif",
        color: "#F47931"
    }

    var pikachu = {
        name: "Pikachu",
        hp: 180,
        attack: 4,
        counter: 20,
        img: "assets/images/pikachu.png",
        bg: "assets/images/lightning.gif",
        color: "#FFD44A"
    }

    function reset() {
        $("body").css({
            "background-image": "url('./assets/images/background1.png')"
        });
        $(".main").hide();
    }

    function startGame(pokemon) {
        $("body").css({
            "background-image": "url('./" + pokemon.bg + "')"
        }); 
        $("#player h3").css({
            "background-color": pokemon.color
        });
        $(".player-img1").attr("src", pokemon.img);
        $(".player-img1").attr("id", pokemon.name.toLowerCase() + "1");
        $(".player-img2").attr("id", pokemon.name.toLowerCase() + "2");
        $("#player-name").text(pokemon.name);

        player_hp = pokemon.hp;
        player_attack = pokemon.attack;

        $("#player-hp").html(player_hp);

        $(".add-pokemon " + "#" + pokemon.name.toLowerCase() + "-js2").hide();
        $("#cpu").hide();
        $(".start").hide();
        $(".main").show();
    };

    function setFighter(pokemon) {
        $("body").css({
            "background-image": "url('./" + pokemon.bg + "')"
        }); 
        $("#cpu h3").css({
            "background-color": pokemon.color
        });
        $(".cpu-img1").attr("src", pokemon.img);
        $(".cpu-img1").attr("id", pokemon.name.toLowerCase() + "1");
        $(".cpu-img2").attr("id", pokemon.name.toLowerCase() + "2");
        $("#cpu-name").text(pokemon.name);

        cpu_hp = pokemon.hp;
        cpu_attack = pokemon.attack;
        cpu_counter = pokemon.counter;

        $("#cpu-hp").html(cpu_hp);

        $(".add-pokemon " + "#" + pokemon.name.toLowerCase() + "-js2").hide();
        $("#cpu").show();
    }

    reset();


    $("#bulbasaur-js1").on("click", function() {
        startGame(bulbasaur);
    });

    $("#squirtle-js1").on("click", function() {
        startGame(squirtle);
    });

    $("#charmander-js1").on("click", function() {
        startGame(charmander);
    });

    $("#pikachu-js1").on("click", function() {
        startGame(pikachu);
    });

    var fighting = false;

    $("#bulbasaur-js2").on("click", function() {
        if (fighting === false) {
            setFighter(bulbasaur);
        }
    });

    $("#squirtle-js2").on("click", function() {
        if (fighting === false) {
            setFighter(squirtle);
        }
    });

    $("#charmander-js2").on("click", function() {
        if (fighting === false) {
            setFighter(charmander);
        }
    });

    $("#pikachu-js2").on("click", function() {
        if (fighting === false) {
            setFighter(pikachu);
        }
    });
    

});