function Adjective(dictEntry, meaning, types, chapter, section){
	this['gen'] = undefined;
	this['decl'] = undefined;
	this['stem'] = undefined;
	this['adjType'] = undefined;
	this['specialType'] = undefined;
	this['meaning'] = meaning;
	this['types'] = types;
	this['chapter'] = chapter;
	this['section'] = section;

//**************CHECK ADJECTIVE TYPES*************************************************
	//--------------STANDARDS------------------------------------------
	if(dictEntry.match(/a,/) && dictEntry.match(/um$/)){
		this['adjType'] = '1stAnd2nd';
	}
	if(dictEntry.match(/is,/) && dictEntry.match(/e$/)){
		this['adjType'] = '3rd';
	}
	//--------------1ST AND 2ND R ADJECTIVES-------------------------------
	if(dictEntry.match(/r,/)){
		this['specialType'] = 'r';
	}
//************* GET STEMS ************************************************************
	//-------------STANDARD -------------------------------------------------
	//check if it is not a special type first
	if(this['specialType'] === undefined){
		if(this['adjType'] == '1stAnd2nd'){
			this['stem'] = dictEntry.match(/[a-zA-Z]+(?=us,)/i).join('');
		}
		if(this['adjType'] == '3rd'){
			this['stem'] = dictEntry.match(/[a-zA-Z]+(?=is,)/i).join('');
		}
	}
	//----------- 1ST AND 2ND R ADJECTIVES------------------------------------	
	if(this['specialType'] == 'r'){
		this['stem'] = dictEntry.match(/[a-zA-Z]+(?=a,)/i).join('');
	}
	//******************Get Dictionary Entries by Gender
	//***************if it is a 3rd ns type adjective then
	if(dictEntry.match(/^\w+/).toString().match(/ns$/)){
		this['firstDictM'] = dictEntry.match(/^\w+/).toString();
		this['firstDictF'] = dictEntry.match(/^\w+/).toString();
		this['firstDictN'] = dictEntry.match(/^\w+/).toString();
	}

	//**************other types of adjectives
	else{
	this['firstDictM'] = dictEntry.match(/^\w+/).toString();
	this['firstDictF'] = dictEntry.match(/(?:\s)\w+(?=\b)/).toString().match(/\w+/).toString();
		if(this['firstDictF'].length <= 2){this['firstDictF'] = this['stem'] + this['firstDictF'];}
	this['firstDictN'] = dictEntry.match(/\w+$/).toString();
		if(this['firstDictN'].length <= 2){this['firstDictN'] = this['stem'] + this['firstDictN'];}
	}

};
