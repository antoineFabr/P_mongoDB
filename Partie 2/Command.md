# Commande MongoDB

## Importer les données et le schéma de la base de données

> - aller dans le dossier où se trouve le Dockerfile qui contient MongoDB.
> - mettre le fichier .gz dans ce dossier.
> - ensuite entrer cette commande dans le shell du container de MongoDB

```sh
mongorestore --uri=mongodb://root:admin@localhost:27017 --authenticationDatabase=admin  --gzip --archive=/backupdb/db_mflix.gz
```

## Gestion des utilisateurs et des roles

### Création des roles

**Role `Administrateur`**

- création du role `administrateur` dans un `playground`

```js
db.createRole({
  role: "Administrateur",
  privileges: [
    // Peut créer, lire, mettre à jour et supprimer (CRUD) n’importe quels documents des collections
    {
      resource: { db: "db_mflix", collection: "" },
      actions: ["find", "insert", "update", "remove"],
    },
    // Peut créer ou supprimer des collections
    {
      resource: { db: "db_mflix", collection: "" },
      actions: ["createCollection", "dropCollection"],
    },
    // Gérer les indexes pour toutes les collections
    {
      resource: { db: "db_mflix", collection: "" },
      actions: ["createIndex", "dropIndex"],
    },
    // Gérer les rôles et leurs privilèges de cette base de données
    {
      resource: { db: "db_mflix", collection: "" },
      actions: ["createRole", "dropRole", "grantRole", "revokeRole"],
    },
    // Gérer les utilisateurs
    {
      resource: { db: "db_mflix", collection: "" },
      actions: [
        "createUser",
        "dropUser",
        "grantRolesToUser",
        "revokeRolesFromUser",
      ],
    },
  ],
  roles: [],
});
```

**Role `Utilisateur`**

- Création du role `Utilisateur` dans un `playground`

```js
db.createRole({
  role: "Utilisateur",
  privileges: [
    // Lire les informations sur les films
    {
      resource: { db: "db_mflix", collection: "movies" },
      actions: ["find", "insert", "update", "remove"],
    },
    //Lire, ajouter ou supprimer un ou des commentaires
    {
      resource: { db: "db_mflix", collection: "comments" },
      actions: ["find", "insert", "remove"],
    },
  ],
  roles: [],
});
```

**Role `Gestionnaire`**

- Création du role `Gestionnaire` dans un `playground`

```js
db.createRole({
  role: "Gestionnaire",
  privileges: [
    // Lire les informations sur tous les utilisateurs
    {
      resource: { db: "db_mflix", collection: "users" },
      actions: ["find"],
    },
    //Mettre à jour, lire et supprimer des commentaires
    {
      resource: { db: "db_mflix", collection: "comments" },
      actions: ["find", "remove", "update"],
    },
    //Mettre à jour, lire et supprimer des films
    {
      resource: { db: "db_mflix", collection: "movies" },
      actions: ["find", "remove", "update"],
    },
  ],
  roles: [],
});
```

### Création des Utilisateurs

**Utilisateur `Administrateur`**

- Création de l'utilisateur `Administrateur` dans un `playground`

```js
db.createUser({
  user: "Administrateur",
  pwd: "admin$1234",
  roles: [{ role: "Administrateur", db: "db_mflix" }],
});
```

**Utilisateur `Utilisateur`**

- Création de l'utilisateur `Utilisateur` dans un `playground`

```js
db.createUser({
  user: "Utilisateur",
  pwd: "utilisateur$1234",
  roles: [{ role: "Utilisateur", db: "db_mflix" }],
});
```

**Utilisateur `Gestionnaire`**

- Création de l'utilisateur `Gestionnaire` dans un `playground`

```js
db.createUser({
  user: "Gestionnaire",
  pwd: "gestionnaire$1234",
  roles: [{ role: "Gestionnaire", db: "db_mflix" }],
});
```

## Backup/Restore

### Backup Complet

```sh
mongodump --uri=mongodb://root:admin@localhost:27017 --db="db_mflix" --authenticationDatabase=admin --gzip --out=./backupdb/mongodump-20250407-db_mflix
```

### Restore Complet

```sh
mongorestore --uri=mongodb://root:admin@localhost:27017 --authenticationDatabase=admin --gzip --dir=./backupdb/mongodump-20250407-db_mflix --drop
```
