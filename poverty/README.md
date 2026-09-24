# Site « L’extrême pauvreté dans les pays riches »

Ce dossier contient l’intégralité du site statique, prêt à être publié avec GitHub Pages. Il comprend les versions française et anglaise, les scripts interactifs, Leaflet, les cartes et les fichiers GeoJSON.

## Mise en ligne avec GitHub Pages

1. Décompressez l’archive et placez **tout son contenu à la racine** de votre dépôt GitHub. Le fichier `index.html` doit donc se trouver directement à la racine du dépôt.
2. Envoyez les fichiers sur la branche `main`.
3. Dans GitHub, ouvrez **Settings → Pages**.
4. Sous **Build and deployment**, choisissez **Deploy from a branch**.
5. Sélectionnez la branche `main`, le dossier `/(root)`, puis enregistrez.

Le site sera ensuite disponible à une adresse de la forme :

`https://VOTRE-NOM.github.io/NOM-DU-DEPOT/`

Tous les fichiers fonctionnels utilisent des chemins relatifs : le site peut être publié à la racine d’un domaine ou dans un sous-dossier GitHub Pages. L’image sociale générée précédemment a été retirée ; `favicon.svg` reste uniquement l’icône de l’onglet.

La version 82 ajoute un numéro de version aux références CSS et JavaScript afin d’éviter que GitHub Pages ou le navigateur ne conserve d’anciens fichiers en cache. Elle comprend aussi les contours de carte corrigés, l’export PNG et l’infobulle élargie des pyramides d’âge.

## Structure utile

- `index.html` : version française ;
- `en.html` : version anglaise ;
- `styles.css` : mise en page ;
- `app.js` et `app-en.js` : interactions, graphiques, carte et export PNG ;
- `assets/` : données cartographiques et images ;
- `vendor/leaflet/` : bibliothèque Leaflet embarquée ;
- `favicon.svg` : icône du site.

Le site doit être servi par HTTP(S) : ouvrir directement `index.html` depuis le disque peut empêcher le chargement des fichiers GeoJSON dans la carte.
