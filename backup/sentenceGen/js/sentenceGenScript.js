
//***************************************************************************
//****************DATA*****************************************************

//answer is global so that the Latin answer can be hidden before the show answer button is clicked
var answer; 
function createSentence(){
	
	function checkIfInUse(elementId){
		return dom.id(elementId).addEventListener("click", changeIsOn, false);
		function changeIsOn(){
			grammarList[elementId]['isOn'] = this.checked;
		}	
	}
		
	var word = "word";


//STRUCTURES LIST:says the order of a sentence should be in the English and Latin Order	
	var structuresList= {
	subjDoV : {
		isOn: true,
		latinOrder: ["subject", "directObject", "prepositionAblative", "verb"],
		englishOrder: ["subject","verb", "directObject","prepositionAblative"]
	},
	subjLvPred: {
		isOn: false,
		latinOrder: ["subject", "predicateNominative", "linkingVerb"],
		englishOrder: ["subject", "linkingVerb", "predicateNominative", ]
	},
};
	
	var	grammarList = {
		
		presentActive: {
			endings: {
				'1st': 		['o','as','at','amus','atis','ant'],
				'2nd' : 	['eo', 'es', 'et', 'emus', 'etis', 'ent'],
				'3rd' : 	['o', 'is', 'it', 'imus', 'itis', 'unt'],
				'3rd io':	['io', 'is', 'it', 'imus', 'itis', 'iunt'],
				'4th' : 	['io', 'is', 'it', 'imus', 'itis', 'iunt'],
			},
		},
		createNoun : function(nounUse){
			var	use = grammarList[nounUse];

				//************SET DEFAULT use**************************
				if(checkConfig(grammarList).join("").match(nounUse) == null){
					//default noun is used so that prepositions will not be created
					use.defaultNoun = true;
					use.gender = random(['M','F','N']);
					use.number = random(['sg','pl']);
					use.latinForm = "___";
					if(use.number == 'sg'){use.translation = "the " + nounUse;}
					if(use.number == 'pl'){use.translation = "the " + englishPluralNouns(nounUse);}
					use.word = 'default ' + nounUse; 
				}
				//************IF CHOSEN*****************************************
				if(checkConfig(grammarList).join("").match(nounUse)){
					//default noun is used so that prepositions will not be created
					use.defaultNoun = false;
					//PICK A MEANING FROM THE LIST OF DEFINITIONS OF THE WORD
					use.word = dictionary["nouns"][random(activeWords('nouns'))];
						var word = use.word;
					use.decl =  word["decl"] + word["gen"];
					use.gender = word["gen"];
					use.number = random(declensions[use.decl][grammarList[nounUse]['nounCase']]);
					use.ending = declensions[use.decl][grammarList[nounUse]["nounCase"]][use.number];
					if((use.number == 'sg') && (grammarList[nounUse]["nounCase"] == 'nominative')) {
						grammarList[nounUse].latinForm = word["firstDict"] + " ";}
					else{grammarList[nounUse].latinForm = word["stem"] + use.ending;}
					//Get Translation
					if(word['meaning'].constructor === Array){
						word.meaning = random(word.meaning).toString();
					}
					if(use.number == 'sg'){use.translation = "the " + word["meaning"];}
					else{use.translation = "the " + englishPluralNouns(word["meaning"]);};
					use.types= word["types"];			
				}
				return word;		
		},
		subject: {
			nounCase: "nominative",
			isOn: dom.id('subject').checked,
			check: checkIfInUse('subject'),
			create: function(){
				grammarList.createNoun('subject');
				grammarList['verb'].number = grammarList['subject'].number;
			},
		},
		directObject: {
			nounCase: "accusative",
			isOn: dom.id('directObject').checked,
			check: checkIfInUse('directObject'),
			create: function(){grammarList.createNoun('directObject');},
		},
		prepositionAblative:{
			nounCase: "ablative",
			isOn: dom.id('prepositionAblative').checked,
			check: checkIfInUse('prepositionAblative'),
			create: function(){
				var prep = grammarList["prepositionAblative"];	
				if(checkConfig(grammarList).join("").match("prepositionAblative") == null){
					prep.translation = " ";
					prep.word = 'default ' + 'prepostionAblative'; 
					prep.meaning = " ";
					prep.latinForm = " ";
					prep.defaultNoun = true;
				}
				if(checkConfig(grammarList).join("").match("prepositionAblative")){			
					prep.preposition = random(activeWords('prepositions'));
						while(!(dictionary['prepositions'][prep.preposition]['ablative'])){
							prep.preposition = random(activeWords('prepositions'));
							if('no ablative prep phrase'){console.log('beware of no ablative preps');}
						}
						//*************MAKE SURE THE NOUN IS THE RIGHT TYPE FOR THE PREP************
						var prepTypes = dictionary['prepositions'][prep.preposition]['types'];
						var isType = false;
						while(!(isType)){
							grammarList.createNoun('prepositionAblative');
							var nounTypes = prep.word['types'];
								if(nounTypes == undefined){prep.word.types = 'nothing';}
							for(var i = 0; i < prepTypes.length; i++){
								for(var j = 0; j < nounTypes.length; j++){
									if(prepTypes[i] == nounTypes[j]){isType = true;}
								}
							}				
						}
					prep.latinForm = prep.preposition + " " + prep.latinForm;
					prep.translation = dictionary['prepositions'][prep.preposition]['meaning']  + " " + prep.translation;
				}
			},
			
		},
		"adjective" : {
			isOn: dom.id('adjective').checked,
			check: checkIfInUse('adjective'),
			create: function(wordsUsed){
				var adjective = grammarList['adjective'];
				//get the adjective and the word it will go with
				adjective.word = dictionary['adjectives'][random(activeWords('adjectives'))];		
				//FILTERED SO THAT IT WON'T COME BACK UNDEFINED OR AS A VERB
				adjective.caseUse = random(wordsUsed.filter(function(x){
					//*************SINCE THERE IS NO DEFAULT PREP TRANSLATION IT CAN'T MATCH WITH ONE
					if(grammarList['prepositionAblative']['defaultNoun']){
						return x !== 0 && x !== 'verb' && x !== 'prepositionAblative';	
					}
					
						return x !== 0 && x !== 'verb';					
				}));
				var noun = grammarList[adjective['caseUse']];
				//TAKE ON THE QUALITIES OF THE CASEUSE
				if(noun['gender'] === undefined){alert(noun.word);}
				adjective.gender = noun['gender'].toUpperCase();
				adjective.number = noun.number;

				//GET THE DECLENSION OF THE ADJECTIVE
				if(adjective.word['adjType'] === '1stAnd2nd'){
					if(adjective.gender = 'F'){adjective.decl = '1st' + adjective.gender;}
					else{adjective.decl = '2nd' + adjective.gender;}
				}
				if(adjective.word['adjType'] === '3rd'){adjective.decl = '3rd' + adjective.gender;}
				//SET FIRST DICTIONARY ENTRY BASED ON GENDER
				adjective.dictEntry = adjective.word['firstDict' + adjective.gender];
				//SET THE ENDING OF THE ADJECTIVE
				adjective.ending = declensions[adjective.decl][noun['nounCase']][adjective.number];
					//IF 3RD DECLENSION ABLATIVE SG CHANGE ENDING TO I
					if((noun['nounCase'] === 'ablative') && (adjective.number === 'sg')){
						if(adjective.decl.match('3rd')){
								adjective.ending = 'i';						
						}
					}
				//FORM THE LATIN WORD
				adjective.latinForm = adjective.word['stem'] + adjective.ending;
					//IF NOMINATIVE SG CHANGE LATINFORM TO 1ST DICT ENTRY
					if((noun['nounCase'] === 'nominative') && (adjective.number === 'sg')){
						adjective.latinForm = adjective['dictEntry'];
					}
					//IF NEUTER ACCUSATIVE SG ALSO SET LATINFORM TO 1ST DICT
					if((adjective.gender === 'N') && (noun['nounCase'] === 'accusative')){
						if(adjective.number === 'sg'){adjective.latinForm = adjective['dictEntry'];
							}
					}
				adjective.translation = 'the ' + adjective.word['meaning'];
				noun['latinForm'] =  noun['latinForm'] + " " + adjective.latinForm;
				//***************SET UP TRANSLATIONS
				//**************I DON'T ACTUALLY KNOW WHY IT TURNS INTO AN ARRAY HERE
				noun['translation'] = noun['translation'].match(/(\w+$)/)[0];
				//***************IF IT IS A DEFAULT NOUN THEN GIVE THE GENDER
				if(noun['defaultNoun'] === true){
					noun['translation'] = noun['translation'] + "(" + adjective['gender'] + ") "; 
				}
				//***************IF THERE IS A PREP HANDLE IT DIFFERENTLY
				if('preposition' in noun){
					noun['translation'] = dictionary['prepositions'][noun['preposition']]['meaning'] + " " +  adjective.translation + " " + noun['translation'];
				}
				else{noun['translation'] = adjective.translation + " " + noun['translation'];}
			}
		},
		"verb" : {
			isOn: dom.id('verb').checked,
			check: checkIfInUse('verb'),
			create: function(type, transitive){
				//*************MAIN SCOPE VARIABLES****************
				var verb = grammarList['verb'];
				var number = grammarList['subject']['number'];
					if(!number) {console.log('oops no subject number for verb');}
				//*******************SET DEFAULT****************************************
				verb.meaning = "verb";
				if(checkConfig(grammarList).join("").match('verb') == null){
					verb.word = 'default';
						var word = verb.word;
					verb.latinForm = "";
					verb.translation = verb.meaning;
						if(number == 'sg'){verb.translation = verb.meaning + "s";}
						if(number == 'pl'){verb.translation = verb.meaning;}
	//				console.log(verb.word + " verb created")
				}
				if(checkConfig(grammarList).join("").match('verb')){
					verb.word = dictionary["verbs"][random(activeWords("verbs"))];
						var word = verb.word;

					//Temp stop intransitives
					if (word['intransitive']){
							return grammarList["verb"].create();
						}
					verb.conj = word['conj'];
						var conj =  verb.conj;
					var ending;
						if(number == 'sg'){ending = grammarList['presentActive']['endings'][conj][2];};
						if(number == 'pl'){ending = grammarList['presentActive']['endings'][conj][5];};
						verb.ending = ending;
					verb.latinForm = word['presStem'] + ending;
					var translation;
						if(number == 'sg'){translation = word['meaning'] + 's';};
						if(number == 'pl'){translation =  word['meaning'];};
						verb.translation = translation;
					verb.meaning = word['meaning'];
				}
				return word;
			}
		},
	};
	
	
	var sentence = {
		latinTranslation: [], 
		englishTranslation :[]
		};
	var structure = structuresList[random(checkConfig(structuresList))];
	var latinOrder = structure.latinOrder;
	var englishOrder = structure.englishOrder;
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
	}
//**************SET DESCRIPTIONS*********************************
//it doesn't matter what the order of the structure is for these

	if(grammarList.adjective.isOn){grammarList.adjective.create(structure['latinOrder']);}

	
//**********STORE INFO********************************************
	for(var i = 0; i < latinOrder.length; i++){
		sentence.englishTranslation.push(grammarList[englishOrder[i]]["translation"]);
		sentence.latinTranslation.push(grammarList[latinOrder[i]]["latinForm"]);
	}	
	
	console.log(grammarList);
	console.log(sentence);
		english.innerHTML = sentence.englishTranslation.join(" ");
		latin.innerHTML = "Latin";
		answer = sentence.latinTranslation.join(" ");
		
}
function showAnswer(){
	
	dom.id('latin').innerHTML = answer;
	if(dom.id('latin').innerHTML == ""){dom.id('latin').innerHTML = "Latin";}
}