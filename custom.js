//Custom Javascript File for BUILDING A CALCULATOR

/*
Write some javascript in your normal style to and the follwing functionality.
1.   When clicking an operand button (number) update the display with that buttons value.
2. 	When clicking another operand update the display with that buttons value and the previous value. 
3. 	When clicking the clear button clear the display and reset it to 0.
4. 	When clicking the backspace button update the display value removing the last digit,
	Repeatedly cliking the backspace button will remove another single digit at a time.
*/

// first method

$(document).ready(function(e) {
	var input = $('input');
	var button =$('button').val();
	

	$('button').click(function() {
		var value = $(this).val();
		if(input.val() == 0) {
			input.val(value);
		}
		else {
			input.val(input.val()+value);
		}
	});
	$('#clear').click(function() {
		input.val(0);
	});
	$('#backspace').click(function() {
		input.val(input.val().slice(0,-1));
		if(input.val() == '') {
			input.val(0);
		}
	});

});

// Second method using Object Oriented Javascript
(function() {

//-------constructor---//
	Calculator = function (el) {
		that = this;
		this.operator;
		that.display = '0';
		that.input1 = 0 ;
		that.init(el);
	};

//------prototype------//
	Calculator.prototype = {
		displayScreen:function () {
			$('input', '.display').val(that.display);
		},
		
//---checking if screen value = 0---------//
//--------methods-------------//
		setNeg:function (input, display) {
			var Ans = false;
			if (display !== '0') {
				Ans = true;
			}
			return Ans;
		},
		resetVal:function (input, display) {
			var Ans;
			if (input === 'clear') {
					Ans = '0';
			} else {
				Ans = display.slice(0,-1);
				if (Ans.length < 1) {
					Ans = '0';
				}			
			}
			return Ans;
		},
		setDeci:function (input, display) {
			var Ans = false;
			if (display == '0' || display == that.display) {
				Ans = true;
			} 
			return Ans;
		},

		setOperator:function (operator, display) {
			if (operator === '/' && display === 0) {
				throw new Error('Cannot divide by zero!');
			} else if (operator === '+' || operator === '-' || operator === '/' || operator === '*') {
				that.display = operator;
			} else if (operator === '=') {
				//this.calculation();
			}
		},
		calculation: function (input) {
			var Answer;
				console.log(that.display, input, this.input1);

				switch ('+') {
				case '+':
					answer = input + this.input1;
					break;
				case '-':
					answer = input - this.input1;
					break;
				case '/':
					answer = input / this.input1;
					break;
				case '*':
					answer = input * this.input1;
					break;
			}
			console.log(answer);

			return answer;
			//that.displayScreen(answer);
		},

		updateDisplayInput:function (input) {
			(this.display === '0') ? that.display = input : that.display = that.display + '' + input;
			that.displayScreen();
		},

		init:function (el) {
			$('button', el).click(function () {
				if (this.value === '-') {
					that.setNeg(this.value, that.display) === true ? that.display = this.value : console.log(this.value);
				} else if (this.value === 'clear' || this.value === 'backspace') {
					var resetOut = that.resetVal(this.value, that.display);
					that.display = resetOut;
				} else if (this.value === '.') {
					that.setDeci(this.value, that.display) === true ? that.display = that.display + '' + this.value : that.display + '' + this.value;
				} else if (this.value === '+' || this.value === '-' || this.value === '/' || this.value === '*') {

					that.input1 = parseFloat(that.display);
					//console.log(that.input1);
					that.setOperator(this.value, that.display) === true ? that.display = this.value : that.display + '' + this.value;
					
				} else if (this.value === '=') {
					var answer;
					answer = that.calculation(parseFloat(that.display));


					//that.setOperator(this.value, that.display) === true ? that.display : console.log('hi');
				} else {
					that.updateDisplayInput(this.value);
				}
				that.displayScreen();
			});
		},
	}
}());

$(document).ready(function () {
	//----- created new object-----//
	var $el =$('#calculator');
	 Calc = new Calculator($el);
});


