$(document).ready(function(){

  let CompteurBateauPlacer = 0;
  let CompteurBateauPlacerJ2 = 0;
  let BateauDejaChoisi = 0;
  let BateauEnAttente =0;
  let PretAplacer = 0;
  peutTirer = false; //pour la gestion de quand les joueurs peuvent tirer ou non
  J1peutTirer = false;
  J2peutTirer = false;
  window.TourJoueur = 0;
  window.CoupSpecialJ1 = true;
  window.CoupSpecialJ2 = true;

  $('#t1Bateau .ligne').addClass('grille');
  $('#t2Bateau .ligne').addClass('grille2');

//Phase de positionnement des bateaux

 //gerer la selection d'un bateau joueur1 --------------------------------------------------
  $('.pasPlacé').off('click').on('click', function() {
    
    if(!($('.cellule').children().hasClass('selectionner'))){
      BateauDejaChoisi = 0;
      BateauEnAttente = 0;
      CompteurBateauPlacer++;
    }
    if(BateauDejaChoisi == 0)
    {
      let allPasPlacers = $('.pasPlacé').children();
      let DejaSelectionner = false;
  
      for (let i = 0; i < allPasPlacers.length; i++) {
          if ($(allPasPlacers[i]).hasClass('selectionner')) {
            DejaSelectionner = true;
              break;
          }
      }
  
      if (DejaSelectionner) {
        allPasPlacers.removeClass('selectionner');
        $(this).children().addClass('selectionner');
        PretAplacer = 1;
      }
      else{
        $(this).children().addClass('selectionner');
        PretAplacer = 1;
      }
    }
  });
 //-----------------------------------------------------------------------------------

  //gerer la selection d'un bateau joueur2 ------------------------------------------------------------------------
  $('.pasPlacéJ2').off('click').on('click', function() {
    
    if(!($('.cellule2').children().hasClass('selectionner'))){
      BateauDejaChoisi = 0;
      BateauEnAttente = 0;
      CompteurBateauPlacerJ2++;
    }
    if(BateauDejaChoisi == 0)
    {
      let allPasPlacers = $('.pasPlacéJ2').children();
      let DejaSelectionner = false;
  
      for (let i = 0; i < allPasPlacers.length; i++) {
          if ($(allPasPlacers[i]).hasClass('selectionner')) {
            DejaSelectionner = true;
              break;
          }
      }
  
      if (DejaSelectionner) {
        allPasPlacers.removeClass('selectionner');
        $(this).children().addClass('selectionner');
        PretAplacer = 1;
      }
      else{
        $(this).children().addClass('selectionner');
        PretAplacer = 1;
      }
    }
  });
 //-----------------------------------------------------------------------------------

  //evenement lié a la position du bateau (j1)-----------------------------------------------------------------------
  
  $('.cellule').off('click.celluleNamespace').on('click.celluleNamespace', function () {
    let CelluleClick = $(this);

    if(BateauEnAttente == 0 && PretAplacer == 1 && !(CelluleClick.hasClass('BateauPlacer')))
    {
      BateauDejaChoisi = 1;
      BateauEnAttente = 1;
      let DernierSelectionner = $('.pasPlacé .selectionner').last();
      let couleurParent = DernierSelectionner.parent().css('background-color');
      let IDcelluleCliquer = $(this).attr('id');
      if (!(CompteurBateauPlacer == 8)) {
        let BateauSelectionner = $('.pasPlacé').children().hasClass('selectionner');
        if (BateauSelectionner) {
          
            // coordonnées case cliquer
          let ColonneCLiquer = parseInt(IDcelluleCliquer.substring(0, 1));
          let LigneCliquer = parseInt(IDcelluleCliquer.substring(1, 2)); 
    
          // Placez la dernière case du bateau sur la cellule cliquée
          DernierSelectionner.appendTo(CelluleClick);
          CelluleClick.addClass('BateauPlacer1st');
          DernierSelectionner.attr('style',`background:${couleurParent};`)
    
          // Affichez des positions "fantômes" autour de la cellule cliquée
          let Taillesbateau = $('.pasPlacé').children('.selectionner').length;
    
          for (let i = 1; i <= Taillesbateau; i++) {
            // Vérifiez que les positions "fantômes" ne sortent pas de la grille
            let topPosition = LigneCliquer - i;
            let bottomPosition = LigneCliquer + i;
            let leftPosition = ColonneCLiquer - i;
            let rightPosition = ColonneCLiquer + i;
      
            if (topPosition >= 0) {
                afficherFantome(topPosition, ColonneCLiquer);
            }
    
            if (bottomPosition <= 9) {
                afficherFantome(bottomPosition, ColonneCLiquer);
            }
    
            if (leftPosition >= 0) {
                afficherFantome(LigneCliquer, leftPosition);
            }
    
            if (rightPosition <= 9) {
                afficherFantome(LigneCliquer, rightPosition);
            }
          }
        }
      }
    }
    else {
      if(J2peutTirer == true)
      {
        if (CelluleClick.hasClass('BateauPlacer')) {

          let enfants = $(this).children(); // Récupérer les enfants de l'élément
          let classEnfant = enfants.attr("class"); // Obtenir la classe de l'élément enfant
          let backgroundEnfant = enfants.css('background-color');
          if(classEnfant == "b7")
          {
            CelluleClick.css('background-color',`${backgroundEnfant}`);
            CelluleClick.removeClass('BateauPlacer');
            CelluleClick.addClass('BateauCouler');
            CelluleClick.css('visibility','initial');
          }
          else{
            $(`.${classEnfant}`).parent().css('background-color',`${backgroundEnfant}`)
            $(`.${classEnfant}`).parent().removeClass('BateauPlacer');
            $(`.${classEnfant}`).parent().addClass('BateauCouler');
            $(`.${classEnfant}`).css('visibility','initial');
          }
                    
          
          if($('.cellule.BateauCouler').length == 21)
          {   
            $("#boite_victoire").css('z-index','3');
            $('.confetti').css('visibility','initial');
            //JEU TERMINER
          }
          $('#switch').removeAttr('disabled','disabled');
          $('#switch').attr('enabled','enabled');
          $('#CoupSpecial').attr('disabled','disabled');
          $('#CoupSpecial').addClass('Desactiver');

          J2peutTirer = false;
          J1peutTirer = true;
          $('#switch').addClass('blink');
          window.TourJoueur =1;
        }
        else if(!(CelluleClick.hasClass('BateauPlacer')) && !(CelluleClick.hasClass('BateauCouler')) && !(CelluleClick.hasClass('BateauRaté'))){
          CelluleClick.addClass('BateauRaté');
          $('#switch').removeAttr('disabled','disabled');
          $('#switch').attr('enabled','enabled');
          $('#CoupSpecial').attr('disabled','disabled');
          $('#CoupSpecial').addClass('Desactiver');


          J2peutTirer = false;
          J1peutTirer = true;
          $('#switch').addClass('blink');
          window.TourJoueur =1;
        }
        else if (CelluleClick.hasClass('BateauRaté') || CelluleClick.hasClass('BateauCouler')) {
          J2peutTirer = true;
        }
        else console.error('impossible')
      }
    }
  });
  //--------------------------------------------------------------------------------------

//evenement lié a la position du bateau (j2)-----------------------------------------------------------------------
$('.cellule2').off('click.celluleNamespace').on('click.celluleNamespace', function () {
  let CelluleClick = $(this);

  if(BateauEnAttente == 0 && PretAplacer == 1 && !(CelluleClick.hasClass('BateauPlacer')))
  {
    BateauDejaChoisi = 1;
    BateauEnAttente = 1;
    let DernierSelectionner = $('.pasPlacéJ2 .selectionner').last();
    let couleurParent = DernierSelectionner.parent().css('background-color');
    let IDcelluleCliquer = $(this).attr('id');
    if (!(CompteurBateauPlacerJ2 == 8)) {
      let BateauSelectionner = $('.pasPlacéJ2').children().hasClass('selectionner');
      if (BateauSelectionner) {
        
          // coordonnées case cliquer
        let ColonneCLiquer = parseInt(IDcelluleCliquer.substring(0, 1));
        let LigneCliquer = parseInt(IDcelluleCliquer.substring(1, 2)); 
  
        // Placez la dernière case du bateau sur la cellule cliquée
        DernierSelectionner.appendTo(CelluleClick);
        CelluleClick.addClass('BateauPlacer1st');
        DernierSelectionner.attr('style',`background:${couleurParent};`)
  
        // Affichez des positions "fantômes" autour de la cellule cliquée
        let Taillesbateau = $('.pasPlacéJ2').children('.selectionner').length;
  
        for (let i = 1; i <= Taillesbateau; i++) {
          // Vérifiez que les positions "fantômes" ne sortent pas de la grille
          let topPosition = LigneCliquer - i;
          let bottomPosition = LigneCliquer + i;
          let leftPosition = ColonneCLiquer - i;
          let rightPosition = ColonneCLiquer + i;
  
          if (topPosition >= 0) {
              afficherFantome2(topPosition, ColonneCLiquer);
          }
  
          if (bottomPosition <= 9) {
              afficherFantome2(bottomPosition, ColonneCLiquer);
          }
  
          if (leftPosition >= 0) {
              afficherFantome2(LigneCliquer, leftPosition);
          }
  
          if (rightPosition <= 9) {
              afficherFantome2(LigneCliquer, rightPosition);
          }
        }
      }
    }
  }
  else {
    if(J1peutTirer == true)
    {
      if (CelluleClick.hasClass('BateauPlacer')) {

        let enfants = $(this).children(); // Récupérer les enfants de l'élément
        let classEnfant = enfants.attr("class"); // Obtenir la classe de l'élément enfant
        let backgroundEnfant = enfants.css('background-color');
        if(classEnfant == "c7")
        {
          CelluleClick.css('background-color',`${backgroundEnfant}`);
          CelluleClick.removeClass('BateauPlacer');
          CelluleClick.addClass('BateauCouler');
          CelluleClick.css('visibility','initial');
        }
        else{
          $(`.${classEnfant}`).parent().css('background-color',`${backgroundEnfant}`)
          $(`.${classEnfant}`).parent().removeClass('BateauPlacer');
          $(`.${classEnfant}`).parent().addClass('BateauCouler');
          $(`.${classEnfant}`).css('visibility','initial');

        }

        if($('.cellule2.BateauCouler').length == 21)
        {   
          $("#boite_victoire").css('z-index','3');
          $('.confetti').css('visibility','initial');
          //JEU TERMINER
        }
        $('#CoupSpecial').attr('disabled','disabled');
        $('#CoupSpecial').addClass('Desactiver');
        $('#switch').removeAttr('disabled','disabled');
        $('#switch').attr('enabled','enabled');
        J1peutTirer = false;
        J2peutTirer = true;

        $('#switch').addClass('blink');
        window.TourJoueur =0;
      }
      else if(!(CelluleClick.hasClass('BateauPlacer')) && !(CelluleClick.hasClass('BateauCouler')) && !(CelluleClick.hasClass('BateauRaté'))){
        CelluleClick.addClass('BateauRaté');
        $('#switch').removeAttr('disabled','disabled');
        $('#switch').attr('enabled','enabled');
        $('#CoupSpecial').attr('disabled','disabled');
        $('#CoupSpecial').addClass('Desactiver');

        J1peutTirer = false;
        J2peutTirer = true;

        $('#switch').addClass('blink');
        window.TourJoueur =0;
      }
      else if (CelluleClick.hasClass('BateauRaté') || CelluleClick.hasClass('BateauCouler')) {
        J1peutTirer = true;
      }
      else console.error('impossible')
    }
  }
});
//--------------------------------------------------------------------------------------

  function getDirection(cellule1, cellule2) {
    let ligne1 = parseInt(cellule1.substring(1, 2));
    let colonne1 = parseInt(cellule1.substring(0, 1));
    let ligne2 = parseInt(cellule2.substring(1, 2));
    let colonne2 = parseInt(cellule2.substring(0, 1));


    if (ligne1 === ligne2) {
      if (colonne1 < colonne2) {
        return 'droite';
      } else {
        return 'gauche';
      }
    } else if (colonne1 === colonne2) {
      if (ligne1 < ligne2) {
        return 'bas';
      } else {
        return 'haut';
      }
    }
  }

  //----------------Coup Special (Sous Marin)------------------------------------------------------------------
  $('#CoupSpecial').off('click').on('click', function () {
    // On crée la structure HTML du modal
    var modal = $('<div id="ModalCoupSpecial" class="modal"><div class="modal-content"><p>Voulez-vous confirmer ce coup spécial ?</p><button id="confirmButton">Oui</button><button id="cancelButton">Non</button><div class="pcs"><p>Attention vous ne pourrez lancer le coup spécial qu\'une seule fois, toucher une case ennemie et</br> votre sous marin enverra une torpille depuis sa position.</br> Cette puissante torpille balaye tout sur son chemin,</br> ce coup dévoilera un bloc de votre sous marin et sera à découvert !</p></div></div></div>');

    // On ajoute le modal au body
    $('body').append(modal);
    $('.pcs').attr('style','font-size:smaller; color:#c10000; font-weight:initial;');

    $('#confirmButton').off('click').on('click', function () {
        $('#ModalCoupSpecial').remove();
        $('#BtnCacher').trigger('click');
        $('#CoupSpecial').addClass('cache');

        if(J2peutTirer == true)
        {
          window.CoupSpecialJ2 = false;
          J2peutTirer = false;
          J1peutTirer = true;
          window.TourJoueur =1;
        }
        else if(J1peutTirer == true){
          window.CoupSpecialJ1 = false;
          J2peutTirer = true;
          J1peutTirer = false;
          window.TourJoueur =1;
        }
    });

    $('#cancelButton').off('click').on('click', function () {
        // On ferme le modal en le supprimant du DOM
        $('#ModalCoupSpecial').remove();
    });

  });

  //gerer le bloc devoiler au joueur
  $('.BlocSSmarin').off('click').on('click', function() {
    $(this).parent().trigger('click');
  })
  //fin gerer bloc devoiler
  //----------------------------------------------------------------------

  //placerBateau(J1)----------------------------------------------------------------------------------------
  function placerBateau(bateau, ligne, colonne, direction) {
    let tailleBateau = $('.pasPlacé').children('.selectionner').length;
    let couleurParent = bateau.parent().css('background-color');
    bateau.attr('style',`background:${couleurParent};`);
    switch (direction) {
      case 'haut':
        for (let i = 1; i <= tailleBateau; i++) {
          let DetecterBloc = $(`#${colonne}${ligne + i}J1`);
          let celluleCible = $(`#${colonne}${ligne}J1`);
          if (!celluleCible.length || DetecterBloc.hasClass('BateauPlacer') || !(DetecterBloc.hasClass('BlocPlacer')) && !(DetecterBloc.hasClass('BateauPlacer1st'))) {
            console.error('pas de placement possible');
            return;
          }
          bateau.appendTo(celluleCible);
          celluleCible.addClass('BlocPlacer');
          DetecterBloc.children().removeClass('selectionner');
          celluleCible.find('.cellule.celluleFantome').remove();
          if(tailleBateau == 1){
            celluleCible.addClass('BlocPlacer');
            $('.cellule').find('.cellule.celluleFantome').remove();
            $('.cellule').children().removeClass('selectionner');
            $('.cellule.BlocPlacer').addClass('BateauPlacer');
            $('.cellule.BlocPlacer').removeClass('BlocPlacer');
            $('.cellule.BateauPlacer1st').addClass('BateauPlacer');
            $('.cellule.BateauPlacer1st').removeClass('BateauPlacer1st');
          }
        }
        break;
      case 'bas':
        for (let i = 1; i <= tailleBateau; i++) {
          let celluleCible = $(`#${colonne}${ligne}J1`);
          let DetecterBloc = $(`#${colonne}${ligne - i}J1`);

          if (!celluleCible.length || DetecterBloc.hasClass('BateauPlacer') || !(DetecterBloc.hasClass('BlocPlacer')) && !(DetecterBloc.hasClass('BateauPlacer1st'))) {
            console.error('pas de placement possible');
            return;
          }
          bateau.appendTo(celluleCible);
          celluleCible.addClass('BlocPlacer');
          DetecterBloc.children().removeClass('selectionner')
          celluleCible.find('.cellule.celluleFantome').remove();
          if(tailleBateau == 1){
            celluleCible.addClass('BlocPlacer');
            $('.cellule').find('.cellule.celluleFantome').remove();
            $('.cellule').children().removeClass('selectionner');
            $('.cellule.BlocPlacer').addClass('BateauPlacer');
            $('.cellule.BlocPlacer').removeClass('BlocPlacer');
            $('.cellule.BateauPlacer1st').addClass('BateauPlacer');
            $('.cellule.BateauPlacer1st').removeClass('BateauPlacer1st');
          }
        }
        break;
      case 'gauche':
        for (let i = 1; i <= tailleBateau; i++) {
          let celluleCible = $(`#${colonne}${ligne}J1`);
          let DetecterBloc = $(`#${colonne + i}${ligne}J1`);

          if (!celluleCible.length || DetecterBloc.hasClass('BateauPlacer') || !(DetecterBloc.hasClass('BlocPlacer')) && !(DetecterBloc.hasClass('BateauPlacer1st'))) {
            console.error('pas de placement possible');
            return;
          }
          bateau.appendTo(celluleCible);
          celluleCible.addClass('BlocPlacer');
          DetecterBloc.children().removeClass('selectionner')
          celluleCible.find('.cellule.celluleFantome').remove();
          if(tailleBateau == 1){
            celluleCible.addClass('BlocPlacer');
            $('.cellule').find('.cellule.celluleFantome').remove();
            $('.cellule').children().removeClass('selectionner');
            $('.cellule.BlocPlacer').addClass('BateauPlacer');
            $('.cellule.BlocPlacer').removeClass('BlocPlacer');
            $('.cellule.BateauPlacer1st').addClass('BateauPlacer');
            $('.cellule.BateauPlacer1st').removeClass('BateauPlacer1st');
          }
        }
        break;
      case 'droite':
        for (let i = 1; i <= tailleBateau; i++) {
          let celluleCible = $(`#${colonne}${ligne}J1`);
          let DetecterBloc = $(`#${colonne - i}${ligne}J1`);

          if (!celluleCible.length || DetecterBloc.hasClass('BateauPlacer') || !(DetecterBloc.hasClass('BlocPlacer')) && !(DetecterBloc.hasClass('BateauPlacer1st'))) {
            console.error('pas de placement possible');
            return;
          }
          bateau.appendTo(celluleCible);
          celluleCible.addClass('BlocPlacer');
          DetecterBloc.children().removeClass('selectionner')
          celluleCible.find('.cellule.celluleFantome').remove();
          if(tailleBateau == 1){
            celluleCible.addClass('BlocPlacer');
            $('.cellule').find('.cellule.celluleFantome').remove();
            $('.cellule').children().removeClass('selectionner');
            $('.cellule.BlocPlacer').addClass('BateauPlacer');
            $('.cellule.BlocPlacer').removeClass('BlocPlacer');
            $('.cellule.BateauPlacer1st').addClass('BateauPlacer');
            $('.cellule.BateauPlacer1st').removeClass('BateauPlacer1st');
          }
        }
        break;
      default:
        console.error('Direction non reconnue');
    }

    if($('.pasPlacé').children().length == 0)
    {
    $('.triBateau').css('display','none');
    $('.NomGrille').css('left','3%');
    $('#bateauETtableau').css('justify-content', 'center');
    $('#switch').addClass('blink');
    }
  }
 //---------------------------------------------------------------------


 //placerBateau(J2)----------------------------------------------------------------------------------------
function placerBateau2(bateau, ligne, colonne, direction) {
  let tailleBateau = $('.pasPlacéJ2').children('.selectionner').length;
  let couleurParent = bateau.parent().css('background-color');
  bateau.attr('style',`background:${couleurParent};`);
  switch (direction) {
     case 'haut':
       for (let i = 1; i <= tailleBateau; i++) {
        let DetecterBloc = $(`#${colonne}${ligne + i}J2`);
         let celluleCible = $(`#${colonne}${ligne}J2`);
         if (!celluleCible.length || DetecterBloc.hasClass('BateauPlacer') || !(DetecterBloc.hasClass('BlocPlacer')) && !(DetecterBloc.hasClass('BateauPlacer1st'))) {
          console.error('pas de placement possible');
          return;
         }
         bateau.appendTo(celluleCible);
         celluleCible.addClass('BlocPlacer');
         DetecterBloc.children().removeClass('selectionner');
         celluleCible.find('.cellule2.celluleFantome').remove();
         if(tailleBateau == 1){
          celluleCible.addClass('BlocPlacer');
          $('.cellule2').find('.cellule2.celluleFantome').remove();
          $('.cellule2').children().removeClass('selectionner');
          $('.cellule2.BlocPlacer').addClass('BateauPlacer');
          $('.cellule2.BlocPlacer').removeClass('BlocPlacer');
          $('.cellule2.BateauPlacer1st').addClass('BateauPlacer');
          $('.cellule2.BateauPlacer1st').removeClass('BateauPlacer1st');
         }
       }
       break;
     case 'bas':
       for (let i = 1; i <= tailleBateau; i++) {
         let celluleCible = $(`#${colonne}${ligne}J2`);
         let DetecterBloc = $(`#${colonne}${ligne - i}J2`);

         if (!celluleCible.length || DetecterBloc.hasClass('BateauPlacer') || !(DetecterBloc.hasClass('BlocPlacer')) && !(DetecterBloc.hasClass('BateauPlacer1st'))) {
          console.error('pas de placement possible');
           return;
         }
         bateau.appendTo(celluleCible);
         celluleCible.addClass('BlocPlacer');
         DetecterBloc.children().removeClass('selectionner')
         celluleCible.find('.cellule2.celluleFantome').remove();
         if(tailleBateau == 1){
          celluleCible.addClass('BlocPlacer');
          $('.cellule2').find('.cellule2.celluleFantome').remove();
          $('.cellule2').children().removeClass('selectionner');
          $('.cellule2.BlocPlacer').addClass('BateauPlacer');
          $('.cellule2.BlocPlacer').removeClass('BlocPlacer');
          $('.cellule2.BateauPlacer1st').addClass('BateauPlacer');
          $('.cellule2.BateauPlacer1st').removeClass('BateauPlacer1st');
         }
       }
       break;
     case 'gauche':
       for (let i = 1; i <= tailleBateau; i++) {
         let celluleCible = $(`#${colonne}${ligne}J2`);
         let DetecterBloc = $(`#${colonne + i}${ligne}J2`);

         if (!celluleCible.length || DetecterBloc.hasClass('BateauPlacer') || !(DetecterBloc.hasClass('BlocPlacer')) && !(DetecterBloc.hasClass('BateauPlacer1st'))) {
          console.error('pas de placement possible');
          return;
         }
         bateau.appendTo(celluleCible);
         celluleCible.addClass('BlocPlacer');
         DetecterBloc.children().removeClass('selectionner')
         celluleCible.find('.cellule2.celluleFantome').remove();
         if(tailleBateau == 1){
          celluleCible.addClass('BlocPlacer');
          $('.cellule2').find('.cellule2.celluleFantome').remove();
          $('.cellule2').children().removeClass('selectionner');
          $('.cellule2.BlocPlacer').addClass('BateauPlacer');
          $('.cellule2.BlocPlacer').removeClass('BlocPlacer');
          $('.cellule2.BateauPlacer1st').addClass('BateauPlacer');
          $('.cellule2.BateauPlacer1st').removeClass('BateauPlacer1st');
         }
       }
       break;
     case 'droite':
       for (let i = 1; i <= tailleBateau; i++) {
         let celluleCible = $(`#${colonne}${ligne}J2`);
         let DetecterBloc = $(`#${colonne - i}${ligne}J2`);

         if (!celluleCible.length || DetecterBloc.hasClass('BateauPlacer') || !(DetecterBloc.hasClass('BlocPlacer')) && !(DetecterBloc.hasClass('BateauPlacer1st'))) {
          console.error('pas de placement possible');
          return;
         }
         bateau.appendTo(celluleCible);
         celluleCible.addClass('BlocPlacer');
         DetecterBloc.children().removeClass('selectionner')
         celluleCible.find('.cellule2.celluleFantome').remove();
         if(tailleBateau == 1){
          celluleCible.addClass('BlocPlacer');
          $('.cellule2').find('.cellule2.celluleFantome').remove();
          $('.cellule2').children().removeClass('selectionner');
          $('.cellule2.BlocPlacer').addClass('BateauPlacer');
          $('.cellule2.BlocPlacer').removeClass('BlocPlacer');
          $('.cellule2.BateauPlacer1st').addClass('BateauPlacer');
          $('.cellule2.BateauPlacer1st').removeClass('BateauPlacer1st');
         }
       }
       break;
     default:
       console.error('Direction non reconnue');
  }
  if($('.pasPlacéJ2').children().length == 0)
  {
    $('.triBateau2').css('display','none');
    $('.NomGrille').css('left','0%');
    $('#infoBateau').attr('style', 'color:#3c14ff;');
    $('#infoBateau').html('Joueur 2 : C\'est à vous d\'attaquer !');
      peutTirer = true;
      if( window.CoupSpecialJ2 == true)
        $('#CoupSpecial').css('visibility','initial');
        
    if(peutTirer === true)
    {
        $('#t2Bateau').attr('style','display: none;');
        $('#labelGrille2').attr('style','display: none;');
        J2peutTirer = true;
    }
  }
 }
 //---------------------------------------------------------------------

  // function afficher fantome (J1)----------------------------------------------------------------------
function afficherFantome(ligne, colonne) {
  let celluleFantome = $(`#${colonne}${ligne}J1`);
   
  if (!celluleFantome.hasClass('BateauPlacer')) {
     let fantomeDiv = $('<div class="cellule celluleFantome"></div>');
     fantomeDiv.css('border', '2px dotted red');
     fantomeDiv.css('background-color', $('.selectionner').last().css('background-color'));
   
     fantomeDiv.off('click').on('click', function () {

       let IDcelluleCliquer = $(this).parent().attr('id');
       let DernierSelectionner = $('.cellule .selectionner').parent();
       let ColonneCLiquer = parseInt(IDcelluleCliquer.substring(0, 1));
       let LigneCliquer = parseInt(IDcelluleCliquer.substring(1, 2)); 
       let direction = getDirection(DernierSelectionner.attr('id'), IDcelluleCliquer);
       placerBateau($('.pasPlacé').children('.selectionner').last(), LigneCliquer, ColonneCLiquer, direction);
     });
   
     celluleFantome.append(fantomeDiv); 

  } else {
     console.error(`Fantôme non affiché à ${colonne}${ligne} (conflit avec un bateau déjà placé)`);
  }
 }
//---------------------------------------------------------------------------------------------------


// function afficher fantome (J2)----------------------------------------------------------------------
function afficherFantome2(ligne, colonne) {
  let celluleFantome = $(`#${colonne}${ligne}J2`);
   
  if (!celluleFantome.hasClass('BateauPlacer')) {
     let fantomeDiv = $('<div class="cellule2 celluleFantome"></div>');
     fantomeDiv.css('border', '2px dotted red');
     fantomeDiv.css('background-color', $('.selectionner').last().css('background-color'));
   
     fantomeDiv.off('click').on('click', function () {
       
       let IDcelluleCliquer = $(this).parent().attr('id');
       let DernierSelectionner = $('.cellule2 .selectionner').parent();
       let ColonneCLiquer = parseInt(IDcelluleCliquer.substring(0, 1));
       let LigneCliquer = parseInt(IDcelluleCliquer.substring(1, 2)); 
       let direction = getDirection(DernierSelectionner.attr('id'), IDcelluleCliquer);
       placerBateau2($('.pasPlacéJ2').children('.selectionner').last(), LigneCliquer, ColonneCLiquer, direction);
     });
   
     celluleFantome.append(fantomeDiv); 

  } else {
     console.error(`Fantôme non affiché à ${colonne}${ligne} (conflit avec un bateau déjà placé)`);
  }
 }
//---------------------------------------------------------------------------------------------------

// fonction pour afficher l'ecran du joueur2------------------------------------------------------------
 function afficherEcranJoueur () {
    $('.triBateau').css({'display':'none'});
    $('.triBateau2').css({'display':'grid'});
    $('.NomGrille').attr('style','left:-10%; height:0%;');
    $('#bateauETtableau ').attr('style','justify-content:center; position:relative; top: 4%;');
    $('#t1Bateau .ligne').addClass('inverseGrille');
    $('#t2Bateau .ligne').addClass('inverseGrille2');
    $('#labelGrille').html('Grille Position Ennemies');
    $('#labelGrille2').html('Grille Position Alliées');
    $('#switch').removeAttr('enabled')
    $('#switch').attr('disabled','disabled');
    $('.cellule.BateauPlacer').children().css('visibility','hidden');
 }

 function afficherEcranJoueur1 () {
    $('#t2Bateau').attr('style','display:initial; left:0%;');
    $('#t1Bateau').css('display','none');
    $('#infoBateau').html('Joueur 1 : C\'est à votre tour d\'attaquer !');
    $('#infoBateau').css('color','deeppink');
    $('.cellule2.BateauPlacer').children().css('visibility','hidden');
    $('#switch').removeAttr('enabled')
    $('#switch').attr('disabled','disabled');

    $('.ligne').removeClass('inverseGrille2');

    if(!(window.CoupSpecialJ1 == true))
    {
      $('#CoupSpecial').addClass('cache');
    }
    else if($('#CoupSpecial').hasClass('cache') && window.CoupSpecialJ1 == true)
    {
      $('#CoupSpecial').removeClass('cache');
    }
 }

 function afficherEcranJoueur2 () {
  $('#t1Bateau').attr('style','display:initial;');
  $('#t2Bateau').css('display','none');
  $('#infoBateau').attr('style', 'color:#3c14ff;');
  $('#infoBateau').html('Joueur 2 : C\'est à vous d\'attaquer !');
    if(!(window.CoupSpecialJ2 == true))
    {
      $('#CoupSpecial').addClass('cache');
    }
    else if($('#CoupSpecial').hasClass('cache') && window.CoupSpecialJ2 == true)
    {
      $('#CoupSpecial').removeClass('cache');
    }
  }
 //---------------------------------------------------------------------------------------------------


// Gestion du Changement de joueur --------------------------------------------------------------------------------------
  $('#switch').off('click').on('click', function(){
    $('#switch').removeClass('blink');
    $('#CoupSpecial').removeAttr('disabled','disabled');
    $('#CoupSpecial.Desactiver').removeClass('Desactiver');

    
    if(window.TourJoueur == 0)
    {
      if($('.pasPlacé').children().length == 0)
      {
        if(J2peutTirer == false)
        {
          afficherEcranJoueur();
        }
        else{
          afficherEcranJoueur2();
        }
        window.TourJoueur = 1;
      }
      else{
        alert("Veuillez finir de placer tout vos bateaux");
      }
    }
    else if(window.TourJoueur == 1)
    {
      if($('.pasPlacéJ2').children().length == 0)
      {
        if(J1peutTirer == false)
        {
          afficherEcranJoueur2();
        }
        else{
          afficherEcranJoueur1();
        }
        window.TourJoueur =0;
      }
      else{
        alert("Veuillez finir de placer tout vos bateaux");
      }
    }
  })
  //--fin gestion changement de joueur-----------------------------------------

  $('#rmBateau').click(function(){
      window.location.reload();
  });// fin remove bateau
});















 