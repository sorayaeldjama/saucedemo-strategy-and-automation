# 1. La stratègie de test : 

### 1. Vision et Objectifs de Qualité
L'objectif de cette stratégie n'est pas seulement de valider l'application, mais de mettre en place un filet de sécurité automatisé, stable et maintenable. Il s'agit de protéger les flux générateurs de revenus (tunnel d'achat) tout en garantissant des retours rapides (Fast Feedback) en cas de régression.

### 2. Approche Basée sur les Risques (Risk-Based Testing)
L'effort d'automatisation et d'exécution est priorisé selon l'impact business et la probabilité de défaillance :

Priorité Haute (P0 - Critique) : Authentification, ajout d'un article au panier, et tunnel d'achat (Checkout) de bout en bout. Action : Couverture automatisée maximale.

Priorité Moyenne (P1 - Majeure) : Gestion avancée du panier (retrait, modification, persistance des articles). Action : Validation des règles métiers et des cas limites.

Priorité Basse (P2 - Mineure) : Esthétique de l'interface et tris du catalogue. Action : Tests exploratoires initiaux.
### 3. Architecture d'Automatisation (La touche "Experte Technique")

Pour garantir un code de test propre, évolutif et résistant aux changements d'interface, la stack technique s'articule autour des choix suivants :

Framework : Automatisation via Playwright, privilégié pour sa gestion native de l'attente (auto-wait) qui limite les tests instables.

Design Pattern : Utilisation du Page Object Model (POM). Séparer la description des pages de la logique des tests garantit un code clair et réutilisable.

Sélecteurs fiables : Utilisation exclusive des attributs data-test natifs de SauceDemo pour s'affranchir des modifications CSS futures.
# 2 . Plan de test  : 
##  Périmètre de l'itération (Scope) : 

Fonctionnalités testées : Authentification, Ajout au panier, Tunnel de commande (Checkout).

Environnement : [https://www.saucedemo.com/](https://www.saucedemo.com/)

Comptes de test utilisés :

Utilisateur valide : standard_user

Utilisateur invalide : locked_out_user

Mot de passe global : secret_sauce

# Cas de Test Détaillés
## 📋 Périmètre (Scope)
*   **In Scope :** Authentification, Panier, Tunnel de commande (Checkout).
*   **Environnement :** `https://www.saucedemo.com/`

## 🧪 Rapport d'Exécution des Tests

| ID | Objectif du Test | Étapes (Synthèse) | Résultat Attendu | Résultat Obtenu | Statut |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-01** | Valider un achat complet (E2E) | Login > Ajouter article > Checkout > Finish | Message "Thank you for your order!" affiché. | Le message s'affiche correctement, redirection OK. | ✅ PASS |
| **TC-02** | Bloquer l'accès compte verrouillé | Login `locked_out_user` > Clic "Login" | Message d'erreur "Epic sadface..." affiché. | Le message d'erreur rouge apparaît comme prévu. | ✅ PASS |
| **TC-03** | Vérifier l'ajout/retrait du panier | Ajouter article > Vérifier badge > Retirer article | Le badge s'incrémente à "1" puis disparaît. | Le comportement du badge est conforme. | ✅ PASS |