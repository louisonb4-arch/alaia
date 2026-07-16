/* =========================================================================
   ALAÏA — comportements
   Zéro dépendance, zéro requête tierce, zéro cookie.
   · Le mouvement se déclenche à l'entrée dans le viewport (IntersectionObserver)
   · ?plat  → coupe le mouvement (captures, QA)
   · prefers-reduced-motion est respecté par le CSS ET par le JS
   ========================================================================= */

import alaia from './business.config.js';

const html = document.documentElement;
const plat = new URLSearchParams(location.search).has('plat');
if (plat) html.setAttribute('data-plat', '');

const calme = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* -------------------------------------------------- 1. Toujours la devanture
   Un rechargement repart de la devanture, jamais du milieu de la page : c'est
   le point d'entrée, et l'ouverture n'a de sens que vue depuis le trottoir.
   (`scrollRestoration` est déjà passé en manuel par le script en ligne du
   <head>, avant le premier rendu — ici on remet effectivement à zéro.) */
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

function auDebut() {
  // `pageshow` couvre le retour arrière depuis le cache du navigateur, que
  // `load` seul laisserait passer.
  window.scrollTo(0, 0);
}
auDebut();
addEventListener('load', auDebut);
addEventListener('pageshow', auDebut);

/* ------------------------------------------------------- 2. La buée / le lever
   Une seule passe : on révèle, on oublie. Pas de va-et-vient au scroll. */
function revele() {
  const cibles = document.querySelectorAll('.buee, .leve, .rideau, .tracer');
  if (plat || calme || !('IntersectionObserver' in window)) {
    cibles.forEach((el) => el.classList.add('vu'));
    return;
  }

  // Le trait qui se dessine a besoin de sa propre longueur.
  document.querySelectorAll('.tracer').forEach((svg) => {
    svg.querySelectorAll('.trait').forEach((p) => {
      if (typeof p.getTotalLength === 'function') {
        const l = Math.ceil(p.getTotalLength());
        p.style.setProperty('--l', l);
      }
    });
  });

  const oeil = new IntersectionObserver(
    (entrees) => {
      entrees.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('vu');
        oeil.unobserve(e.target);
      });
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
  );

  cibles.forEach((el) => {
    // La vitre ne s'observe pas. Deux raisons :
    // · elle fait partie de la devanture, et sur un écran court elle tombe
    //   juste sous la ligne de flottaison — l'observateur ne se déclencherait
    //   jamais et le dernier temps de l'ouverture serait perdu ;
    // · son retard ne peut pas venir du CSS : `vu` est posé ici, avant que le
    //   script du <head> n'ajoute `intro-go`, donc la transition serait déjà
    //   lancée quand la règle de retard arrive — trop tard pour elle.
    // On la déclenche donc à la main, en dernier temps de l'ouverture.
    if (el.hasAttribute('data-vitre')) {
      const enOuverture = document.documentElement.classList.contains('intro');
      setTimeout(() => el.classList.add('vu'), enOuverture ? 1550 : 0);
      return;
    }
    oeil.observe(el);
  });
}

/* ------------------------------------------------------------ 3. Le tiroir
   Menu mobile : piégeage du focus, fermeture à l'Échap et au clic sur un lien. */
function tiroir() {
  const cle = document.querySelector('.cle');
  const panneau = document.querySelector('.tiroir');
  if (!cle || !panneau) return;

  const ouvrable = () => panneau.querySelectorAll('a, button');

  function bascule(ouvrir) {
    cle.setAttribute('aria-expanded', String(ouvrir));
    panneau.setAttribute('data-ouvert', String(ouvrir));
    panneau.setAttribute('aria-hidden', String(!ouvrir));
    document.body.style.overflow = ouvrir ? 'hidden' : '';
    if (ouvrir) ouvrable()[0]?.focus();
    else cle.focus();
  }

  cle.addEventListener('click', () =>
    bascule(cle.getAttribute('aria-expanded') !== 'true')
  );

  panneau.addEventListener('click', (e) => {
    if (e.target.closest('a')) bascule(false);
  });

  document.addEventListener('keydown', (e) => {
    if (panneau.getAttribute('data-ouvert') !== 'true') return;
    if (e.key === 'Escape') return bascule(false);
    if (e.key !== 'Tab') return;
    const f = [...ouvrable()];
    const [premier, dernier] = [f[0], f[f.length - 1]];
    if (e.shiftKey && document.activeElement === premier) {
      e.preventDefault();
      dernier.focus();
    } else if (!e.shiftKey && document.activeElement === dernier) {
      e.preventDefault();
      premier.focus();
    }
  });

  // Le tiroir n'a pas de raison d'exister en desktop.
  window.matchMedia('(min-width: 861px)').addEventListener('change', (m) => {
    if (m.matches && panneau.getAttribute('data-ouvert') === 'true') bascule(false);
  });
}

/* -------------------------------------------------- 4. La section courante
   La nav souligne l'endroit où l'on se trouve. */
function courante() {
  const liens = [...document.querySelectorAll('.enseigne__lien[data-section]')];
  if (!liens.length || !('IntersectionObserver' in window)) return;

  const sections = liens
    .map((l) => document.getElementById(l.dataset.section))
    .filter(Boolean);
  if (!sections.length) return;

  const oeil = new IntersectionObserver(
    (entrees) => {
      entrees.forEach((e) => {
        if (!e.isIntersecting) return;
        liens.forEach((l) =>
          l.toggleAttribute('aria-current', l.dataset.section === e.target.id)
        );
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );
  sections.forEach((s) => oeil.observe(s));
}

/* ------------------------------------------------- 5. Le parallaxe de la vitre
   Une translation, jamais un zoom : la photo ne grandit pas, elle glisse. */
function vitre() {
  const photo = document.querySelector('[data-vitre]');
  if (!photo || plat || calme) return;

  let tic = false;
  const bouge = () => {
    const r = photo.parentElement.getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight) return;
    const d = Math.max(-1, Math.min(1, r.top / innerHeight));
    photo.style.transform = `translate3d(0, ${(d * 22).toFixed(2)}px, 0)`;
  };
  addEventListener(
    'scroll',
    () => {
      if (tic) return;
      tic = true;
      requestAnimationFrame(() => {
        bouge();
        tic = false;
      });
    },
    { passive: true }
  );
  bouge();
}

/* ------------------------------------ 6. Données structurées (schema.org)
   Générées depuis business.config.js : une seule source de vérité. */
function donneesStructurees() {
  const a = alaia.adresse;
  const inconnu = (v) => typeof v === 'string' && v.startsWith('[INFORMATION');

  const fiche = {
    '@context': 'https://schema.org',
    '@type': 'CafeOrCoffeeShop',
    name: alaia.nomCommercial,
    legalName: alaia.raisonSociale,
    description:
      "Café de spécialité, cuisine de saison et boutique d'artisans, 4 rue de Budapest à Nantes. Mardi au samedi, sans réservation.",
    image: new URL('assets/img/facade.jpg', location.href).href,
    address: {
      '@type': 'PostalAddress',
      streetAddress: a.rue,
      postalCode: a.codePostal,
      addressLocality: a.ville,
      addressCountry: a.pays,
    },
    geo: { '@type': 'GeoCoordinates', latitude: a.lat, longitude: a.lon },
    openingHours: alaia.horairesSchema,
    servesCuisine: ['Café de spécialité', 'Cuisine de saison', 'Brunch'],
    acceptsReservations: alaia.reservation,
    sameAs: Object.values(alaia.reseaux),
    publicAccess: true,
    isAccessibleForFree: false,
  };

  // On ne publie jamais un champ vide ou un placeholder.
  if (!inconnu(alaia.telephone)) fiche.telephone = alaia.telephone;
  if (!inconnu(alaia.email)) fiche.email = alaia.email;
  if (!inconnu(alaia.domaine)) fiche.url = alaia.domaine;

  const s = document.createElement('script');
  s.type = 'application/ld+json';
  s.textContent = JSON.stringify(fiche);
  document.head.appendChild(s);
}

/* ------------------------------------------------------------------ Départ */
function demarre() {
  revele();
  tiroir();
  courante();
  vitre();
  donneesStructurees();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', demarre);
} else {
  demarre();
}
