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
};
