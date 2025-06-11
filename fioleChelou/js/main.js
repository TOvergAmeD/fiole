
$("body").ready(function(){ // exécution uniquement quand la page html a fini de charger
	initialisation(); //inclue nos fichier js
    
	//les évenements
	miseEnPlaceDesEvenements();
});

function miseEnPlaceDesEvenements() {
	$('.testPotion').on('click ', function() {
		affichageResultatGif($(this).attr('id'));
	});
	$('#retourMain').on('click ', function() {
		retourAcceuil();
	});
}

function initialisation() {
	if($('#main').css('display')!='none'){
		blocCarreEnFonctionDuWidth($(".testPotion"));
		adaptationText($('.textAdaptative'));
	}
}

$(window).resize(function(){
	if($('#main').css('display')!='none'){
		blocCarreEnFonctionDuWidth($(".testPotion"));
		adaptationText($('.textAdaptative'));
	}
	if($('#Compteur').css('display')!='none'){
		adaptationText($('#textCompteur'));
	}
	
});

function retourAcceuil() {
	$('#main').css('display','block');
	$('#resultatGif').css('display','none');
	$('.imgResult').css('display','none');
	$('#retourMain').css('display','none');
	$('.sonResult').each(function(){
		this.pause();
		this.currentTime = 0;
	}); 
}



function affichageCompteur(tempsAficher) {
		console.log(tempsAficher);
		if(tempsAficher>0) {
			$('#textCompteur').html(tempsAficher);
			console.log($('#textCompteur'));
			tempsAficher--
			setTimeout(() => {
				affichageCompteur(tempsAficher);	
			}, "1000");
		}
		else
			$('#Compteur').css('display','none');
}
function affichageResultatGif(textResultat) {
	$('#main').css('display','none');
	$('#Compteur').css('display','block');
	$('#textCompteur').html(5);
	adaptationText($('#textCompteur'));
	setTimeout(() => {
		affichageCompteur(5);	
	}, "0");
	setTimeout(() => {
		$('#resultatGif').css('display','block');
		$('#retourMain').css('display','block');
		$('#textResult').html('' + textResultat);
		imgResultAfficher(textResultat);
		sonResultEntendu(textResultat);
	}, "5100");
}

function blocCarreEnFonctionDuWidth(bloc) {
	$(bloc).css('height',$(bloc).css('width'));
	$(bloc).css('lineHeight',$(bloc).css('width'));
	
}

function adaptationText(texteAChanger) {
	var tailleMinLargeurBlocConteneur=0;
	var tailleMinHauteurBlocConteneur=0;
	var largeur;
	var hauteur;
	$.each(texteAChanger, function() {
		largeur=$($(this).parent()).css('width');
		hauteur=$($(this).parent()).css('height');
		largeur=parseFloat(largeur.slice(0,largeur.length-2));
		hauteur=parseFloat(hauteur.slice(0,hauteur.length-2));
		if(tailleMinLargeurBlocConteneur==0 || (tailleMinLargeurBlocConteneur>largeur))
			tailleMinLargeurBlocConteneur=largeur;
		if(tailleMinHauteurBlocConteneur==0 || (tailleMinHauteurBlocConteneur>hauteur))
			tailleMinHauteurBlocConteneur=hauteur;
	});
	
	
	var depassementBloc=0;
	var px=0;
	while(depassementBloc<tailleMinLargeurBlocConteneur && depassementBloc<tailleMinHauteurBlocConteneur) {
		px+=10;
		$.each(texteAChanger, function() {
			$(this).css('fontSize', px +'px');
			var tailleLarg=parseFloat($(this).css('width'));
			var tailleHaut=parseFloat($(this).css('height'));
			if(depassementBloc<tailleLarg) {
				depassementBloc=tailleLarg;
			}
			if(depassementBloc<tailleHaut) {
				depassementBloc=tailleHaut;
			}
		});
	}
	if(depassementBloc>tailleMinLargeurBlocConteneur) {
		px-=10;
		$.each(texteAChanger, function() {
			$(this).css('fontSize', px + 'px');
		});
	}
	else if(depassementBloc>tailleMinHauteurBlocConteneur) {
		px-=10;
		$.each(texteAChanger, function() {
			$(this).css('fontSize', px + 'px');
		});
	}
}



function nombreAleatoire(max) {
	return 1 + Math.floor(Math.random() * max);
}

function imgResultAfficher(niveau) {
	var enfantImgResult=$('#' + niveau  + 'Img').children();
	$(enfantImgResult[nombreAleatoire(enfantImgResult.length)-1]).css('display','block');
}

function sonResultEntendu(niveau) {
	var enfantSonResult=$('#' + niveau  + 'Audio').children();
	$(enfantSonResult[nombreAleatoire(enfantSonResult.length)-1])[0].play();
	
}
