# MS Portals · Launcher Microsoft 365

Gestionnaire de favoris et launcher de portails Microsoft 365.
Interface claire avec recherche instantanée, onglets, cartes à favicons et gestion des favoris — 100 % côté client (aucun backend).

## Fonctionnalités

- 🔎 **Recherche instantanée** par nom, URL ou catégorie
- 🗂️ **4 onglets** : All / Apps / Admin / Favoris
- 🧩 **~50 portails Microsoft préchargés** (Outlook, Teams, Power BI, Entra, Azure, Intune, Defender, Purview…)
- ⭐ **Favoris persistés** dans `localStorage`
- ➕ **Ajout de site** avec lecture automatique du presse-papiers, suggestion de nom depuis le domaine et détection des doublons
- 🖼️ **Favicons** avec repli (badge lettre coloré) si indisponible
- 📱 **Responsive** + thème clair/sombre automatique

## Prérequis

- [Node.js](https://nodejs.org/) 18 ou supérieur (npm inclus)

## Lancement

```bash
# 1. Installer les dépendances
npm install

# 2. Démarrer le serveur de développement (ouvre http://localhost:5173)
npm run dev
```

## Build de production

```bash
npm run build      # génère le dossier dist/
npm run preview    # prévisualise le build local
```

## Notes techniques

- **Presse-papiers** : la lecture (`navigator.clipboard.readText`) nécessite un contexte sécurisé
  (`https://` ou `localhost`) et une autorisation navigateur. En cas de refus, la saisie reste manuelle.
- **Favicons** : servis via le service public `google.com/s2/favicons`. Un repli local s'affiche en cas d'échec.
- **Persistance** : seuls les favoris et les sites ajoutés sont stockés (`localStorage`). Les portails par défaut ne sont pas dupliqués.
- **Données** : les URL des portails sont dans `src/data/portals.ts` — modifiables librement.
