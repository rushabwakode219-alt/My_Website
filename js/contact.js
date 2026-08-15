function initContactForm() {

    const form =
        document.querySelector("[data-contact-form]");

    if (!form) return;


    form.addEventListener("submit", event => {

        /*
         * IMPORTANT:
         *
         * Do NOT use event.preventDefault()
         * here.
         *
         * Netlify needs the normal POST submission.
         */

        const button =
            form.querySelector("button[type='submit']");

        if (button) {

            button.disabled = true;

            button.innerHTML =
                "Sending...";

        }

    });

}