
//***************************************************************************
//****************DATA*****************************************************
var structuresList= {
	subjDoV : {
		isOn: true,
		latinOrder: ["subject","prepositionAblative", "directObject", "verb"],
		englishOrder: ["subject","verb", "directObject","prepositionAblative"]
	},
	subjLvPred: {
		isOn: false,
		latinOrder: ["subject", "predicateNominative", "linkingVerb"],
		englishOrder: ["subject", "linkingVerb", "predicateNominative", ]
	},
};



function createSentence(){
//********************************************************Clear old Sentence
	for(var i = 0; i < sentence.length; i++){
		sentence.splice(i);
		showAnswer();
	}
//**********************************************
	var structure = structuresList[random(checkConfig(structuresList))];
	var latinOrder = structure.latinOrder;
	var englishOrder = structure.englishOrder;
	var data = [];
//***********CREATE***********************
	for(var i = 0; i < latinOrder.length; i++){
		grammarList[latinOrder[i]].create();
		//NO REPEATS
		for(var j = 0; j < i; j++){
			if(j != i){
				while(grammarList[latinOrder[i]]["word"] == grammarList[latinOrder[j]]["word"]){
					grammarList[latinOrder[i]].create();
				}
			}
		}
//		console.log(grammarList[latinOrder[i]]['meaning']);
	}
//**********STORE INFO********************************************
	for(var i = 0; i < latinOrder.length; i++){
		data.push(grammarList[englishOrder[i]]["translation"]);
		sentence.push(grammarList[latinOrder[i]]["latinForm"]);
//				console.log("the sentence section : " + i + " was "+ grammarList[englishOrder[i]]["translation"]);
	}	
		english.innerHTML = data.join(" ");
//		console.log("the sentence was "+ data.join(" "))
	return data;
}
function showAnswer(){
	dom.id('latin').innerHTML = sentence.join(" ");
	if(dom.id('latin').innerHTML == ""){dom.id('latin').innerHTML = "Latin";}
}