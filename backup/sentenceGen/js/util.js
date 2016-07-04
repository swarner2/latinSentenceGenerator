//***************************************************************************
//***************GLOBAL VARIABLES*************************************



//**************DOM NAVIGATION*****************************************

window.dom = {
	id :	function(id){
			return document.getElementById(id) || {};
	},
	cl : 	function(cl){
			return document.getElementsByClassName(cl) || {};
	}
};

function clickOthers(level){
	//to be able to select whole chapters
	function upToChapter(upTo, start){
		if(arguments.length === 1){start = 0;}
		for(start; start < upTo; start++){
			var ch = romanNumerals(upTo)[start].toString();
				document.getElementById(ch).checked = document.getElementById(level).checked;
				document.getElementById(ch + ".1").checked = document.getElementById(level).checked;
				document.getElementById(ch + ".2").checked = document.getElementById(level).checked;
				document.getElementById(ch + ".3").checked = document.getElementById(level).checked;
			}
	}
	if(level.match('latin')){
		if(level === 'latinI'){upToChapter(12);}
		if(level === 'latinII'){upToChapter(24,12);}
		if(level === 'latinIII'){upToChapter(34,24);}
	}
	else{upToChapter(romanNumerals(35).indexOf(level) + 1, romanNumerals(35).indexOf(level));}
}

//***************************************************************************
//**********UTILITY FUNCTIONS*******************************************
function initialize(){
	//-----------------
	//place any functions that need to be initialized here
	//-----------------
	


	//this needs to be initialized as it requires DOM Data

}

function checkConfig(obj){
	var map = [];
	
	for(var key in obj){
		if(obj[key].isOn){
			map.push(key);
		};
	};
	return map;
}
function random(list){
  //if there are more than one lists to pick from pick one of the lists
  if(arguments.length > 1){
    //randomly pick one of the lists through Math
    //then again call back that list to randomly pick one element
    //through recursion
   return random(arguments[Math.floor(Math.random() * (arguments.length))]);
  }
  if(list.constructor === Array){
   return list[Math.floor(Math.random() * (list.length))];
  }
  if(list.constructor === Object){       
    //set up variables to map obj into an Array
    var a = [];
    var i = 0;
    //change into an array
    for(a[i++] in list){
    };
    //recursion to randomly pick one of the properties of the new Array
    return random(a);
  } 
}
function checkWordType(word, type, action){
	if(word[type] != true){ action();}
};


function cleanNumerals(numeral){
	//clean white space
	if(numeral.match(/\W+$/)){numeral = numeral.replace(/\W+$/, "");}
	//standardize numerals to max 4 in a row
	if(numeral.match(/VIIII$/)){numeral = numeral.slice(0 , numeral.length - 5) + "IX";}
 	if(numeral.match(/IXI$/)){numeral = numeral.slice(0 , numeral.length - 3) + "X";}
  	if(numeral.match(/IIII$/)){numeral = numeral.slice(0 , numeral.length - 4) + "IV";}
    if(numeral.match(/IVI$/)){numeral = numeral.slice(0 , numeral.length - 3) + "V";}
	return numeral;
}

function romanNumerals(amountOfChapters){
 	var data = [];
	var number = '';
	for(var i = 0; i < amountOfChapters; i++){
	  number = number + 'I';
	  number = cleanNumerals(number);
	  data.push(number);
	}
	return data;
}

function activeWords(partOfSpeech){
	 //I currently have 35 chapters in the book I use so it is set to 35
	 //this is going to collect the chapter sections that are checked in the dom
	 //it gives an array of arrays for chapter sections that are checked [[I.1,I.2,I.3],[II.1]]
	var sections = romanNumerals(35).map(function(x){
		var data = [];
		for(var i = 1; i <= 3; i++){
			var section = x + "." + i;
    		var el = document.getElementById(section);
    		if(el === null){el = false;}
    		if(el.checked) {data.push(section);}		
		}
		return data;
		//reduce to shorten array to be straight
	}).reduce(function(x,y){
		return x.concat(y);
	});
	

	data = []
	
	sections.map(function(x){
		var chapter = x.match(/^\w+/);
		var section = x.match(/\w+$/);
		 for(prop in dictionaryCh[chapter][section]){
		 	data.push(prop)
		 }
		});	
	
	if (data.length === 0){
		if(partOfSpeech === 'nouns'){return ['puella', 'puer', 'oppidum'];}
		if(partOfSpeech === 'verbs'){return ['amo','video', 'ago', 'capio', 'audio'];}
		if(partOfSpeech === 'adjectives'){return ['laetus'];}
	}
	return data;
}


function englishPluralNouns(word){
	var dontAddS = false;
	var exceptions={
		'boy': 'boys', 
		'human': 'humans',
		'walkway': 'walkways',
		'money': 'moneys',
		'donkey' : 'donkeys',
		'fish' : 'fish (pl)',
		'kiss' : 'kisses',
		'leaf' : 'leaves',
		
	};
	if(word in exceptions){
		return exceptions[word];
	}
	if(!(word in exceptions)){
		if(word.match(/y$/)){ 
			word = word.replace(/y$/, 'ies');
			dontAddS = true;	
			}
		else if(word.match(/man$/)){ 
			word = word.replace(/man$/, 'men');
			dontAddS = true;
			}
	}
	if(!dontAddS){word = word + "s";}
	return word;
};

var dictionaryCh = {
	
};
romanNumerals(35).map(function(x){
  return dictionaryCh[x] = {'1' : {}, '2' : {}, '3' : {}};
});