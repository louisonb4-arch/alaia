# LEGAL-TODO — Alaïa café & boutique

> État au **16 juillet 2026**. À solder avant toute mise en ligne.
> Règle appliquée sur ce projet : **aucune donnée juridique ou administrative n'a été inventée.**
> Ce qui n'a pas de source publique vérifiable porte un placeholder explicite.

---

## 1. Ce qui est vérifié (et d'où ça vient)

Source : **Annuaire des Entreprises** (`annuaire-entreprises.data.gouv.fr`) et l'API
publique `recherche-entreprises.api.gouv.fr`, consultés le 16/07/2026.

| Donnée | Valeur | Statut |
|---|---|---|
| Dénomination sociale | ALAIA CAFE ET BOUTIQUE | ✅ registre |
| Forme juridique | SAS (code nature juridique 5710) | ✅ registre |
| SIREN | 883 171 472 | ✅ registre |
| SIRET (siège) | 883 171 472 00011 | ✅ registre |
| Adresse du siège | 4 rue de Budapest, 44000 Nantes | ✅ registre |
| Date de création | 29/04/2020 (début d'activité 29/05/2020) | ✅ registre |
| Code APE / NAF | 56.30Z — Débits de boissons | ✅ registre |
| Président | AEFC HOLDING (SIREN 945 232 668) | ✅ registre |
| État administratif | Actif | ✅ registre |
| Convention collective | IDCC 1979 (HCR) | ✅ registre |
| Coordonnées GPS | 47.216071 / -1.560392 | ✅ INSEE |
| Second établissement | AEFC HORIZON — SIREN 979 008 794, 38 rue Léon Jamin, depuis le 15/09/2023 | ✅ registre |

---

## 2. Informations manquantes — à obtenir du client

Chacune apparaît dans le site sous la forme `[INFORMATION À FOURNIR PAR LE CLIENT]`.

### Bloquant pour les mentions légales
- [ ] **Capital social** (obligatoire pour une SAS)
- [ ] **Numéro de TVA intracommunautaire** — *ne pas le calculer soi-même : le faire confirmer sur un document officiel*
- [ ] **RCS** — « RCS Nantes 883 171 472 » est la mention attendue, à **confirmer sur l'extrait Kbis**
- [ ] **Directeur de la publication** (personne physique — vraisemblablement Adeline ou Florian, à faire nommer)
- [ ] **Téléphone professionnel**
- [ ] **E-mail de contact**
- [ ] **Hébergeur** : raison sociale, adresse, téléphone / site
- [ ] **Médiateur de la consommation** — obligatoire (art. L.612-1 du Code de la consommation) pour un établissement recevant des consommateurs. Nom + adresse + site du médiateur adhéré.

### Bloquant pour la mise en ligne
- [ ] **Nom de domaine** — puis mettre à jour :
  - `assets/js/business.config.js` → `domaine`
  - `sitemap.xml` → remplacer `https://DOMAINE-A-DEFINIR`
  - `robots.txt` → décommenter la ligne `Sitemap:`
  - les `<link rel="canonical">` de chaque page
  - `<meta property="og:image">` → passer en URL absolue

### Droits et contenus
- [ ] **Auteur des photographies** — l'auteur de la photo de la devanture n'est **pas identifié**. Obtenir son nom et son autorisation d'exploitation, puis compléter le crédit dans `mentions-legales.html`. Tant que ce n'est pas fait, la photo ne doit pas être publiée.
- [ ] **Logo vectoriel** — le logo a été reconstruit à partir d'un JPEG de 447 px trouvé en ligne, transformé en masque alpha. Il tient à l'écran, pas au-delà. Demander l'AI / EPS / SVG d'origine.

---

## 3. Horaires — contradiction à trancher ⚠️

Les sources publiques ne disent pas la même chose :

| Source | Horaires | Date |
|---|---|---|
| **Bio Instagram** (post épinglé « Horaires de l'été ») | Mardi–Samedi **8h30–17h30** | juillet 2026 |
| Les Bouillonnantes, Nantes Végétal, RestaurantGuru | Mardi–Samedi **9h30–18h30** | non datées |
| Petit Futé / Lump | Mardi–Samedi **9h30–17h00** | non datées |

**Retenu sur le site : 8h30 → 17h30**, c'est-à-dire la parole du client lui-même, sur son
propre canal, à la date la plus récente.

⚠️ Mais le post s'intitule « Horaires **de l'été** » : il existe donc probablement un
régime hiver / été. **Faire confirmer les horaires annuels**, et décider si le site doit
afficher les deux. Un seul endroit à modifier : `assets/js/business.config.js`
(puis répercuter dans le HTML — voir README, § « Où changer quoi »).

---

## 4. Services tiers, cookies et données

### Services tiers chargés par le site
**Aucun.** C'est un choix de conception, pas un oubli :

- Les **polices sont auto-hébergées** (`assets/fonts/`). Aucune requête vers Google Fonts
  ou Fontshare, donc aucune adresse IP transmise à un tiers.
- **Aucune carte intégrée** (pas d'iframe Google Maps). L'itinéraire est un simple lien
  sortant, activé volontairement par le visiteur.
- **Aucun outil de mesure d'audience** (pas de GA4, pas de Matomo, pas de pixel).
- **Aucune police d'icônes, aucun CDN, aucune bibliothèque JS externe.**

### Cookies
**Aucun cookie n'est déposé** — ni technique, ni de mesure, ni publicitaire.

➡️ **Conséquence : pas de bandeau de consentement.** Un bandeau n'est exigé que si des
traceurs non strictement nécessaires sont déposés. Il n'y en a pas. Poser une bannière
ici serait un faux signal de conformité, pas une conformité.

### Données personnelles collectées par le site
**Aucune.** Pas de formulaire, pas de compte, pas de newsletter, pas de réservation,
pas de paiement. Les seules traces sont les **journaux techniques de l'hébergeur**
(intérêt légitime), décrits dans `confidentialite.html` — durée de conservation à
compléter une fois l'hébergeur connu.

---

## 5. Pages légales créées

| Page | Créée | Pourquoi |
|---|---|---|
| `mentions-legales.html` | ✅ | Obligatoire (art. 6-III LCEN) pour tout éditeur de site. |
| `confidentialite.html` | ✅ | Le site ne collecte rien, mais l'hébergeur journalise. Transparence RGPD. |

## 6. Pages légales volontairement **non** créées

| Page | Pourquoi elle n'existe pas |
|---|---|
| **Politique de cookies** (page dédiée) | Aucun cookie déposé. Le sujet est traité en une section de `confidentialite.html`. Une page entière pour dire « il n'y en a pas » serait du remplissage. |
| **Gestion du consentement** | Rien à consentir. |
| **CGV** | Aucune vente ni contrat conclu à distance via le site. Alaïa **ne prend pas de réservation** et ne vend rien en ligne. Des CGV ici seraient décoratives — et juridiquement trompeuses, puisqu'elles décriraient un parcours d'achat inexistant. |
| **CGU** | Aucun compte, aucun contenu déposé par l'utilisateur, aucune fonctionnalité à encadrer. |
| **Conditions / politique d'annulation** | Sans réservation, il n'y a rien à annuler. |
| **Politique de remboursement, livraison, rétractation** | Aucune vente à distance. Le droit de rétractation ne s'applique pas. |

⚠️ **Si le site évolue** (formulaire de contact, newsletter, click & collect, réservation,
mesure d'audience, carte intégrée), cette analyse tombe : il faudra rouvrir ce fichier,
réécrire `confidentialite.html` et, le cas échéant, créer CGV + bandeau de consentement.

---

## 7. Textes à faire valider par la maison

- [ ] « Depuis 2020, on n'a jamais pris une seule réservation. » — juste ?
- [ ] « Les chiens dorment sous les tables. Ce n'est écrit nulle part, mais tout le monde le sait. »
- [ ] « Le chaï est une recette maison » et « les jus sont pressés ici, en partie avec les fruits du verger de la famille » — repris de *Nantes Végétal*, à confirmer.
- [ ] **Le nom du chef n'est pas mentionné sur le site, volontairement** : les sources se contredisent (Rémi Henneuse chez *Les Bouillonnantes*, Ingrid Decombat chez *Les Tables de Nantes*). Demander qui est en cuisine aujourd'hui avant d'écrire un nom.
- [ ] **Note Google 4,9/5** relevée sur un agrégateur tiers — non affichée sur le site faute de source de première main. À confirmer si on veut l'afficher.
- [ ] Liste des producteurs (Ferme du Bois des Anses, Bio Divatte, Ferme des Grands Sables, Alice Ménard, Au P'tit Pain Nantais, Choc Hola) — relevée chez *Les Bouillonnantes*, à confirmer et compléter.
- [ ] **Accessibilité PMR** — annoncée par *Les Tables de Nantes*. La mention « accès de plain-pied » n'a **pas** été écrite faute de vérification ; seule « terrasse » figure. À confirmer avant d'ajouter quoi que ce soit.

---

## 8. Prix

Tous les prix affichés viennent de la presse locale nantaise (*Nantes Végétal*), **à une
date inconnue**. Ils sont signalés « Prix relevés en juillet 2026 » sur la page d'accueil.
Une autre source (*Les Tables de Nantes*) annonce des plats à 13–17 € et un brunch à
11–17 €, ce qui **contredit** la fourchette 4–12 € du brunch.

➡️ **Ne pas mettre en ligne avec ces prix.** Faire fournir la carte et les tarifs à jour.
La page `carte.html` porte un bloc « Note de production » visible qui doit disparaître au
même moment.

---

## 9. Avant de publier — la liste courte

- [ ] Tous les `[INFORMATION À FOURNIR PAR LE CLIENT]` sont remplacés
      (`grep -rn "À FOURNIR\|À DEFINIR\|À CONFIRMER" .`)
- [ ] Les blocs « Note de production » sont retirés (`carte.html`, `mentions-legales.html`)
- [ ] Les horaires sont tranchés
- [ ] La carte et les prix sont à jour
- [ ] L'auteur des photos est crédité et a donné son accord
- [ ] Le domaine est en place partout (canonical, sitemap, robots, og:image)
- [ ] Le médiateur de la consommation est nommé
- [ ] L'hébergeur est renseigné dans les deux pages légales
