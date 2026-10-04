# Site « L’extrême pauvreté dans les pays riches » — version 89

Ce dossier contient l’intégralité du site statique actuellement publié, prête pour GitHub Pages. Il comprend les versions française et anglaise, les scripts interactifs, Leaflet, les cartes et les fichiers GeoJSON.

## Mise en ligne avec GitHub Pages

1. Placez tout le contenu de ce dossier à la racine de votre dépôt GitHub. `index.html` doit se trouver directement à la racine.
2. Envoyez les fichiers sur la branche `main`.
3. Dans GitHub, ouvrez **Settings → Pages**.
4. Sous **Build and deployment**, choisissez **Deploy from a branch**.
5. Sélectionnez `main`, puis `/(root)`, et enregistrez.

Le site sera disponible à une adresse de la forme `https://VOTRE-NOM.github.io/NOM-DU-DEPOT/`.

Tous les chemins sont relatifs : le site fonctionne à la racine d’un domaine ou dans un sous-dossier GitHub Pages. Il doit être servi par HTTP(S), car l’ouverture directe de `index.html` peut empêcher le chargement des fichiers GeoJSON.

## Contenu principal

- `index.html` : version française ;
- `en.html` : version anglaise ;
- `styles.css` : mise en page ;
- `app.js` et `app-en.js` : interactions, graphiques, carte et exports PNG ;
- `assets/` : données cartographiques et images ;
- `vendor/leaflet/` : bibliothèque Leaflet embarquée ;
- `favicon.svg` : icône du site.

Cette version correspond à la version 89 publiée en ligne et au commit source `65c7429bf80252cfee7076d03ca4e7cf8264a0eb`.
