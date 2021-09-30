    //  global scope variable;
    var i = 0;
    var seq = []; //array for storing game generates sequence
    var str = []; //array for storing user input sequence
    var started = false;
    
    // constants
    const s1 = new Audio("sounds/red.mp3");
    const s2 = new Audio("sounds/green.mp3");
    const s3 = new Audio("sounds/yellow.mp3");
    const s4 = new Audio("sounds/blue.mp3");
    const s5 = new Audio("sounds/wrong.mp3");

    // functions

    //display number takes in a box number and makes animation and sound of that box generated.
    function displayrunner(n) {
        switch (n) {
            case 1:
                s1.play();
                $(".red").addClass("hide");
                setTimeout(() => {
                    $(".red").removeClass("hide");
                }, 200);
                break;
            case 2:
                s2.play();
                $(".green").addClass("hide");
                setTimeout(() => {
                    $(".green").removeClass("hide");
                }, 200);
                break;
            case 3:
                s3.play();
                $(".yellow").addClass("hide");
                setTimeout(() => {
                    $(".yellow").removeClass("hide");
                }, 200);
                break;
            case 4:
                s4.play();
                $(".blue").addClass("hide");
                setTimeout(() => {
                    $(".blue").removeClass("hide");
                }, 200);
                break;


        }
    }

    // press function makes the input given box sound when pressed by user

    function press(n) {
        switch (n) {
            case 1:
                s1.play();
                $(".red").addClass("pressed");

                setTimeout(() => {
                    $(".red").removeClass("pressed")
                }, 200);

                break;
            case 2:
                s2.play();
                $(".green").addClass("pressed");
                setTimeout(() => {
                    $(".green").removeClass("pressed");
                }, 200);
                break;
            case 3:
                s3.play();
                $(".yellow").addClass("pressed");
                setTimeout(() => {
                    $(".yellow").removeClass("pressed");
                }, 200);
                break;
            case 4:
                s4.play();
                $(".blue").addClass("pressed");
                setTimeout(() => {
                    $(".blue").removeClass("pressed");
                }, 200);
                break;


        }
    }

    //   runner function 
    function runner() {
        i = 0;
        str = [];
        var r = Math.floor(Math.random() * 4 + 1);
        setTimeout(() => {
            displayrunner(r);
        }, 1000);

        return r
    }



    //   PROGRAM
    if (screen.width>950) {
       
        $(document).keydown((evt) => {
            if (($("h1").html() === "Press A Key to Start") && ((evt.key == "a") || (evt.key == "A"))) {
                $("h1").html("level 1")
                started = true;
                start();
            }
            if (($("h1").html() === "Game Over!.... Press any key to continue")) {
                $("h1").html("level 1");
                $("h2").html("");
                document.querySelector("button").click();
                start();
            }
        })

    }
    else {
        $("h1").html("Click here to start the game");
        $("h1").click(function () {
            if ($("h1").html() == "Click here to start the game") {
                $("h1").html("level 1")
                started = true;
                start();
            }
            if ($("h1").html() == "Game Over!.... click here to play again") {
                $("h1").html("level 1");
                $("h2").html("");
                document.querySelector("button").click();
                start();
            }

        })
    }




    $(".btn").click(function () {
        if (started == true) {

            console.log("i is " + i);
            str[i] = parseInt(this.innerHTML);
            console.log("you clicked" + str[i]);
            press(str[i]);

            if (str[i] == seq[i]) {
                i++;
                console.log('i++');
            } else {

                if(screen.width>950){

                    $("h1").html("Game Over!.... Press any key to continue");
                }
                else{
                    $("h1").html("Game Over!.... click here to play again");

                }

                $("h2").html("last game over at level "+seq.length);
                document.querySelector("button").value = seq.length;
                console.log("level value"+document.querySelector("button").value);

                console.log("over")
                s5.play();
                i = 0;
            }

            if (i == seq.length) {
                var tem = runner();
                seq.push(tem);
                console.log(seq);
                $("h1").html("Level " + seq.length);
            }
        }
    })


    function start() {
        seq = [];
        console.log(seq.length)
        seq.push(runner());
        console.log(seq);
    }
