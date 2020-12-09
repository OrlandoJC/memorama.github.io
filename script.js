(function() {

    var intentos = 0;
    var Memory = {

        init: function(cards) {
            this.$game = $(".game");
            this.$modal = $(".modal");
            this.$message = $(".winner");
            this.$overlay = $(".modal-overlay");
            this.$restartButton = $("button.restart");
            this.cardsArray = $.merge(cards, cards);
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
            this.binding();
        },

        binding: function() {
            this.$memoryCards.on("click", this.cardClicked);
            this.$restartButton.on("click", $.proxy(this.reset, this));
        },

        cardClicked: function() {
            var _ = Memory;
            var $card = $(this);

            intentos += 1;
            if (!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")) {
                $card.find(".inside").addClass("picked");
                if (!_.guess) {
                    _.guess = $(this).attr("data-id");
                } else if (_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")) {
                    $(".picked").addClass("matched");
                    _.guess = null;
                } else {
                    _.guess = null;
                    _.paused = true;
                    setTimeout(function() {
                        $(".picked").removeClass("picked");
                        Memory.paused = false;
                    }, 600);
                }

                if (intentos == 48) {
                    _.win(false);

                    return;
                }
                if ($(".matched").length == $(".card").length) {
                    _.win(true);
                }
            }
        },

        win: function(status) {
            var that = this;
            this.paused = true;
            setTimeout(function() {

                if (!status) that.$message.text("Perdiste! :(");
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
            intentos = 0;
        },

        shuffle: function(array) {
            var counter = array.length,
                temp, index;
            // While there are elements in the array
            while (counter > 0) {
                // Pick a random index
                index = Math.floor(Math.random() * counter);
                // Decrease counter by 1
                counter--;
                // And swap the last element with it
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
				<div class="back"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThUqsyUOGRdJSErbfxvtASout-NNmGZtpAcA&usqp=CAU"\
				alt="Codepen" /></div></div>\
				</div>';
            });
            return frag;
        }
    };

    var cards = [{
            name: "costoVentas",
            img: "../src/imgs/CostosDeVentas.png",
            id: 1,
        },
        {
            name: "utilidadNeta",
            img: "../src/imgs/UtilidadNeta.png",
            id: 2
        },
        {
            name: "ventasNetas",
            img: "../src/imgs/VentasNetas.png",
            id: 3
        },
        {
            name: "Depreciacion",
            img: "../src/imgs/Depreciacion.png",
            id: 4
        },
        {
            name: "estadoDeResultados",
            img: "../src/imgs/EstadoResult.png",
            id: 5
        },
        {
            name: "gastoAdmin",
            img: "../src/imgs/GastosAdministrativos.png",
            id: 6
        },
        {
            name: "utilidadBruta",
            img: "../src/imgs/UtilidadBruta.png",
            id: 7
        },
        {
            name: "utilidadAntImpuestos",
            img: "../src/imgs/1.png",
            id: 8
        },
        {
            name: "utilidadOp",
            img: "../src/imgs/2.png",
            id: 9
        },
        {
            name: "gastosDeVenta",
            img: "../src/imgs/3.png",
            id: 10
        },
        {
            name: "impuestos",
            img: "../src/imgs/4.png",
            id: 11
        },
        {
            name: "intereses",
            img: "../src/imgs/5.png",
            id: 12
        },
    ];



    Memory.init(cards);


})();