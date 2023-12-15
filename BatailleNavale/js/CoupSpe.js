$(document).ready(function () {

  let pointDeDepart = null; // Variable pour stocker le point de départ du segment

  $('#BtnCacher').off('click').on('click', function () {
    let cellulesB7 = $('.cellule:has(.b7)');
    let positionParent = $('#t1Bateau').offset();
    let cellulesTableau = $('.cellule');
    let celluleDepart = null;

    if(window.CoupSpecialJ2 == true && window.TourJoueur == 1)
    {
      cellulesTableau = $('.cellule');
      cellulesB7 = $('.cellule2:has(.c7)');
      celluleDepart = cellulesB7.eq(Math.floor(Math.random() * cellulesB7.length));
      var celluleStockee = celluleDepart;
      celluleStockee.addClass('BlocSSmarin');
      var idDepart = celluleDepart.attr('id');
      var idTrouve = idDepart.substring(0, idDepart.length - 1) + '1';
      var celluleTrouvee = $('div[id="' + idTrouve + '"]');
      celluleTrouvee.css('style','color:green;');
      celluleDepart = celluleTrouvee;
      positionParent = $('#t2Bateau').offset();
    }
    
    else if(window.CoupSpecialJ1 == true && window.TourJoueur == 0)
    {
      cellulesTableau = $('.cellule2');
      cellulesB7 = $('.cellule:has(.b7)');
      celluleDepart = cellulesB7.eq(Math.floor(Math.random() * cellulesB7.length));
      var celluleStockee = celluleDepart;
      celluleStockee.addClass('BlocSSmarin');
      var idDepart = celluleDepart.attr('id');
      var idTrouve = idDepart.substring(0, idDepart.length - 1) + '2';
      var celluleTrouvee = $('div[id="' + idTrouve + '"]');
      celluleTrouvee.css('style','color:green;');
      celluleDepart = celluleTrouvee;
      positionParent = $('#t1Bateau').offset();
    }

    const positionCelluleDepart = celluleDepart.offset();
    // Calculer les coordonnées relatives au parent
    const x1 = positionCelluleDepart.left - positionParent.left;
    const y1 = positionCelluleDepart.top - positionParent.top;
    const cellulesTraversees = [];

    celluleDepart.css('color', 'rgba(0, 255, 0, 0.8)');

    // Mettre à jour le point de départ
    pointDeDepart = [x1 - 3, y1 - 3];

    let coupSpecialUtiliser = 0;

    // Attendre que le joueur clique sur une autre cellule du tableau
    cellulesTableau.off('click.tableauNamespace').on('click.tableauNamespace', function () {

      if(coupSpecialUtiliser == 0)
      {
          coupSpecialUtiliser = 1;
          // Utilisez cette cellule comme point d'arrivée du segment
          const celluleArrivee = $(this);
          celluleArrivee.css('color', 'rgba(128, 0, 128, 0.8)');
          let pointArrivee = null;
          const positionCelluleArrivee = celluleArrivee.offset();
          // Calculer les coordonnées relatives au parent
          const x2 = positionCelluleArrivee.left - positionParent.left;
          const y2 = positionCelluleArrivee.top - positionParent.top;
          pointArrivee = [x2 - 5, y2 - 3];

          // Tracez la ligne entre le point de départ et le point d'arrivée
          const distance = calculerDistanceEntreElements(celluleDepart, celluleArrivee);

          function calculerDistanceEntreElements(element1, element2) {
            const positionElement1 = element1.offset();
            const positionElement2 = element2.offset();
            const deltaX = positionElement2.left - positionElement1.left;
            const deltaY = positionElement2.top - positionElement1.top;

            // Utiliser le théorème de Pythagore pour calculer la distance
            const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

            return distance;
          }

          function calculerDistanceEntrePoints(point1, point2) {
            const deltaX = point2[0] - point1[0];
            const deltaY = point2[1] - point1[1];
            return Math.sqrt(deltaX ** 2 + deltaY ** 2);
          }

          tracerLigne(pointDeDepart, pointArrivee);
          cellulesTraversees.forEach(function (cellule) {

            if (cellule.hasClass('BateauPlacer')) {

              let enfants = $(cellule).children(); // Récupérer les enfants de l'élément
              let classEnfant = enfants.attr("class"); // Obtenir la classe de l'élément enfant
              let backgroundEnfant = enfants.css('background-color');
              if(classEnfant == "b7")
              {
                cellule.css('background-color',`${backgroundEnfant}`);
                cellule.removeClass('BateauPlacer');
                cellule.addClass('BateauCouler');
                cellule.css('visibility','initial');
              }
              else if(classEnfant == "c7")
              {
                cellule.css('background-color',`${backgroundEnfant}`);
                cellule.removeClass('BateauPlacer');
                cellule.addClass('BateauCouler');
                cellule.css('visibility','initial');
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

              if($('.cellule2.BateauCouler').length == 21)
              {   
                $("#boite_victoire").css('z-index','3');
                $('.confetti').css('visibility','initial');
                //JEU TERMINER
              }
              $('#switch').removeAttr('disabled');
              $('#switch').attr('enabled','enabled');
              $('#switch').addClass('blink');
            }
            else if(!(cellule.hasClass('BateauPlacer')) && !(cellule.hasClass('BateauCouler'))){
              cellule.addClass('BateauRaté');
              $('#switch').removeAttr('disabled');
              $('#switch').attr('enabled','enabled');
              $('#switch').addClass('blink');
            }
            else{
              console.error('impossible')
            }
          });

          //gerer cellule de l'Arrivee

          if (celluleArrivee.hasClass('BateauPlacer')) {

            let enfants = $(celluleArrivee).children(); // Récupérer les enfants de l'élément
            let classEnfant = enfants.attr("class"); // Obtenir la classe de l'élément enfant
            let backgroundEnfant = enfants.css('background-color');
            if(classEnfant == "b7")
            {
              celluleArrivee.css('background-color',`${backgroundEnfant}`);
              celluleArrivee.removeClass('BateauPlacer');
              celluleArrivee.addClass('BateauCouler');
              celluleArrivee.css('visibility','initial');
              $('#switch').removeAttr('disabled');
              $('#switch').attr('enabled','enabled');
              $('#switch').addClass('blink');
            }
            else{
              $(`.${classEnfant}`).parent().css('background-color',`${backgroundEnfant}`)
              $(`.${classEnfant}`).parent().removeClass('BateauPlacer');
              $(`.${classEnfant}`).parent().addClass('BateauCouler');
              $(`.${classEnfant}`).css('visibility','initial');
              $('#switch').removeAttr('disabled');
              $('#switch').attr('enabled','enabled');
              $('#switch').addClass('blink');
            }

            if($('.cellule.BateauCouler').length == 21)
            {   
              $("#boite_victoire").css('z-index','3');
              $('.confetti').css('visibility','initial');
              //JEU TERMINER
            }

            if($('.cellule2.BateauCouler').length == 21)
            {   
              $("#boite_victoire").css('z-index','3');
              $('.confetti').css('visibility','initial');
              //JEU TERMINER
            }
          }
          else if(!(celluleArrivee.hasClass('BateauPlacer')) && !(celluleArrivee.hasClass('BateauCouler'))){
              celluleArrivee.addClass('BateauRaté');
              $('#switch').removeAttr('disabled');
              $('#switch').attr('enabled','enabled');
              $('#switch').addClass('blink');
          }
          else{
            console.error('impossible')
          }
        
        

        function tracerLigne(pointDepart, pointArrivee) {
    
          // Créer l'élément de ligne en tant qu'enfant de la première cellule
          const ligneElement = $('<div class="ligne-tracee"></div>');
          celluleDepart.children().append(ligneElement);
          
          // Calculer la différence de position entre les deux cellules
          const deltaX = x2 - x1;
          const deltaY = y2 - y1;

          // Calculer l'angle en radians
          const angleRad = Math.atan2(deltaY, deltaX);
          // Calculer l'angle en degrés
          const angleDeg = (angleRad * 180) / Math.PI;

          // Déterminer les cellules traversées
          cellulesTableau.each(function () {
            const cellule = $(this);
            const positionCellule = cellule.offset();
            const x = positionCellule.left - positionParent.left;
            const y = positionCellule.top - positionParent.top;
        
            const distanceCellule = calculerDistanceEntrePoints(pointDeDepart, [x - 3, y - 3]);
        
            // Diviser la ligne en segments et vérifier chaque segment
            const segments = 100; // ajustez ce nombre selon la précision souhaitée
            let intersecte = false;
        
            for (let i = 0; i < segments; i++) {
                const t = i / segments;
                const segmentX = (x1 + 10) + t * (x2 - (x1 + 10)); // Ajustez le décalage ici
                const segmentY = (y1 - 5) + t * (y2 - (y1 - 20));
        
                if (pointDansCellule(segmentX, segmentY, x, y, x + cellule.width(), y + cellule.height())) {
                    intersecte = true;
                    break;
                }
            }
        
            // Vérifier si la ligne intersecte la cellule
            if (intersecte && distanceCellule <= distance) {
                cellulesTraversees.push(cellule);
                $('#switch').removeAttr('disabled');
                $('#switch').attr('enabled','enabled');
                $('#switch').addClass('blink');
            }
        });
        
        // Fonction pour vérifier si un point (x, y) est dans la cellule délimitée par deux points (x1, y1) et (x2, y2)
        function pointDansCellule(x, y, x1, y1, x2, y2) {
            return (x >= Math.min(x1, x2) && x <= Math.max(x1, x2) && y >= Math.min(y1, y2) && y <= Math.max(y1, y2));
          }

          // Appliquer les styles pour l'élément de ligne
          ligneElement.css({
            position: 'relative',
            left: `50%`,
            top: `50%`,
            width: `${distance}px`,
            height: `5px`,
            background: 'rgba(0, 128, 0, 0.5)',
            transform: `rotate(${angleDeg}deg)`,
            transformOrigin: '0% 50%',
            transition: 'all 0.5s ease-out',
          });

          setTimeout(function () {
            ligneElement.remove();
            celluleDepart.css('color','');
            celluleArrivee.css('color','');
          }, 2000);
        }
      }
    });
  });
});
