(function() {

    var intentos = 0;
    var adivinados = 0;
    var audioCard = new Audio("music/page-flip-18.wav");
    var check = new Audio("music/points.mp3");
    var gameOver = new Audio("music/Game-over-ident.mp3")
    var winAudio = new Audio("music/win.mp3")
    var loopAudio = new Audio("music/musicloop.mp3")
    var fail = new Audio("music/Fail-sound.mp3")
    var timerAudio = new Audio("music/Timer-clicking-sound.mp3")
    var temp = false;
    var win = false;

    var seg = 0;



    gameOver.volume = 0.8;
    winAudio.volume = 0.8;
    loopAudio.volume = 0.8;


    var Memory = {

        init: function(cards) {
            this.$game = $(".game");
            this.$modal = $(".modal");
            this.$message = $(".winner");
            this.$overlay = $(".modal-overlay");
            this.$restartButton = $("button.restart");
            this.$points = $("#intentos");
            this.$correctos = $("#correctos");
            this.$reloj = $("#reloj");
            this.cardsArray = $.merge(cards, cards);
            this.timerSet;
            this.shuffleCards(this.cardsArray);

            this.setup();
        },

        shuffleCards: function(cardsArray) {
            this.$cards = $(this.shuffle(this.cardsArray));
        },

        setup: function() {
            this.html = this.buildHTML();
            this.$game.html(this.html);
            this.$memoryCards = $(".card");
            this.paused = false;
            this.guess = null;
            this.$points.text("0");

            this.binding();
        },

        binding: function() {
            this.$memoryCards.on("click", this.cardClicked);
            this.$restartButton.on("click", $.proxy(this.reset, this));
            this.$reloj.on("click", this.temp)
        },

        cardClicked: function() {
            var _ = Memory;

            var $card = $(this);


            _.$points.text(intentos);
            audioCard.cloneNode(true).play()


            if (!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")) {
                $card.find(".inside").addClass("picked");
                if (!_.guess) {
                    _.guess = $(this).attr("data-id");

                    intentos += 1;
                } else if (_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")) {
                    $(".picked").addClass("matched");
                    _.guess = null;
                    adivinados += 1

                    _.$correctos.text(adivinados);
                    check.cloneNode(true).play()



                } else {
                    _.guess = null;
                    _.paused = true;

                    setTimeout(function() {
                        fail.play();
                        $(".picked").removeClass("picked");
                        Memory.paused = false;
                    }, 600);

                    setTimeout(function() {

                        fail.pause();
                        fail.currentTime = 0;

                    }, 1800);



                }


                if (intentos == 29 && temp == false) {
                    _.win(false);
                    win = false
                    return;
                }


                if ($(".matched").length == $(".card").length) {
                    win = true;
                    if (temp == false) {
                        _.win(true);
                    }
                }
            }
        },

        win: function(status) {
            var that = this;
            this.paused = true;
            setTimeout(function() {

                if (temp) {

                    timerAudio.pause();
                    timerAudio.currentTime = 0;

                }
                if (!status) {
                    that.$message.text("Perdiste! :(");
                    gameOver.play();
                } else {
                    winAudio.play();
                }
                Memory.showModal();
                Memory.$game.fadeOut();
            }, 1000);
        },

        showModal: function() {
            this.$overlay.show();
            this.$modal.fadeIn("slow");
        },

        hideModal: function() {
            this.$overlay.hide();
            this.$modal.hide();
        },

        reset: function() {
            this.hideModal();
            this.shuffleCards(this.cardsArray);
            this.setup();
            this.$game.show("slow");
            this.$reloj.text("Temporizador")
            this.$correctos.text("0")
            intentos = 0;
            seg = 0;
            adivinados = 0;
            win = false

            clearInterval(this.timerSet);
            temp = false;

        },

        shuffle: function(array) {
            var counter = array.length,
                temp, index;
            while (counter > 0) {
                index = Math.floor(Math.random() * counter);
                counter--;
                temp = array[counter];
                array[counter] = array[index];
                array[index] = temp;
            }
            return array;
        },

        buildHTML: function() {
            var frag = '';
            this.$cards.each(function(k, v) {
                frag += '<div class="card" data-id="' + v.id + '"><div class="inside">\
				<div class="front"><img src="' + v.img + '"\
				alt="' + v.name + '" /></div>\
				<div class="back"><img src="imgs/question-mark.png"\
				alt="Codepen" /></div></div>\
				</div>';
            });
            return frag;
        },
        temp: function() {
            var _ = Memory;
            if (temp == false && intentos == 0 && adivinados == 0) {
                temp = true;
                timerAudio.play();
                timerAudio.loop = true;
                _.timerSet = setInterval(_.timer, 1000);
            }
        },
        timer: function() {
            var _ = Memory;
            seg += 1;
            var minutes = Math.floor(seg / 60),
                seconds = Math.floor(seg - minutes * 60),
                x = minutes < 10 ? "0" + minutes : minutes,
                y = seconds < 10 ? "0" + seconds : seconds;

            if (seg == 114 && win == false) {


                _.win(false);

                return;
            } else {

                if (seg < 114 && win == true) {


                    _.win(true);

                    return
                }

            }
            console.log(Memory.$reloj.text(x + " : " + y))
        }

    };

    var cards = [{
            name: "costoVentas",
            img: "imgs/CostosDeVentas.png",
            id: 1,
        },
        {
            name: "utilidadNeta",
            img: "imgs/UtilidadNeta.png",
            id: 2
        },
        {
            name: "ventasNetas",
            img: "imgs/VentasNetas.png",
            id: 3
        },
        {
            name: "Depreciacion",
            img: "imgs/Depreciacion.png",
            id: 4
        },
        {
            name: "estadoDeResultados",
            img: "imgs/EstadoResult.png",
            id: 5
        },
        {
            name: "gastoAdmin",
            img: "imgs/GastosAdministrativos.png",
            id: 6
        },
        {
            name: "utilidadBruta",
            img: "imgs/UtilidadBruta.png",
            id: 7
        },
        {
            name: "utilidadAntImpuestos",
            img: "imgs/1.png",
            id: 8
        },
        {
            name: "utilidadOp",
            img: "imgs/2.png",
            id: 9
        },
        {
            name: "gastosDeVenta",
            img: "imgs/3.png",
            id: 10
        },
        {
            name: "impuestos",
            img: "imgs/4.png",
            id: 11
        },
        {
            name: "intereses",
            img: "imgs/5.png",
            id: 12
        },
    ];

    Memory.init(cards);

})();