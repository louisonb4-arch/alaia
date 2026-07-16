# Alaïa café & boutique — site vitrine

Site de **Alaïa café & boutique**, 4 rue de Budapest, 44000 Nantes.
Café de spécialité, cuisine de saison, boutique d'artisans. Mardi → samedi, sans réservation.

L'établissement n'avait **aucun site**. Celui-ci est construit de zéro.

---

## La direction artistique — « La vitrine peinte »

> La direction artistique repose sur **la devanture d'Alaïa** — un bandeau vert d'eau,
> un mot tracé d'un seul trait, des feuilles et des grains dessinés à la main, et des
> capitales blanches peintes sur le verre — traduite par une palette relevée au pixel
> sur cette peinture, un lettrage variable qui remplit son carreau, des dessins au
> trait sans aucun aplat, et des photos qui se dégagent comme la buée sur une vitre.

Alaïa écrit déjà tout sur sa vitre : les jours (`MARDI • SAMEDI`), les services
(`SUR PLACE`, `À EMPORTER`, `SANS RÉSERVATION`) et les moments (`PETIT DEJ'`, `MIDI`,
`GOÛTER`). **Le site n'invente pas un discours : il met celui-là à l'échelle.**
Le hero est composé à 100 % de mots réellement peints sur la devanture.

### Les trois principes

1. **Un seul trait.** Tout ce qui est dessiné est monoline, à la même encre : les
   feuilles, les grains, les filets, les flèches. Jamais de remplissage, jamais une
   icône de bibliothèque. C'est la main qui a tracé le logo et la devanture.
2. **Deux matières, jamais trois.** Le verre (vert d'eau, capitales peintes) et le lait
   (blanc froid, encre). **Zéro beige, zéro kraft, zéro dégradé** — la rupture nette avec
   les autres sites du portefeuille.
3. **La trame des meneaux.** Les montants verts découpent la vitrine en carreaux
   **inégaux**. Les grilles du site sont inégales : jamais trois cartes alignées.

### L'ouverture — « le peintre passe »
Pas de rideau, pas d'écran par-dessus : **c'est la devanture qui se peint**, dans l'ordre
où la peinture a été posée en vrai. Le mot d'abord (0,06 s), puis les trois lettrages
(0,52 / 0,70 / 0,88 s), puis les fils de guide, puis la salle qui se dégage (1,55 s).
La peinture avance de gauche à droite avec un **bord souple** — un pinceau, pas une
découpe. Total ≈ 2 s.

Deux garde-fous : l'état **par défaut est « peint »** (si le JS ne tourne pas, tout est
déjà là), et le script du `<head>` porte deux filets de sécurité qui retirent les classes
quoi qu'il arrive. Aucun écran ne peut rester bloqué.

Le rechargement **retombe toujours sur la devanture** (`scrollRestoration` en manuel +
remise à zéro sur `load` et `pageshow`).

### Règles
- **Composition** : chaque section pend d'un *rail* — le filet sous l'enseigne, avec son
  numéro et son nom en capitales peintes.
- **Photo** : jamais de zoom, jamais de découpe, jamais d'arche, jamais de coins arrondis.
  Une photo apparaît par **la buée** (`blur + désaturation → net`) — la condensation qui
  s'efface. Voir `.buee` dans `style.css`.
- **Détail signature** : le *fil du peintre* — la ligne de guide qui court du mot à sa
  mention, dans le hero et dans les listes de prix.
- **Le pratique est en capitales espacées** (comme sur la vitre), **jamais en chasse fixe** :
  aucune police mono sur ce site.

### Le mobile — pas le desktop empilé
- **Les trois mots restent le héros**, mais le peintre fait ce qu'un peintre fait : il
  **resserre ses lettres** (`wdth 78`) pour remplir le carreau étroit au lieu d'écrire
  plus petit. À chasse normale, « Petit déj' » déborderait bien avant d'atteindre cette
  taille. C'est l'axe de largeur de Bricolage qui rend l'adaptation possible — la raison
  même du choix de cette police.
- La mention et son **fil** disparaissent (un fil sans étiquette au bout ne conduit nulle
  part) ; « sur place / à emporter / **sans réservation** » reprend le relais sur le
  bandeau du trottoir, sous la vitre.
- La **bande du comptoir** ne devient pas une grille 2×2 — les photos portrait s'y font
  écraser en timbres carrés. Le geste du desktop (longer le comptoir) devient **tactile** :
  une bande bord à bord qui file sous le doigt. Le débord du carreau suivant sert
  d'invitation — aucune consigne à écrire. `tabindex="0"` + `role="group"` : une zone
  défilante doit rester atteignable au clavier (WCAG 2.1.1).
  - **Les photos sont entières** : hauteur imposée, largeur déduite du ratio, aucun
    recadrage. Conséquence assumée : les quatre carreaux ont la même largeur sur mobile.
    La règle des meneaux (carreaux inégaux) cède ici au cadrage des photos — un
    porte-filtre coupé au carré n'est plus un geste, c'est un timbre. L'asymétrie vient
    du débord aux deux bords de la bande, pas de largeurs truquées.
  - **Pas de `scroll-snap`** : la bande se recalait toute seule après le doigt, ce qui se
    lit comme un flottement. On longe le comptoir, il ne bouge pas de lui-même.
  - ⚠️ **Piège de spécificité** : les décalages verticaux du desktop
    (`.comptoir figure:nth-child(2)`, 0-2-1) l'emportent sur un `.comptoir figure`
    (0-1-1) même depuis une media query — une media query n'ajoute **aucune**
    spécificité. Il faut annuler avec les mêmes sélecteurs `:nth-child`, sinon deux
    carreaux sur quatre restent posés plus bas et la bande a l'air de flotter.
- Les **assiettes** passent à 2 colonnes **sans décalage** : le rythme éditorial du
  desktop devient du désordre sur un petit écran.
- Les **moments** s'empilent, libellé au-dessus du titre : à deux colonnes, des libellés
  de largeurs différentes désalignent les titres et le décalage passe pour un accident.
- Le **rail** perd sa mention de droite ; l'enseigne perd « café & boutique » sous 480 px.

### Palette — relevée au pixel sur la photo de la devanture

| Jeton | Valeur | Origine |
|---|---|---|
| `--verre` | `#AFD3C5` | le vert d'eau du bandeau |
| `--enseigne` | `#457475` | l'encre du mot « alaïa » sur l'enseigne |
| `--encre` | `#16302E` | texte courant (assombri pour le contraste) |
| `--lait` | `#F7F9F8` | blanc froid |
| `--grain` | `#7C4A2E` | le brun du grain de café — accent, à la goutte |

### Typographie
| Police | Rôle | Licence |
|---|---|---|
| **Bricolage Grotesque** (variable) | Display. L'axe de **largeur** est le concept : un peintre en lettres étire ses lettres pour remplir le carreau. | OFL 1.1 |
| **Supreme** | Texte courant + capitales peintes du pratique. | Fontshare, usage commercial |
| **Sacramento** | La main du logo. Trois mots par page, pas plus. | OFL 1.1 |

Les trois sont **auto-hébergées** (`assets/fonts/`) → zéro requête tierce, zéro cookie.

### Ce qui a été écarté pour ne pas répéter les projets précédents
Fraunces, Cormorant, Archivo, Clash Display, Bodoni, Young Serif, Zodiak, Caveat ·
les palettes crème/encre/terracotta · le rideau d'ouverture · les labels en police mono ·
les sections numérotées façon carte marine · les cartes symétriques · les polaroïds ·
les zooms au survol.

---

## Stack

HTML / CSS / JS **vanilla**. Zéro dépendance, zéro build, zéro requête tierce.

Pour 5 pages statiques, Next.js n'apporterait qu'un build à maintenir : le site est
déjà à son optimum (une seule feuille de style, un module JS, des polices locales).

- `index.html` — la page principale (7 sections)
- `carte.html` — la carte
- `mentions-legales.html`, `confidentialite.html`, `404.html`
- `assets/js/business.config.js` — **la fiche d'identité : source de vérité unique**
- `assets/js/main.js` — révélations, tiroir mobile, parallaxe, JSON-LD
- `assets/css/style.css` — tout le style, commenté par section

### Accessibilité & SEO
Balises sémantiques · hiérarchie H1→H3 · lien d'évitement · focus visible unique ·
tiroir mobile avec piégeage du focus et fermeture à l'Échap · `prefers-reduced-motion`
respecté (CSS **et** JS) · `alt` descriptifs · JSON-LD `CafeOrCoffeeShop` généré depuis
la config (les placeholders ne sont jamais publiés) · OpenGraph · sitemap · robots.

### QA
- `?plat` → coupe tout le mouvement et fige les états (posé avant le premier rendu).
- **Ne pas auditer le mobile avec `--window-size`** : Chrome headless clampe la largeur
  mini à ~500 px, la capture est rognée et ne prouve rien. Passer par CDP et
  `Emulation.setDeviceMetricsOverride`, qui contourne le clamp :

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless \
  --remote-debugging-port=9333 --user-data-dir=/tmp/cdp-alaia &
# puis piloter en CDP : setDeviceMetricsOverride {width:390} + captureBeyondViewport
```

- Le **temps virtuel** (`--virtual-time-budget`) fige l'IntersectionObserver et fausse
  les états animés : pour juger l'ouverture, piloter un vrai Chrome en temps réel.
- Le mobile a été audité de **320 à 430 px** : aucun débordement horizontal
  (`document.scrollWidth === clientWidth`), tiroir ouvert/fermé/Échap vérifié.

```bash
cd /Users/louisonbobin/alaia-site && python3 -m http.server 4321
# http://127.0.0.1:4321/
```

---

## Déploiement

- **Dépôt** : https://github.com/louisonb4-arch/alaia (branche `main`)
- **En ligne** : **https://alaia-site-lac.vercel.app**
- Projet Vercel `alaia-site`, équipe `louis-projects-a1487864`, compte `louisonb4-3247`.

⚠️ **`alaia-site.vercel.app` n'est PAS ce site** — ce sous-domaine appartient déjà à un
autre utilisateur Vercel (il renvoie son site à lui). Vercel a donc attribué le suffixe
`-lac`. Ne jamais communiquer l'URL courte : c'est `alaia-site-lac.vercel.app`.
Le sujet disparaîtra le jour où un vrai nom de domaine sera branché.

Redéployer (pas d'auto-deploy au push — les deux gestes sont séparés) :

```bash
cd /Users/louisonbobin/alaia-site   # ⚠️ toujours depuis la racine :
git push                            #    lancé d'un sous-dossier, Vercel crée
npx -y vercel deploy --prod --yes   #    un projet parasite au nom du dossier
```

---

## ⚠️ Ce qu'il manque

### Photos — 11 photos réelles en place
Fournies par le client le 16/07/2026. **Règle appliquée : aucun agrandissement.**
Chaque photo est servie à sa résolution native ou en dessous — un cadrage serré du chien
montait à 2,6× et partait en bouillie, il a été refait large pour rester à 1:1.

| Emplacement | Photo | Source |
|---|---|---|
| Hero, la bande | `salle-bandeau.jpg` | recadrage large de la salle (×1,56) |
| 01 Le lieu | `devanture-comptoir.jpg` + `detail-chien.jpg` | porte ouverte ; vignette 1:1 |
| 02 Le café | `cafe-porte-filtre` · `cafe-extraction` · `cafe-latte` · `cafe-deux-tasses` | bande du comptoir, bord à bord |
| 03 À table | `midi-toastie` · `midi-radis` · `midi-poisson` · `midi-vert` | bande éditoriale légendée |
| 07 Nous trouver | `facade.jpg` + `terrasse.jpg` | devanture actuelle ; terrasse |

Il reste **un** emplacement `.attente`, qui **nomme la photo manquante** plutôt que de
meubler avec une image qui parle d'autre chose :
- [ ] **Le mur de la boutique** — objets d'artisans, sacs de grains, cadres. Portrait.

Toujours utile à produire :
- [ ] L'équipe
- [ ] Les pâtisseries du jour
- [ ] Horizon, 38 rue Léon Jamin
- [ ] Des formats **paysage** — presque tout le fonds est en portrait

⚠️ **Trois points à trancher avec le client :**
1. **L'auteur des photos n'est pas identifié** (voir `LEGAL-TODO.md` § 2).
2. **`devanture-comptoir.jpg` et `salle-bandeau.jpg` montrent l'ANCIEN lettrage de vitrine**
   (« CANTINE DE SAISON · VIN · BIÈRE · CIDRE »), alors que la devanture actuelle porte
   « PETIT DEJ' / MIDI / GOÛTER » — sur laquelle repose tout le concept du hero.
   L'écart est discret (lettrage flou en arrière-plan), mais il existe. Faire confirmer que
   ces photos représentent toujours le lieu.
3. Une 12ᵉ photo fournie (2ᵉ toastie, bacon) n'a pas été retenue : **387 px de large**,
   trop faible pour tout emplacement du site.

### Contenu
- [ ] **La carte à jour et les prix** — voir `LEGAL-TODO.md` § 8. Le bloc « Note de
      production » de `carte.html` doit disparaître en même temps.
- [ ] **Les horaires** — contradiction entre sources, voir `LEGAL-TODO.md` § 3.
- [ ] Téléphone, e-mail, e-mail de recrutement
- [ ] Logo vectoriel

### Juridique
Tout est dans **`LEGAL-TODO.md`**. À lire avant toute mise en ligne.

---

## Où changer quoi

| Ce que vous changez | Où |
|---|---|
| Horaires, adresse, SIREN, réseaux, hébergeur | `assets/js/business.config.js` **puis** répercuter dans le HTML (les horaires apparaissent dans le hero, le pied, `#trouver` et les tiroirs) |
| Couleurs, espacements, épaisseur du trait | `:root` dans `assets/css/style.css` |
| La carte | `carte.html` |
| Les données structurées | générées depuis `business.config.js` par `main.js` |

> `business.config.js` pilote réellement le JSON-LD. Le texte visible reste en dur dans
> le HTML : c'est un choix (robustesse, SEO, zéro JS bloquant). Le tableau ci-dessus dit
> où répercuter.

---

**Création [Vokum](https://vokumagency.com)** — juillet 2026.
