/// <reference types="cypress" />

class InputsComponentPage {
  constructor() {
    //Inputs Component
    this.inputTextField = 'input[id=username]';
    this.inputMaxlen = 'input[id=username-maxLength]';
    this.inputPreview = 'div[data-testid="live-preview"]';
    this.inputIcons = 'div[data-testid="live-preview"] div[role="img"]';
  }

  inputPlayground() {
    cy.get(this.inputTextField)
      .eq(0)
      .should('have.attr', 'placeholder', 'John Doe')
      .should('have.attr', 'required');
    cy.get(this.inputTextField)
      .eq(0)
      .realHover()
      .focus()
      .should('have.css', 'border-color', 'rgb(122, 111, 240)');
    cy.get(this.inputTextField).eq(0).type('Ricardo Rodríguez');
    cy.get(this.inputPreview).eq(0).should('contain', 'Ricardo Rodríguez');
  }

  inputStatusPlayground() {
    cy.get('input[id="username-normal"]')
      .should('have.attr', 'placeholder', 'Escribe tu nombre')
      .should('have.attr', 'disabled');
    cy.get('input[id="username-help"]')
      .should('have.attr', 'placeholder', 'Apellido Paterno')
      .should('not.be.disabled')
      .type('García');
    cy.get(this.inputPreview).eq(1).should('contain', 'Help message');
    cy.get('input[id="username-success"]')
      .should('have.attr', 'placeholder', 'Apellido Materno')
      .should('not.be.disabled')
      .type('Hernandez');
    cy.get(this.inputPreview).eq(1).should('contain', 'Validacion correcta');
    cy.get(this.inputIcons).eq(0).should('have.attr', 'title', 'SmallAccepted');
    cy.get('input[id="username-warning"]')
      .should('have.attr', 'placeholder', 'Nombres')
      .should('not.be.disabled')
      .type('Roberto');
    cy.get(this.inputPreview)
      .eq(1)
      .should('contain', 'Te falto un campo no requerido');
    cy.get(this.inputIcons).eq(1).should('have.attr', 'title', 'SmallWarning');
    cy.get('input[id="username-error"]')
      .should('have.attr', 'placeholder', 'Sexo')
      .should('not.be.disabled')
      .type('Masculino');
    cy.get(this.inputPreview).eq(1).should('contain', 'Sexo');
    cy.get(this.inputIcons).eq(2).should('have.attr', 'title', 'SmallError');
  }

  inputMaxLengthPlayground() {
    cy.get(this.inputMaxlen).clear().type('Esto es una prueba de lo');
    cy.get('span[role="alert"]').should('contain', '24/30');
    cy.get(this.inputMaxlen).type('ngitud');
    cy.get('span[role="alert"]').should('contain', '30/30');
  }

  inputFocusBlurPlayground() {
    cy.get(this.inputTextField).eq(1).type('A');
    cy.get(this.inputPreview).eq(2).should('contain', '1').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('hola');
    });
    cy.get(this.inputPreview).eq(2);
    cy.get(this.inputTextField).eq(1).click();
    cy.get(this.inputPreview).eq(2).should('contain', '2');
    cy.on('window:alert', (str) => {
      expect(str).to.equal('hola');
    });
  }

  inputSearchPlayground() {
    cy.get(this.inputTextField)
      .should('have.attr', 'placeholder', 'Buscar empleado...')
      .should('have.attr', 'required');
    cy.get(this.inputTextField)
      .type('RICARDO RODRIGUEZ GARDUÑO')
      .should('value', 'RICARDO RODRIGUEZ GARDUÑO');
    cy.get(this.inputTextField).clear().type('A');
    cy.get('button div[title="Close"]').should('be.visible').click();
    cy.get(this.inputTextField).should(
      'have.attr',
      'placeholder',
      'Buscar empleado...',
    );
  }

  inputSearchFocusBlurPlayground() {
    cy.get(this.inputTextField).type('A');
    cy.get(this.inputPreview).should('contain', '1').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('onBlur');
    });
    cy.get(this.inputPreview);
    cy.get(this.inputTextField).click();
    cy.get(this.inputPreview).should('contain', '2');
    cy.on('window:alert', (str) => {
      expect(str).to.equal('onBlur');
    });
  }

  inputSearchDisabledPlayground() {
    cy.get(this.inputTextField)
      .should('have.attr', 'placeholder', 'Buscar empleado...')
      .should('have.attr', 'disabled');
  }

  inputDatePickerPlayground() {
    cy.get('label[for="sample-date_1"]').should(
      'contain',
      'Fecha Inicial Nomina:',
    );
    cy.get('label[for="sample-date_1"] div') //icon hint
      .realHover()
      .should('have.css', 'color', 'rgb(53, 44, 96)')
      .realHover();
    cy.get('input[name="dataPicker"]')
      .should('have.attr', 'placeholder', 'DD / MM / AAAA')
      .click();

    cy.get('div[class="DayPicker-Body"] div[class="DayPicker-Day"]') //calendar
      .each(($e1, index, $list) => {
        var dateName = $e1.text();
        if (dateName == '14') {
          cy.log(index, $list.text(), $e1.text());
          cy.wrap($e1).click({ force: true });
        }
      });
    cy.get('input[id="sample-date_1"]').should('value', '14/08/2021');
    cy.get('div[class="DayPickerInput"] div[title="Calendar"]').should(
      'have.attr',
      'title',
      'Calendar',
    );
  }

  inputDatePickerLocale() {
    cy.get('input[id="sample-date-en"]')
      .eq(0)
      .should('have.attr', 'placeholder', 'MM/DD/AAAA')
      .click();
    cy.get('div[class="DayPicker"]').should('have.attr', 'lang', 'en-us');
    cy.get('input[id="sample-date-en"]').eq(0).type('08/14/2021');
    cy.get('div[class="DayPickerInput-Overlay"] div[class="DayPicker-Day"]') //calendar
      .each(($e1, index, $list) => {
        var dateName = $e1.text();
        if (dateName == '14') {
          cy.wrap($e1).click({ force: true });
          cy.log(index, $list.text(), $e1.text());
        }
      });
    cy.get('input[id="sample-date-en"]').eq(0).should('value', '08/14/2021');
  }

  inputDatePickerType() {
    cy.get('input[id="sample-date-en"]').eq(0).clear().type('03/08/2021');
    cy.get('div[data-testid="playground"]').eq(1).click();
    cy.get('input[id="sample-date-en"]').eq(0).click();
    cy.get(
      'div[class="DayPickerInput-Overlay"] div[class="DayPicker-NavBar"]',
    ).should('contain', 'Mar 2021');
    cy.get(
      'div[class="DayPickerInput-Overlay"] div[class="DayPicker-Week"] div[class="DayPicker-Day DayPicker-Day--selected"]',
    )
      .should('contain', '8')
      .should('have.css', 'background-color', 'rgb(53, 44, 96)')
      .realHover()
      .should('have.css', 'background-color', 'rgb(175, 169, 246)')
      .click();

    cy.get('input[id="sample-date-en"]')
      .eq(0)
      .should('have.css', 'color', 'rgb(53, 44, 96)')
      .click();
    cy.get(
      'div[class="DayPickerInput-Overlay"] div[class="DayPicker-Week"] div[class="DayPicker-Day"][aria-label="Wed Mar 10 2021"]',
    )
      .should('contain', '10')
      .realHover()
      .should('have.css', 'background-color', 'rgb(219, 222, 224)');
  }

  inputDatePickerParseFormat() {
    cy.get('input[id="sample-date-en"]')
      .eq(1)
      .should('have.attr', 'placeholder', '1 ene 2021')
      .click();
    cy.get('div[class="DayPicker"]').should('have.attr', 'lang', 'es-mx');
    cy.get('input[id="sample-date-en"]').eq(1).clear().type('1 ago 2021');
    cy.get('div[class="DayPickerInput-Overlay"] div[class="DayPicker-Day"]') //calendar
      .each(($e1, index, $list) => {
        var dateName = $e1.text();
        if (dateName == '1') {
          cy.wrap($e1).click({ force: true });
          cy.log(index, $list.text(), $e1.text());
        }
      });
    cy.get('input[id="sample-date-en"]').eq(1).should('value', '1 ago 2021');
  }

  inputDatePickerRestrict() {
    cy.get('input[id="sample-date"').click();
    cy.get(
      'div[class="DayPickerInput-Overlay"] div[class="DayPicker-NavBar"]',
    ).should('contain', 'sep 2021');
    cy.get('div[class="DayPickerInput-Overlay"] div[title="ChevronRight"]')
      .click()
      .click();
    cy.get(
      'div[class="DayPickerInput-Overlay"] div[class="DayPicker-NavBar"]',
    ).should('contain', 'nov 2021');
  }

  inputDatePickerDisable() {
    cy.get('label[for="sample-date"]').should(
      'contain',
      'Fecha Inicial Nomina:',
    );
    cy.get('input[name="dataPicker"]').should('be.disabled');
  }

  inputDatePickerDays() {
    cy.get('input[name="date"]')
      .should('have.attr', 'placeholder', 'DD / MM / AAAA')
      .click();
    cy.get(
      'div[class="DayPickerInput-Overlay"] div[class="DayPicker-Day DayPicker-Day--disabled"]',
    ) //calendar
      .each(($e1, index, $list) => {
        var dateName = $e1.text();
        if (dateName > '15') {
          cy.log(index, $list.text(), $e1.text());
          cy.get(
            'div[class="DayPickerInput-Overlay"] div[class="DayPicker-Day DayPicker-Day--disabled"]',
          ).should('have.attr', 'aria-selected', 'false');
        }
      });
  }

  inputDatePickerBlurFocus() {
    cy.get('input[name="dataPicker"]')
      .should('have.attr', 'placeholder', 'DD / MM / AAAA')
      .click();
    cy.get('div[class="DayPickerInput-Overlay"] div[class="DayPicker-Day"]') //calendar
      .each(($e1, index, $list) => {
        var dateName = $e1.text();
        if (dateName == '14') {
          cy.wrap($e1).click();
          cy.log(index, $list.text(), $e1.text());
        }
      });
    cy.on('window:alert', (str) => {
      expect(str).to.equal('hola');
    });
    cy.on('window:alert', (str) => {
      expect(str).to.equal('hola');
    });
    cy.get('h2[id="playground"]').click();
  }

  inputSelect() {
    cy.get('input[id="employee"]').should(
      'have.attr',
      'placeholder',
      'Select an option',
    );
    cy.get('div[title="ChevronDown"]')
      .eq(0)
      .should('have.attr', 'color', '#352C60');
    cy.get('div[role="combobox"] input[id="employee"]').should(
      'have.css',
      'border-color',
      'rgb(53, 44, 96)',
    );
    cy.get('div[role="combobox"] input[id="employee"]').click();
    cy.get('li[role="option"]').contains('David').click();

    cy.get('button[type="button"]').eq(0).click();
    cy.get('li[role="option"]')
      .eq(0)
      .should('have.css', 'background-color', 'rgb(234, 234, 252)')
      .should('have.css', 'color', 'rgb(53, 44, 96)');
    cy.get('div[title="ChevronUp"]')
      .eq(0)
      .should('have.attr', 'color', '#7A6FF0');
    cy.get('div[role="combobox"] input[id="employee"]').clear();
    cy.get('button[type="button"]').eq(0).click();
    cy.get('div[title="ChevronDown"]')
      .eq(0)
      .should('have.attr', 'color', '#352C60');
  }

  inputSelectwithSubtitles() {

    cy.get('div[role="combobox"] input[id="employee-subtitle"]').click();
    cy.get('div[role="combobox"] input[id="employee-subtitle"]').should(
      'have.css',
      'border-color',
      'rgb(53, 44, 96)',
    );
    cy.get('li[role="option"] div').contains('lorem ipsum dolor sit amet lorem ipsum dolor sit lorem ipsum dolor sit amet lorem ipsum dolor sit')
      .click();
    
    cy.get('div[title="ChevronDown"]').eq(1).click();
    cy.get('li[role="option"]').eq(1)
      .should('have.css', 'background-color', 'rgb(234, 234, 252)')
      .should('have.css', 'color', 'rgb(53, 44, 96)');
    cy.get('li[role="option"]').eq(0)
      .should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
      .should('have.css', 'color', 'rgb(53, 44, 96)');

  }

  inputSelectwithSpinner(){
    cy.get('div[role="combobox"] div span svg g').should('be.visible');
    cy.get('div[role="combobox"] div span svg g path').eq(1).should('have.attr','fill','#7A6FF0');
    cy.get('div[role="combobox"] div span svg g path').eq(2).should('have.attr','fill','#7A6FF0');
  }

  inputSelectwithStatus(){
    cy.get('input[id="employee-success"]')
    .focus()
    .should('have.css', 'border-color', 'rgb(53, 44, 96)') //color purple dark
    .focus().blur();
    
    cy.get('div[data-testid="live-preview"] div div div').eq(19)
    .should('have.css', 'border-color', 'rgb(0, 174, 66)') //color green
    .click();

    cy.get('div[data-testid="live-preview"] div div div').eq(26)
    .should('have.css', 'border-color', 'rgb(246, 166, 35)') //color orange
    .click();
    cy.get('div[data-testid="live-preview"] div div div').eq(33)
    .should('have.css', 'border-top-color', 'rgb(247, 95, 95)') //color red
    .click();
  }

  inputSelectDisabled() {
    cy.get('input[id="employee"]').should(
      'have.attr',
      'placeholder',
      'Select an option',
    ).should('be.disabled');
  }

  inputSelectFocusBlur()
  {
    cy.get('div[role="combobox"] input[id="employee"]').click();
    cy.get('li[role="option"]').contains('David').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Select Component');
    });
  }
}
export default InputsComponentPage;
