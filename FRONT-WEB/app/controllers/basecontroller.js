import JdcModel from "../model/JdcModel.js";

export default class BaseController {
    constructor() {
        this.setBackButtonView('index')
        this.load = document.createElement("img")
        this.load.src = "./res/loader2.gif"
        this.load.style.alignContent = "center"

        this.model = new JdcModel()


        this.isTokenValid()
    }

    icon(id, focus){
        const array = {
            'icon-user': ['<i class="fa-solid fa-user"></i>', '<i class="fa-solid fa-user fa-bounce"></i>'],
            'icon-key' : ['<i class="fa-solid fa-key"></i>', '<i class="fa-solid fa-key fa-bounce"></i>'],
            'icon-gamepad' : ['<i class="fa-solid fa-gamepad"></i>', '<i class="fa-solid fa-gamepad fa-bounce"></i>']
        };

        return array[id][focus]
    }
    async focusOn(id,iconWhish) {
        try {
            let icon = await this.icon(iconWhish, 1)
            document.getElementById(id).innerHTML = icon
        }catch (e) {

        }
    }

    async focusOff(id,iconWhish) {
        try {
            let icon = await this.icon(iconWhish, 0)
            document.getElementById(id).innerHTML = icon
        }catch (e) {

        }
    }

    togglePasswordVisibility(inputId, iconId) {
        let passwordInput = document.getElementById(inputId);
        let toggleIcon = document.getElementById(iconId);

        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            toggleIcon.className = 'fa-solid fa-eye';
        } else {
            passwordInput.type = 'password';
            toggleIcon.className = 'fa-regular fa-eye-slash';
        }
    }

    async isTokenValid() {
        try{
            if (sessionStorage.getItem("token")) {
                let jwt = sessionStorage.getItem("token")
                let jwtdecode = decodeToken(jwt)
                if (jwtdecode.exp <= Math.floor(Date.now() / 1000)) {
                    sessionStorage.removeItem("token")
                    localStorage.setItem("session", "true")

                    navigate("login")
                } else {
                    let new_token = await this.model.refreshToken(decodeToken().id_user)
                    sessionStorage.removeItem("token")
                    sessionStorage.setItem("token", new_token.token)
                }
            }
        } catch (e) {

        }
    }
    toast(elemId) {
        const toast = new bootstrap.Toast(document.getElementById(elemId))
        toast.show()
    }
    setBackButtonView(view) {
        window.onpopstate = function() {
            navigate(view)
        }; history.pushState({}, '');
    }

    globalSearch(container) {
        try {
            let input, filter, figure, figcaption, i, txtValue;
            input = document.getElementById('searchBar');
            filter = input.value.toUpperCase();
            figure = container.getElementsByTagName('figure');

            for (i = 0; i < figure.length; i++) {
                figcaption = figure[i].getElementsByTagName("figcaption")[0];
                txtValue = figcaption.textContent || figcaption.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    figure[i].style.display = "";
                } else {
                    figure[i].style.display = "none";
                }
            }
        } catch (e) {

        }
    }

    cardHtml(figureClass,image,name,cardType,HP,attack,defense,special_attack,special_defense,speed,price){
        let content =  `<figure class="card-pokemon ${figureClass}">
                    <div class="card__image-container">
                        <img src="${image}" alt="" class="card__image">
                    </div>

                    <figcaption class="card__caption">
                        <h1 class="card__name">${name}</h1>

                        <h3 class="card__type">
                            ${cardType}
                        </h3>

                        <table class="card__stats">
                            <tbody>
                            <tr>
                                <th>HP</th>
                                <td>${HP}</td>
                            </tr>
                            <tr>
                                <th>Attack</th>
                                <td>${attack}</td>
                            </tr>

                            <tr>
                                <th>Defense</th>
                                <td>${defense}</td>
                            </tr>
                            <tr>
                                <th>Special Attack</th>
                                <td>${special_attack}</td>
                            </tr>
                            <tr>
                                <th>Special Defense</th>
                                <td>${special_defense}</td>
                            </tr>
                            <tr>
                                <th>Speed</th>
                                <td>${speed}</td>
                            </tr>
                            ${price? '<th>Prix :</th><td>'+price+'<img src="../../res/img/pokepiece.png" height="40px" width="40px"></td>': ''}
                            </tbody></table>
                        <div class="card__abilities">
<!--                            <h4 class="card__ability">-->
<!--                                <span class="card__label">Ability</span>-->
<!--                                Run Away-->
<!--                            </h4>-->
<!--                            <h4 class="card__ability">-->
<!--                                <span class="card__label">Hidden Ability</span>-->
<!--                                Anticipation-->
<!--                            </h4>-->
                        </div>
                    </figcaption>
                </figure>`
        return content;
    }
}
