# Site « L’extrême pauvreté dans les pays riches »

Ce dossier contient l’intégralité du site statique, prêt à être publié avec GitHub Pages. Il comprend les versions française et anglaise, les scripts interactifs, Leaflet, les cartes, les fichiers GeoJSON et les images.

## Mise en ligne avec GitHub Pages

1. Décompressez l’archive et placez **tout son contenu à la racine** de votre dépôt GitHub. Le fichier `index.html` doit donc se trouver directement à la racine du dépôt.
2. Envoyez les fichiers sur la branche `main`.
3. Dans GitHub, ouvrez **Settings → Pages**.
4. Sous **Build and deployment**, choisissez **Deploy from a branch**.
5. Sélectionnez la branche `main`, le dossier `/(root)`, puis enregistrez.

Le site sera ensuite disponible à une adresse de la forme :

`https://VOTRE-NOM.github.io/NOM-DU-DEPOT/`

## Adresse personnalisée et partage sur les réseaux sociaux

Tous les fichiers fonctionnels utilisent des chemins relatifs : le site peut donc être publié à la racine d’un domaine ou dans un sous-dossier GitHub Pages.

Une fois l’adresse définitive connue, vous pouvez ajouter dans les balises `<head>` de `index.html` et `en.html` une URL canonique et des liens Open Graph absolus. Les images sociales fonctionnent déjà localement avec `og.png`, mais une URL absolue améliore leur compatibilité avec certains réseaux sociaux.

## Structure utile

- `index.html` : version française ;
- `en.html` : version anglaise ;
- `styles.css` : mise en page ;
- `app.js` et `app-en.js` : interactions et graphiques ;
- `assets/` : données cartographiques et images ;
- `vendor/leaflet/` : bibliothèque Leaflet embarquée ;
- `favicon.svg` et `og.png` : identité visuelle et aperçu social.

Le site doit être servi par HTTP(S) : ouvrir directement `index.html` depuis le disque peut empêcher le chargement des fichiers GeoJSON dans la carte.
