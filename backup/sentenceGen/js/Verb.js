function Verb(dictEntry, meaning, chapter, section){

	this['chapter'] = chapter;
	this['section'] = section;
	//Sort strange direct objects
	dictEntry = dictEntry.replace(/\W+$/,'');
	while(dictEntry.match(/dat$|gen$|abl$/i)){
		this['takes'] = [];
		if(dictEntry.match(/dat$/i)){
			this['takes'] = 'dat';
			dictEntry = dictEntry.replace(/dat$/i, "");
		}
		if(dictEntry.match(/gen$/i)){
			this['takes'] = 'gen';
			dictEntry = dictEntry.replace(/gen$/i, "");
		}
		if(dictEntry.match(/abl$/i)){
			this['takes'] = 'abl';
			dictEntry = dictEntry.replace(/abl$/i, "");
		}
		dictEntry = dictEntry.replace(/\W+$/,'');
		if(dictEntry.match(/or$/i)){dictEntry.replace(/or$/i, "");}
	}
	
	this["conj"] = undefined;
		if(dictEntry.match(/are,|ari,/i)){ this['conj'] = '1st';}
		else if(dictEntry.match(/ire,|iri/i)){ this['conj'] = '4th';}
		else if(dictEntry.match(/eo,|eor,/i) && dictEntry.match(/ere,/i)){ this['conj'] = '2nd';}
		else if(dictEntry.match(/io,|ior,/i) && dictEntry.match(/ere,|i,/i)){ this['conj'] = '3rd io';}
		else if(dictEntry.match(/ere,/)){ this['conj'] = '3rd';}
	
//break for those without 4 princ parts for now
if(dictEntry.match(/,/g).length < 3){return;}	
		
	this["presStem"] = undefined;
		if(this['conj'] == '1st' || this['conj']  == '3rd'){
//			if(this['presStem'] = dictEntry.match(/\w+(?=o,|or,)/) === null)console.log(dictEntry)
			this['presStem'] = dictEntry.match(/\w+(?=o,|or,)/).join();
		}
		else{
			if(this['presStem'] = dictEntry.match(/\w+(?=eo,|io,|eor,|ior,)/) === null){console.log(dictEntry)}
			this['presStem'] = dictEntry.match(/\w+(?=eo,|io,|eor,|ior,)/).join();}
		if(dictEntry.match(/\w+(?=i,)/) === null){console.log(dictEntry)}
	this['perfStem'] = dictEntry.match(/\w+(?=i,)/).join();
		if(this['conj'] == '1st'){ this['perfStem'] = this['presStem'] + 'av';
		}
	if(dictEntry.match(/us sum$/)){
		this['deponent'] = true;
	}
	if(dictEntry.match(/[a-zA-Z]+(?=us$|us sum$)/) === null){console.log(dictEntry)}
	this['partStem'] = dictEntry.match(/[a-zA-Z]+(?=us$|us sum$)/).join();
		if(this['conj'] == '1st'){ this['partStem'] = this['presStem'] + 'at';
		}
	this['meaning'] = meaning;
//	this['types'] = types;
	this['transitive'] = true; 
	this['intransitive'] = false;
	this['linking'] = false;
		for(var i = 0; i < Verb.arguments.length; i++){
			if(Verb.arguments[i] == 'intransitive') {this["intransitive"] = true;};
			if(Verb.arguments[i] == 'linking') {this['linking'] = true;};
	};		
		if(this['intransitive'] == true){this['transitive'] = false;}
};