//***************************************************************************
//***************GLOBAL VARIABLES*************************************
window.word = "word";
window.sentence = [];


//**************DOM NAVIGATION*****************************************

window.dom = {
	id :	function(id){
			return document.getElementById(id) || {};
	},
	cl : 	function(cl){
			return document.getElementsByClassName(cl) || {};
	}
};

//***************************************************************************
//**********UTILITY FUNCTIONS*******************************************
function initialize(){
	//-----------------
	//place any functions that need to be initialized here
	//-----------------

	//this needs to be initialized as it requires DOM Data
	initGrammar();
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
}function checkWordType(word, type, action){
	if(word[type] != true){ action();}
};
function checkCaseUse(elementId){
	return dom.id(elementId).addEventListener("click", changeIsOn, false);
	function changeIsOn(){
		grammarList[elementId]['isOn'] = this.checked;
	}
	
}
function englishPluralNouns(word){
	var dontAddS = false;
	var exceptions={
		'boy': true, 
		'human': true,
		'walkway': true,
		'money': true,
	};
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