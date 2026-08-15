function initContactForm() {

    const form =
        document.querySelector("[data-contact-form]");

    if (!form) {
        return;
    }


    const submitButton =
        form.querySelector("[data-submit-button]");

    const submitText =
        form.querySelector("[data-submit-text]");

    const status =
        form.querySelector("[data-form-status]");


    /* =========================================
       DATE PICKER
       ========================================= */

    const dateInput =
    form.querySelector("[data-future-date]");


if (dateInput) {

    const tomorrow = new Date();

    tomorrow.setDate(
        tomorrow.getDate() + 1
    );


    const year =
        tomorrow.getFullYear();

    const month =
        String(
            tomorrow.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            tomorrow.getDate()
        ).padStart(2, "0");


    dateInput.min =
        `${year}-${month}-${day}`;


    const dateWrapper =
        dateInput.closest(
            ".date-input-wrapper"
        );


    if (dateWrapper) {

        dateWrapper.addEventListener(
            "click",
            function () {

                if (
                    typeof dateInput.showPicker ===
                    "function"
                ) {

                    try {

                        dateInput.showPicker();

                    } catch (error) {

                        dateInput.focus();

                    }

                } else {

                    dateInput.focus();

                }

            }
        );

    }

}

    /* =========================================
       PHONE VALIDATION
       ========================================= */

    const phoneInput =
        form.querySelector("[data-phone]");

    const phoneError =
        form.querySelector("[data-phone-error]");


    if (phoneInput) {

        phoneInput.addEventListener(
            "input",
            function () {

                /*
                 * Only numbers.
                 */

                this.value =
                    this.value.replace(
                        /\D/g,
                        ""
                    );


                /*
                 * Maximum 10 digits.
                 */

                this.value =
                    this.value.substring(
                        0,
                        10
                    );


                validatePhone();

            }
        );


        phoneInput.addEventListener(
            "blur",
            validatePhone
        );

    }


    function validatePhone() {

        if (!phoneInput) {
            return true;
        }


        const value =
            phoneInput.value.trim();


        const field =
            phoneInput.closest(".field");


        if (!value) {

            showPhoneError(
                "Mobile number is required."
            );

            return false;

        }


        if (!/^[0-9]{10}$/.test(value)) {

            showPhoneError(
                "Please enter exactly 10 digits."
            );

            return false;

        }


        /*
         * Indian mobile number:
         * first digit must be 6, 7, 8 or 9.
         */

        if (!/^[6-9][0-9]{9}$/.test(value)) {

            showPhoneError(
                "Please enter a valid Indian mobile number."
            );

            return false;

        }


        field.classList.remove(
            "is-invalid"
        );


        if (phoneError) {

            phoneError.textContent = "";

            phoneError.classList.remove(
                "is-visible"
            );

        }


        return true;

    }


    function showPhoneError(message) {

        const field =
            phoneInput.closest(".field");


        field.classList.add(
            "is-invalid"
        );


        if (phoneError) {

            phoneError.textContent =
                message;

            phoneError.classList.add(
                "is-visible"
            );

        }

    }


    /* =========================================
       EMAIL VALIDATION
       ========================================= */

    const emailInput =
        form.querySelector(
            'input[type="email"]'
        );


    if (emailInput) {

        emailInput.addEventListener(
            "input",
            validateEmail
        );

        emailInput.addEventListener(
            "blur",
            validateEmail
        );

    }


    function validateEmail() {

        if (!emailInput) {
            return true;
        }


        const email =
            emailInput.value.trim();


        if (!email) {

            emailInput.setCustomValidity(
                "Email address is required."
            );

            return false;

        }


        const emailPattern =
            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;


        if (!emailPattern.test(email)) {

            emailInput.setCustomValidity(
                "Please enter a valid email address."
            );

            return false;

        }


        emailInput.setCustomValidity("");

        return true;

    }


    /* =========================================
       FORM SUBMISSION
       ========================================= */

    form.addEventListener(
        "submit",
        function (event) {

            const phoneValid =
                validatePhone();


            const emailValid =
                validateEmail();


            let dateValid = true;


            /*
             * Make sure a date was selected.
             */

            if (
                dateInput &&
                !dateInput.value
            ) {

                dateInput.setCustomValidity(
                    "Please select your event date."
                );

                dateValid = false;

            } else if (dateInput) {

                /*
                 * Check future date again.
                 */

                const selectedDate =
                    new Date(
                        dateInput.value +
                        "T00:00:00"
                    );


                const tomorrow =
                    new Date();


                tomorrow.setHours(
                    0,
                    0,
                    0,
                    0
                );


                tomorrow.setDate(
                    tomorrow.getDate() + 1
                );


                if (
                    selectedDate <
                    tomorrow
                ) {

                    dateInput.setCustomValidity(
                        "Please select a future date."
                    );

                    dateValid = false;

                } else {

                    dateInput.setCustomValidity("");

                }

            }


            /*
             * Stop submission if anything
             * is invalid.
             */

            if (
                !phoneValid ||
                !emailValid ||
                !dateValid
            ) {

                event.preventDefault();

                form.reportValidity();

                return;

            }


            /*
             * IMPORTANT:
             *
             * Do NOT call preventDefault()
             * when everything is valid.
             *
             * Netlify needs the POST.
             */

            if (submitButton) {

                submitButton.disabled = true;

            }


            if (submitText) {

                submitText.textContent =
                    "Sending...";

            }


            if (status) {

                status.textContent =
                    "Sending your inquiry...";

                status.classList.add(
                    "is-visible"
                );

            }

        }
    );

}


/* =========================================
   INITIALIZE
   ========================================= */

if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initContactForm
    );

} else {

    initContactForm();

}