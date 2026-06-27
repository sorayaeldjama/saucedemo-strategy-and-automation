import { Page, Locator } from '@playwright/test';


export class LoginPage{
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

   constructor(page: Page) {
    this.page = page;
    
    // 1. On "cible" les éléments de la page grâce à leur attribut data-test
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  // 2. Action : Se rendre sur le site
  async navigate() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  // 3. Action : Remplir le formulaire et cliquer sur Login
  // Note : par défaut, on met le mot de passe 'secret_sauce' pour gagner du temps
  async login(username: string, password: string = 'secret_sauce') {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}