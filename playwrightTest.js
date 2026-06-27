import { test, expect } from '@playwright/test';

test.describe('Suite de tests E-commerce - SauceDemo', () => {

  test.beforeEach(async ({ page }) => {
    // Étape commune : se rendre sur le site avant chaque test
    await page.goto('https://www.saucedemo.com/');
  });

  test('TC01 - Parcours E2E : Achat complet avec utilisateur standard', async ({ page }) => {
    // 1. Authentification
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // Vérification : On est bien sur le catalogue
    await expect(page).toHaveURL(/.*inventory.html/);

    // 2. Ajout au panier
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    
    // 3. Accès au panier et Checkout
    await page.locator('.shopping_cart_link').click();
    await page.locator('[data-test="checkout"]').click();

    // 4. Formulaire de livraison
    await page.locator('[data-test="firstName"]').fill('Soraya');
    await page.locator('[data-test="lastName"]').fill('QA');
    await page.locator('[data-test="postalCode"]').fill('75000');
    await page.locator('[data-test="continue"]').click();

    // 5. Validation finale de la commande
    await page.locator('[data-test="finish"]').click();

    // Résultat attendu : Message de succès
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  });

  test('TC02 - Test Négatif : Connexion bloquée', async ({ page }) => {
    // Tentative de connexion avec le compte bloqué
    await page.locator('[data-test="username"]').fill('locked_out_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // Résultat attendu : Le message d'erreur spécifique apparaît
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Epic sadface: Sorry, this user has been locked out.');
  });

});