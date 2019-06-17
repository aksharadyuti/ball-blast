


        var requestAnimationFrame = (function () {
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
        })();
        var t = 0;
        var highScore = 0;
        var particles = [];
        var rocks = [];
        var tick = 0;
        var rec;
        var k = 1;
        var rx = 0, ry = canvas.height - 40;
        var score = 0;
        var q = 0;





        var fps = 40;
        var now;
        var start = 1;
        var then = Date.now();
        var interval = 1000 / fps;
        var delta;
        var req = requestAnimationFrame(loop);



        function loop() {
            requestAnimationFrame(loop);

            if (start == 1) {
                createParticles();
                updateParticles();

                k = killParticles();
                var canvas = document.getElementById('canvas');

                c = canvas.getContext('2d');
                if (t == 0) {
                    var cn = new Image();
                    cn.onload = function () {
                        c.drawImage(cn, 0, 0, 187, 256, rx, 450, 70, 100);
                    }
                    cn.src = '123.png';
                }



                document.addEventListener('keydown', function (event) {
                    if (event.code == 'KeyA' || event.code == 'ArrowLeft') {
                        /* c.fillStyle = "black";
                         c.fillRect(rx, ry, 30, 30);
                         if (rx > 0)
                             rx -= 0.05;
                         c.fillStyle = "red";
                         c.fillRect(rx, ry, 30, 30); */
                        if (t == 0) {
                            if (rx > 0) {
                                rx -= 0.05;
                                var cn = new Image();
                                cn.onload = function () {
                                    c.drawImage(cn, 0, 0, 187, 256, rx, 450, 70, 100);
                                }
                                cn.src = '123.png';
                            }

                        }
                    }
                });
                document.addEventListener('keydown', function (event) {
                    if (event.code == 'KeyD' || event.code == 'ArrowRight') {

                        /* c.fillStyle = "black";
                         c.fillRect(rx, ry, 30, 30);
                         if (rx + 30 <= canvas.width) {
                             rx += 0.05;
                         }
                         c.fillStyle = "red";
                         c.fillRect(rx, ry, 30, 30); */
                        if (t == 0) {
                            if (rx + 30 <= canvas.width) {
                                rx += 0.05;
                                var cn = new Image();
                                cn.onload = function () {
                                    c.drawImage(cn, 0, 0, 187, 256, rx, 450, 70, 100);

                                }
                                cn.src = '123.png';

                            }
                        }
                    }
                });
                if (k != 0) {
                    drawParticles();
                }

                if (k == 0) {
                    highScore = localStorage.getItem('highScore');
                    if (score > highScore) {
                        console.log(score);
                        console.log(highScore);
                        highScore = score;
                        console.log(highScore);

                        localStorage.removeItem('highScore');
                        localStorage.setItem('highScore', highScore);
                        console.log(localStorage.getItem('highScore'));
                    }
                    start = 0;
                    // var canvas = document.getElementById('canvas');
                    //var c = canvas.getContext('2d');
                    cancelAnimationFrame(req);

                    for (var i in particles) {
                        var part = particles[i];
                        particles.pop(particles[i]);
                    }
                    for (var j in rocks) {
                        var part_ = rocks[j];
                        rocks.pop(rocks[j]);

                    } c.clearRect(0, 0, canvas.width, canvas.height);
                    var ck = canvas.getContext('2d');


                    ck.fillStyle = "black";
                    ck.fillRect(0, 0, canvas.width, canvas.height);
                    ck.fillStyle = "white";
                    ck.font = "40px Serif";

                    ck.fillText("GAME OVER", 120, 100);

                    ck.fillStyle = "red";
                    ck.font = "30px Serif";
                    ck.fillText("SCORE: " + score, 160, 200);
                    ck.fillStyle = "white";
                    ck.font = "20px Arial";
                    var hs = localStorage.getItem('highScore');

                    ck.fillText("High Score: " + hs, 160, 250);
                    ck.fillText("press space to restart", 150, 350);

                    ck.fillStyle = "black";
                    ck.fillRect(rx, 470, 30, 30);
                    cancelAnimationFrame(loop);


                    document.addEventListener('keydown', function (event) {
                        if (event.code == 'Space') {

                            score = 0;
                            ck.clearRect(0, 0, canvas.width, canvas.height);
                            document.location.reload();


                        }

                    });


                }
            }
        }








        var tickk = 100;


        function createParticles() {
            tick++;
            tickk += 5;
            if (tickk % 100 == 0) {

                if (particles.length < score + 30) {
                    //for(var p=0;p<score+20;p++){
                    particles.push({
                        x: rx + 30,
                        y: ry - 10,
                        speed: -10,
                        radius: 5,
                        color: "white",

                    });
                } //}

                var j = 0; var xd = 1;


                if (tick % 100 == 0) {
                    if (rocks.length < 6) {

                        var ot = 1 + Math.floor(Math.random() * 10);
                        let r = (18 + ot * 2);


                        rocks.push({
                            x: 0,
                            y: 0,
                            xspeed: 2 + Math.random() * 2,
                            yspeed: 1,
                            radius: r,
                            color: "blue",
                            text: ot,
                            otext: ot,
                            turn: 0,

                        });

                    }
                }
            }
        }
        function updateParticles() {
            var today = new Date();
            var time = today.getSeconds();
            for (var i in particles) {
                var part = particles[i];

                part.y += part.speed;
            }

            for (var i in rocks) {
                var part_ = rocks[i];


                part_.y += (part_.yspeed);
                part_.x += part_.xspeed;
            }


        }

        var xd = -1;
        function killParticles() {
            var canvas = document.getElementById('canvas');


            for (var i in particles) {
                var part = particles[i];
                if (part.y < 0) {


                    part.y = 460;
                    part.x = rx + 30;

                }
            }

            var dir = [1, -1];
            var xd = [0, canvas.width];
            var s = [0, 1];
            var sel = s[Math.floor(Math.random() * 2)];
            for (var i in rocks) {
                var part_ = rocks[i];

                if (part_.y > canvas.height || part_.y < 0) {

                    part_.yspeed = -1 * part_.yspeed;
                    part_.x += part_.xspeed;
                    part_.y += part_.yspeed;


                }
                else if (part_.x < 0 || part_.x > canvas.width) {
                    part_.xspeed = -1 * part_.xspeed;
                    part_.x += part_.xspeed;
                    part_.y += part_.yspeed;

                }
            }
            //gameover
            for (var i in rocks) {
                part_ = rocks[i];
                var dxx = Math.abs(part_.x - rx);
                var dyy = Math.abs(part_.y - canvas.height + 15);
                var diff = Math.sqrt(dxx * dxx + dyy * dyy);
                if (diff < 16 + part_.radius) {
                    console.log("GameOver");
                    t = 1;
                    var myAudio = document.createElement("audio");
                    myAudio.src = "fail.wav";
                    myAudio.play();
                    myAudio.pause();

                    return 0;

                }
            }

            for (var i in rocks) {
                var part_ = rocks[i];

                for (var i in particles) {
                    part = particles[i];
                    for (var j in rocks) {
                        part_ = rocks[j];
                        var dx = (part_.x - part.x);
                        var dy = (part_.y - part.y);
                        var diff = Math.sqrt(dx * dx + dy * dy);
                        if (diff < part.radius + part_.radius) {
                            var myAudio = document.createElement("audio");
                            myAudio.src = "src.flac";
                            myAudio.play();
                            score += 10;
                            var c = canvas.getContext('2d');
                            c.font = "16px Arial";

                            c.fillStyle = "red";
                            c.fillText(score, 15, 10);
                            particles.pop(part);
                            i--;
                            if (part_.text > 1) {
                                part_.text -= 1;
                                if (part_.radius > 20)
                                    part_.radius -= 1;
                            }
                            else if (part_.turn == 0 && part_.otext > 1) {


                                /* var dir = [1, -1];
                                 var xd = [0, canvas.width];
                                 var s = [0, 1];
                                 var sel = s[Math.floor(Math.random() * 2)];
 
 
                                 part_.x = xd[sel];
                                 part_.xspeed = dir[sel] * Math.random() * 3;
                                 part_.y = 0;
                                 part_.text = 1 + Math.floor(Math.random() * 20);
                                 part_.color = "green"; */
                                var a = -1 * part_.xspeed;
                                rocks.pop(rocks[i]);
                                for (var k = 0; k < 2; k++) {
                                     var n = Math.ceil(part_.otext / 2);
                                    rocks.push({
                                        x: part_.x,
                                        y: part_.y,
                                        xspeed: a,
                                        yspeed: part_.yspeed,
                                        radius: 18 +  n * 2,
                                        color: "#D53F4C",
                                        text: n,
                                        turn: 1,



                                    });
                                    a *= -1;
                                    console.log(part_.otext);
                                    drawParticles();
                                }

                            }
                            else {
                                console.log("here");
                                var dir = [1, -1];
                                var xd = [0, canvas.width];
                                var s = [0, 1];
                                var sel = s[Math.floor(Math.random() * 2)];


                                part_.x = xd[sel];
                                part_.xspeed = dir[sel] * Math.random() * 3;
                                part_.y = 0;
                                part_.text = 1 + Math.floor(Math.random() * 20);
                                part_.otext = part_.text;
                                part_.color = "#510B7C ";
                                part_.radius = 10 + (part_.text*2);
                                part_.turn = 0;
                                
                                console.log(part_.radius);
                                drawParticles();


                            }
                            console.log("hit");

                           


                        }


                    }
                }











            }
        }


        function drawParticles() {
            var c = canvas.getContext('2d');
            var img = new Image();
            img.onload = function () {
                c.drawImage(img, 0, 0, 500, 500);


            }

            img.src = 'b.jpg';
            var cn = new Image();
            cn.onload = function () {
                c.drawImage(cn, 0, 0, 187, 256, rx, 450, 70, 100);

            }
            cn.src = '123.png';

            /* c.fillStyle = "red";
             c.fillRect(rx, ry, 30, 30); */
            for (var i in particles) {
                var part = particles[i];
                c.beginPath();
                c.arc(part.x, part.y, part.radius, 0, Math.PI * 2);
                c.closePath();
                c.fillStyle = part.color;
                c.fill();
            }
            for (var i in rocks) {
                var part_ = rocks[i];
                c.beginPath();
                c.arc(part_.x, part_.y, part_.radius, 0, Math.PI * 2);
                c.closePath();
                c.fillStyle = part_.color;

                c.fill();
                c.fillStyle = "white";
                c.font = "25px sans-serif";

                c.fillText(part_.text, part_.x - part_.radius / 2, part_.y + part_.radius / 8);
                c.font = "20px Arial";

                c.fillStyle = "red";
                c.fillText(score, 15, 20);

                c.font = "10px Arial";

                c.fillText("Bullet Rate : " + (score / 100 + 2), 400, 20);
            }
        }



