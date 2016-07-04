function Verb(dictEntry, meaning, types){
	this["conj"] = undefined;
		if(dictEntry.match(/are,/i)){ this['conj'] = '1st';}
		else if(dictEntry.match(/ire,/i)){ this['conj'] = '4th';}
		else if(dictEntry.match(/eo,/i) && dictEntry.match(/ere,/i)){ this['conj'] = '2nd';}
		else if(dictEntry.match(/io,/i) && dictEntry.match(/ere,/i)){ this['conj'] = '3rd io';}
		else if(dictEntry.match(/ere,/)){ this['conj'] = '3rd';}
	this["presStem"] = undefined;
		if(this['conj'] == '1st' || this['conj']  == '3rd'){
			this['presStem'] = dictEntry.match(/[a-zA-Z]+(?=o,)/).join();
		}
		else{
			this['presStem'] = dictEntry.match(/[a-zA-Z]+(?=eo,|io,)/).join();
		}
	this['perfStem'] = dictEntry.match(/[a-zA-Z]+(?=i,)/).join();
		if(this['conj'] == '1st'){ this['perfStem'] = this['presStem'] + 'av';
		}
	this['partStem'] = dictEntry.match(/[a-zA-Z]+(?=us$)/).join();
		if(this['conj'] == '1st'){ this['partStem'] = this['presStem'] + 'at';
		}
	this['meaning'] = meaning;
	this['types'] = types;
	this['transitive'] = true; 
	this['intransitive'] = false;
	this['linking'] = false;
		for(var i = 0; i < Verb.arguments.length; i++){
			if(Verb.arguments[i] == 'intransitive') {this["intransitive"] = true;};
			if(Verb.arguments[i] == 'linking') {this['linking'] = true;};
	};		
		if(this['intransitive'] == true){this['transitive'] = false;}
};