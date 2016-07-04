

function Noun(dictEntry, meaning, types, chapter, section){
	//clean up chapters to proper roman numerals
	chapter = cleanNumerals(chapter);

	
	
	this["firstDict"] = dictEntry.match(/^[a-zA-Z]+(?=,)/).join();
	//map to chapters data
	dictionaryCh[chapter][section][this["firstDict"]] = this["firstDict"];
	//Order Matters.  Gender must be in front of Declension to remove any of the info.
	//For words that don't have a declared gender those are dealt with under the declension section.
	this['gen'] = undefined;
	this['decl'] = undefined;
	this['stem'] = undefined;
	this['meaning'] = meaning;
		if(this['meaning'] === undefined) {console.log(dictEntry)}
		if(this['meaning'].match(/,|;/)){

			
			this['meaning'] = this['meaning'].replace(';', ',').split(",");
		}
	this['types'] = types;
	this['chapter'] = chapter;
	this['section'] = section;

	//remove non word characters from the end
	dictEntry = dictEntry.replace(/\W+$/, '');
	//replace ( )  around gender
	dictEntry = dictEntry.replace(/\(/, '');
	dictEntry = dictEntry.replace(/\)/, '');
	//remove pl only if indicated in the entry
	dictEntry = dictEntry.replace(/pl$/i, '');
	//remove any extra trailing ,
	dictEntry = dictEntry.replace(/,$/i, '');
	//remove any trailing spaces
	dictEntry = dictEntry.replace(/\s+$/i, '');
 	
 	//sort for common genders either being written m/f or m,f
	if(dictEntry.match(/ m(\/|,)f$/i)){
		this['gen'] = 'C';
		dictEntry = dictEntry.replace(/ (m(\/|,)f$)/i, '' );
	}
	//the added space is important to make sure that you are not seeing an -orum ending
	if(dictEntry.match(/ m$/i)){
		this['gen'] = 'M';
		dictEntry = dictEntry.replace(/ m$/i,'' );		
	}
	if(dictEntry.match(/f$/i)){
		this['gen'] = 'F';
		dictEntry = dictEntry.replace(/ f$/i,'' );
	}
	if(dictEntry.match(/n$/i)){
		this['gen'] = 'N';
		dictEntry = dictEntry.replace(/ n$/i,'' );
	}
	if(dictEntry.match(/c$/i)){
		this['gen'] = 'C';
		dictEntry = dictEntry.replace(/ c$/i,'' );
	}	
	if(dictEntry.match(/i$|orum$/)){
		this['decl'] = '2nd';
		if(this['gen'] == undefined){ 
			if(dictEntry.match(/um(?=,)|a(?=,)/)){this['gen'] = 'N'; }
			else{ this['gen'] = 'M';}
		}
	}
	if(dictEntry.match(/ae$/)){this['decl'] = '1st';}
	if(this['gen'] == undefined){this['gen'] = 'F'; }
	if(dictEntry.match(/is$|um$/)){
		//protect against catching 2nd decl plurals
		if(!(dictEntry.match(/orum$/))){this['decl'] = '3rd';}
	}
	if(dictEntry.match(/ei$/i)){this['decl'] = '5th';}
	if(dictEntry.match(/us$/i)){this['decl'] = '4th';}		
	if(this['decl'] == '2nd'){
		if(dictEntry.match(/[a-zA-Z](?=,)/).join() == 'r') {
			this['stem'] = dictEntry.match(/[a-zA-Z]+(?=,)/);
		}
		//to look up stems for F 2nd decl words
		else if(this['gen'] == 'F' && this['decl'] == '2nd'){this['stem'] = dictEntry.match(/[a-zA-Z]+(?=us,)/i).join();}
		else if(this['gen'] == 'M'){this['stem'] = dictEntry.match(/[a-zA-Z]+(?=us|i,)/i).join();}
		else{this['stem'] = dictEntry.match(/[a-zA-Z]+(?=um|a,)/i).join();}
	}
	if(this['decl'] == '1st'){this['stem'] = dictEntry.match(/[a-zA-Z]+(?=a,)/i).join();}
	if(this['decl'] == '3rd'){
		//in case a 3rd decl word was shortend in its seccond entry
		if(dictEntry.match(/\w+(?=is|um)/i) === null){this['stem'] = dictEntry.match(/\w+(?=es|a)/i).join();}
		else{this['stem'] = dictEntry.match(/[a-zA-Z]+(?=is|um)/i).join();}
	}
	if(this['decl'] == '4th'){this['stem'] = dictEntry.match(/\w+(?=us,|u,)/i).join();}
	if(this['decl'] == '5th'){this['stem'] = dictEntry.match(/\w+(?=es,)/i).join();}
	
	
};