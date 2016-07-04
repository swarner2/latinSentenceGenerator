
var initGrammar = function(){

	window.grammarList = {

		presentActive: {
			endings: {
				'1st': 		['o','as','at','amus','atis','ant'],
				'2nd' : 	['eo', 'es', 'et', 'emus', 'etis', 'ent'],
				'3rd' : 	['o', 'is', 'it', 'imus', 'itis', 'unt'],
				'3rd io':	['io', 'is', 'it', 'imus', 'itis', 'iunt'],
				'4th' : 	['io', 'is', 'it', 'imus', 'itis', 'iunt'],
			},
		},
		createWord : function(nounUse){
			var	use = grammarList[nounUse];
				//*************CLEAR OLD WORD*******************************
				delete use.word, use.decl, use.gender, use.number, use.ending, use.latinForm, use.translation, use.meaning, use.types;
				
				//************SET DEFAULT use**************************
				if(checkConfig(grammarList).join("").match(nounUse) == null){
					use.gender = random(['M','F','N']);
					use.decl =  random(['1stF', '2ndN', '2ndM']);
					use.number = random(['sg','pl']);
					use.latinForm = "";
					if(use.number == 'sg'){use.translation = "the " + nounUse;}
					if(use.number == 'pl'){use.translation = "the " + englishPluralNouns(nounUse);}
					use.word = 'default ' + nounUse; 
				}
				//************IF CHOSEN*****************************************
				if(checkConfig(grammarList).join("").match(nounUse)){
	//				console.log(nounUse + ' chosen')		
					use.word = dictionary["nouns"][random(dictionary["nouns"])];
						var word = use.word;
					use.decl =  word["decl"] + word["gen"];
					use.gender = word["gen"];
					use.number = random(declensions[use.decl][grammarList[nounUse]['nounCase']]);
					use.ending = declensions[use.decl][grammarList[nounUse]["nounCase"]][use.number];
					if((use.number == 'sg') && (grammarList[nounUse]["nounCase"] == 'nominative')) {grammarList[nounUse].latinForm = word["firstDict"] + " ";}
					else{grammarList[nounUse].latinForm = word["stem"] + use.ending;}
					//Get Translation
					if(use.number == 'sg'){use.translation = "the " + word["meaning"];}
					else{use.translation = "the " + englishPluralNouns(word["meaning"]);};
					use.meaning= word["meaning"];
					use.types= word["types"];			
				}
				return word;		
		},
		subject: {
			nounCase: "nominative",
			isOn: dom.id('subject').checked,
			check: checkCaseUse('subject'),
			create: function(){
				grammarList.createWord('subject');
				grammarList['verb'].number = grammarList['subject'].number;
			},
		},
		directObject: {
			nounCase: "accusative",
			isOn: dom.id('directObject').checked,
			check: checkCaseUse('directObject'),
			create: function(){grammarList.createWord('directObject');},
		},
		prepositionAblative:{
			nounCase: "ablative",
			isOn: dom.id('prepositionAblative').checked,
			check: checkCaseUse('prepositionAblative'),
			create: function(){
				var prep = grammarList["prepositionAblative"];	
				delete prep.preposition, prep.latinForm, prep.translation, prep.meaning, prep.word, prep.decl, prep.gender, prep.number, prep.ending, prep.types;
				if(checkConfig(grammarList).join("").match("prepositionAblative") == null){
					prep.translation = " ";
					prep.word = 'default ' + 'prepostionAblative'; 
					prep.meaning = " ";
					prep.latinForm = " ";
				}
				if(checkConfig(grammarList).join("").match("prepositionAblative")){			
					prep.preposition = random(dictionary['prepositions']);
						while(!(dictionary['prepositions'][prep.preposition]['ablative'])){
							prep.preposition = random(dictionary['prepositions']);
							if('no ablative prep phrase'){console.log('beware of no ablative preps');}
						}
						//*************MAKE SURE THE NOUN IS THE RIGHT TYPE FOR THE PREP************
						var prepTypes = dictionary['prepositions'][prep.preposition]['types'];
						var isType = false;
						while(!(isType)){
							grammarList.createWord('prepositionAblative');
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
		"verb" : {
			isOn: dom.id('verb').checked,
			check: checkCaseUse('verb'),
			create: function(type, transitive){
				//*************MAIN SCOPE VARIABLES****************
				var verb = grammarList['verb'];
				var number = grammarList['subject']['number'];
					if(!number) {console.log('oops no subject number for verb');}
				//***********RESET TO DEFAULT****************************************
//				console.log('deleteing verb, ', verb);
				delete verb.word, verb.conj, verb.ending, verb.latinForm, verb.meaning, verb.types, verb.translation;

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
					verb.word = dictionary["verbs"][random(dictionary["verbs"])];
						var word = verb.word;
						//Check for directObject
	/*				if(sentence.join("").match("directObject"))
						if (word['intransitive'] == true){
							return grammarList["verb"].create();
						}
	*/
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
};