
# Build and Deploy Angular App via SFTP on O2Switch

Ce pipeline GitHub Actions automatise les tests, la construction et le déploiement d’une application Angular vers un hébergeur O2Switch via SFTP. Il inclut la gestion temporaire de la whitelist IP sur le serveur pour sécuriser le transfert.

## Déclenchement

Le workflow se lance à chaque **push** sur la branche `main`.

```yaml
on:
  push:
    branches: [main]
```


***

## Jobs

### 1. Test Angular App

Ce job vérifie le code, installe les dépendances, construit l’application et stocke le build comme _artefact_.

#### Environnement

- **OS**: Ubuntu Latest


#### Étapes

- **Checkout du code**
    - Récupération des sources du dépôt.
- **Setup Node.js**
    - Installation de Node.js (version 22).
- **Installation des dépendances**
    - `npm ci` pour une installation plus rapide et reproductible.
- **Build Angular**
    - Exécution de la commande `npm run ng build` pour créer le résultat dans le dossier `dist/`.
- **Upload des artefacts**
    - Le build Angular est sauvegardé comme artefact nommé `angular-build`.

```yaml
jobs:
  test-app:
    ...
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 22
      - name: Install dependencies
        run: npm ci
      - name: Build Angular App
        run: npm run ng build
      - name: Upload build artifacts
        uses: actions/upload-artifact@v4
        with:
          name: angular-build
          path: dist/
```


***

### 2. Deploy to Production

Ce job télécharge le build, ajoute temporairement l’IP du runner à la whitelist SSH chez O2Switch, déploie via SFTP, puis supprime l’IP.

#### Dépendances

- Nécessite la réussite de `test-app`.


#### Étapes

- **Téléchargement des artefacts**
    - Récupère le build Angular sauvegardé précédemment.
- **Découverte de l’IP publique**
    - Utilise un appel à `curl` pour obtenir l’IP du runner.
- **Ajout à la whitelist O2Switch**
    - Ajoute l’IP à la whitelist SSH côté O2Switch pour autoriser le SFTP.
- **Déploiement SFTP**
    - Déploie les fichiers du build depuis `dist/memory-app/browser/*` vers `public_html/`.
    - Utilise la clé SSH stockée en secret.
- **Nettoyage IP**
    - Supprime l’IP du runner de la whitelist une fois le déploiement terminé (toujours exécuté).

```yaml
jobs:
  deploy:
    ...
    steps:
      - name: Download build artifacts
        uses: actions/download-artifact@v4
        with:
          name: angular-build
          path: dist/
      - name: Get runner's public IP
        ...
      - name: Whitelist runner IP on o2Switch
        ...
      - name: Deploy to Server via SFTP
        uses: wlixcc/SFTP-Deploy-Action@v1.2.6
        with:
          username: ${{ secrets.O2SWITCH_LOGIN }}
          server: ${{ secrets.O2SWITCH_SERVER }}
          ssh_private_key: ${{ secrets.SSH_PRIVATE_KEY }}
          local_path: 'dist/memory-app/browser/*'
          remote_path: 'public_html/'
          sftpArgs: '-o ConnectTimeout=5'
      - name: Cleanup IP
        if: always()
        ...
```


***

## Sécurité \& Paramétrage

- Les accès et identifiants sensibles sont injectés via les **Secrets GitHub** :
    - `O2SWITCH_LOGIN`, `O2SWITCH_PASSWORD`, `O2SWITCH_SERVER`, `SSH_PRIVATE_KEY`
- La gestion dynamique de la whitelist IP sécurise la connexion temporaire le temps du déploiement.

***

## Points d’attention

- Vérifier que les chemins `local_path` et `remote_path` correspondent à l’organisation du projet Angular.
- Les artefacts Angular doivent contenir le build final dans `dist/memory-app/browser`.
- Les actions de whitelist utilisent l’API cPanel de O2Switch, veillez à la stabilité du login/password et l’exactitude des endpoints.
- La suppression de l’IP se fait en entrée et sortie (`direction in`, `direction out`), pour une sécurité maximale.

***

## Schéma global

| Étape | Action principale | Remarque |
| :-- | :-- | :-- |
| Checkout | Récupération du code | Sur la branche `main` |
| Setup Node.js | Version 22 |  |
| Install dependencies | `npm ci` | Installation propre |
| Build Angular | `npm run ng build` |  |
| Upload Artifact | Stocke le build | Sert au déploiement |
| Download Artifact | Récupère le build |  |
| Get Runner IP | Découvre IP publique | Pour whitelist O2Switch |
| Whitelist IP (O2Switch) | Autorise accès SSH | API cPanel de O2Switch |
| SFTP Deploy | Transfert des fichiers | Utilise clé SSH et SFTP |
| Cleanup IP | Retire accès runner | Exécuté systématiquement |


***

Ce workflow est prêt pour une utilisation en production sur O2Switch pour automatiser le test, la construction et le déploiement sécurisé d’une application Angular.

