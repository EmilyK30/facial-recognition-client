# API de reconnaissance faciale — Mode d'emploi (groupe client)

Serveur de reconnaissance faciale multi-tenant. Ce document décrit comment
l'application cliente appelle l'API.

## URL de base

```
http://194.164.63.151:8090
```

Le tenant du groupe est routé par l'adresse du serveur : **aucun en-tête
spécial n'est nécessaire**, il suffit d'appeler cette URL.

> Test de connectivité : `GET http://194.164.63.151:8090/` doit renvoyer le
> tenant « Groupe Reconnaissance Faciale ».

---

## 1. Enregistrer une personne — `POST /register`

`Content-Type: multipart/form-data`

| Champ | Obligatoire | Description |
|---|---|---|
| `numero_dossier` | ✅ | identifiant **unique** de la personne (clé métier) |
| `file` | ✅ | photo du visage (jpg / png) |
| `prenom` | ⬜ | |
| `nom` | ⬜ | |
| `adresse` | ⬜ | |
| `date_naissance` | ⬜ | format `AAAA-MM-JJ` |

Exemple :

```bash
curl -X POST http://194.164.63.151:8090/register \
  -F "numero_dossier=ousseynou" \
  -F "prenom=Ousseynou" -F "nom=Ndour" \
  -F "file=@photo.jpg"
```

Réponses :

| Code | Signification |
|---|---|
| `201` | personne enregistrée (renvoie `personne`, `face_id`, `faces_count`) |
| `409` | `numero_dossier` déjà utilisé |
| `422` | `numero_dossier` ou image manquant |
| `502` | microservice de reconnaissance indisponible |

---

## 2. Reconnaître un visage — `POST /recognize`

`Content-Type: multipart/form-data`

| Champ | Obligatoire | Description |
|---|---|---|
| `file` | ✅ | photo à reconnaître |
| `threshold` | ⬜ | seuil de similarité, défaut `0.4` (entre 0 et 1) |

Exemple :

```bash
curl -X POST http://194.164.63.151:8090/recognize \
  -F "file=@a_reconnaitre.jpg"
```

Réponse `200` :

```json
{
  "tenant": "Groupe Reconnaissance Faciale",
  "resultats": [
    {
      "numero_dossier": "ousseynou",
      "score": 0.57,
      "personne": { "prenom": "Ousseynou", "nom": "Ndour", "...": "..." }
    }
  ]
}
```

La liste `resultats` est **vide** si aucun visage ne dépasse le seuil.
`422` si l'image est manquante.

---

## 3. Chercher une personne — `GET /?numero_dossier=X`

```bash
curl "http://194.164.63.151:8090/?numero_dossier=ousseynou"
```

`200` (personne trouvée) · `404` (inconnue).

---

## Notes

- **Données sensibles** : un visage est une donnée biométrique. Pendant la phase
  de test, n'utiliser que des photos de test (pas de personnes réelles).
- L'accès est en HTTP sans authentification pour cette phase de développement.
  Une authentification (token) et HTTPS seront ajoutés avant toute mise en
  production avec de vraies données.
