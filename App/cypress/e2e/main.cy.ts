describe('La aplicación Funciona', () => {
    it('Visita la página principal y muestra el login', () => {
        cy.visit('/');
        cy.contains('button', 'Iniciar Sesión');
    });
});

// Define una función para iniciar sesión
function login(username: string, password: string) {
    cy.visit('/');
    cy.get('input[id="username"]').type(username);
    cy.get('input[type="password"]').type(password);
    cy.get('input[type="password"]').blur();
    cy.get('button[type="submit"]').click();
    cy.window().its('sessionStorage').invoke('getItem', 'user').should('exist');
}

describe('Se puede hacer login y logout', () => {
    it('Inicia sesión con un usuario válido', () => {
        login('dev', 'dev');
        cy.contains('button', 'Cerrar Sesión').click();
    });
});

describe('Hay un error al hacer login con un usuario inválido', () => {
    it('Inicia sesión con un usuario inválido', () => {
        cy.visit('/');
        cy.get('input[id="username"]').type('dev');
        cy.get('input[type="password"]').type('dev1');
        cy.get('input[type="password"]').blur();
        cy.get('button[type="submit"]').click();
        cy.contains('button', 'Iniciar Sesión').click();
        cy.contains('Usuario o contraseña incorrecta');
    });
});

describe('Crear un usuario y eliminarlo', () => {
    it('Crea un usuario', () => {
        login('dev', 'dev');
        cy.contains('a', 'Usuarios').click();
        cy.get('button').contains('Nuevo Usuario').click();
        // Llena el formulario
        cy.get('input[id="nombreCompleto"]').type('Test User');
        cy.get('input[id="alias"]').type('test');
        cy.get('input[id="correo"]').type('test@test.com');
        cy.get('input[type="password"]').type('test');
        cy.get('input[type="password"]').blur();
        // Seleccionar un rol de un dropdown de PrimeNG
        cy.get('p-dropdown').click();
        cy.get('li').contains('Developer').click();
        cy.contains('button', 'Agregar').click();
    });
});
