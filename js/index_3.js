window.onload = function() {

    var stage = document.getElementById('stage');
    var context = stage.getContext("2d");
        document.addEventListener("keydown", keyPush);

    setInterval(game, 90);

    const velocity = 1;

    var velocityX = velocityY = 0;
    var positionX = 10;
    var positionY = 15;
    var piecesize = 30;
    var amountsize = 20;
//    var appleX = appleY = 15;
    var appleX = Math.floor(Math.random()*amountsize);
    var appleY = Math.floor(Math.random()*amountsize);

    var trail = [];
    tail = 5;

    function game() {
        positionX += velocityX;
        positionY += velocityY;

        if( positionX <0) {
            positionX = amountsize -1;
        }
        if( positionX > amountsize -1) {
            positionX = 0;
        }
        if( positionY <0) {
            positionY = amountsize -1;
        }
        if( positionY > amountsize -1) {
            positionY = 0;
        }

        context.fillStyle = "white";
        context.fillRect(piecesize,piecesize, piecesize,piecesize);

        context.fillStyle = "black";
        context.fillRect(0,0, stage.width, stage.height);

        const bloqueantes = [
            {
                positionX1: 150,
                positionX2: 450,
                positionY: 150,
                width: piecesize,
                height: 300
            }
        ]

        bloqueantes.forEach(function(bloq){
            context.fillStyle = "white";
            context.fillRect(bloq.positionX1, bloq.positionY, bloq.width, bloq.height);
            context.fillRect(bloq.positionX2, bloq.positionY, bloq.width, bloq.height);            
        })


        xAtual = appleX * piecesize;
        yAtual = appleY * piecesize;

        while(((bloqueantes.positionX1 == xAtual) || (bloqueantes.positionX2 == xAtual)) && ((yAtual >= bloqueantes.positionY) && (yAtual <= (bloqueantes.positionY + bloqueantes.height))))
        {
            appleX = Math.floor(Math.random()*amountsize);
            appleY = Math.floor(Math.random()*amountsize);                

            xAtual = appleX * piecesize;
            yAtual = appleY * piecesize;
        }

        context.fillStyle = "red";
        context.fillRect(appleX*piecesize, appleY*piecesize, piecesize,piecesize);


        context.fillStyle = "green";
        for (var i = 0; i < trail.length; i++) {
            context.fillRect(trail[i].x * piecesize, trail[i].y * piecesize,piecesize -1, piecesize -1);
                if (trail[i].x == positionX && trail[i].y == positionY) {
                    velocityX = velocityY = 0;
                    tail = 5;
                    const pontuacaoAnterior = Number(document.Frm1._total.value)

                    document.Frm1._total2.value = Number(document.Frm1._total2.value) - (document.Frm1._total.value)

                    if (Number(document.Frm1._total2.value) < 0)
                      document.Frm1._total2.value = 0

                    sessionStorage.setItem("_total2", document.Frm1._total2.value)                      

                    document.Frm1._total.value=0;

                    if(pontuacaoAnterior > 0){
                        document.Frm1._vidas.value = Number(document.Frm1._vidas.value) - 1; 

                        if (Number(document.Frm1._vidas.value) < 0)
                          document.Frm1._vidas.value = 0;

                        sessionStorage.setItem("_vidas", document.Frm1._vidas.value)                       

                        if (document.Frm1._vidas.value == "0")
                         {
                          alert("Game Over")
                          document.Frm1.action = "game.html"
                          document.getElementById("restarbtn").click()
                          document.Frm1.submit()
                         }
                    }
                }

        }
            
        bloqueantes.forEach(bloq => {
            const xAtual = positionX * piecesize
            const yAtual = positionY * piecesize

            if (((bloq.positionX1 == xAtual) || (bloq.positionX2 == xAtual)) && ((yAtual >= bloq.positionY) && (yAtual <= (bloq.positionY + bloq.height - 1)))) {
                document.Frm1._vidas.value = Number(document.Frm1._vidas.value) - 1;                        

                if (Number(document.Frm1._vidas.value) < 0)
                  document.Frm1._vidas.value = 0;

                sessionStorage.setItem("_vidas", document.Frm1._vidas.value)                   
                alert("colidiu")

                if (Number(document.Frm1._vidas.value) == 0)
                  document.Frm1.action = "game.html"

                document.getElementById("restarbtn").click()
                document.Frm1.submit()
            }
        })
        
        trail.push({ x:positionX,y:positionY })
        while(trail.length > tail) {
            trail.shift();
        }
        if (appleX == positionX && appleY == positionY) {
            tail++;
            appleX = Math.floor(Math.random()*amountsize);
            appleY = Math.floor(Math.random()*amountsize);

            const novapontuacao = Number(document.Frm1._total.value) + 1;
            document.Frm1._total.value = novapontuacao;

            document.Frm1._total2.value = Number(document.Frm1._total2.value) + 1;

            verificaseganhou (novapontuacao)
        }

    }
    function keyPush(event) {
        switch(event.keyCode) {
            case 37: //left
                velocityX = -velocity;
                velocityY = 0;
                break;
            case 38: //up
                velocityX = 0;
                velocityY = -velocity;
                break;
            case 39: //right
                velocityX = velocity;
                velocityY = 0;
                break;
            case 40: //down
                velocityX = 0;
                velocityY = velocity;
                break;
            default:

            break;
        }

    }

    function reiniciar() {
        document.Frm1._total.value=0;
        tail = 5;
        appleX = appleY = 15;
    }

    function verificaseganhou(pontuacao) {
        if (pontuacao === 10) {
            alert("Passou de fase")

            if (localStorage["_pontuacao1"] == false)
             {
                localStorage.setItem("_pontuacao1", 0)
             }

            if (localStorage.getItem("_pontuacao1") < Number(document.Frm1._total2.value))
             {
                if (localStorage["_pontuacao4"])
                 {
                  localStorage.setItem("_pontuacao5", localStorage.getItem("_pontuacao4"))   
                  localStorage.setItem("_nome5", localStorage.getItem("_nome4"))   
                 }

                if (localStorage["_pontuacao3"])
                 {
                  localStorage.setItem("_pontuacao4", localStorage.getItem("_pontuacao3"))
                  localStorage.setItem("_nome4", localStorage.getItem("_nome3"))   
                 }

                if (localStorage["_pontuacao2"])
                 {
                  localStorage.setItem("_pontuacao3", localStorage.getItem("_pontuacao2"))
                  localStorage.setItem("_nome3", localStorage.getItem("_nome2"))   
                 }

                if (localStorage["_pontuacao1"] && localStorage.getItem("_pontuacao1") != 0)
                 {
                  localStorage.setItem("_pontuacao2", localStorage.getItem("_pontuacao1"))
                  localStorage.setItem("_nome2", localStorage.getItem("_nome1"))   
                 }

                localStorage.setItem("_pontuacao1", Number(document.Frm1._total2.value))
                localStorage.setItem("_nome1", document.Frm1._nome.value)   

                if (document.Frm1._nome.value == localStorage.getItem("_nome2"))
                 {
                  localStorage.removeItem("_nome2")
                  localStorage.removeItem("_pontuacao2")
                 }

                if (document.Frm1._nome.value == localStorage.getItem("_nome3"))
                 {
                  localStorage.removeItem("_nome3")
                  localStorage.removeItem("_pontuacao3")
                 }

                if (document.Frm1._nome.value == localStorage.getItem("_nome4"))
                 {
                  localStorage.removeItem("_nome4")
                  localStorage.removeItem("_pontuacao4")
                 }

                if (document.Frm1._nome.value == localStorage.getItem("_nome5"))
                 {
                  localStorage.removeItem("_nome5")
                  localStorage.removeItem("_pontuacao5")
                 }
             }

            sessionStorage.setItem("_nome", document.Frm1._nome.value)
            sessionStorage.setItem("_vidas", document.Frm1._vidas.value)
            sessionStorage.setItem("_total2", document.Frm1._total2.value)

            document.Frm1.action = "game_fase4.html"
            document.getElementById("restarbtn").click()
            document.Frm1.submit()
        }
    }
}