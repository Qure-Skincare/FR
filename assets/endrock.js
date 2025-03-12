/**
 * Retrieves the user's location IP and calls the deliveryDate function with the result.
 */
const userLocationIP = () => {
  const url = 'https://us-central1-functions-358315.cloudfunctions.net/location';
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  fetch(url, requestOptions)
    .then(response => response.json())
    .then(result => {
      return deliveryDate(result, orderByConfig);
    })
    .catch(error => console.log('error', error));
}


/**
 * Retrieves the delivery range for a given state.
 * @param {string} stateAcronym - The acronym of the state.
 * @returns {number|null} - The delivery range for the state, or null if not found.
 */
function getDeliveryRange(stateAcronym) {
  console.log(stateAcronym);
  const stateFound = window.statesInfo.find(
    (state) => state.stateAcronym === stateAcronym
  );

  return stateFound ? stateFound.deliveryRange : null;
}


/**
 * Calculates and displays the delivery date based on the user's location.
 * If the user's location is within the US and the current date is within the defined
 * start and end dates, the component remains hidden.
 *
 * @param {Object} location - The location object containing `countryCode` and `region`.
 * @param {Object} orderByConfig - Configuration object defining the display behavior, data from snippets/pdm_orderby.liquid.
 * @param {boolean} orderByConfig.showOrderByReceiveByUS - Determines whether to display the component in the US.
 * @param {Date} orderByConfig.startDateOrder - Start date defining the visibility period for the US.
 * @param {Date} orderByConfig.endDateOrder - End date defining the visibility period for the US.
 */

const deliveryDate = (location, orderByConfig) => {
  const { countryCode, region } = location;
  let nowDate = new Date();
  const messageContainer = document.querySelector('.orderby-receiveby__shipping-text');
  const nationalMessage = window.nationalText.split('[]');

  if (countryCode == 'US' && !orderByConfig.showOrderByReceiveByUS ) return

  if (countryCode == 'US' && (nowDate >= orderByConfig.startDateOrder && nowDate <= orderByConfig.endDateOrder )) {
    return;
  }

  if (countryCode != 'US') {
    messageContainer.innerText = window.internationalText
  } else {
    const foundNationalDate = getDeliveryRange(region.toUpperCase());
    messageContainer.innerText = `${nationalMessage[0]} ${foundNationalDate} ${nationalMessage[1]}`
  }
  document.querySelector('.orderby-receiveby').classList.remove('hidden');
}


// swiper PDP: Before & After First Image 

const swiperBeforeAfter = (selector, paginationClass) => {
  const swiperInstance = new Swiper(`${selector}`, {
    slidesPerView: 1,
    pagination: {
      el: `${paginationClass}`,
      clickable: true,
    }
  });

  return swiperInstance;
}

swiperBeforeAfter('.swiper-products', '.swiper-pagination-products')
swiperBeforeAfter('.swiper-page-product', '.swiper-pagination-product-page')

const swiperResult = new Swiper('.swiper-info-result', {
  slidesPerView: 1,
  centeredSlides: true,
  pagination: {
    el: '.swiper-pagination-real-result',
    clickable: true,
  }
});

// end swiper PDP: Before & After First Image

/**
 * Verifies if the customer has visited the website before.
 * If the customer has not visited before, a cookie is set.
 * If the customer has visited before, a CSS class is removed from an element.
 */
const verifyCustomer = () => {
  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith("newCustomer="))
    ?.split("=")[1];

  if (!cookieValue) {
    document.cookie = "newCustomer=true; max-age=2592000; path=/";
  } else {
    const crossSell = document.querySelectorAll('.cross-sell');

    crossSell.forEach((element) => {
      element.classList.remove('hidden');
    });
  }

}

/* ATC NO PRICES PDP */
const atcNoPricesPdp = () => {
  const subscriptionTypes = document.querySelectorAll('.subscriptionType'); 
  console.log(subscriptionTypes);
  if (subscriptionTypes) {
    subscriptionTypes.forEach((element) => {
      element.addEventListener('click', function(e) {

        const subscriptionType = e.currentTarget.getAttribute('data-subscription');
        const subscriptionPrices = document.querySelectorAll('.subscriptions-prices')

        subscriptionPrices.forEach((element) => { element.classList.add('hidden'); });
        document.getElementById(`${subscriptionType}`).classList.remove('hidden');
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', function() {
  atcNoPricesPdp();


  // Start Cross-sell page targeting validation

  const pageTargeting = [
    "/products/q-rejuvalight-pro-facewear",
    "/pages/microinfusion",
    "/products/neck-decolletage-led",
    "/products/micro-infusion-targeted-patches",
    "/products/face-serum",
    "/pages/micro-infusion-refill",
    "/products/q-rify-replacement-water-filter",
    "/products/q-urify-water-filter"
  ]

  const currentPath = window.location.pathname;

  if (pageTargeting.includes(currentPath)) {
    verifyCustomer();
  }

  // Start PDP Social Proof Data
  const socialProofContainer = document.querySelector('.social-proof-data-container');
  const quantityElement = document.querySelector('.social-proof-data-container #quantity');
  const closeIcon = document.querySelector('.social-proof-data-container .close-icon');
  const containerAtcButton = document.querySelector('.nav_e-commerce .cart-custom');
  const containerAtcButtonProdFaceSerum = document.querySelectorAll('.button_sticky_wrapper');

  if (socialProofContainer) {
    let { productId, pageHandle, productList } = socialProofContainer.dataset;
    let url = `https://webhooks.endrock.software/endrockapi/v3/app/analytics/reportsGA4.php?filterBy=productId&store=qure&name=Qure: GA4&productId=`;

    // render products purchased quantity and show the social proof container 
    const renderQuantity = (quantity) => {
      setTimeout(() => {
        const chatIcon = document.querySelector('iframe#launcher');
        if (chatIcon) chatIcon.classList.add('new-bottom');
      }, 1000);


      quantityElement.innerText = quantity;
      if (containerAtcButton) containerAtcButton.setAttribute('style', "bottom: 44px !important");
      if (containerAtcButtonProdFaceSerum) containerAtcButtonProdFaceSerum.forEach(btn => btn.classList.add('new-bottom'));

      socialProofContainer.classList.remove('hidden');


      closeIcon.addEventListener('click', function () {
        socialProofContainer.classList.add('hidden');
        if (containerAtcButton) containerAtcButton.setAttribute('style', "bottom: 25px !important");
        if (document.querySelector('iframe#launcher')) document.querySelector('iframe#launcher').classList.remove('new-bottom');
      });

    }

    // handle requests for 1 product or some of them
    if (pageHandle && productList) {
      let arrProductList = productList.split(', ');
      const requests = arrProductList.map(id => {
        return fetchData(url, id);
      });
      Promise.all(requests)
        .then(responses => {
          let sumPurchased = responses.reduce((acum, cur) => {
            return acum + cur.data.itemsPurchased;
          }, 0);
          if (sumPurchased > 0) {
            renderQuantity(sumPurchased);
          }
        })
        .catch(error => console.log('error', error));
    } else if (productId) {
      fetchData(url, productId)
        .then(response => {
          if (response.code == 200) {
            renderQuantity(response.data.itemsPurchased);
          }
        })
    }

    // fetch items purchased data
    function fetchData(url, id) {
      let requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      return fetch(url + id, requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error));
    }
  }

  // End PDP Social Proof Data

  // Start Order by Receive by
  const showReceiveBy = window.showOrderBy;
  if (showReceiveBy) {
    userLocationIP();
  }

  //  PDP: Before & After First Image 

  const productComponent = document.getElementById('info-product');
  const resultComponent = document.getElementById('info-result');
  const dermaComponent = document.getElementById('info-derma');

  /**
   * Function to show a component and hide the others.
   * @param {HTMLElement} component The component to be shown.
   */
  function showComponent(component) {
    // Hide all components
    document.querySelectorAll('[id^="info-"]').forEach(component => {
      component.classList.remove('active');
    });
    // Show the specified component
    component.classList.add('active');
  }


  // Add event listeners to all elements with the class 'nav-button'
  document.querySelectorAll('.nav-button').forEach(button => {
    button.addEventListener('click', function () {
      // Get the ID of the clicked button
      const buttonId = this.id;
      // Remove the 'active' class from all navigation buttons
      document.querySelectorAll('.nav-button').forEach(btn => {
        btn.classList.remove('active');
      });
      // Add the 'active' class to the clicked button
      this.classList.add('active');
      // Show the corresponding component based on the clicked button
      switch (buttonId) {
        case 'productButton':
          showComponent(productComponent);
          break;
        case 'resultButton':
          showComponent(resultComponent);
          break;
        case 'dermaButton':
          showComponent(dermaComponent);
          break;
      }
    });
  });

  // end PDP: Before & After First Image 

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
  // end Micro-Infusion Landing Page Purchase Process

  initUpsellSwiper(); //swiper for carousel upsell

  /* QR- Shopify 2.0 Features Adjustments  */

  // Select the green product sticky button element
  const greenProductStickyBtn = document.querySelector('#green-product-sticky-btn');
  const greenProductStickyFormBtn = document.querySelector('#green-product-sticky-form-btn');
  
  /**
   * Centers the given button horizontally within the window.
   * @param {HTMLElement} btn - The button element to be centered.
   */
  const centerStickyButtonProductHorizontally = (btn) => {
    if (btn) {
      // Calculate the total left offset to center the button
      const totalLeft = (window.innerWidth - btn.offsetWidth) / 2;
      // Set the calculated left offset as the button's left CSS property
      btn.style.left = `${totalLeft}px`;
    }
  };
  
  // Center the buttons initially
  centerStickyButtonProductHorizontally(greenProductStickyBtn);
  centerStickyButtonProductHorizontally(greenProductStickyFormBtn);
  
  // Re-center the buttons when the window is resized
  window.onresize = () => {
    centerStickyButtonProductHorizontally(greenProductStickyBtn);
    centerStickyButtonProductHorizontally(greenProductStickyFormBtn);
  };


  /* end QR- Shopify 2.0 Features Adjustments  */

  // pdm product landing sales
  // Check if the element with the class .pdm_product-landing-sales-wrapper exists
  if (document.querySelector('.pdm_product-landing-sales-wrapper')) {
    // Initialize the Swiper only if the element exists
    const pdmProductLadingSalesSwiper = new Swiper('.pdm_swiper_product_landing', {
      effect: 'fade',
      loop: true,
      autoplay: {
        delay: 3000,
      },
      mousewheel: {
        forceToAxis: true,
      },
      fadeEffect: {
        crossFade: true
      },
      pagination: {
        el: '.swiper-pdm-landing-sales-pagination',
        clickable: true
      },
      navigation: {
        prevEl: '.swiper-pdm-landing-sales-prev',
        nextEl: '.swiper-pdm-landing-sales-next',
      }
    });
  }

  // end pdm product landing sales

  // new sidecart timer 
  const sidecartTimerContainer = document.querySelector('.slide_cart .sidecart-timer-container');
  initSidecarTimer(sidecartTimerContainer);
 
  // sitewide timer (header) 
  const siteWideTimerContainer = document.querySelector('.announcement_bar.site-gamification-active .sidecart-timer-container');
  initSidecarTimer(siteWideTimerContainer);

  // site-wide-gamification 
  document.addEventListener('cartUpdated', event => {
    setTimeout(updateSideWideGamification, 2000);
  });

 
  // pdp-carousel-image
  initPDPCarouselImage();

   // frontrow-health 
   const frontrowHealthContainer = document.querySelector('.frontrow-health-container');
   const trustedSection = document.querySelector('.trustedVerified');
   initFrontrowHealth(frontrowHealthContainer, trustedSection);
});


 /**
 * Initializes the sidecar timer on the page.
 *
 * This function checks if the sidecar timer is within the valid date range
 * and displays the countdown timer accordingly. If the current date is outside
 * the specified start and finish dates, the timer container is hidden. The timer
 * updates every second to show the remaining time in days, hours, minutes, and seconds.
 *
 * @function initSidecarTimer
 * @returns {void} - The function does not return a value.
 */
 function initSidecarTimer (sidecartTimerContainer) {
  if (!sidecartTimerContainer) return;

  let { finishDate, startDate } = sidecartTimerContainer.dataset;

   // parse dates
   startDate = parseCustomDate(startDate); 
   finishDate = parseCustomDate(finishDate);

   if (isNaN(startDate) || isNaN(finishDate)) {
     console.error('Invalid date format:', { startDate, finishDate });
     sidecartTimerContainer.style.display = 'none';
     return;
   }
 
   let now = new Date().getTime();
 
   // Hide timer if out of date
   if (now < startDate || now > finishDate) {
     sidecartTimerContainer.style.display = 'none';
     return;
   }
  
  const countdown = setInterval(function() {
    now = new Date().getTime();
    
    // Find the time remaining until the target date
    const remainingTime = finishDate - now;
    
    // Time calculations for days, hours, minutes, and seconds
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
    
    setTimer(sidecartTimerContainer.querySelector('.sidecart-timer-container__timer--days-amount'),days);
    setTimer(sidecartTimerContainer.querySelector('.sidecart-timer-container__timer--hours-amount'),hours);
    setTimer(sidecartTimerContainer.querySelector('.sidecart-timer-container__timer--minutes-amount'),minutes);
    setTimer(sidecartTimerContainer.querySelector('.sidecart-timer-container__timer--seconds-amount'),seconds);

    // clearInterval
    if (remainingTime < 0) {
      clearInterval(countdown);
    }
  }, 1000);

}

/**
* This function formats the provided amount, ensuring it has a leading zero if it's
* less than 10, and then updates the text content of the given selector with the formatted value.
*
* @function setTimer
* @param {HTMLElement} selector - The HTML element where the timer value will be displayed.
* @param {number} amount - The numerical value to be displayed in the timer (days, hours, minutes, or seconds).
* @returns {void}
*/
function setTimer (selector, amount) {
  if (!selector || !amount) return;

  let amountFixed = amount < 10 ? `0${amount}` : amount;
  selector.textContent = amountFixed;
}

/**
 * Parses a date string in the format "MM-DD-YYYY HH:MM" and returns the corresponding
 * timestamp in milliseconds.
 *
 * This function splits the date string into its date and time components, extracts
 * the month, day, year, hours, and minutes, and then constructs a Date object
 * using these values. The month is adjusted to be zero-indexed (0 for January, 11 for December).
 *
 * @function parseCustomDate
 * @param {string} dateString - The date string to be parsed, in the format "MM-DD-YYYY HH:MM".
 * @returns {number} - The timestamp in milliseconds representing the parsed date and time.
 */
function parseCustomDate(dateString) {
  const [datePart, timePart] = dateString.split(' ');
  const [month, day, year] = datePart.split('-').map(Number);
  const [hours, minutes] = timePart.split(':').map(Number);
  return new Date(year, month - 1, day, hours, minutes, 0, 0).getTime();
}

/**
 * Updates site-wide gamification progress based on the latest cart subtotal.
 */
function updateSideWideGamification() {
  // Fetch updated cart data
  fetch('/cart.js')
    .then(response => response.json())
    .then(cart => {
      const cartTotal = cart.items_subtotal_price;
      updateSiteWideGamification(cartTotal);
    })
}
/**
 * Updates the progress of site-wide gamification elements, such as free shipping
 * and gift milestones, based on the current cart total. Updates the message,
 * progress bar, and milestone visuals accordingly. Intended to enhance user
 * engagement with rewards during the shopping process.
 */
function updateSiteWideGamification (cartTotal) { 

  const progressContainer = document.querySelector('.progress-container.pdm-gamification');

  if (!progressContainer) return;

  // Extract data attributes from the progress container
  const enableFreeShipping = progressContainer.dataset.enableFreeShipping === 'true';
  const freeShippingThreshold = parseInt(progressContainer.dataset.freeShippingThreshold, 10);
  const enableProductGift = progressContainer.dataset.enableProductGift === 'true';
  const giftThresholdPdm = parseInt(progressContainer.dataset.giftThresholdPdm, 10);
  const copyFreeShipping = progressContainer.dataset.copyFreeShipping;
  const copyProductGift = progressContainer.dataset.copyProductGift;
  const copyCongrats = progressContainer.dataset.copyCongrats;
  const giftProductTitle = progressContainer.dataset.giftProductTitle;
  const giftProductVariantPrice = parseInt(progressContainer.dataset.giftProductVariantPrice, 10);
  const threshold = parseInt(progressContainer.dataset.threshold, 10);
  const currencySymbol = progressContainer.dataset.currencySymbol;
  const giftProductIsAvailable = progressContainer.dataset.isAvailableGiftProduct;
  const urlGiftProductIsAvailable = progressContainer.dataset.urlIsAvailableGiftProduct;


  // Calculate differences
  const differenceFreeShipping = freeShippingThreshold - cartTotal;
  const differenceFreeGift = giftThresholdPdm - cartTotal;

  // Calculate progress percentage
  let progressPercentage = (cartTotal / threshold) * 100;
  let progressPercentageFreeShipping = 0;

  if (enableFreeShipping && cartTotal < freeShippingThreshold) {
    progressPercentageFreeShipping = (cartTotal / freeShippingThreshold) * 100;

    if (progressPercentage > progressPercentageFreeShipping) {
      progressPercentage = 20;
    }

  } else {
    if (threshold > cartTotal && progressPercentage > 80) {
      progressPercentage = 80;
    }
    if (progressPercentage > 100) {
      progressPercentage = 100;
    }
  }

  // Render progress message
  const progressContainerMessage = progressContainer.querySelector('.progress-container__message');

  if (progressContainerMessage) {
    if (enableFreeShipping && differenceFreeShipping > 0 && cartTotal >= 0) {
      const remainingAmountMoney = (differenceFreeShipping / 100).toFixed(0);
      progressContainerMessage.innerHTML = copyFreeShipping.replace("&price-left&", `<i class='money' style='font-style: normal;'>${currencySymbol.replace(/[0-9]+/, remainingAmountMoney)}</i>`);
    } else if (enableProductGift && urlGiftProductIsAvailable=="true" && giftProductIsAvailable && differenceFreeGift > 0) {
      const remainingGiftAmountMoney = (differenceFreeGift / 100).toFixed(0);
      let message = copyProductGift.replace("&price-left&", `<i class='money' style='font-style: normal;'>${currencySymbol.replace(/[0-9]+/, remainingGiftAmountMoney)}</i>`);
      if (!isNaN(giftProductVariantPrice)) {
        const productGiftPriceFormatted = (giftProductVariantPrice / 100).toFixed(0);
        message = message.replace("&product-price&", `${currencySymbol.replace(/[0-9]+/, productGiftPriceFormatted)}`);
        message = message.replace("&product-title&", giftProductTitle);
      } else {
        message = message.replace("&product-price&", "");
        message = message.replace("&product-title&", giftProductTitle);
      }
      progressContainerMessage.innerHTML = message;
    } else if (enableProductGift && giftProductIsAvailable && urlGiftProductIsAvailable=="true" && differenceFreeGift <= 0) {
      const congratsMessage = copyCongrats.replace("&product-title&", `<strong>${giftProductTitle}!</strong>`);
      progressContainerMessage.innerHTML = congratsMessage;
    } else if ((!enableProductGift || !giftProductIsAvailable || urlGiftProductIsAvailable=="false") &&
        enableFreeShipping &&
        cartTotal >= differenceFreeShipping){
      progressContainerMessage.innerHTML = "<p>Congrats you have <strong> Free Shipping!</strong></p>";
    }
  }

  // Update progress bar and milestone states
  const milestonesContainer = progressContainer.querySelector('.milestones-container');
  const firstMilestone = progressContainer.querySelector('.first-milestone');
  const secondMilestone = progressContainer.querySelector('.second-milestone');
  const progressBar = progressContainer.querySelector('.progress-bar__bar');

  if (milestonesContainer && firstMilestone && progressBar) {
    // Update progress bar width
    progressBar.style.width = `${progressPercentage}%`;

    // Update milestone classes and styles
    if (differenceFreeGift <= 0) {
      milestonesContainer.classList.add('background-green');
      progressBar.classList.remove('hidden');
    } else {
      milestonesContainer.classList.remove('background-green');
      progressBar.classList.add('hidden');
    }

    // First Milestone - Free Shipping
    if (differenceFreeShipping <= 0 && cartTotal > 0) {
      firstMilestone.classList.add('reach-threshold');
      firstMilestone.classList.remove('gradient');
    } else {
      firstMilestone.classList.remove('reach-threshold');
      firstMilestone.classList.add('gradient');
    }

    // Second Milestone - Free Gift
    if (secondMilestone)  {
    if (differenceFreeGift <= 0) {
      secondMilestone.classList.add('reach-threshold');
      secondMilestone.classList.remove('gradient');
    } else {
      secondMilestone.classList.remove('reach-threshold');
      if (differenceFreeShipping <= 0 && cartTotal > 0) {
        secondMilestone.classList.add('gradient');
      } else {
        secondMilestone.classList.remove('gradient');
      }
    }
    }

    // Update milestone icons based on thresholds
    const firstMilestoneIconEmpty = firstMilestone.querySelector('.icon-empty-car');
    const firstMilestoneIconFull = firstMilestone.querySelector('.icon-full-car');
    const firstMilestoneIconCheck = firstMilestone.querySelector('.icon-check__first-milestone');
    const firstMilestoneProgressBarWrapper = firstMilestone.querySelector('.progress-bar-wrapper');
    const firstMilestoneProgressBarWrapperBar = firstMilestone.querySelector('.progress-bar-wrapper__bar');

    if (firstMilestoneIconEmpty && firstMilestoneIconFull && firstMilestoneIconCheck && firstMilestoneProgressBarWrapper && firstMilestoneProgressBarWrapperBar) {
      if (differenceFreeShipping <= 0 && cartTotal >= 0) {
        firstMilestoneIconEmpty.classList.add('hidden');
        firstMilestoneIconFull.classList.remove('hidden');
        firstMilestoneIconCheck.classList.remove('hidden');
        firstMilestoneProgressBarWrapper.classList.add('hidden');
      } else {
        firstMilestoneIconEmpty.classList.remove('hidden');
        firstMilestoneIconFull.classList.add('hidden');
        firstMilestoneIconCheck.classList.add('hidden');
        firstMilestoneProgressBarWrapper.classList.remove('hidden');
        firstMilestoneProgressBarWrapperBar.style.width = progressPercentageFreeShipping + '%';
      }
    }

  if (secondMilestone) {
    const secondMilestoneIconEmpty = secondMilestone.querySelector('.icon-empty-pillow');
    const secondMilestoneIconGradient = secondMilestone.querySelector('.icon-empty-gradient');
    const secondMilestoneIconFull = secondMilestone.querySelector('.icon-full-pillow');
    const secondMilestoneIconCheck = secondMilestone.querySelector('.icon-check__second-milestone');
    const secondMilestoneProgressBarWrapper = secondMilestone.querySelector('.progress-bar-wrapper');
    const secondMilestoneProgressBarWrapperBar = secondMilestone.querySelector('.progress-bar-wrapper__bar');
  
    const bothThresholdUncompleted = differenceFreeShipping > 0 && differenceFreeGift > 0;
    const bothThresholdCompleted = differenceFreeShipping <= 0 && differenceFreeGift <= 0;

    if (secondMilestoneIconEmpty && secondMilestoneIconGradient && secondMilestoneIconFull && secondMilestoneIconCheck && secondMilestoneProgressBarWrapper && secondMilestoneProgressBarWrapperBar) {
      if (bothThresholdCompleted) {
        secondMilestoneIconEmpty.classList.add('hidden');
        secondMilestoneIconGradient.classList.add('hidden');
        secondMilestoneIconFull.classList.remove('hidden');
        secondMilestoneIconCheck.classList.remove('hidden');
        secondMilestoneProgressBarWrapper.classList.add('hidden');
      } else if (bothThresholdUncompleted) {
        secondMilestoneIconEmpty.classList.remove('hidden');
        secondMilestoneIconGradient.classList.add('hidden');
        secondMilestoneIconFull.classList.add('hidden');
        secondMilestoneIconCheck.classList.add('hidden');
      } else {
        secondMilestoneIconEmpty.classList.add('hidden');
        secondMilestoneIconGradient.classList.remove('hidden');
        secondMilestoneIconFull.classList.add('hidden');
        secondMilestoneIconCheck.classList.add('hidden');
        secondMilestoneProgressBarWrapper.classList.remove('hidden');
      }
      if (differenceFreeShipping <= 0) {
        secondMilestoneProgressBarWrapperBar.style.width = progressPercentage + '%';
      } else {
        secondMilestoneProgressBarWrapperBar.style.width = 0;
      }
    }
  }
  }
}


/**
 * Initializes the Product Detail Page (PDP) carousel images.
 * This function sets up two synchronized Swiper sliders: one for product media (main slider)
 * and one for product thumbnails (thumbnail slider), including mousewheel navigation and responsive settings.
 */

function initPDPCarouselImage () {
  const productThumbsContainer = document.querySelector('.swiper-products-thumbs__container');
  const productMediaContainer = document.querySelector('.swiper-products-carousel');

  if (!productThumbsContainer || !productMediaContainer) return;

  let thumbSlider = new Swiper(productThumbsContainer, {
    loop: true,
    spaceBetween: 8,
    slidesPerView: 4.3,
    slidesPerGroup: 1,
    watchSlidesProgress: true,
    mousewheel: {
      forceToAxis: true,
    },
    breakpoints: {
      767: {
        spaceBetween: 12,
        slidesPerView: 6.3,
        slidesPerGroup: 1,
      },
    },
  });

  let mainSlider = new Swiper(productMediaContainer, {
    loop: true,
    slidesPerView: 1,
    mousewheel: {
      forceToAxis: true,
    },
    thumbs: {
      swiper: thumbSlider,
    },
    navigation: {
      nextEl: ".swiper-products-thumbs-next",
      prevEl: ".swiper-products-thumbs-prev",
    },
  });
}


/**
 * Initializes the functionality for the Frontrow Health section.
 * This function sets up a smooth scroll behavior to a trusted section when the "see more" link is clicked.
 * If the frontrow container or trusted section is not present, it safely exits without errors.
 * Scrolls the viewport to 100px above the trusted section for better visibility.
 *
 * @param {HTMLElement} frontrowContainer - The container element for the Frontrow Health section.
 * @param {HTMLElement} trustedSection - The target section to scroll to when the link is clicked.
 */

function initFrontrowHealth (frontrowContainer, trustedSection) {
  if (!frontrowContainer || !trustedSection) return;

  const { link:seeMoreLink} = frontrowContainer.dataset;
  //if the feature has a link in the theme settings, exit the function
  if (seeMoreLink) return;
  
  const seeMoreElement = frontrowContainer.querySelector('.frontrow-health-container__content-link');
  seeMoreElement.addEventListener('click', e => {
    e.preventDefault();
    const trustedSectionPositon = trustedSection.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: trustedSectionPositon - 100,
      behavior: 'smooth'
    });
  });
}


/*  upsell popup micro-infusion-offer and affiliate start */

// DOM elements for controlling the upsell popup
const openPopupUpsell = document.querySelectorAll(".openPopupUpsell");

 if(openPopupUpsell.length > 0) {
  const closePopupUpsell = document.querySelectorAll(".popupsell-close")
  const popupUpsellMain = document.querySelectorAll('.popupsell-main');
  const popupUpsellWrapper = document.querySelector('.popupsell-wrapper');
  const popupElementsIds = document.querySelectorAll('[data-popup-products-id]');
  let dataInformationUpsell = [];

  // Buttons within the upsell popup
  const popupUpsellButtons = document.querySelectorAll('.popupUpsellButtons');
  const popupUpsellNothanks = document.querySelectorAll('.popupUpsellNoThanks');

  // Data for upsell logic, including product IDs and categories

  /**
   * Creates an array containing upsell product information based on dataset attributes.
   *
   * @param {NodeList} dataElement - A NodeList of elements containing dataset attributes for upsell logic.
   * @returns {Array<Object>} An array of objects, each representing a category of upsell products.
   * 
   * Each object in the returned array contains:
   * - `id` {string}: The category identifier from the dataset.
   * - `name` {string}: The category name.
   * - `products` {Array<number>}: A list of product IDs belonging to the category.
   */
  function createArrayPopupUpsellProductsId(dataElement) {
    if (!dataElement) return;
    let arrayInfo = [];
    const { darkAndWrinkles, darkSpots, wrinkles } = dataElement[0].dataset;
    arrayInfo = [
      {
        id: darkAndWrinkles,
        name: "dark-spots + wrinkles",
        products: [43216489513199, 45951933022447, 45951935217903, 43216377217263, 43216449208559, 43216489513199]
      },
      {
        id: darkSpots,
        name: "dark-spots",
        products: [43216457203951, 45951954419951, 45951948947695, 43216299819247, 43216398450927, 43216457203951]
      },
      {
        id: wrinkles,
        name: "wrinkles",
        products: [43216483942639, 45951928860911, 45951945474287, 43216359555311, 43216434069743, 43216483942639]
      },
    ];
    return arrayInfo
  }

  dataInformationUpsell = createArrayPopupUpsellProductsId(popupElementsIds);

  /**
   * Extracts the product ID from the anchor element in the step content.
   * @param {string} selector - The CSS selector to find the anchor element.
   * @returns {number|null} The extracted product ID, or null if not found.
   */

  function processLinkAnchor( selector ) {
    let proccessLinkAnchor = document.querySelector(selector);
    if(proccessLinkAnchor){
      const href = proccessLinkAnchor.getAttribute('href');
      const productId = href.match(/id=(\d+)/)[1];
      return Number(productId);
    } else {
      return null;
    }
  }

  /**
   * Updates the active upsell element based on the product ID.
   * @param {Array} dataInformation - The array containing upsell data.
   * @param {string} selector - The CSS selector to identify the anchor element.
   * @param {HTMLElement} popupElement - The popup element containing upsell cards.
   */

  const handleUpsellElement = (dataInformation, selector, popupElement) => {
    const productId = processLinkAnchor(selector);
    if (!productId) return;

    // Find matching upsell data based on product ID
    const { name, id } = dataInformation.find(item => item.products.includes(productId)) ?? {};
    
    // console.log({'productId': productId, "name": name, "id": id})
  
    // Remove 'active' class from all upsell elements
    const allUpsellElements = popupElement.querySelectorAll('.popupsell-card.active');
    allUpsellElements.forEach((element) => element.classList.remove('active'));

    // Activate the corresponding upsell card
    const upsellElement = popupElement.querySelector(`.popupsell-card[data-product-id="${id}"]`);
    if (upsellElement) {
      upsellElement.classList.add('active');
    } else {
      console.error(`Upsell card with product ID ${id} not found in the active popup.`);
    }
  }

    /**
   * Adds a product to the cart using AJAX.
   * @param {number} productIdFirstVariant - The ID of the product to add to the cart.
   * @param {string} ajaxSelector - The selector for triggering the cart refresh.
   */
  const addToCartUpsell = async (productIdFirstVariant, ajaxSelector) => {
    // console.log('productId add to cart', productIdFirstVariant)
    let formData = {
      'items': [{
        'id': productIdFirstVariant,
        'quantity': 1,
        "properties": {
            "_popup_uspell": "true",
          }
      }]
    };;

    const response = await fetch('/cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      let ajaxContainer = document.querySelector(ajaxSelector);
      popupUpsellMain.forEach((element) => element.style.display = '');
      ajaxContainer.click();
    } else {
      console.error('Error adding product to cart');
    }

  };

   /**
   * Closes the upsell popup and optionally triggers a click on an anchor element.
   * @param {string} ajaxSelector - The selector for triggering the cart refresh.
   */
   const closePopup = ( ajaxSelector ) => {
    let ajaxContainer = document.querySelector(ajaxSelector);
    if (ajaxContainer) {
      ajaxContainer.click();
    }
    popupUpsellMain.forEach((element) => element.style.display = '');
  };

  // Event listener for upsell buttons to add a product to the cart
  if(popupUpsellButtons && popupUpsellButtons.length > 0){
    popupUpsellButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const target = e.target.closest('[data-product-id]'); // Find the closest element with the data-product-id attribute
        const ajaxSelector = button.dataset.ajaxSelector;
  
        if (!target || !target.dataset.productId) {
          productId = 43821069435119; // ID of the default product
        } else {
          productId = Number(target.dataset.productId);
        }

        addToCartUpsell(productId, ajaxSelector);
      });
    });
  }

  // Open the upsell popup
  if (openPopupUpsell) {
    openPopupUpsell.forEach((button) => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const { popupReferrer, ajaxSelector } = button.dataset;
        const popupElement = document.querySelector(`[data-popup-referrer="${popupReferrer}"]`);
        if (popupElement) {
          popupElement.style.display = 'flex';
          handleUpsellElement(dataInformationUpsell, ajaxSelector, popupElement);
        } else {
          console.error('Popup element not found');
        }
      });
    });
  }

  // Close the upsell popup
  if (closePopupUpsell) {
    closePopupUpsell.forEach((button) => {
      const { ajaxSelector } = button.dataset;
      button.addEventListener('click', () => {
        closePopup(ajaxSelector);
      });
    });
  }

  // Close the upsell popup when the "no thanks" buttons are clicked
  if (popupUpsellNothanks && popupUpsellNothanks.length > 0) {
    popupUpsellNothanks.forEach((button) => {
      const { ajaxSelector } = button.dataset;
      button.addEventListener('click', () =>{
        closePopup(ajaxSelector);
      });
    });
  }

  // Close the upsell popup when clicking outside the wrapper
  if (popupUpsellMain) {
    popupUpsellMain.forEach((element) => {
      element.addEventListener('click', (event) => {
        const { ajaxSelector } = element.dataset;
        if (popupUpsellWrapper && !popupUpsellWrapper.contains(event.target)) {
          closePopup(ajaxSelector);
        }
      });
    });
  }
}

/* upsell popup micro-infusion-offer and affiliate end */

/* test high contrast mode micro infusion offer and affiliate */

document.addEventListener('DOMContentLoaded', () => {
  const serum3Month = document.getElementById('3_month');
  const elementPriceStock = document.querySelector('.pdm_price-stock-left-quantity');
  if ( serum3Month && elementPriceStock ) {
    
    const pdmPriceDifferenceContainer = document.querySelector('#pdm_price-difference-container')
    const productId = serum3Month.dataset.productId;

     const updatePrices = (htmlContainer) => {
      const { priceFirst, priceSecond } = htmlContainer.dataset;
      const textElementPrice3Month = document.querySelector('.pdm_plan-bundle-detail__money.item-1');
      const textElementPrice2Month = document.querySelector('.pdm_plan-bundle-detail__money.item-2');

      if (textElementPrice3Month) {
        textElementPrice3Month.textContent = priceFirst;
      }

      if (textElementPrice2Month) {
        textElementPrice2Month.textContent = priceSecond;
      }
    }

    const getDataStock = async (url) => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching stock data:", error);
        return null;
      }
    };

    const updateValueStock = async (element, url) => {
      const dataStock = await getDataStock(url);
      if (dataStock) {
        const message = `${dataStock.data} kits `;
        element.textContent = message;
      }
    };

    updatePrices(pdmPriceDifferenceContainer);
    const urlStock = `https://webhooks.endrock.software/endrockapi/qureskincare/stock/${productId}`;
    updateValueStock(elementPriceStock, urlStock);

  }

});

/* end test upsell popup */

/* start test Face Serum Buy Block Test */

// Check if the face serum container exists and if the test flag is enabled in the dataset
const faceSerumBuyBlockContainer = document.querySelector('.pdm_all-in-one-face-serum-offer-form');

if (window.location.pathname.includes("/products/face-serum")) {
  const testPdpElement = document.querySelector(".pdm-product-test-pdp");
  const originalPdpElement = document.querySelector(".pdm-product-original-pdp");
  const body = document.body;
  const buyButton = document.querySelector(
    ".btn.buy_btn.submit_btn_top.reserve_btn[data-ajax-cart-request-button]"
  );
  const testRadio = testPdpElement?.querySelector('input[type="radio"]');
  const originalRadio = originalPdpElement?.querySelector('input[type="radio"]');
  const testType = body.getAttribute("data-test-pdm-serum"); // "a", "b" o null

  function updateBuyButton(isTestSelected) {
    if (!buyButton) return;
    if (isTestSelected) {
      if (testType === "a") {
        buyButton.textContent = "Buy Now & Save 34%";
      } else if (testType === "b") {
        buyButton.textContent = "Buy Two, Get One FREE";
      }
    } else {
      buyButton.textContent = "Buy Now"; 
    }
  }

  if (testType === "a" || testType === "b") {
    if (originalPdpElement) {
      originalPdpElement.remove();
    }
  } else {
    if (testPdpElement) {
      testPdpElement.remove();
    }
    if (originalRadio) {
      originalRadio.checked = true;
    }
  }

  if (testType === "a" || testType === "b") {
    if (buyButton) {
      const newVariantId = "46201466650863";
      const newProductHandle = "all-in-one-face-serum-6-month-bundle-1";
      buyButton.setAttribute("href", `/cart/add?id=${newVariantId}&quantity=1`);
      buyButton.setAttribute("onclick", `setEventProductHandler('${newProductHandle}')`);
    }
  }

  document.querySelectorAll('input[type="radio"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      updateBuyButton(testRadio?.checked);
    });
  });

  updateBuyButton(testRadio?.checked);
}


if (faceSerumBuyBlockContainer) {
  // Get all radio buttons for selecting the monthly plan
  const faceSerumRadioButtons = document.querySelectorAll('input[name="pdm_monthly-plan"]');

  const updateSerumInformation = (radiobutton) => {
    const parentDiv = radiobutton.closest('.pdm_plan-one-face-serum');

    if (parentDiv) {
      const {
        compareAtPrice,
        price,
        savingPrice,
        variantId,
        discountMessage,
        paymentMethods,
        productHandle,
      } = parentDiv.dataset;

      updateImages(variantId);
      updatePrices(compareAtPrice, price, savingPrice);
      updateAnchorElement(variantId, discountMessage, productHandle);
      updatePaymentMethods(paymentMethods);
    }
  };

  /**
 * Updates the active image in the serum image gallery based on the selected variant.
 * @param {string} variantId - The ID of the selected variant.
 */
  const updateImages = (variantId) => {
    const imagesSerums = document.querySelectorAll('.pdm_all-in-one-face-serum-offer-form-images-container__img');
    imagesSerums.forEach((image) => {
      image.classList.toggle('active', image.dataset.variantidImage === variantId);
    });
  };

  /**
 * Updates the displayed prices, including total price, discount price, and saving details.
 * @param {string} compareAtPrice - The original price.
 * @param {string} price - The discounted price.
 * @param {string} savingPrice - The amount saved.
 */
  const updatePrices = (compareAtPrice, price, savingPrice) => {
    const totalPriceElement = document.querySelector('.pdm_serum-total-price');
    const discountPriceElement = document.querySelector('.pdm_serum-discount-price');
    const savingPriceContainer = document.querySelector('.pdm_serum-saving-container');
    const savingPriceElement = document.querySelector('.pdm_serum-saving-price');

    if (totalPriceElement) totalPriceElement.textContent = compareAtPrice;
    if (discountPriceElement) discountPriceElement.textContent = price;

    if (savingPriceElement) {
      const isSavingVisible = compareAtPrice !== "";
      savingPriceContainer.style.display = isSavingVisible ? 'block' : 'none';
      if (isSavingVisible) savingPriceElement.textContent = savingPrice;
    }
  };

  /**
   * Updates the anchor element with the correct URL, discount message, and event listener for tracking.
   * @param {string} variantId - The ID of the selected variant.
   * @param {string} discountMessage - The discount message to display.
   * @param {string} productHandle - The product handle for tracking purposes.
   */
  const updateAnchorElement = (variantId, discountMessage, productHandle) => {
    const anchorAjaxElement = document.querySelector('.pdm_serum-anchor-ajax');
    const anchorAjaxTextElement = document.querySelector('.pdm_serum-anchor-ajax-text');

    const body = document.body;
    const testType = body.getAttribute("data-test-pdm-serum");

    if (anchorAjaxElement && variantId) {
      anchorAjaxElement.href = `/cart/add?id=${variantId}&quantity=1`;
      
      if (testType === "b" && discountMessage) {
        anchorAjaxTextElement.textContent = "Get One FREE";
        anchorAjaxElement.childNodes[0].nodeValue = "Buy Two, ";
      } else {
        anchorAjaxTextElement.textContent = discountMessage;
        anchorAjaxElement.childNodes[0].nodeValue = "buy now ";
      }

      anchorAjaxElement.addEventListener('click', () => {
        setEventProductHandler(productHandle);
      });
    }
  };

  /**
   * Updates the payment methods displayed.
   * @param {string} paymentMethods - The payment methods to display.
   */
  const updatePaymentMethods = (paymentMethods) => {
    const paymentMethodElement = document.querySelector('.pdm_payment-methods-serum');
    if (paymentMethodElement) paymentMethodElement.textContent = paymentMethods;
  };

  // Initialize with the default selected radio button
  const defaultCheckedRadioButton = document.querySelector('input[name="pdm_monthly-plan"]:checked');
  if (defaultCheckedRadioButton) {
    updateSerumInformation(defaultCheckedRadioButton);
  }

  // Add event listeners to each radio button to update information on selection change
  faceSerumRadioButtons.forEach((radioButton) => {
    radioButton.addEventListener('change', () => {
      updateSerumInformation(radioButton);
    });
  });
}

/* end test Face Serum Buy Block Test */
