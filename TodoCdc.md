# Todo List - Migration MongoDB & Redis

## 1. Migration de MySQL vers MongoDB

- [x] Remplacer les requêtes MySQL par MongoDB dans le backend
- [x] Adapter les modèles de données (schémas → collections)
- [x] Configurer la connexion à MongoDB (URI, driver)

## 2. Implémentation de la recherche (MongoDB)

- [x] Créer des indexes pour optimiser la recherche
- [x] Utiliser les opérateurs (`$text`, `$regex`)
- [x] Exposer une API de recherche (`GET /todos?search=...`)

## 3. Cache avec Redis

- [WIP] Intégrer le client Redis dans le backend
- [WIP] Mettre en cache les requêtes fréquentes (ex: liste des tâches)
- [WIP] Invalider le cache après modifications
- [ ] Configurer un TTL pour le cache

## 4. Partie db_mflix (MongoDB)

### A. Import des données

- [x] Restaurer le dump `db_mflix.gz` avec `mongorestore`
- [x] Documenter la commande utilisée

### B. Gestion des utilisateurs

- [x] Créer le rôle **Administrateur** (accès complet)
- [x] Créer le rôle **Utilisateur** (lecture films + CRUD commentaires)
- [x] Créer le rôle **Gestionnaire** (gestion films/utilisateurs)
- [x] Ajouter 1 utilisateur par rôle avec `db.createUser()`

### C. Backup/Restore

- [x] Sauvegarde compressée avec `mongodump`
- [x] Tester la restauration avec `mongorestore`

## 5. Livrables

- [ ] Publier le code sur GitHub (repo privé)
- [x] Rédiger le rapport PDF (explications + commandes)
- [WIP] Compléter le journal de travail

## 6. Bonus (optionnel)

- [ ] Améliorer l'interface Vue.js
- [ ] Ajouter des tests unitaires
