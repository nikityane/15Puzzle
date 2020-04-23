let mainMass = [];
let tempMass = [];
let mainMassCopy = []; //копия осн. массива для перезапуска игры без новой генерации
let temp = null;
let myTab = document.getElementById("myTable")
let tds = myTab.getElementsByTagName("td");
let resetButton = document.getElementById("resBut");
let pauseButton = document.getElementById("pauseBut");
let headerMoves = document.getElementById("moves");
pauseButton.disabled = true;
let moves = 0;
let pause = false;
let headerTimer = document.getElementById("timer");
let timer = null;
let sec = 0;
let min = 0;

for (let i = 0; i < 15; i++)
	{
		mainMass[i] = "" + (i+1);
		tempMass[i] = mainMass[i];
	}
	mainMass[15] = '';
	tempMass[15] = '';
	fillTBL(tempMass);
	shuffle(mainMass);
	mainMassCopy = JSON.parse(JSON.stringify(mainMass));

function restartGame() {
	if(confirm("OK - сгенерировать новое поле;\nОтмена - переиграть начатую игру;")) {
			shuffle(mainMass);
			moves = 0;
			mainMassCopy = JSON.parse(JSON.stringify(mainMass));
	}
	else {
			mainMass = JSON.parse(JSON.stringify(mainMassCopy));
        	moves = 0;
	}
    pauseButton.innerHTML = "Пауза";
	pause = false;
	fillTBL(mainMass);
    headerMoves.innerHTML = "Ходы: 0";
    headerTimer.innerHTML = "Время: 0:0";
    startTimer();
}

function startTimer() {
	stopTimer();
	sec = 0;
	min = 0;
    timer = setInterval(function () {
    	if(!pause){
    		sec++;
    		if(sec == 60){
    			sec = 0;
    			min++;
			}
    		headerTimer.innerHTML = "Время: "  + min+ ':' + sec;

    	}

    	},1000);
}

function stopTimer() {
	clearInterval(timer);
}

resetButton.onclick = function() {
	if(pauseButton.disabled == false) {
		restartGame();
	}
	else fillTBL(mainMass);
	pause = false;
	pauseButton.disabled = false;
	headerMoves.innerHTML = "Ходы: 0";
    headerTimer.innerHTML = "Время: 0:0";
    startTimer();
};

pauseButton.onclick = function() {
	if(!pause) {
		for (let i = 0; i < 16; i++)
		{
			tds[i].innerHTML = '';

		}
		pauseButton.innerHTML = "Продолжить";
		pause = true;
	}
		else {
			fillTBL(mainMass);
			pauseButton.innerHTML = "Пауза";
			pause = false;
	}
	
};

function checkSolution(arr) {  //проверка на решаемость
    let N = 0;
    console.log(arr);
    for (let i = 0; i < 16; i++)
    {
        if(arr[i]){
            for( let j = 0; j < i; j++)
            {
                if(arr[j]> arr[i]) N++;
            }
        }
    }
    for (let i = 0; i < 16; i++)
    {
        if(arr[i] == ''){
            N += 1 + Math.ceil(i/4);
        }
    }
    console.log(N);
    if(N%2 == 0) {
    	shuffle(arr);
    	checkSolution(arr);
	}

}

function fillTBL(arr) { // заполнение таблицы
    checkSolution(arr);
	for (let i = 0; i < 16; i++)
	{
		tds[i].innerHTML = arr[i];
	}

}

function comparison(arr1, arr2) { //сравнение массивов
	
	for (let i = 0; i < 16; i++)
	{
		if(arr1[i] != arr2[i]) return false;

	}
	return true;
}

function shuffle(a) { //перемешивание массива (генерация новой комбинации фишек)
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

$(function () { //перемещение фишек (от 1 и более)
    $('td').on('click', function () {
        if(timer !== null) {
            if(!pause) {
                var $td = $(this),
                    $tr = $td.parent();
                let indexElement = 4*$tr.index() + $td.index();
                if (temp) {
                    $('td').not($(this)).removeClass('click');
                    if(temp[0] != (indexElement) && (mainMass[indexElement]) == "") {
                        if(Math.abs(temp[0] - indexElement) == 4 || Math.abs(temp[0] - indexElement) == 1)  { // перемещение 1-й фишки по гор-и и вертик-и
                            mainMass[indexElement] = temp[1];
                            tds[indexElement].innerHTML = mainMass[indexElement];
                            mainMass[temp[0]] = '';
                            tds[temp[0]].innerHTML = mainMass[temp[0]];
                            moves++;
                        }

                        if(Math.abs(temp[0] - indexElement) == 2)  { // перемещение 2-х фишек по горизонтали

                            if(temp[0]>indexElement) {
                                mainMass[indexElement] = mainMass[indexElement+1];
                                tds[indexElement].innerHTML = mainMass[indexElement];
                                mainMass[indexElement+1] = mainMass[temp[0]];
                                tds[indexElement+1].innerHTML = mainMass[indexElement+1];
                                mainMass[temp[0]] = '';
                                tds[temp[0]].innerHTML = mainMass[temp[0]];
                                moves++;
                            }
                            else {
                                mainMass[indexElement] = mainMass[indexElement-1];
                                tds[indexElement].innerHTML = mainMass[indexElement];
                                mainMass[indexElement-1] = mainMass[temp[0]];
                                tds[indexElement-1].innerHTML = mainMass[indexElement-1];
                                mainMass[temp[0]] = '';
                                tds[temp[0]].innerHTML = mainMass[temp[0]];
                                moves++;
                            }
                        }

                        if(Math.abs(temp[0] - indexElement) == 3)  { // перемещение 3-х фишек по горизонтали

                            if(temp[0]>indexElement) {
                                mainMass[indexElement] = mainMass[indexElement+1];
                                tds[indexElement].innerHTML = mainMass[indexElement];
                                mainMass[indexElement+1] = mainMass[indexElement+2];
                                tds[indexElement+1].innerHTML = mainMass[indexElement+1];
                                mainMass[indexElement+2] = mainMass[temp[0]];
                                tds[indexElement+2].innerHTML = mainMass[indexElement+2];
                                mainMass[temp[0]] = '';
                                tds[temp[0]].innerHTML = mainMass[temp[0]];
                                moves++;
                            }
                            else {
                                mainMass[indexElement] = mainMass[indexElement-1];
                                tds[indexElement].innerHTML = mainMass[indexElement];
                                mainMass[indexElement-1] = mainMass[indexElement-2];
                                tds[indexElement-1].innerHTML = mainMass[indexElement-1];
                                mainMass[indexElement-2] = mainMass[temp[0]];
                                tds[indexElement-2].innerHTML = mainMass[indexElement-2];
                                mainMass[temp[0]] = '';
                                tds[temp[0]].innerHTML = mainMass[temp[0]];
                                moves++;
                            }
                        }

                        if(Math.abs(temp[0] - indexElement) == 8)  { // перемещение 2-х фишек по вертикали

                            if(temp[0]>indexElement) {
                                mainMass[indexElement] = mainMass[indexElement+4];
                                tds[indexElement].innerHTML = mainMass[indexElement];
                                mainMass[indexElement+4] = mainMass[temp[0]];
                                tds[indexElement+4].innerHTML = mainMass[indexElement+4];
                                mainMass[temp[0]] = '';
                                tds[temp[0]].innerHTML = mainMass[temp[0]];
                                moves++;
                            }
                            else {
                                mainMass[indexElement] = mainMass[indexElement-4];
                                tds[indexElement].innerHTML = mainMass[indexElement];
                                mainMass[indexElement-4] = mainMass[temp[0]];
                                tds[indexElement-4].innerHTML = mainMass[indexElement-4];
                                mainMass[temp[0]] = '';
                                tds[temp[0]].innerHTML = mainMass[temp[0]];
                                moves++;
                            }
                        }
                        if(Math.abs(temp[0] - indexElement) == 12)  { // перемещение 3-х фишек по вертикали
                            if(temp[0]>indexElement) {
                                mainMass[indexElement] = mainMass[indexElement+4];
                                tds[indexElement].innerHTML = mainMass[indexElement];
                                mainMass[indexElement+4] = mainMass[indexElement+8];
                                tds[indexElement+4].innerHTML = mainMass[indexElement+4];
                                mainMass[indexElement+8] = mainMass[temp[0]];
                                tds[indexElement+8].innerHTML = mainMass[indexElement+8];
                                mainMass[temp[0]] = '';
                                tds[temp[0]].innerHTML = mainMass[temp[0]];
                                moves++;
                            }
                            else {
                                mainMass[indexElement] = mainMass[indexElement-4];
                                tds[indexElement].innerHTML = mainMass[indexElement];
                                mainMass[indexElement-4] = mainMass[indexElement-8];
                                tds[indexElement-4].innerHTML = mainMass[indexElement-4];
                                mainMass[indexElement-8] = mainMass[temp[0]];
                                tds[indexElement-8].innerHTML = mainMass[indexElement-8];
                                mainMass[temp[0]] = '';
                                tds[temp[0]].innerHTML = mainMass[temp[0]];
                                moves++;
                            }
                        }
                        headerMoves.innerHTML = "Ходы: " + moves;

                        if(comparison(mainMass,tempMass)) {
                            setTimeout(function () {
                                alert("Пазл решен!\nКоличество ходов: " + moves + "\nВремя: "  + min+ ':' + sec);
                                restartGame();
                            },1000);

                            
                        }
                    }
                    temp = null;
                }
                else if(mainMass[indexElement] == "") {}
                else {
                    $('td').not($(this).toggleClass('click')).removeClass('click');
                    temp = [4*$tr.index() + $td.index(), tds[4*$tr.index() + $td.index()].innerHTML];
                }

            }
		}
    });

});