
window.dictionary = {
	nouns:{
		// Noun(dictEntry, meaning, types, chapter, section)
		servus		:  new Noun('servus, i', 'slave',['person']),
		puella		:  new Noun('puella, ae','girl',['person']),
		fluvius		:  new Noun('fluvius, i', 'river',['place']),
		insula		:  new Noun('insula, ae','island',['place']),
		oppidum		:  new Noun('oppidum, i' , 'town', 'place'),
		//		rex:		new Noun('rex', 'reg', '3rd', 'm', 'king', ['person']),

		ancilla		:  new Noun('ancilla, -ae',	'slave woman',	['person'],	'II',	2	),
		aqua		:  new Noun('aqua, ae',	'water',	['thing'],	'V',	1	),
		atrium		:  new Noun('atrium, i',	'main room',		'V',	1	),
		baculum		:  new Noun('baculum, -i',	'stick',	['thing'],	'IV',	2	),
		cubiculum	:  new Noun('cubiculum, i',	'room',	['place'],	'V',	1	),
		domina		:  new Noun('domina, -ae',	'female master',	['person'],	'II',	2	),
		dominus		:  new Noun('dominus, -i',	'master',	['person'],	'II',	2	),
		familia		:  new Noun('familia, -ae',	'family',	['person'],	'II',	1	),
		femina		:  new Noun('femina, -ae',	'woman',	['person'],	'II',	1	),
		fenestra	:  new Noun('fenestra, ae',	'window',	'thing',	'V',	1	),
		filia		:  new Noun('filia, -ae',	'daughter',	['person'],	'II',	1	),
		filius		:  new Noun('filius, -i',	'son',	['person'],	'II',	1	),
		fluvius		:  new Noun('fluvius, -i',	'river',	['place'],	'I',	1	),
		hortus		:  new Noun('hortus, i',	'garden',	['place'],	'V',	1	),
		imperium	:  new Noun('imperium, -i',	'empire',	'thing',	'I',	2	),
		impluvium	:  new Noun('impluvium, -i',	'water basin',		'V',	1	),
		insula		:  new Noun('insula, -ae',	'island',	['place'],	'I',	1	),
		liber		:  new Noun('liber, libri',	'book',	'thing',	'II',	3	),
		//  liberi	:  new Noun('liberi, -orum',	'children',	['person'],	'II',	1	),
		lilium		:  new Noun('lilium, i',	'lilly',	'thing',	'V',	1	),
		littera		:  new Noun('littera, -ae',	'letter',	'thing',	'I',	3	),
		// mater	:  new Noun('mater, matris',	'mother',	['person'],	'II',	1	),
		mensa		:  new Noun('mensa, -ae',	'table',	'thing',	'IV',	2	),
		nasus		:  new Noun('nasus, i',	'nose',	'thing',	'V',	1	),
		numerus		:  new Noun('numerus, -i',	'number',	'thing',	'I',	3	),
		nummus		:  new Noun('nummus, -i',	'money',	'thing',	'IV',	1	),
		oceanus		:  new Noun('oceanus, -i',	'ocean',	['place'],	'I',	1	),
		oppidum		:  new Noun('oppidum, -i',	'city',	['place'],	'I',	1	),
		ostium		:  new Noun('ostium, i',	'(o) door',	'thing',	'V',	1	),
		pagina		:  new Noun('pagina, -ae',	'page',	'thing',	'II',	3	),
		// pater	:  new Noun('pater, patris',	'father',	['person'],	'II',	1	),
		pecunia		:  new Noun('pecunia, -ae',	'money',	'thing',	'IV',	1	),
		peristylum	:  new Noun('peristylum, i',	'walkway',	['place'],	'V',	1	),
		persona		:  new Noun('persona, -ae',	'person',	['person'],	'III',	1	),
		provincia	:  new Noun('provincia, -ae',	'province',	['place'],	'I',	2	),
		puella		:  new Noun('puella, -ae',	'girl',	['person'],	'II',	1	),
		puer		:  new Noun('puer, -i',	'boy',	['person'],	'II',	1	),
		rosa		:  new Noun('rosa, ae',	'rose',	'thing',	'V',	1	),
		sacculus	:  new Noun('sacculus, -i',	'little bag',	'thing',	'IV',	1	),
		scaena		:  new Noun('scaena, -ae',	'scene',	'thing',	'III',	1	),
		servus		:  new Noun('servus, -i',	'slave',	['person'],	'II',	2	),
		syllaba		:  new Noun('syllaba, -ae',	'syllable',	'thing',	'I',	3	),
		verbum		:  new Noun('verbum, -i',	'(ve) word',	'thing',	'III',	2	),
		villa		:  new Noun('villa, -ae',	'country house',	['place'],	'V',	1	),
		vir			:  new Noun('vir, -i',	'man',	['person'],	'II',	1	),
		vocabulum	:  new Noun('vocabulum, -i',	'(vo) word',	'thing',	'I',	3	),
	},
	verbs:{
		//Verb(dictEntry, meaning, types)
		moveo:	new Verb('moveo, movere, movi, motus', 'move', ['motion'], 'intransitive'),
		pulso :	new Verb('pulso, pulsare, pulsavi, pulsatus', 'hit', ['action']),
		video : 	new Verb("video, videre, vidi, visus", "see", ['perception']),
		amo :	new Verb('amo, -are, -avi, -atus', 'love', ['feeling']),
		habeo :	new Verb('habeo, habere, habui, habitus', 'have', ['has']),
		ago :		new Verb('ago, agere, egi, actus', 'act upon', ['action']), 
		capio :	new Verb('capio, capere, cepi, captus', 'capture', ['action']),
		audio :	new Verb('audio, audire, audivi, auditus', 'hear', ['perception']),
		accuso		: new Verb('accuso, accusare, accusavi, accusatus',	'accuse',	[' ']		),
		ago			: new Verb('ago, agere, egi, actus',	'act',	[' ']		),
		amo			: new Verb('amo, amare, amavi, amatus',	'love',	[' ']		),
		audio		: new Verb('audio, audire, audivi, auditus',	'hear',	[' ']		),
		canto		: new Verb('canto, are, avi, atus',	'sing',	[' ']		),
		carpo		: new Verb('carpo, carpere, carpsi, carptus',	'pick',	[' ']		),
		delecto		: new Verb('delecto, delectare, delectavi, delectatus',	'delight',	[' ']		),
		discedo		: new Verb('discedo, discedere, discessi, discessus',	'leave',	[' '],	'intransitive'	),
		dormio		: new Verb('dormio, dormire, dormivi, dormitus',	'sleep',	[' '],	'intransitive'	),
		habeo		: new Verb('habeo, habere, habui, habitus',	'have',	[' ']		),
		habito		: new Verb('habito, habitare, habitavi, habitatus',	'live in',	[' ']		),
		interrogo	: new Verb('interrogo, interrogare, interrogavi, interrogatus',	'ask',	[' ']		),
		numero		: new Verb('numero, numerare, numeravi, numeratus',	'count',	[' ']		),
		ploro		: new Verb('ploro, plorare, ploravi, ploratus',	'crys',	[' '],	'intransitive'	),
		pono		: new Verb('pono, ponere, posui, positus',	'put',	[' ']		),
		pulso		: new Verb('pulso, pulsare, pulsavi, pulsatus',	'hit',	[' ']		),
		respondeo	: new Verb('respondeo, respondere, respondi, responsus',	'respond',	[' ']		),
		rideo		: new Verb('rideo, ridEre, risi, risus',	'laugh',	[' ']		),
		saluto		: new Verb('saluto, salutare, salutavi, salutatus',	'salute',	[' ']		),
		sumo		: new Verb('sumo, sumere, sumpsi, sumptus',	'pick up',	[' ']		),
		taceo		: new Verb('taceo, tacere, tacui, tacitus',	'be quiet',	[' '],	'intransitive'	),
		venio		: new Verb('venio, venire, veni, ventus',	'come',	[' '],	'intransitive'	),
		verbero		: new Verb('verbero, verberare, verberavi, verberatus',	'beat',	[' ']		),
		video		: new Verb('video, vidEre, vidi, visus',	'see',	[' ']		),
		voco		: new Verb('voco, vocare, vocavi, vocatus',	'call',	[' ']		),
	},	
	adjectives:{
		laetus		: new Adjective('laetus, a, um', 'happy'),
		pulcher		: new Adjective('pulcher, pulchra, pulchrum', 'pretty'),
		tristis		: new Adjective('tristis, tristis, triste', 'sad'),	
	},
	prepositions:{
		'in' : {
			stem: 'in',
			meaning: 'in','ablative' : true,
			types: ['place']
		},
		'ad' : {
			stem: 'ad',
			meaning: 'toward','accusative' : true,
			types : ['place', 'person', 'thing']
		},
		'cum' : {
			stem: 'cum',
			meaning: 'with','ablative' : true,
			types : ['person']
		},
		'sine' : {
			stem: 'sine',
			meaning: 'without','ablative' : true,
			types : ['person']
		},		
		
	},
};