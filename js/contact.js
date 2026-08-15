function initContactForm() {

    const form = document.querySelector("[data-contact-form]");

    if (!form) {
        return;
    }


    const button = form.querySelector("[data-submit-button]");

    const buttonText = form.querySelector("[data-submit-text]");

    const status = form.querySelector("[data-form-status]");


    form.addEventListener("submit", function (event) {

        /*
         * Let the browser perform normal HTML validation first.
         */

        if (!form.checkValidity()) {

            return;

        }


        /*
         * IMPORTANT:
         *
         * We DO NOT call event.preventDefault().
         *
         * Netlify needs the normal POST request.
         *
         * The form will submit to:
         *
         * /pages/thank-you.html
         */

        if (button) {

            button.disabled = true;

        }


        if (buttonText) {

            buttonText.textContent = "Sending...";

        }


        if (status) {

            status.textContent = "Sending your inquiry...";

            status.classList.add("is-visible");

        }

    });

}