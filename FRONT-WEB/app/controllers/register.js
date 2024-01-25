import BaseController from "./basecontroller.js";

class registerController extends BaseController {
    constructor() {
        super()

    }

    async createAccount() {
        let pseudo = document.getElementById("pseudo")
        let email = document.getElementById("email")
        let password = document.getElementById("password")
        let confirm_password = document.getElementById("confirm_password")

        let valid_pseudo = document.getElementById("valid-pseudo")
        let valid_email = document.getElementById("valid-email")
        let valid_password = document.getElementById("valid-password")
        let valid_confirm_password = document.getElementById("valid-confirm-password")

        let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (pseudo.value.length < 3 || !email.value.match(mailformat) || password.value.length < 6 || password.value !== confirm_password.value || confirm_password.value.length < 1) {
            this.validation(pseudo, email, password, confirm_password, valid_pseudo, valid_email, valid_password, valid_confirm_password, mailformat);
        } else {
            try {
                const data = {"pseudo" : pseudo.value, "email" : email.value, "password" : password.value}
                await this.model.createUser(data)
                localStorage.setItem("isRegistered", true);
                navigate("login")
            } catch (e) {
                this.validation(pseudo, email, password, confirm_password, valid_pseudo, valid_email, valid_password, valid_confirm_password, mailformat);
                if(e.message.includes('email')) {
                    email.classList.remove("is-valid")
                    email.classList.add("is-invalid")

                    valid_email.innerHTML = `<p style="color: red">Il existe déjà un compte avec cet email</p>`
                }
                if (e.message.includes('pseudo')) {
                    pseudo.classList.remove("is-valid")
                    pseudo.classList.add("is-invalid")

                    valid_pseudo.innerHTML = `<p style="color: red">Il existe déjà un compte avec ce pseudo</p>`
                }
            }
        }
    }

    validation(pseudo, email, password, confirm_password, valid_pseudo, valid_email, valid_password, valid_confirm_password, mailformat) {
        if (pseudo.value.length < 3) {
            pseudo.classList.remove("is-valid")
            pseudo.classList.add("is-invalid")

            valid_pseudo.innerHTML = `<p style="color: red">Le pseudo doit faire au moins 3 caractères</p>`
        } else {
            pseudo.classList.remove("is-invalid")
            pseudo.classList.add("is-valid")

            valid_pseudo.innerHTML = ``
        }
        if (!email.value.match(mailformat)) {
            email.classList.remove("is-valid")
            email.classList.add("is-invalid")

            valid_email.innerHTML = `<p style="color: red">L'email n'est pas valide</p>`
        } else {
            email.classList.remove("is-invalid")
            email.classList.add("is-valid")

            valid_email.innerHTML = ``
        }
        if (password.value.length < 6) {
            password.classList.remove("is-valid")
            password.classList.add("is-invalid")

            valid_password.innerHTML = `<p style="color: red">Le mot de passe doit faire au moins 6 caractères</p>`
        } else {
            password.classList.remove("is-invalid")
            password.classList.add("is-valid")

            valid_password.innerHTML = ``
        }
        if (password.value !== confirm_password.value || confirm_password.value.length < 1) {
            confirm_password.classList.remove("is-valid")
            confirm_password.classList.add("is-invalid")

            valid_confirm_password.innerHTML = `<p style="color: red">La confirmation ne correspond pas au mot de passe</p>`
        } else {
            confirm_password.classList.remove("is-invalid")
            confirm_password.classList.add("is-valid")

            valid_confirm_password.innerHTML = ``
        }
    }
}

export default () => window.registerController = new registerController()
