import DatePickerComponentPage from './page_objects/InputsComponentPage.js';
import MenuPage from './page_objects/MenuPage.js';
import '@percy/cypress';

const DatePickerPage = new DatePickerComponentPage();
const DSloginUrl = Cypress.env('DSloginUrl');
const Menu = new MenuPage();
const DSuser = Cypress.env('DSuser');
const DSpass = Cypress.env('DSpass');

describe('Visual Tests DatePicker Component', () => {
  before(() => {
    cy.viewport(1400, 700); //1 pixel less to 1024 resolution
    cy.visit(DSloginUrl, {
      auth: {
        username: DSuser,
        password: DSpass,
      },
    });
    cy.setCookie('username', DSuser);
    cy.setCookie('password', DSpass);

    Menu.elementSelect('InputDatePicker');
  });

  it('Validate Functionality DatePicker', () => {
    cy.fixture('/DesignSystem/datePicker.txt').then((data) => {
      Menu.fillDataPlayground(data, 0);
      DatePickerPage.inputDatePickerPlayground();
    });
  });

  it('Validate DatePicker Locale', () => {
    DatePickerPage.inputDatePickerLocale();
  });

  it('Validate DatePicker typing Date', () => {
    DatePickerPage.inputDatePickerType();
  });

  it('Validate DatePicker Parse Format', () => {
    DatePickerPage.inputDatePickerParseFormat();
  });

  it('Validate DatePicker Restrict Months', () => {
    DatePickerPage.inputDatePickerRestrict();
  });

  it('Validate DatePicker Disable', () => {
    cy.fixture('/DesignSystem/datePicker_disable.txt').then((data) => {
      Menu.fillDataPlayground(data, 0);
      DatePickerPage.inputDatePickerDisable();
    });
  });

  it('Validate DatePicker Select days', () => {
    cy.fixture('/DesignSystem/datePicker_Days.txt').then((data) => {
      Menu.fillDataPlayground(data, 0);
      DatePickerPage.inputDatePickerDays();
    });
  });

  it('Validate DatePicker Blur/Focus', () => {
    cy.fixture('/DesignSystem/datePicker_Blur_Focus.txt').then((data) => {
      Menu.fillDataPlayground(data, 0);
      DatePickerPage.inputDatePickerBlurFocus();
    });
  });
});
