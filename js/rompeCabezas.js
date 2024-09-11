$(function() {
    var
        aValor_1 = [],
        aValor_2 = [],
        aResultado = [],
        aOperacion = [],
        columns = 4,
        rows = 3,
        numImgPieces = 12,
        imagesArr = [],
        ubicados = 0;
        var score = 0;

    //generamos valores random
    for (var i = 0; i < 12; i++) {
        var Valor_1 = Math.floor(Math.random() * 21),
            Valor_2 = Math.floor(Math.random() * 21);

        aValor_1[i] = Valor_1;
        aValor_2[i] = Valor_2;
        suma_total = Valor_1 + Valor_2;

        //reducimos que se repitan resultados
        for (var j = 0; j < aResultado.length; j++) {
            if (suma_total == aResultado[j]) {
                var Valor_1 = Math.floor(Math.random() * 20),
                    Valor_2 = Math.floor(Math.random() * 20);

                aValor_1[i] = Valor_1;
                aValor_2[i] = Valor_2;
                suma_total = Valor_1 + Valor_2;
            }
        }
        //agregamos a los arreglos
        aOperacion[i] = Valor_1 + ' + ' + Valor_2;
        aResultado[i] = suma_total;
    }

    aResultado.reverse();


    //agregamos la operacion suma a cada espacio del tablero
    for (var c in aOperacion) {
        var newElement = document.createElement('div');
        newElement.id = aOperacion[c];
        newElement.className = "divPiezas col-3 droppable";
        newElement.innerHTML = aOperacion[c];
        document.getElementById("board").appendChild(newElement);
    }


    var arrayImagesElement = document.getElementById("arregloPiezas");
    let bgPosX;
    let bgPosY;

    //espacio-posicion de las piezas
    function createDivNode(index, width, height) {
        const newDiv = document.createElement("div");
        let pieceValue;

        switch (index) {
            case 0:
                bgPosX = 0;
                bgPosY = 0;
                break;
            case 1:
            case 2:
            case 3:
                bgPosX -= width;
                bgPosY = "0";
                break;
            case 4:
                bgPosX = 0;
                bgPosY = height * -1;
                break;
            case 5:
            case 6:
            case 7:
                bgPosX -= width;
                bgPosY = height * -1;
                break;
            case 8:
                bgPosX = 0;
                bgPosY = height * -2;
                break;
            default:
                bgPosX -= width;
                bgPosY = height * -2;
                break;
        }

        pieceValue = aResultado.pop();

        newDiv.style = `background-position: ${bgPosX}px ${bgPosY}px; width: ${width}px; height: ${height}px;`;
        newDiv.id = `piece${index + 1}`;
        newDiv.className = `puzzle draggable`;
        newDiv.setAttribute('data-value', pieceValue);
        newDiv.innerHTML = pieceValue;
        return newDiv;

    }

    const img = new Image();
    let pieceWidth;
    let pieceHeight;
    img.onload = function() {
        pieceWidth = this.width / columns;
        pieceHeight = Math.floor(this.height / rows);

        for (let i = 0; i < numImgPieces; i++) {

            // desordenamos el arreglo de piezas
            aPiezas = shuffle(imagesArr);

            function shuffle(imagesArr) {
                var indexActual = imagesArr.length,
                    valorTemporal, desordenar;

                while (0 !== indexActual) {
                    desordenar = Math.floor(Math.random() * indexActual);
                    indexActual -= 1;

                    valorTemporal = imagesArr[indexActual];
                    imagesArr[indexActual] = imagesArr[desordenar];
                    imagesArr[desordenar] = valorTemporal;
                }

                return imagesArr;
            }
            imagesArr.push(createDivNode(i, pieceWidth, pieceHeight));
        }

        imagesArr.forEach((image) => {
            arrayImagesElement.appendChild(image);
        });

        $(".draggable").draggable({
            revert: true
        });

        $('.droppable').droppable({
            drop: function(e) {
                accept: ".puzzle";
                let pieceSumTotal = parseInt(e.target.innerHTML.split("+")[0]) + parseInt(e.target.innerHTML.split("+")[1]);
                let draggedPieceTotal = parseInt(e.toElement.getAttribute("data-value"));
                if (draggedPieceTotal === pieceSumTotal) {
                    $(`#${e.toElement.id}`).draggable({
                        revert: false
                    });
                  
                    $(`#${e.toElement.id}`).draggable("disable");
                    ubicados++;
                    score += 100;
                    var l = document.getElementById("score");
                    l.innerHTML = score;
                    if (ubicados == 12) {
                        Swal.fire({
                            title: 'Felicidades! Has completado el rompecabezas',
                            text: "¿te gustaría volver a intentarlo?",
                            icon: 'success',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Si quiero jugar de nuevo!'
                          }).then((result) => {
                            if (result.value) {
                              Swal.fire(
                               location.reload()
                              )
                            }
                          })
                    }
                }
            }
        });
    };
    img.src = './assets/cars-img.jpg';

});