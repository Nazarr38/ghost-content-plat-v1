# 👻 Ghost Content - Plateforme SaaS

> Votre concierge vidéo personnel - La plateforme qui connecte les clients premium avec les meilleurs freelances créatifs.

![Ghost Content](https://images.pexels.com/photos/7947807/pexels-photo-7947807.jpeg?auto=compress&cs=tinysrgb&w=1200)

## 🌟 Caractéristiques

### 🎯 Pour les Clients
- **Matching automatique** - Trouvez le freelance parfait en moins de 24h
- **Système d'escrow sécurisé** - Paiements protégés avec capture manuelle
- **3 plans d'abonnement** - Starter (299€), Pro (799€), Elite (1499€)
- **Concierge personnel** - Support dédié selon votre plan
- **Gestion de projets** - Briefs, délais, révisions, livraisons

### 🎨 Pour les Freelances
- **Profil vérifié** - Système de tests et scoring automatique
- **Portfolio intégré** - Showcase de vos meilleures créations
- **Paiements garantis** - Escrow et commissions transparentes
- **Tests de compétences** - Démontrez votre expertise
- **Dashboard complet** - Gestion missions, disponibilités, revenus

### 👨‍💼 Pour les Admins
- **Tableau de bord analytics** - Métriques en temps réel
- **Gestion des compteurs** - Mise à jour des stats homepage
- **Assignation des tests** - Système de qualification freelances
- **Modération** - Contrôle qualité et support client

## 🚀 Technologies

- **Frontend**: React 18 + Vite + TypeScript + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + RLS)
- **Paiements**: Stripe (Checkout + PaymentIntent + Webhooks)
- **Animations**: Framer Motion
- **Infrastructure**: Vercel (API Serverless)
- **Design**: Glassmorphism, palette beige/navy/or

## 📦 Installation

### Prérequis
- Node.js ≥ 18.18
- Compte Supabase
- Compte Stripe
- Git

### 1. Cloner le repository
```bash
git clone https://github.com/votre-username/ghost-content-plat-v1.git
cd ghost-content-plat-v1
npm install
```

### 2. Configuration des variables d'environnement

Copiez `.env.example` vers `.env` et complétez les variables :

```env
# Supabase
VITE_SUPABASE_URL=votre_url_supabase
VITE_SUPABASE_ANON_KEY=votre_cle_anonyme
SUPABASE_SERVICE_ROLE_KEY=votre_cle_service

# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Plans d'abonnement Stripe
STRIPE_STARTER_PLAN_ID=price_...
STRIPE_PRO_PLAN_ID=price_...
STRIPE_ELITE_PLAN_ID=price_...

# Configuration app
VITE_APP_URL=http://localhost:5173
VITE_API_URL=http://localhost:5173/api
```

### 3. Configuration Supabase

1. Créez un nouveau projet sur [Supabase](https://supabase.com)
2. Exécutez le script SQL dans l'éditeur SQL :

```sql
-- Copiez le contenu de supabase.sql
```

3. Configurez l'authentification :
   - Activez l'auth par email
   - Désactivez la confirmation d'email pour les tests
   - Ajoutez votre domaine dans les URL autorisées

### 4. Configuration Stripe

1. Créez un compte [Stripe](https://stripe.com)
2. Créez 3 produits d'abonnement (Starter, Pro, Elite)
3. Configurez les webhooks pour `/api/stripe-webhook`
4. Copiez les IDs des plans dans `.env`

### 5. Démarrage

```bash
# Mode développement
npm run dev

# Build production
npm run build

# Prévisualisation
npm run preview

# Linting
npm run lint
```

## 🎨 Design System

### Palette de couleurs
```css
/* Beige principal */
--primary-100: #F7F1E5

/* Navy principal */
--navy-900: #0C2340

/* Or principal */
--gold-500: #D4AF37
```

### Composants UI
- **Cards** avec glassmorphism et radius 18px
- **Boutons** avec gradients et micro-interactions
- **Animations** fluides avec Framer Motion
- **Design responsive** mobile-first

## 📱 Fonctionnalités

### 🏠 Page d'accueil
- Hero section avec CTA
- Compteurs animés (freelances, projets, clients)
- Témoignages clients
- Section tarifs
- Footer complet

### 📝 Formulaire de matching
- Multi-étapes avec progression
- Sauvegarde automatique (localStorage)
- Calcul ETA dynamique
- Validation complète

### 💳 Système de paiement
- Abonnements mensuels Stripe Checkout
- Paiements de missions avec escrow
- Capture manuelle des paiements
- Webhooks pour synchronisation

### 📊 Dashboards
- **Client** : Briefs, missions, facturation
- **Freelance** : Tests, missions, revenus
- **Admin** : Analytics, modération, compteurs

### 🔐 Mode démo
- Données mockées si variables ENV manquantes
- Bannière d'information utilisateur
- Fonctionnalités complètes sans backend

## 🚀 Déploiement

### Vercel (Recommandé)

1. Connectez votre repository GitHub
2. Configurez les variables d'environnement
3. Déployez automatiquement

```bash
# CLI Vercel
npx vercel
npx vercel --prod
```

### Variables d'environnement production
Ajoutez toutes les variables de `.env` dans votre dashboard Vercel/Netlify.

## 📚 API Endpoints

### `/api/stripe-create-subscription`
Création d'un abonnement Stripe Checkout

### `/api/stripe-create-mission`  
Création d'un PaymentIntent pour mission

### `/api/stripe-capture`
Capture manuelle d'un paiement mission

### `/api/stripe-webhook`
Webhook Stripe pour synchronisation des statuts

## 🧪 Tests et Qualité

### Linting et format
```bash
npm run lint
npm run lint:fix
```

### TypeScript
Configuration stricte avec vérifications complètes.

### Performance
- Lighthouse Score ≥ 90 (objectif)
- Lazy loading des images
- Code splitting automatique
- Optimisations Vite

## 🤝 Contribution

1. Forkez le projet
2. Créez votre branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add AmazingFeature'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

### Standards de code
- TypeScript strict
- Composants fonctionnels React
- Hooks personnalisés pour la logique
- Séparation des responsabilités
- Maximum 200 lignes par fichier

## 📄 License

Distribué sous licence MIT. Voir `LICENSE` pour plus d'informations.

## 📞 Contact

- **Email** : hello@ghostcontent.fr
- **Website** : https://ghostcontent.fr
- **LinkedIn** : [@ghostcontent](https://linkedin.com/company/ghostcontent)

## 🙏 Remerciements

- [Supabase](https://supabase.com) pour le backend
- [Stripe](https://stripe.com) pour les paiements  
- [Tailwind CSS](https://tailwindcss.com) pour le design
- [Framer Motion](https://framer.com/motion) pour les animations
- [Lucide](https://lucide.dev) pour les icônes
- [Pexels](https://pexels.com) pour les images

---

<div align="center">

**[⬆ Retour au début](#-ghost-content---plateforme-saas)**

Made with 💜 by the Ghost Content Team

</div>