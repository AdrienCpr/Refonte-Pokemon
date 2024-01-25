import BaseController from "./basecontroller.js";

class loginController extends BaseController {
    constructor() {
        super()

        if (this.isTokenValidLogin()) {
            this.isConnected();
        } else {
            this.isDisconnected();
        }

        if (localStorage.getItem("session")) {
            if (localStorage.getItem("session") === "true") {
                localStorage.removeItem("session")
                this.toast("session")
                this.isDisconnected();
            }
        }

        this.isRegistered()
        this.serverError()
    }

    isTokenValidLogin() {
        try {
            if (sessionStorage.getItem("token")) {
                let jwt = sessionStorage.getItem("token")
                let jwtdecode = decodeToken(jwt)
                if (jwtdecode.exp <= Math.floor(Date.now() / 1000)) {
                    sessionStorage.removeItem("token")
                    return false
                } else {
                    return true
                }
            }
            return false
        } catch (e) {

        }
    }

    isRegistered() {
        if (localStorage.getItem("isRegistered"))
        {
            document.getElementById("registered").innerHTML = `<div class="alert alert-success" role="alert">
                                                                        Votre compte a été créé avec succès
                                                                    </div>`
            localStorage.removeItem("isRegistered");
        }
    }

    isDisconnected() {
        document.getElementById("nav-pages").innerHTML = ``
        document.getElementById("nav-deconnexion").innerHTML = ``

        document.getElementById("nav-connexion").innerHTML = `<li class="nav-item">
                    <a class="nav-link" style="cursor: pointer; color: white" onclick="navigate('login')">Se connecter</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" style="cursor: pointer;  color: white" onclick="navigate('register')">Créer un compte</a>
                </li>`
    }
    async getUser() {
        try {
            document.getElementById("registered").innerHTML = ``

            let email = document.getElementById("email")
            let password = document.getElementById("password")
            let valid_email = document.getElementById("valid-email")
            let valid_password = document.getElementById("valid-password")

            let mailformat = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;

            if (!email.value.match(mailformat) || password.value.length < 6)
                this.validation(email, mailformat, valid_email, password, valid_password);
            else {
                let data = { "email" : email.value, "password" : password.value}

                let token = await this.model.getUser(data)
                if(token !== 401) {
                    sessionStorage.setItem("token", token.token);
                    this.isConnected();
                } else {
                    document.getElementById("registered").innerHTML = `<div class="alert alert-danger" role="alert">
                                                                        Votre e-mail et votre mot de passe ne correspondent pas 
                                                                    </div>`
                }
            }
        } catch (e) {

        }
    }

    validation(email, mailformat, valid_email, password, valid_password) {
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
    }

    async isConnected() {
        try{
            let user_info = await this.model.getUserInfo(decodeToken().id_user)

            document.getElementById("nav-connexion").innerHTML = ''

            document.getElementById("nav-pages").innerHTML =
                `<li class="nav-item">
                    <a class="nav-link" style="cursor: pointer" onclick="navigate('home')">Combat</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" style="cursor: pointer" onclick="navigate('collection')">Collection</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" style="cursor: pointer" onclick="navigate('history')">Historique</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" style="cursor: pointer" onclick="navigate('shop')">Boutique</a>
                </li>`

            document.getElementById("nav-deconnexion").innerHTML = `
                        <span id="coins"> 
                               <a style="cursor: pointer; color: white; margin-right: 3em" onclick="navigate('shop')">${user_info.coins} <img src="../../res/img/pokepiece.png" height="25em" width="25em"></a>
                        </span>
                        <div class="dropdown me-5">
                            <a id="nav-pseudo-user" style="color: white; cursor: pointer; text-decoration: none" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                Bonjour ${user_info.pseudo}
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" style="cursor: pointer" onclick="navigate('updateUser')">Mon profil</a></li>
                            <li class="nav-item">
                                <a class="nav-link " style="cursor: pointer;color: red" onclick="loginController.disconnected()">Se déconnecter</a>
                            </li>
                          </ul>
                        </div>`

            navigate("home")
        } catch (e) {

        }
    }

    disconnected() {
        sessionStorage.clear();
        navigate("login")
    }

    serverError(){
        if(localStorage.getItem('server error')) {
            localStorage.removeItem('server error')
            this.toast("servererror")
        }
    }
}

export default () => window.loginController = new loginController()
