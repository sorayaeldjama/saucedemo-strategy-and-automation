# L'Analyse et la Conception des tests


On ne code jamais à l'aveugle. Avant d'écrire la moindre ligne de TypeScript, on doit concevoir la stratégie de test. C'est ce qu'on appelle définir le périmètre de couverture.

Voici comment un Tech Lead ou une experte QA aborde la page de connexion (Login) d'une application comme SauceDemo.

# Étape 1 : Les Partitions d'Équivalence (Ce que tu as commencé)

On valide les classes de données.CT01 (Partition Valide) : standard_user + bon mot de passe.CT02 (Partition Invalide - Métier) : locked_out_user + bon mot de passe.
CT03 (Partition Invalide - Saisie) : Login valide + mauvais mot de passe.

# Étape 2 : L'Analyse des Valeurs LimitesMême si un login n'est 

pas un champ numérique, il a des limites physiques. Un développeur a pu oublier de gérer le cas où l'utilisateur clique sur "Login" sans rien taper.CT04 (Limite Basse - Champ vide) : Login vide + Mot de passe rempli (Vérifier le message "Username is required").CT05 (Limite Basse - Champ vide) : Login rempli + Mot de passe vide (Vérifier le message "Password is required").

# Étape 3 : La Table de Décision (Le cœur du métier QA)Les

 formulaires de connexion dépendent de la combinaison de plusieurs champs. La technique des tables de décisions est idéale pour modéliser une logique complexe. Au lieu d'écrire des tests au hasard, on croise systématiquement l'état du "Username" et du "Password" pour s'assurer qu'aucun trou critique n'a été laissé dans le code front-end ou back-end.  

| Cas de Test | État du Username | État du Password | Résultat Attendu (Assertion / Expect) |
| :--- | :--- | :--- | :--- |
| **CT01** | Valide (`standard_user`) | Valide | Succès -> Redirection vers `/inventory.html` |
| **CT02** | Bloqué (`locked_out_user`) | Valide | Échec -> Message "Sorry, this user has been locked out" |
| **CT03** | Valide | Invalide | Échec -> Message "Username and password do not match" |
| **CT04** | Vide | Valide | Échec -> Message "Username is required" |
| **CT05** | Valide | Vide | Échec -> Message "Password is required" |
| **CT06** | Vide | Vide | Échec -> Message "Username is required" |
