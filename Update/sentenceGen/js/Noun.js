
function Noun(dictEntry, meaning, types, chapter, section){
	
	this["firstDict"] = dictEntry.match(/^[a-zA-Z]+(?=,)/).join();
	//Order Matters.  Gender must be in front of Declension to remove any of the info.
	//For words that don't have a declared gender those are dealt with under the declension section.
	this['gen'] = undefined;
	this['decl'] = undefined;
	this['stem'] = undefined;
	this['meaning'] = meaning;
	this['types'] = types;
	this['chapter'] = chapter;
	this['section'] = section;

	dictEntry = dictEntry.replace(/\(/, '');
	dictEntry = dictEntry.replace(/\)/, '');
	
	if(dictEntry.match(/m\/f$/i)){
		this['gen'] = 'C';
		dictEntry = dictEntry.replace(/ m\/f$/i, '' );
	}
	if(dictEntry.match(/m$/i)){
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
	if(dictEntry.match(/i$/)){
		this['decl'] = '2nd';
		if(this['gen'] == undefined){ 
			if(dictEntry.match(/um(?=,)/)){this['gen'] = 'N'; }
			else{ this['gen'] = 'M';}
		}
	}
	if(dictEntry.match(/ae$/)){this['decl'] = '1st';}
	if(this['gen'] == undefined){this['gen'] = 'F'; }
	if(dictEntry.match(/is$/)){this['decl'] = '3rd';}
	if(dictEntry.match(/ei$/)){this['decl'] = '5th';}
	if(dictEntry.match(/us$/)){this['decl'] = '4th';}		
	if(this['decl'] == '2nd'){
		if(dictEntry.match(/[a-z](?=,)/).join() == 'r') {
			this['stem'] = dictEntry.match(/[a-zA-Z]+(?=,)/);
		}
		else if(this['gen'] == 'M'){
			this['stem'] = dictEntry.match(/[a-zA-Z]+(?=us,)/i).join();
		}
		else{ this['stem'] = dictEntry.match(/[a-zA-Z]+(?=um,)/i).join();}
	}
	if(this['decl'] == '1st'){this['stem'] = dictEntry.match(/[a-zA-Z]+(?=a,)/i).join();}
};