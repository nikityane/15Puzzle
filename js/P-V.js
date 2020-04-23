google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart); 

var mas = [['g','Хищник','Жертва']];
var predatorCount = 0;
var victimCount = 0;
var vF = 0;  //рождаемость жертвы
var vM = 0; //Смертность жертвы
var pM = 0; // смертность хищника
var p = 0; //коэф.хищника
var g = 0; //поколение
var victimStart = 0; // нач. кол-во жертв
var predatorStart = 0; // нач. кол-во хищников

mas.push([0,predatorStart,victimStart]);
	function calcCount(){
//mas.push([0,predatorStart,victimStart]);
		for(let i = 1; i <= g; i++){

			predatorCount = Math.round(predatorStart + p * predatorStart * victimStart - pM * predatorStart);
        	victimCount = Math.round(victimStart + vF * victimStart - vM * victimStart * predatorStart);
        	predatorStart = predatorCount;
        	victimStart = victimCount;
        	mas.push([i,predatorStart,victimStart]);
        	
		}
	}

		
	

	function inputValue(){
		mas = [['g','Хищник','Жертва']];
		mas.push([0,predatorStart,victimStart]);
		vF = +document.getElementById('victimFertility').value/1000; 
		vM = +document.getElementById('victimMortality').value/100000; 
		pM = +document.getElementById('predatorMortality').value/1000; 
		p = +document.getElementById('predation').value/1000000; 
		g = +document.getElementById('generation').value; 
		victimStart = +document.getElementById('numberOfVictims').value; 
		predatorStart = +document.getElementById('numberOfPredators').value; 
		predatorCount = 0;
		victimCount = 0;
	}

	document.getElementById('start').onclick = function(){
		inputValue();
		calcCount();
		console.log(mas);
		drawChart();
	} 
	

      function drawChart() {
        var data = google.visualization.arrayToDataTable(mas);
        var options = {
          title: 'Модель Хищник-Жертва',
          curveType: 'function',
          legend: { position: 'bottom' },
          crosshair: { trigger: 'both' },
          explorer: { axis: 'horizontal' },
          textStyle: {color: '#FF0000'}, showColorCode: true
        };

        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

         chart.draw(data, options);
      }

      