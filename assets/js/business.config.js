/* =========================================================================
   ALAÏA — Fiche d'identité de l'établissement
   SOURCE DE VÉRITÉ UNIQUE du site. Toute donnée d'entreprise se modifie ici.

   Consommée par main.js pour générer les données structurées (JSON-LD).
   Les valeurs marquées [INFORMATION À FOURNIR PAR LE CLIENT] doivent être
   complétées avant la mise en ligne — voir LEGAL-TODO.md.

   Données légales vérifiées le 16/07/2026 sur l'Annuaire des Entreprises
   (annuaire-entreprises.data.gouv.fr) et l'API recherche-entreprises.
   Rien n'est inventé : ce qui n'est pas vérifié porte un placeholder.
   ========================================================================= */

export const alaia = {
  // --- Identité -----------------------------------------------------------
  nomCommercial: 'Alaïa café & boutique',
  raisonSociale: 'ALAIA CAFE ET BOUTIQUE',
  formeJuridique: 'SAS, société par actions simplifiée',
  capitalSocial: '[INFORMATION À FOURNIR PAR LE CLIENT]',
  siren: '883 171 472',
  siret: '883 171 472 00011', // établissement siège
  rcs: 'RCS Nantes 883 171 472', // à confirmer sur l'extrait Kbis
  tvaIntracom: '[INFORMATION À FOURNIR PAR LE CLIENT]',
  apeNaf: '56.30Z — Débits de boissons',
  dateCreation: '2020-04-29',
  ouvertureAuPublic: 'juillet 2020',
  president: 'AEFC HOLDING (SIREN 945 232 668)',
  directeurPublication: '[INFORMATION À FOURNIR PAR LE CLIENT]',

  // --- Contact ------------------------------------------------------------
  adresse: {
    rue: '4 rue de Budapest',
    codePostal: '44000',
    ville: 'Nantes',
    pays: 'FR',
    lat: 47.216071,
    lon: -1.560392, // relevé INSEE
  },
  telephone: '[INFORMATION À FOURNIR PAR LE CLIENT]',
  email: '[INFORMATION À FOURNIR PAR LE CLIENT]',

  // --- Horaires -----------------------------------------------------------
  // ⚠️ À CONFIRMER. Les sources publiques se contredisent :
  //   · Bio Instagram (juillet 2026, post épinglé « Horaires de l'été ») : 8h30–17h30
  //   · Guides (Les Bouillonnantes, Nantes Végétal, restaurantguru) : 9h30–18h30
  //   · Petit Futé : 9h30–17h00
  // Retenu ici : la parole du client lui-même (Instagram), donc horaires d'été.
  // Il faut trancher horaires d'été / horaires d'hiver avant mise en ligne.
  jours: 'Mardi → Samedi',
  ouverture: '08:30',
  fermeture: '17:30',
  joursFermes: ['Dimanche', 'Lundi'],
  horairesSchema: ['Tu-Sa 08:30-17:30'],
  reservation: false, // « SANS RÉSERVATION » — peint sur la vitrine, écrit dans la bio

  // --- Réseaux ------------------------------------------------------------
  reseaux: {
    instagram: 'https://www.instagram.com/alaiacafeboutique/',
    facebook: 'https://www.facebook.com/alaiacafeboutique/',
    threads: 'https://www.threads.net/@alaiacafeboutique',
  },

  // --- La deuxième maison -------------------------------------------------
  horizon: {
    nom: 'Horizon par Alaïa',
    raisonSociale: 'AEFC HORIZON',
    siren: '979 008 794',
    adresse: '38 rue Léon Jamin, 44000 Nantes',
    depuis: '15 septembre 2023',
    instagram: 'https://www.instagram.com/horizoncafe.nantes/',
  },

  // --- Hébergeur (mentions légales) ---------------------------------------
  hebergeur: {
    nom: '[INFORMATION À FOURNIR PAR LE CLIENT]',
    adresse: '[INFORMATION À FOURNIR PAR LE CLIENT]',
    site: '[INFORMATION À FOURNIR PAR LE CLIENT]',
  },

  // --- Site ---------------------------------------------------------------
  domaine: '[INFORMATION À FOURNIR PAR LE CLIENT]', // ex. https://alaiacafe.fr
};

export default alaia;
