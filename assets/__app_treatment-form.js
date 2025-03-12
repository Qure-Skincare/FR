// Micro-Infusion Landing Page Purchase Process
const newMicroInfusionLandingPagePurchaseProcess = document.querySelector('#new-landing-purchase')
if (newMicroInfusionLandingPagePurchaseProcess) {
  class microInfusionPurchaseLandingPage {
    /**
     * Creates an instance of PurchaseLandingPage.
     * @param {string} formId - The ID of the form element associated with the purchase landing page.
     */
    constructor(formId) {
      this.form = document.getElementById(formId);
      this.panels = document.querySelectorAll('.landing-panel');
      this.btnBack = document.getElementById('landing-back');
      this.btnNext = document.getElementById('landing-next');
      this.bntTest = document.getElementById('landing-test');
      this.btnSubmitPanel = document.getElementById('landing-submit');
      this.btnSumbitText = document.getElementById('landing-submit-text');
      this.breadCrumbsItems = document.querySelectorAll('.landing-breadcrumbs-item');
      this.breadCrumbsButtons = document.querySelectorAll('.landing-breadcrumbs-item__btn');
      this.mobileCardContainer = document.getElementById('landing-purchase-mobile');
      this.selectedInputValue = null;
      this.selectedInputValueJson = null;
      this.selectedInputValueStep4 = null;
      this.selectedInputValueJsonStep4 = null;
      this.selectedInputStep2Title = null;
      this.selectedInputStep3Title = null;
      this.indexPanel = 0;
      // Initialize the landing page
      this.initializeLandingPage();

      // Event listeners
      this.initializeEventListeners();
    }

    /**
    * Initializes the landing page by hiding panels, showing the current panel, and updating necessary elements.
    */
    initializeLandingPage() {
      this.hidePanels();
      this.showActualPanel(this.indexPanel);
      this.updateVisibilityFirstStep();
      this.updateSelectedInputValueJson();
      this.renderElementsStep3();
      this.updateSelectedInputValueStep4();
      this.updateSelectedInputValueJsonStep4();
      this.updateVisibilityAndValueFourthStep();
      this.updateButtons();
      this.updateVisibilityBreadcrumb();
      this.renderElementMobileStep1();
      this.updateSubmitTextBtn();
      this.fillBreadCrumbs();
    }

    /**
     * Initializes event listeners for various user interactions.
     */

    initializeEventListeners() {
      const firstStep2RadioButton = document.querySelector('#step2-select input[type="radio"]:checked');
      if (firstStep2RadioButton) {
        this.selectedInputStep2Title = firstStep2RadioButton.dataset.title;
      }

      const radioButtonsStep2 = document.querySelectorAll('#step2-select input[type="radio"]');
      radioButtonsStep2.forEach(button => {
        button.addEventListener('change', this.handleStep2RadioButtonChange.bind(this));
      });

      const radioButtonsStep1 = document.querySelectorAll('.inputs-products1 input[type="radio"], .inputs-products2 input[type="radio"], .inputs-products3 input[type="radio"]');
      radioButtonsStep1.forEach(button => {
        button.addEventListener('change', this.handleStep1RadioButtonChange.bind(this));
      });

      const firstStep3RadioButton = document.querySelector('#inputs-landing-step3 input[type="radio"]:checked');
      if (firstStep3RadioButton) {
        this.selectedInputStep3Title = firstStep3RadioButton.value;
      }

      const radioButtonsStep3 = document.querySelectorAll('#inputs-landing-step3 input[type="radio"]');
      radioButtonsStep3.forEach(button => {
        button.addEventListener('change', this.handleStep3RadioButtonChange.bind(this));
      });

      const radioButtonsStep4 = document.querySelectorAll('.inputs-products4 input[type="radio"], .inputs-products5 input[type="radio"], .inputs-products6 input[type="radio"]');
      radioButtonsStep4.forEach(button => {
        button.addEventListener('change', this.handleStep4RadioButtonChange.bind(this));
      });

      // Buttons event listeners
      this.btnNext.addEventListener('click', this.handleNextButtonClick.bind(this));
      this.btnBack.addEventListener('click', this.handleBackButtonClick.bind(this));

      this.breadCrumbsButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
          this.handleBreadcrumbButtonClick(index);
        });
      });

      // Submit panel button event listener
      this.btnSubmitPanel.addEventListener('click', this.updateAnchorValue.bind(this));
    }

    // Event handler methods

    /**
     * Handles radio button changes in step 2.
     * @param {Event} event - The change event object.
     */
    handleStep2RadioButtonChange(event) {
      const button = event.target;
      const title = button.dataset.title;
      this.selectedInputStep2Title = title;
      this.updateVisibilityFirstStep();
      this.updateSelectedInputValueJson();
      this.updateSelectedInputValueStep4();
      this.updateSelectedInputValueJsonStep4();
      this.updateVisibilityAndValueFourthStep();
      this.renderElementsStep3();
      this.renderElementMobileStep1();
      this.updateSubmitTextBtn();
    }

    /**
   * Handles radio button changes in step 1.
   * @param {Event} event - The change event object.
   */
    handleStep1RadioButtonChange(event) {
      const button = event.target;
      this.syncRadioButtons(button.dataset.identifier);
      this.updateSelectedInputValue();
      this.renderElementsStep3();
      this.updateSelectedInputValueJson();
      this.updateVisibilityBreadcrumb();
      this.fillBreadCrumbs();
      this.renderElementMobileStep1();
      this.updateSubmitTextBtn();
    }
    /**
   * Handles radio button changes in step 3.
   * @param {Event} event - The change event object.
   */
    handleStep3RadioButtonChange(event) {
      const button = event.target;
      this.selectedInputStep3Title = button.value;
    }

    /**
    * Handles radio button changes in step 4.
    * @param {Event} event - The change event object.
    */
    handleStep4RadioButtonChange(event) {
      const button = event.target;
      this.syncRadioButtonsStep4(button.dataset.identifier);
      this.updateSelectedInputValueStep4();
      this.updateSelectedInputValueJsonStep4();
      this.updateVisibilityAndValueFourthStep();
    }

    /**
    * Handles click events on the "Next" button.
    */

    handleNextButtonClick() {
      this.nextPanel();
      this.fillBreadCrumbs();
      this.updateBreadcrumbContent('addText');
    }

    /**
   * Handles click events on the "Back" button.
   */
    handleBackButtonClick() {
      this.backPanel();
      this.fillBreadCrumbs();
      this.updateBreadcrumbContent('removeText');
    }

    handleBreadcrumbButtonClick(index) {
      this.showPanelBread(index);
      this.updateBreadcrumbContent('removeText');
    }

    /**
     * Handles click events on breadcrumb buttons.
     * @param {number} index - The index of the clicked breadcrumb button.
     */

    // functions
    /**
     * Hides all panels.
     */
    hidePanels() {
      // Iterate through each panel and add the panel-hidden class to hide it
      this.panels.forEach(panel => {
        panel.classList.add('panel-hidden');
      });
    }

    /**
    * Shows the panel at the specified index.
    * @param {number} index - The index of the panel to show.
    */
    showActualPanel(index) {
      // Remove the panel-hidden class from the panel at the specified index to show it
      this.panels[index].classList.remove('panel-hidden');
    }

    /**
    * Hides the panel at the specified index.
    * @param {number} index - The index of the panel to hide.
    */
    hidePanel(index) {
      // Add the panel-hidden class to the panel at the specified index to hide it
      this.panels[index].classList.add('panel-hidden');
    }

    /**
     * Moves to the next panel if available.
     */
    nextPanel() {
      // Check if there is a next panel
      if (this.indexPanel < this.panels.length - 1) {
        // Remove the active breadcrumb class from the current panel
        this.breadCrumbsItems[this.indexPanel].classList.remove('active-breadcrumb');
        // Hide the current panel
        this.hidePanel(this.indexPanel);
        // Increment the indexPanel to move to the next panel
        this.indexPanel++;
        // Show the next panel
        this.showActualPanel(this.indexPanel);
        // Update the visibility of navigation buttons
        this.updateButtons();
        // Enable breadcrumb button for the next panel
        this.breadCrumbsButtons[this.indexPanel].removeAttribute('disabled');
        // Add the active breadcrumb class to the next panel
        this.breadCrumbsItems[this.indexPanel].classList.add('active-breadcrumb');
      }
    }

    /**
     * Shows the panel corresponding to the given index in the breadcrumbs.
     * @param {number} index - The index of the panel to be shown.
     */
    showPanelBread(index) {
      // Check if the index is within valid bounds
      if (index >= 0 && index < this.panels.length) {
        // Remove the active breadcrumb class from the current panel
        this.breadCrumbsItems[this.indexPanel].classList.remove('active-breadcrumb');
        // Hide all panels
        this.hidePanels();
        // Show the panel corresponding to the given index
        this.showActualPanel(index);
        // Disable breadcrumbs after the selected panel
        this.breadCrumbsButtons.forEach((button, i) => {
          if (i > index) {
            button.setAttribute('disabled', 'disabled');
          } else {
            button.removeAttribute('disabled');
          }
        });
        // Add the active breadcrumb class to the selected panel
        this.breadCrumbsItems[index].classList.add('active-breadcrumb');
        // Fill breadcrumbs based on the selected panel
        this.fillBreadCrumbs();
        // Update the indexPanel to the selected index
        this.indexPanel = index;
        // Update the visibility of navigation buttons
        this.updateButtons();
      }
    }

    /**
     * Updates the visibility of navigation buttons based on the current panel and selected input value position.
     */
    updateButtons() {
      // Check if the current panel is the first panel
      if (this.indexPanel === 0) {
        // If so, hide the back button
        this.btnBack.classList.add('hidden');
      } else {
        // Otherwise, show the back button
        this.btnBack.classList.remove('hidden');
      }

      // Check the position of the selected input value
      if (this.selectedInputValueJson.position === 1) {
        // If the selected input value is in position 1
        if (this.indexPanel === this.panels.length - 1) {
          // If the current panel is the last panel, hide the next button and show the submit button
          this.btnNext.classList.add('hidden');
          this.btnSubmitPanel.classList.add('show-lading-button');
        } else {
          // Otherwise, show the next button and hide the submit button
          this.btnNext.classList.remove('hidden');
          this.btnSubmitPanel.classList.remove('show-lading-button');
        }
      } else if (this.selectedInputValueJson.position !== 1) {
        // If the selected input value is not in position 1
        if (this.indexPanel === this.panels.length - 2) {
          // If the current panel is the second to last panel, hide the next button and show the submit button
          this.btnNext.classList.add('hidden');
          this.btnSubmitPanel.classList.add('show-lading-button');
        } else {
          // Otherwise, show the next button and hide the submit button
          this.btnNext.classList.remove('hidden');
          this.btnSubmitPanel.classList.remove('show-lading-button');
        }
      }
    }


    /**
     * Navigates to the previous panel and updates the breadcrumb accordingly.
     */
    backPanel() {
      // Remove active class from the current breadcrumb item
      this.breadCrumbsItems[this.indexPanel].classList.remove('active-breadcrumb');

      // Disable the button associated with the current panel
      this.breadCrumbsButtons[this.indexPanel].setAttribute('disabled', 'disabled');

      // Hide the current panel
      this.hidePanel(this.indexPanel);

      // Decrement the panel index
      this.indexPanel--;

      // If the index becomes less than 0, set it to the index of the last panel
      if (this.indexPanel < 0) {
        this.indexPanel = this.panels.length - 1;
      }

      // Show the previous panel
      this.showActualPanel(this.indexPanel);

      // Update button visibility based on the new panel
      this.updateButtons();

      // Add active class to the breadcrumb item of the new current panel
      this.breadCrumbsItems[this.indexPanel].classList.add('active-breadcrumb');
    }


    /**
     * Synchronizes the radio buttons in steps 1, based on the provided value.
     * @param {string} value - The identifier value to synchronize the radio buttons with.
     */
    syncRadioButtons(value) {
      // Select all radio buttons in steps 1
      const allInputs = document.querySelectorAll('.inputs-products1 input[type="radio"], .inputs-products2 input[type="radio"], .inputs-products3 input[type="radio"]');
      // Iterate over each radio button
      allInputs.forEach(input => {
        // Check if the dataset identifier matches the provided value
        if (input.dataset.identifier === value) {
          // Set the radio button as checked
          input.checked = true;
        }
      });
    }

    /**
    * Synchronizes the radio buttons in step 4 based on the provided value.
    * @param {string} value - The identifier value to synchronize the radio buttons with.
    */
    syncRadioButtonsStep4(value) {
      // Select all radio buttons in step 4
      const allInputsStep4 = document.querySelectorAll('.inputs-products4 input[type="radio"], .inputs-products5 input[type="radio"], .inputs-products6 input[type="radio"]');
      // Iterate over each radio button
      allInputsStep4.forEach(input => {
        // Check if the dataset identifier matches the provided value
        if (input.dataset.identifier === value) {
          // Set the radio button as checked
          input.checked = true;
        }
      });
    }


    /**
   * Updates the JSON representation of the selected input value for steps 1
   */
    updateSelectedInputValueJson() {
      if (this.selectedInputValue) {
        try {
          // Parse the selected input value JSON string and assign it to selectedInputValueJson
          this.selectedInputValueJson = JSON.parse(this.selectedInputValue);
        } catch (error) {
          // Log any errors that occur during JSON parsing
          console.error('Error parsing JSON:', error);
          // Set selectedInputValueJson to null if parsing fails
          this.selectedInputValueJson = null;
        }
      } else {
        // Set selectedInputValueJson to null if no selected input value is available
        this.selectedInputValueJson = null;
      }
    }

    /**
    * Updates the JSON representation of the selected input value for step 4.
    */
    updateSelectedInputValueJsonStep4() {
      if (this.selectedInputValueStep4) {
        try {
          // Parse the selected input value JSON string for step 4 and assign it to selectedInputValueJsonStep4
          this.selectedInputValueJsonStep4 = JSON.parse(this.selectedInputValueStep4);
        } catch (error) {
          // Log any errors that occur during JSON parsing
          console.error('Error parsing JSON:', error);
          // Set selectedInputValueJsonStep4 to null if parsing fails
          this.selectedInputValueJsonStep4 = null;
        }
      }
    }

    /**
     * Updates the selected value for the first step based on the currently checked radio button
     * in the inputs of steps 1, products 1, 2, or 3
     */
    updateSelectedInputValue() {
      // Get the currently checked radio button from inputs of steps 1, products 1, 2, or 3
      const selectedRadioButton = document.querySelector('.inputs-products1 input[type="radio"]:checked, .inputs-products2 input[type="radio"]:checked, .inputs-products3 input[type="radio"]:checked');

      // Set the selected value for the first step based on the checked radio button
      this.selectedInputValue = selectedRadioButton ? selectedRadioButton.value : null;

      // Update the JSON representation of the selected input value
      this.updateSelectedInputValueJson();
    }

    /**
    * Updates the selected value for the fourth step based on the currently checked radio button
    * in the inputs of steps 4. products 4, 5, or 6
    */
    updateSelectedInputValueStep4() {
      // Get the currently checked radio button from inputs of steps 4. products 4, 5, or 6
      const selectedRadioButtonStep4 = document.querySelector('.inputs-products4 input[type="radio"]:checked, .inputs-products5 input[type="radio"]:checked, .inputs-products6 input[type="radio"]:checked');

      // Set the selected value for the fourth step based on the checked radio button
      this.selectedInputValueStep4 = selectedRadioButtonStep4 ? selectedRadioButtonStep4.value : null;
    }

    /**
    * Updates the visibility and selected value for the first step based on the selected option from the second step.
    */
    updateVisibilityFirstStep() {
      // Get the selected option from the second step
      const secondRadioButtons = document.querySelector('#step2-select input[name="step2"]:checked');
      const selectOption = secondRadioButtons.value;

      // Hide all first step inputs
      const allInputs = document.querySelectorAll('.inputs-products1, .inputs-products2, .inputs-products3');
      allInputs.forEach(input => {
        input.classList.remove('show-inputs');
      });

      // Show selected first step inputs based on the selected option from step 2
      const selectedInputs = document.querySelector(`#inputs-${selectOption}`);
      selectedInputs.classList.add('show-inputs');

      // Get the selected value from the shown first step inputs
      const selectedRadioButton = selectedInputs.querySelector('input[type="radio"]:checked');
      this.selectedInputValue = selectedRadioButton ? selectedRadioButton.value : null;

      // Update the JSON representation of the selected value for the first step
      this.updateSelectedInputValueJson();
    }

    /**
    * Updates the visibility and selected value for the fourth step based on the selected option from the second step.
    */
    updateVisibilityAndValueFourthStep() {
      // Get the selected option from the second step
      const secondRadioButtons = document.querySelector('#step2-select input[name="step2"]:checked');
      const selectOption = secondRadioButtons ? secondRadioButtons.dataset.step4Product : null;

      // Hide all step 4 inputs
      const allStep4Inputs = document.querySelectorAll('.inputs-products4, .inputs-products5, .inputs-products6');
      allStep4Inputs.forEach(input => {
        input.classList.remove('show-inputs');
      });

      // Show selected step 4 inputs based on the selected option from step 2
      const selectedInputsStep4 = document.querySelector(`#inputs-${selectOption}`);
      selectedInputsStep4.classList.add('show-inputs');

      // Get the selected value from the shown step 4 inputs
      const selectedRadioButtonStep4 = selectedInputsStep4.querySelector('input[type="radio"]:checked');
      this.selectedInputValueStep4 = selectedRadioButtonStep4 ? selectedRadioButtonStep4.value : null;

      // Update the JSON representation of the selected value for step 4
      this.updateSelectedInputValueJsonStep4();
    }

    /**
   * Renders the elements for Step 3 based on the selected input value.
   */
    renderElementsStep3() {
      // Select elements related to Step 3
      const step3PriceNormal = document.getElementById('step3-price-normal');
      const step3PriceQuota = document.getElementById('step3-price-quota');

      // Check if both price elements exist
      if (step3PriceNormal && step3PriceQuota) {
        // Check if the price is 0
        if (Number(this.selectedInputValueJson.price) == 0) {
          // If price is 0, render discount price only
          step3PriceNormal.innerHTML = `
            <span class='step3-card-price-discount'>${this.selectedInputValueJson.discountPrice}</span>
        `;
        } else {
          // If price is not 0, render full price and discount price
          step3PriceNormal.innerHTML = `
            <span class='step3-card-price-full'>${this.selectedInputValueJson.price}</span>
            <span class='step3-card-price-discount'>${this.selectedInputValueJson.discountPrice}</span>
        `;
        }

        // Render price quota
        step3PriceQuota.innerHTML = `
        <span class='step3-card-price-quota'>
            ${this.selectedInputValueJson.discountPriceQuota}
        </span>
        `;
      }
    }


    /**
   * Updates the visibility of breadcrumb elements based on the selected input value.
   */
    updateVisibilityBreadcrumb() {
      // Select breadcrumb elements
      const breadCrumbWrapper = document.querySelector('.landing-breadcrumbs-wrapper');
      const breadCrumb4 = document.querySelector('.breadStep-4');
      const breadCrumb3 = document.querySelector('.breadStep-3');

      // Check if the selected input value position is not equal to 1
      if (this.selectedInputValueJson.position !== 1) {
        // If position is not 1, hide breadcrumb 4
        breadCrumbWrapper.setAttribute('data-hide-breadcrumb4', 'true');
        breadCrumb4.classList.add('hide-breadcrumbs');
        breadCrumb3.classList.add('breadcrumb-arrow-shape-end-cricle');
      } else {
        // If position is 1, show breadcrumb 4
        breadCrumbWrapper.removeAttribute('data-hide-breadcrumb4');
        breadCrumb4.classList.remove('hide-breadcrumbs');
        breadCrumb3.classList.remove('breadcrumb-arrow-shape-end-cricle');
      }
    }

    /**
   * Fills the breadcrumbs with appropriate classes based on the active breadcrumb index and visibility of breadcrumb 4.
   */
    fillBreadCrumbs() {
      // Find the index of the active breadcrumb
      const activeBreadcrumbIndex = Array.from(document.querySelectorAll('.landing-breadcrumbs-item')).findIndex(item => item.classList.contains('active-breadcrumb'));

      // Select breadcrumb wrapper and check if breadcrumb 4 should be hidden
      const breadCrumbWrapper = document.querySelector('.landing-breadcrumbs-wrapper');
      const hideBreadcrumb4 = breadCrumbWrapper.getAttribute('data-hide-breadcrumb4') === 'true';

      // Select all breadcrumb items
      const breadCrumbs = document.querySelectorAll('.landing-breadcrumbs-item');
      breadCrumbs.forEach((breadCrumb, index) => {
        // Remove all active classes from breadcrumb items
        breadCrumb.classList.remove('active-start-circle', 'active-arrow', 'active-end-circle');

        // Add appropriate active class based on the active breadcrumb index
        if (index === activeBreadcrumbIndex) {
          if (index === 0) {
            breadCrumb.classList.add('active-start-circle');
          } else if (index === breadCrumbs.length - 1 && !hideBreadcrumb4) {
            breadCrumb.classList.add('active-end-circle');
          } else if (index === breadCrumbs.length - 2 && hideBreadcrumb4) {
            breadCrumb.classList.add('active-end-circle');
          } else {
            breadCrumb.classList.add('active-arrow');
          }
        }

        // Hide breadcrumb 4 if necessary
        if (index === breadCrumbs.length - 1 && hideBreadcrumb4) {
          breadCrumb.classList.add('hide-breadcrumbs');
        } else {
          breadCrumb.classList.remove('hide-breadcrumbs');
        }
      });
    }

    /**
    * Updates the content of breadcrumb items based on the specified action.
    * @param {string} action - The action to perform. Possible values are 'addText' or 'removeText'.
    */
    updateBreadcrumbContent(action) {
      // Select all breadcrumb items
      const breadcrumbItems = document.querySelectorAll('.landing-breadcrumbs-item');

      // Switch based on the action
      switch (action) {
        case 'addText':
          // For each breadcrumb item, update the text content based on index
          breadcrumbItems.forEach((item, index) => {
            // Select the button and text elements within the breadcrumb item
            const button = item.querySelector('.landing-breadcrumbs-item__btn');
            const buttonTextSelect = button ? button.querySelector('.landing-breadcrumbs-item__text--select' + (index + 1)) : null;

            // Check if the item is not active and the button is not disabled
            if (!item.classList.contains('active-breadcrumb') && !button.hasAttribute('disabled')) {
              // Update text content based on index
              if (index === 0) {
                buttonTextSelect.textContent = `${this.selectedInputValueJson.titleBundle}`;
              } else if (index === 1) {
                buttonTextSelect.textContent = `${this.selectedInputStep2Title}`;
              } else if (index === 2) {
                buttonTextSelect.textContent = `${this.selectedInputStep3Title}`;
              }

              // Set attribute and add classes to the elements
              buttonTextSelect.setAttribute('data-bc-title', 'true');
              buttonTextSelect.previousElementSibling.classList.add('no-show-text-mobile');
              buttonTextSelect.parentNode.parentNode.classList.add('breadcrumb-was-active');
            }
          });
          break;
        case 'removeText':
          // For each breadcrumb item, remove text content and attributes if necessary
          breadcrumbItems.forEach((item, index) => {
            // Select the button and text elements within the breadcrumb item
            const button = item.querySelector('.landing-breadcrumbs-item__btn');
            const buttonTextSelect = button ? button.querySelector('.landing-breadcrumbs-item__text--select' + (index + 1)) : null;

            // Check if the button and text elements exist
            if (button && buttonTextSelect) {
              // If the button is disabled, remove text content and attributes
              if (button.hasAttribute('disabled')) {
                buttonTextSelect.textContent = "";
                buttonTextSelect.removeAttribute('data-bc-title');
                buttonTextSelect.previousElementSibling.classList.remove('no-show-text-mobile');
                buttonTextSelect.parentNode.parentNode.classList.remove('breadcrumb-was-active');
              }
              // If the text has data-bc-title attribute and item is active, remove text content and attributes
              if (buttonTextSelect.getAttribute('data-bc-title') === 'true' && item.classList.contains('active-breadcrumb')) {
                buttonTextSelect.textContent = "";
                buttonTextSelect.removeAttribute('data-bc-title');
                buttonTextSelect.previousElementSibling.classList.remove('no-show-text-mobile');
                buttonTextSelect.parentNode.parentNode.classList.remove('breadcrumb-was-active');
              }
            }
          });
          break;
        default:
          break;
      }
    }

    /**
   * Renders elements in the mobile card container based on the selected input value.
   * Shows or hides elements depending on their data-position and data-input attributes.
   */
    renderElementMobileStep1() {
      // Select all elements within the mobile card container with data-position and data-input attributes
      const elements = this.mobileCardContainer.querySelectorAll('[data-position][data-input]');

      // Iterate over each element
      elements.forEach(element => {
        // Get the position and input attributes of the current element
        const positionElement = element.dataset.position;
        const inputElement = element.dataset.input;

        // Check if the position and input attributes match the selected input value
        if (positionElement == this.selectedInputValueJson.position && inputElement == this.selectedInputValueJson.input) {
          // If matched, add a class to show the element
          element.classList.add('show-inputs-important');
        } else {
          // If not matched, remove the class to hide the element
          element.classList.remove('show-inputs-important');
        }
      });
    }

    updateSubmitTextBtn() {
      // Select the submit buttons for single and bundle products
      const oneProductBtn = document.querySelector('.landing-button-submit-one');
      const bundleProductBtn = document.querySelector('.landing-button-submit-bundle');

      // Check if the selected input value is not for a bundle product
      if (this.selectedInputValueJson.position !== 3) {
        // If not a bundle product, show the bundle product submit button and hide the single product submit button
        bundleProductBtn.classList.add('show-lading-submit-btn');
        oneProductBtn.classList.remove('show-lading-submit-btn');
      } else {
        // If a bundle product, hide the bundle product submit button and show the single product submit button
        bundleProductBtn.classList.remove('show-lading-submit-btn');
        oneProductBtn.classList.add('show-lading-submit-btn');
      }

      // Update the inner HTML of the submit button text to include the discount percentage
      this.btnSumbitText.innerHTML =
        `
      <span class="landing-submit-text__discount">${this.selectedInputValueJson.discountPercent} %</span>
      `;
    }

    updateAnchorValue() {
      // Get the anchor element by its ID
      const anchorID = document.getElementById('landing-add-sidecard');
      const productIdStep1 = this.selectedInputValueJson;
      const productIdStep4 = this.selectedInputValueJsonStep4;
      let currentHref = anchorID.getAttribute('href');

      // Determine the selected product ID
      const selectedProductId = (productIdStep1.position === 1 && productIdStep4.position === 1)
        ? productIdStep4.id
        : (productIdStep1.position === 1 && productIdStep4.position !== 1)
          ? productIdStep1.id
          : productIdStep1.id;

      // Split the current href at the first occurrence of 'add'
      const href = currentHref.split('add')[0]
      // Construct the new href based on product positions
      if (productIdStep1.position === 1) {
        if (productIdStep4.position === 1) {
          currentHref = `${href}add?id=${selectedProductId}&selling_plan=${productIdStep4.sellingPlanId}&quantity=1`
        } else {
          currentHref = `${href}add?id=${selectedProductId}&quantity=1`
        }
      } else {
        currentHref = `${href}add?id=${selectedProductId}&quantity=1`
      }
      // Update the href attribute of the anchor element
      anchorID.href = currentHref;

      // Simulate a click on the anchor element after 2200 milliseconds
      setTimeout(() => {
        anchorID.click();
      }, 2200);
    }
  }

  const purchasemicroInfusionPurchaseLandingPageLandingPage = new microInfusionPurchaseLandingPage('main-panel-lading');
  // end purchase landing page
  // dropsdown works better outside of the class

  /**
   * Sets up dropdown functionality for specified containers.
   *
   * @param {string} containerSelector - A CSS selector for the container elements that will have dropdown functionality.
   * @param {string} buttonSelector - A CSS selector for the button elements within each container that will trigger the dropdown.
   * @param {string} contentSelector - A CSS selector for the content elements within each container that will be shown or hidden.
   */
  function setupDropdowns(containerSelector, buttonSelector, contentSelector) {
    // Select all container elements that match the given selector
    const dropdownContainers = document.querySelectorAll(containerSelector);

    // Check if any containers were found
    if (dropdownContainers) {
      // Iterate over each container element
      dropdownContainers.forEach(function (container) {
        // Select the button and content elements within the current container
        const dropdownButton = container.querySelector(buttonSelector);
        const dropdownContent = container.querySelector(contentSelector);
        const button = container.querySelector('.landing-rotate-svg-button');

        // Define the event handler function to toggle the dropdown
        function toggleDropdown() {
          dropdownContent.classList.toggle('show-dropdown'); // Toggle visibility of the dropdown content
          button.classList.toggle('rotate-svg-btn'); // Toggle the rotation of the button
        }

        // Attach the event listener to the button
        dropdownButton.addEventListener('click', toggleDropdown);
      });
    }
  }

  // Initialize dropdowns for various sections using the setupDropdowns function
  setupDropdowns('.step1-value-props-dropdown', '.step1-value-dropdown-title', '.step1-value-dropdown-information');
  setupDropdowns('.step1-mobile-value-props-dropdown', '.step1-mobile-value-dropdown-title', '.step1-mobile-value-dropdown-information');
  setupDropdowns('.step4-value-props-dropdown', '.step4-value-dropdown-title', '.step4-value-dropdown-content');

  // end dropdown
}