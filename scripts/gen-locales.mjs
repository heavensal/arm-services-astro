import fs from 'node:fs';
import path from 'node:path';

const dir = path.resolve('src/i18n/locales');
fs.mkdirSync(dir, { recursive: true });

const fr = {
	Layout: {
		skipToContent: 'Aller au contenu principal',
		ogImageAlt: 'ARM Services — déménagement et livraison',
	},
	LandingPage: {
		metaTitle: 'ARM Services | Déménagement Marseille & France — Devis gratuit',
		metaDescription:
			'ARM Services, déménagement à Marseille et partout en France sur devis. Devis gratuit au 06 43 09 65 97. Assurance incluse, équipe professionnelle.',
	},
	LanguageSwitcher: {
		ariaLabel: 'Choisir la langue',
		labelFr: 'FR',
		labelEn: 'EN',
		titleFr: 'Afficher le site en français',
		titleEn: 'Afficher le site en anglais',
	},
	Hero: {
		ariaLabel: 'Accueil ARM Services',
		imageAlt: 'Camion de déménagement ARM Services',
		h1Line1: 'ARM Services',
		h1Line2: 'Déménagement et Livraison',
		h1Line3: 'à Marseille & partout en France',
		lead: 'Basés à Marseille, nous intervenons sur toute la France sur devis. Devis gratuit, équipe pro, assurance incluse.',
		primaryCta: 'Contactez-Nous',
		secondaryCta: 'En Savoir Plus',
	},
	TrustBar: {
		ariaLabel: 'Nos engagements',
		i1: 'Devis gratuit',
		i2: 'Assurance incluse',
		i3: 'Déménageurs professionnels',
		i4: 'Intervention rapide',
		i5: 'Matériel de protection',
	},
	Services: {
		title: 'Nos services',
		s1t: 'Déménagement particulier',
		s1d:
			'Maison, appartement : nous gérons l’intégralité de votre déménagement avec soin et réactivité.',
		s2t: 'Déménagement entreprise',
		s2d:
			'Bureaux, locaux commerciaux : planning sur mesure et intervention discrète pour ne pas perturber votre activité.',
		s3t: 'Déménagement longue distance',
		s3d:
			'France et international : transport sécurisé et suivi pour vos biens sur toute la distance.',
		s4t: 'Transport de meubles',
		s4d:
			'Achat, vente ou don : livraison et mise en place de vos meubles en toute sécurité.',
		s5t: 'Aide au chargement',
		s5d:
			'Un coup de main pour charger ou décharger un véhicule : équipe disponible à la demande.',
	},
	Process: {
		title: 'Comment ça se passe',
		s1t: 'Demande de devis',
		s1d:
			'Formulaire ou appel : nous recueillons vos besoins (dates, volume, étages, accès).',
		s2t: 'Estimation du volume',
		s2d:
			'Évaluation du nombre de m³ et du matériel nécessaire pour un devis précis.',
		s3t: 'Planification',
		s3d:
			'Nous fixons la date et l’horaire d’intervention selon votre disponibilité.',
		s4t: 'Transport sécurisé',
		s4d:
			'Déménagement et livraison avec soin, assurance et suivi jusqu’à la remise des clés.',
	},
	Areas: {
		title: 'Zones desservies',
		intro:
			'Basés à Marseille, nous effectuons déménagements et livraisons partout en France sur devis.',
		mapAlt:
			"Carte de France illustrant les zones d'intervention d'ARM Services",
		cta: 'Demander un devis pour ma ville',
		cities: [
			'Marseille',
			'Aix-en-Provence',
			'Toulon',
			'Nice',
			'Montpellier',
			'Lyon',
			'Paris',
			'Bordeaux',
			'Toulouse',
			'Nantes',
			'Strasbourg',
			'Lille',
			'Rennes',
			'Reims',
			'Saint-Étienne',
			'Grenoble',
			'Dijon',
			'Toute la France sur devis',
		],
	},
	WhyUs: {
		title: 'Pourquoi nous choisir',
		p1t: 'Fiabilité',
		p1d:
			'Engagements tenus : dates et horaires respectés, devis détaillé sans surprise.',
		p2t: 'Expérience',
		p2d:
			'Équipe formée aux bonnes pratiques du déménagement et au maniement des objets fragiles.',
		p3t: 'Sécurité',
		p3d:
			'Assurance incluse, matériel de protection et véhicules adaptés pour vos biens.',
	},
	Reviews: {
		title: 'Avis clients',
		starsAria: '5 étoiles',
		footer:
			'Faites-nous confiance pour votre déménagement — appelez pour un devis.',
		r1n: 'Sophie M.',
		r1t:
			'Équipe très professionnelle, rien de cassé, délais respectés. Je recommande ARM Services les yeux fermés.',
		r2n: 'Thomas L.',
		r2t:
			'Devis honnête et intervention rapide. Déménagement Marseille–Lyon sans stress. Merci !',
		r3n: 'Marie D.',
		r3t:
			'Service impeccable du premier contact au déchargement. Prix transparent, équipe sympa.',
		r4n: 'Pierre F.',
		r4t:
			'Déménagement d’entreprise géré avec soin. ARM Services a su s’adapter à nos contraintes horaires.',
		r5n: 'Julie R.',
		r5t:
			'Enfin une société sérieuse. Devis gratuit, assurance incluse, tout s’est parfaitement passé.',
	},
	Faq: {
		title: 'Questions fréquentes',
		intro: 'Quelques réponses rapides aux questions les plus courantes.',
		moreQuestions: "Vous avez d'autres questions ?",
		contactCta: 'Contactez-nous',
		item1Question: 'Proposez-vous un devis gratuit ?',
		item1Answer:
			'Oui. Contactez-nous par téléphone ou via le formulaire : nous établissons un devis gratuit et sans engagement.',
		item2Question: 'Êtes-vous assurés ?',
		item2Answer:
			'Oui, nos prestations incluent une assurance adaptée au transport de vos biens. Les détails figurent sur votre devis.',
		item3Question: 'Intervenez-vous hors de Marseille ?',
		item3Answer:
			'Oui. Nous sommes basés à Marseille et intervenons partout en France sur devis.',
		item4Question: 'Comment préparer mon déménagement ?',
		item4Answer:
			'Après validation du devis, nous planifions la date et vous indiquons les éventuelles consignes de préparation (emballage, accès, stationnement).',
	},
	QuoteCTA: {
		title: 'Obtenez votre devis gratuit',
		lead: 'Appelez-nous au {{phone}} ou demandez un devis en ligne. Réponse rapide, sans engagement.',
		call: 'Appeler le {{phone}}',
		online: 'Demander un devis en ligne',
	},
	FinalCTA: {
		ariaLabel: 'Nous contacter',
		lead:
			'Une question ou prêt à planifier votre déménagement ? Appelez-nous ou envoyez-nous un email.',
		call: 'Appeler le {{phone}}',
		tiktok: 'Retrouvez-nous sur TikTok {{handle}}',
	},
	ContactForm: {
		openCta: 'Demande de devis par formulaire',
		dialogTitle: 'Demande de devis / contact',
		dialogIntro:
			'Les données sont envoyées à ContentForge (PUBLIC_CONTACT_FORM_URL et PUBLIC_CONTACT_FORM_TOKEN).',
		fieldLastName: 'Nom',
		fieldFirstName: 'Prénom',
		fieldEmail: 'Email',
		fieldPhone: 'Téléphone',
		fieldCompany: 'Société',
		fieldMessage: "Message d'informations",
		messagePlaceholder:
			'Ex. : étages (départ / arrivée), adresses complètes, type de prestation (déménagement ou livraison seule), estimation du volume (m³), contraintes d’accès et de stationnement, créneaux souhaités pour le départ et l’arrivée, meubles lourds ou fragiles, besoin d’emballage, etc.',
		submit: 'Envoyer',
		close: 'Fermer',
		sending: 'Envoi en cours…',
		success: 'Merci ! Votre message a bien été transmis.',
		error: "L'envoi a échoué. Réessayez ou appelez-nous.",
		errorNetwork: 'Erreur réseau. Vérifiez votre connexion.',
		emailSubject: 'Contact — ARM Services (arm-services-demenagement.fr)',
		errorConfig:
			'Le formulaire n’est pas configuré (PUBLIC_CONTACT_FORM_URL ou PUBLIC_CONTACT_FORM_TOKEN manquant).',
	},
	Footer: {
		imageAlt: 'Équipe ARM Services en plein déménagement',
		brand: 'ARM Services',
		tagline: 'Déménagement — Marseille & toute la France sur devis',
		navAria: 'Mentions légales et politiques',
		linkLegal: 'Mentions légales',
		linkPrivacy: 'Politique de confidentialité',
		linkTerms: 'Conditions générales',
		legalLines: 'SIRET {{legalId}}<br />Capital social {{capital}}',
	},
	LegalNotice: {
		metaTitle: 'Mentions légales | ARM Services',
		metaDescription:
			'Mentions légales du site ARM Services, déménagement Marseille et France.',
		back: "← Retour à l'accueil",
		h1: 'Mentions légales',
		updated: 'Dernière mise à jour : à compléter',
		s1h: '1. Éditeur du site',
		s1p1:
			'Le site est édité par :<br /><strong>ARM Services</strong><br />[SIRET : 938 889 334 00018]<br />[Capital social : 6 300 €]<br />[Adresse du siège : à compléter]<br />Contact :',
		s1p1After:
			'<br />Email : <a href="mailto:{{email}}" class="text-red-armenian hover:underline">{{email}}</a>',
		s2h: '2. Directeur de la publication',
		s2p1: 'Le directeur de la publication est : [à compléter — nom du responsable].',
		s3h: '3. Hébergement',
		s3p1:
			"Le site est hébergé par :<br />[À compléter — raison sociale de l'hébergeur]<br />[Adresse de l'hébergeur]",
		s4h: '4. Propriété intellectuelle',
		s4p1:
			"L'ensemble du contenu de ce site (textes, images, graphismes, structure) est protégé par le droit d'auteur et le droit des marques. Toute reproduction ou représentation, totale ou partielle, sans autorisation préalable de ARM Services est interdite et constitue une contrefaçon.",
		s5h: '5. Limitation de responsabilité',
		s5p1:
			"ARM Services s'efforce d'assurer l'exactitude des informations publiées sur ce site. Toutefois, elle ne peut garantir leur exhaustivité ni leur mise à jour en temps réel. Les informations sont fournies à titre indicatif.",
		s6h: '6. Liens hypertextes',
		s6p1:
			"Ce site peut contenir des liens vers d'autres sites. ARM Services n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu. La création de liens vers ce site est soumise à l'accord préalable de ARM Services.",
	},
	Privacy: {
		metaTitle: 'Politique de confidentialité | ARM Services',
		metaDescription:
			'Politique de confidentialité et protection des données personnelles, ARM Services.',
		back: "← Retour à l'accueil",
		h1: 'Politique de confidentialité',
		updated: 'Dernière mise à jour : à compléter',
		s1h: '1. Responsable du traitement',
		s1p1:
			'Le responsable du traitement des données personnelles est :<br /><strong>ARM Services</strong><br />SIRET : 938 889 334 00018<br />Contact :',
		s1p1After:
			'<br />Email : <a href="mailto:{{email}}" class="text-red-armenian hover:underline">{{email}}</a>',
		s1p2: '[Délégué à la protection des données (DPO) : à compléter si applicable]',
		s2h: '2. Données collectées',
		s2p1:
			"Dans le cadre de l'utilisation de ce site et des demandes de devis ou de contact, nous sommes susceptibles de collecter : nom, prénom, adresse email, numéro de téléphone, adresse(s) concernée(s) par le déménagement, et toute information que vous nous communiquez volontairement.",
		s2p2:
			'Les données de navigation (adresse IP, type de navigateur, pages visitées) peuvent être collectées via des cookies ou technologies similaires, dans le respect des finalités décrites ci-dessous.',
		s3h: '3. Finalités et bases légales',
		s3p1:
			'Vos données sont traitées pour : répondre à vos demandes de devis et de contact, exécuter les prestations commandées, respecter nos obligations légales et, le cas échéant, vous envoyer des informations commerciales si vous y avez consenti.',
		s3p2:
			'Les bases légales sont : l’exécution du contrat (devis, déménagement), votre consentement (prospection, cookies non essentiels) et l’intérêt légitime (sécurité du site, statistiques).',
		s4h: '4. Durée de conservation',
		s4p1:
			'[À compléter : ex. données clients 3 ans après le dernier contact, données de facturation 10 ans, cookies selon type.]',
		s5h: '5. Destinataires et transferts',
		s5p1:
			'Vos données sont destinées aux services internes de ARM Services et, le cas échéant, à des sous-traitants (hébergement, outil de devis, etc.) dans le cadre de garanties contractuelles. [Liste des sous-traitants : à compléter.]',
		s5p2:
			"Aucun transfert en dehors de l'Union européenne n'est effectué sans garanties appropriées.",
		s6h: '6. Vos droits (RGPD)',
		s6p1:
			"Vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation du traitement, de portabilité et d'opposition. Pour les exercer : contactez-nous au {{phone}} ou à ",
		s6p2:
			'<a href="mailto:{{email}}" class="text-red-armenian hover:underline">{{email}}</a>.',
		s6p3:
			'Vous avez le droit d’introduire une réclamation auprès de la CNIL : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" class="text-red-armenian hover:underline">www.cnil.fr</a>.',
		s7h: '7. Cookies',
		s7p1:
			"Ce site peut utiliser des cookies strictement nécessaires au fonctionnement (ex. préférences d'affichage). [À compléter : cookies analytiques ou publicitaires si utilisés, durée, moyen de refus.]",
		s7p2:
			'Vous pouvez configurer votre navigateur pour refuser les cookies non essentiels ; certaines fonctionnalités pourraient en être affectées.',
		s8h: '8. Sécurité',
		s8p1:
			'Nous mettons en œuvre des mesures techniques et organisationnelles pour protéger vos données contre l’accès non autorisé, la perte ou l’altération.',
	},
	Terms: {
		metaTitle: 'Conditions générales | ARM Services',
		metaDescription:
			'Conditions générales de vente et de prestation de services, ARM Services déménagement.',
		back: "← Retour à l'accueil",
		h1: 'Conditions générales de vente et de prestation',
		updated: 'Dernière mise à jour : à compléter',
		s1h: "1. Objet et champ d'application",
		s1p1:
			'Les présentes conditions générales (CGV) s’appliquent à toutes les prestations de déménagement et services associés proposés par ARM Services (SIRET 938 889 334 00018), sans restriction ni réserve. Tout devis ou commande implique l’acceptation des présentes CGV.',
		s2h: '2. Devis et commande',
		s2p1:
			'Le devis établi par ARM Services est gratuit et valable [à compléter : ex. 30 jours] à compter de sa date d’émission. La commande est ferme et définitive à réception du bon de commande signé et, le cas échéant, d’un acompte conformément aux modalités indiquées sur le devis.',
		s2p2:
			'Toute modification substantielle (volume, dates, adresses) après acceptation du devis pourra donner lieu à un avenant tarifaire.',
		s3h: '3. Prix et modalités de paiement',
		s3p1:
			'Les prix sont indiqués en euros TTC [ou HT selon le cas — à compléter]. Ils comprennent [à compléter : ex. main-d’œuvre, véhicule, assurance de base] et n’incluent pas [à compléter : ex. emballages optionnels, assurance valeur déclarée].',
		s3p2:
			'[À compléter : modalités de paiement — acompte, solde à la livraison, délais, pénalités de retard.]',
		s4h: '4. Annulation et report',
		s4p1:
			'[À compléter : conditions d’annulation par le client (délai, frais éventuels), report par ARM Services (cas de force majeure, report proposé).]',
		s5h: '5. Assurance et responsabilité',
		s5p1:
			'ARM Services est couvert par une assurance responsabilité civile professionnelle. Les biens transportés bénéficient de l’assurance prévue au devis. [À compléter : plafonds, exclusions, déclaration de sinistre.]',
		s5p2:
			'Le client doit déclarer les objets de valeur ou fragiles et peut souscrire une assurance valeur déclarée. [À compléter selon pratique.]',
		s6h: '6. Obligations du client',
		s6p1:
			'Le client s’engage à : fournir des informations exactes (volumes, accès, étages), assurer la libre disposition des lieux aux dates convenues, préparer les effets selon les instructions éventuellement communiquées (débranchements, démontages simples), et à ne pas confier d’objets interdits au transport (produits dangereux, espèces, etc.).',
		s7h: '7. Réclamations',
		s7p1:
			'Toute réclamation doit être adressée par écrit à ARM Services dans un délai de [à compléter : ex. 8 jours] après la prestation, à défaut de quoi aucune réclamation ne pourra être valablement invoquée.',
		s8h: '8. Droit applicable et litiges',
		s8p1:
			'Les présentes CGV sont soumises au droit français. En cas de litige, les tribunaux français seront seuls compétents [à compléter : ou clause de médiation si souhaité].',
		s9h: '9. Contact',
		s9p1:
			'ARM Services — <a href="tel:0643096597" class="text-red-armenian hover:underline">06 43 09 65 97</a> — <a href="mailto:contact@arm-services-demenagement.fr" class="text-red-armenian hover:underline">contact@arm-services-demenagement.fr</a>',
	},
};

const en = {
	Layout: {
		skipToContent: 'Skip to main content',
		ogImageAlt: 'ARM Services — moving and delivery',
	},
	LandingPage: {
		metaTitle: 'ARM Services | Moving in Marseille & France — Free quote',
		metaDescription:
			'ARM Services: home and office moves in Marseille and across France. Free quote at 06 43 09 65 97. Insurance included, professional crew.',
	},
	LanguageSwitcher: {
		ariaLabel: 'Choose language',
		labelFr: 'FR',
		labelEn: 'EN',
		titleFr: 'View the site in French',
		titleEn: 'View the site in English',
	},
	Hero: {
		ariaLabel: 'ARM Services home',
		imageAlt: 'ARM Services moving truck',
		h1Line1: 'ARM Services',
		h1Line2: 'Moving and delivery',
		h1Line3: 'in Marseille & across France',
		lead: 'Based in Marseille, we work nationwide on quotation. Free quotes, professional team, insurance included.',
		primaryCta: 'Contact us',
		secondaryCta: 'Learn more',
	},
	TrustBar: {
		ariaLabel: 'Our commitments',
		i1: 'Free quote',
		i2: 'Insurance included',
		i3: 'Professional movers',
		i4: 'Fast response',
		i5: 'Protective equipment',
	},
	Services: {
		title: 'Our services',
		s1t: 'Residential moves',
		s1d:
			'Houses and apartments: we handle your entire move with care and responsiveness.',
		s2t: 'Commercial moves',
		s2d:
			'Offices and retail: tailored scheduling and discreet crews to limit business disruption.',
		s3t: 'Long-distance moves',
		s3d:
			'France and international: secure transport and tracking for your belongings.',
		s4t: 'Furniture transport',
		s4d:
			'Purchase, sale or donation: delivery and placement of your furniture safely.',
		s5t: 'Loading help',
		s5d:
			'Extra hands to load or unload a vehicle: crew available on request.',
	},
	Process: {
		title: 'How it works',
		s1t: 'Quote request',
		s1d:
			'Form or call: we capture your needs (dates, volume, floors, access).',
		s2t: 'Volume estimate',
		s2d:
			'We assess cubic metres and equipment needed for an accurate quote.',
		s3t: 'Scheduling',
		s3d: 'We set the date and time based on your availability.',
		s4t: 'Secure transport',
		s4d:
			'Move and delivery with care, insurance and support through handover.',
	},
	Areas: {
		title: 'Areas we serve',
		intro:
			'Based in Marseille, we carry out moves and deliveries throughout France on quotation.',
		mapAlt: 'Map of France showing ARM Services coverage',
		cta: 'Request a quote for my city',
		cities: fr.Areas.cities,
	},
	WhyUs: {
		title: 'Why choose us',
		p1t: 'Reliability',
		p1d:
			'We keep our commitments: dates and times respected, detailed quotes with no surprises.',
		p2t: 'Experience',
		p2d:
			'Team trained in best practices and careful handling of fragile items.',
		p3t: 'Safety',
		p3d:
			'Insurance included, protective equipment and suitable vehicles for your goods.',
	},
	Reviews: {
		title: 'Customer reviews',
		starsAria: '5 stars',
		footer: 'Trust us for your move — call for a quote.',
		r1n: 'Sophie M.',
		r1t:
			'Very professional crew, nothing broken, deadlines met. I recommend ARM Services without hesitation.',
		r2n: 'Thomas L.',
		r2t:
			'Honest quote and fast service. Marseille–Lyon move without stress. Thank you!',
		r3n: 'Marie D.',
		r3t:
			'Impeccable service from first contact to unloading. Transparent pricing, friendly team.',
		r4n: 'Pierre F.',
		r4t:
			'Office move handled with care. ARM Services adapted to our time constraints.',
		r5n: 'Julie R.',
		r5t:
			'Finally a serious company. Free quote, insurance included, everything went perfectly.',
	},
	Faq: {
		title: 'Frequently asked questions',
		intro: 'Quick answers to common questions.',
		moreQuestions: 'More questions?',
		contactCta: 'Contact us',
		item1Question: 'Do you offer free quotes?',
		item1Answer:
			'Yes. Call us or use the form: we provide a free, no-obligation quote.',
		item2Question: 'Are you insured?',
		item2Answer:
			'Yes. Our services include insurance suited to transporting your goods. Details appear on your quote.',
		item3Question: 'Do you work outside Marseille?',
		item3Answer:
			'Yes. We are based in Marseille and operate across France on quotation.',
		item4Question: 'How should I prepare for my move?',
		item4Answer:
			'After the quote is approved, we schedule the date and share any preparation notes (packing, access, parking).',
	},
	QuoteCTA: {
		title: 'Get your free quote',
		lead: 'Call us on {{phone}} or request a quote online. Fast response, no obligation.',
		call: 'Call {{phone}}',
		online: 'Request a quote online',
	},
	FinalCTA: {
		ariaLabel: 'Contact us',
		lead:
			'Questions or ready to plan your move? Call us or send an email.',
		call: 'Call {{phone}}',
		tiktok: 'Find us on TikTok {{handle}}',
	},
	ContactForm: {
		openCta: 'Request a quote via form',
		dialogTitle: 'Quote / contact request',
		dialogIntro:
			'Data is sent to ContentForge (PUBLIC_CONTACT_FORM_URL and PUBLIC_CONTACT_FORM_TOKEN).',
		fieldLastName: 'Last name',
		fieldFirstName: 'First name',
		fieldEmail: 'Email',
		fieldPhone: 'Phone',
		fieldCompany: 'Company',
		fieldMessage: 'Information message',
		messagePlaceholder:
			'E.g. floors (origin / destination), full addresses, service type (full move or delivery only), estimated volume (m³), access and parking constraints, preferred departure and arrival time windows, heavy or fragile items, packing needs, etc.',
		submit: 'Send',
		close: 'Close',
		sending: 'Sending…',
		success: 'Thank you! Your message has been sent.',
		error: 'Something went wrong. Please try again or call us.',
		errorNetwork: 'Network error. Check your connection.',
		emailSubject: 'Contact — ARM Services (arm-services-demenagement.fr)',
		errorConfig:
			'Form not configured (missing PUBLIC_CONTACT_FORM_URL or PUBLIC_CONTACT_FORM_TOKEN).',
	},
	Footer: {
		imageAlt: 'ARM Services team during a move',
		brand: 'ARM Services',
		tagline: 'Moving — Marseille & all of France by quotation',
		navAria: 'Legal and policies',
		linkLegal: 'Legal notice',
		linkPrivacy: 'Privacy policy',
		linkTerms: 'Terms & conditions',
		legalLines: 'SIRET {{legalId}}<br />Share capital {{capital}}',
	},
	LegalNotice: {
		metaTitle: 'Legal notice | ARM Services',
		metaDescription:
			'Legal information for the ARM Services website, moving services in Marseille and France.',
		back: '← Back to home',
		h1: 'Legal notice',
		updated: 'Last updated: to be completed',
		s1h: '1. Publisher',
		s1p1:
			'This website is published by:<br /><strong>ARM Services</strong><br />[SIRET: 938 889 334 00018]<br />[Share capital: €6,300]<br />[Registered office: to be completed]<br />Contact:',
		s1p1After:
			'<br />Email: <a href="mailto:{{email}}" class="text-red-armenian hover:underline">{{email}}</a>',
		s2h: '2. Publication director',
		s2p1: 'Publication director: [to be completed — name of responsible person].',
		s3h: '3. Hosting',
		s3p1:
			'Hosting provider:<br />[To be completed — company name]<br />[Hosting provider address]',
		s4h: '4. Intellectual property',
		s4p1:
			'All content on this site (text, images, graphics, structure) is protected by copyright and trademark law. Any reproduction or representation, in whole or in part, without prior permission from ARM Services is prohibited.',
		s5h: '5. Limitation of liability',
		s5p1:
			'ARM Services strives to ensure information on this site is accurate but cannot guarantee completeness or real-time updates. Information is provided for guidance only.',
		s6h: '6. Hyperlinks',
		s6p1:
			'This site may link to third-party sites. ARM Services does not control those sites and is not responsible for their content. Linking to this site requires prior agreement from ARM Services.',
	},
	Privacy: {
		metaTitle: 'Privacy policy | ARM Services',
		metaDescription:
			'Privacy policy and personal data protection for ARM Services.',
		back: '← Back to home',
		h1: 'Privacy policy',
		updated: 'Last updated: to be completed',
		s1h: '1. Data controller',
		s1p1:
			'The data controller is:<br /><strong>ARM Services</strong><br />SIRET: 938 889 334 00018<br />Contact:',
		s1p1After:
			'<br />Email: <a href="mailto:{{email}}" class="text-red-armenian hover:underline">{{email}}</a>',
		s1p2: '[Data protection officer (DPO): to be completed if applicable]',
		s2h: '2. Data collected',
		s2p1:
			'When you use this site or request a quote or contact, we may collect: name, email, phone, addresses related to the move, and any information you voluntarily provide.',
		s2p2:
			'Browsing data (IP address, browser type, pages visited) may be collected via cookies or similar technologies, as described below.',
		s3h: '3. Purposes and legal bases',
		s3p1:
			'We process your data to respond to quote and contact requests, perform services, meet legal obligations, and where applicable send marketing if you have consented.',
		s3p2:
			'Legal bases include: contract performance (quote, move), consent (marketing, non-essential cookies), and legitimate interest (site security, statistics).',
		s4h: '4. Retention',
		s4p1:
			'[To be completed: e.g. customer data 3 years after last contact, invoicing 10 years, cookies by category.]',
		s5h: '5. Recipients and transfers',
		s5p1:
			'Data is accessed by ARM Services teams and, where relevant, subprocessors (hosting, quoting tools) under contractual safeguards. [Subprocessor list: to be completed.]',
		s5p2:
			'No transfer outside the EU without appropriate safeguards.',
		s6h: '6. Your rights (GDPR)',
		s6p1:
			'You have rights of access, rectification, erasure, restriction, portability and objection. To exercise them, contact us at {{phone}} or at ',
		s6p2:
			'<a href="mailto:{{email}}" class="text-red-armenian hover:underline">{{email}}</a>.',
		s6p3:
			'You may lodge a complaint with the CNIL: <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" class="text-red-armenian hover:underline">www.cnil.fr</a>.',
		s7h: '7. Cookies',
		s7p1:
			'This site may use strictly necessary cookies (e.g. display preferences). [To be completed: analytics or advertising cookies if used, duration, opt-out.]',
		s7p2:
			'You can configure your browser to refuse non-essential cookies; some features may be affected.',
		s8h: '8. Security',
		s8p1:
			'We implement technical and organisational measures to protect your data against unauthorised access, loss or alteration.',
	},
	Terms: {
		metaTitle: 'Terms & conditions | ARM Services',
		metaDescription:
			'General terms of sale and service for ARM Services moving company.',
		back: '← Back to home',
		h1: 'General terms of sale and service',
		updated: 'Last updated: to be completed',
		s1h: '1. Scope',
		s1p1:
			'These general terms apply to all moving and related services offered by ARM Services (SIRET 938 889 334 00018) without restriction. Any quote or order implies acceptance of these terms.',
		s2h: '2. Quotes and orders',
		s2p1:
			'Quotes from ARM Services are free and valid [to be completed: e.g. 30 days] from issue. The order is firm upon receipt of a signed order form and, if applicable, a deposit as stated on the quote.',
		s2p2:
			'Material changes (volume, dates, addresses) after acceptance may require a pricing amendment.',
		s3h: '3. Price and payment',
		s3p1:
			'Prices are in euros including VAT [or excluding VAT — to be completed]. They include [to be completed: e.g. labour, vehicle, basic insurance] and exclude [to be completed: e.g. optional packing, declared value insurance].',
		s3p2:
			'[To be completed: payment terms — deposit, balance on delivery, late payment fees.]',
		s4h: '4. Cancellation and postponement',
		s4p1:
			'[To be completed: client cancellation terms (notice, fees), postponement by ARM Services (force majeure, proposed new date).]',
		s5h: '5. Insurance and liability',
		s5p1:
			'ARM Services holds professional liability insurance. Goods are covered as stated on the quote. [To be completed: limits, exclusions, claims process.]',
		s5p2:
			'Clients must declare valuable or fragile items and may take out declared value insurance. [To be completed per practice.]',
		s6h: '6. Client obligations',
		s6p1:
			'The client agrees to: provide accurate information (volume, access, floors), ensure premises are available on agreed dates, prepare goods per any instructions (disconnecting, simple dismantling), and not hand over prohibited goods (hazardous materials, cash, etc.).',
		s7h: '7. Complaints',
		s7p1:
			'Any complaint must be sent in writing to ARM Services within [to be completed: e.g. 8 days] after service; otherwise it cannot be considered.',
		s8h: '8. Applicable law and disputes',
		s8p1:
			'These terms are governed by French law. Disputes fall within the jurisdiction of French courts [to be completed: or mediation clause if desired].',
		s9h: '9. Contact',
		s9p1:
			'ARM Services — <a href="tel:0643096597" class="text-red-armenian hover:underline">06 43 09 65 97</a> — <a href="mailto:contact@arm-services-demenagement.fr" class="text-red-armenian hover:underline">contact@arm-services-demenagement.fr</a>',
	},
};

fs.writeFileSync(path.join(dir, 'fr.json'), JSON.stringify(fr, null, '\t'));
fs.writeFileSync(path.join(dir, 'en.json'), JSON.stringify(en, null, '\t'));
console.log('locales written');
