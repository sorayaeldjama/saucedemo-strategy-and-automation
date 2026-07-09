

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Authentification SauceDemo', () => {
    
    test('Connexion réussie avec un utilisateur standard', async ({ page }) => {
        // 1. Initialisation de la page
        const loginPage = new LoginPage(page);

        // 2. Actions (Arrange & Act)
        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');
        await page.pause();

        // 3. Assertions (Vérifications)
        // On vérifie que l'URL a bien changé
        await expect(page).toHaveURL(/.*inventory.html/);
        // On vérifie qu'un élément spécifique de la page connectée est visible
        const headerTitle = page.locator('.title');
        await expect(headerTitle).toHaveText('Products');
    });

});