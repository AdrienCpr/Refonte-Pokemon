import BaseController from "./basecontroller.js";

class homeController extends BaseController {
     constructor() {
        super()

        this.loadCardsUser()
        this.tryConnectSameAccountAlert()
     }

    tryConnectSameAccountAlert(){
        if(localStorage.getItem("sameaccount")) {
            this.toast('sameaccount')
            localStorage.removeItem('sameaccount')
        }
    }
    async loadCardsUser() {
        try{
            let user_info = await this.model.getUserInfo(decodeToken().id_user)

            document.getElementById("coins").innerHTML = `<a style="cursor: pointer; color: white; margin-right: 3em" onclick="navigate('shop')">${user_info.coins} <img src="../../res/img/pokepiece.png" height="25em" width="25em"></a>`

            //Carte 1
            let isCard1 = user_info.id_card_1
            let Card1Info = isCard1 ? await this.model.getCardById(user_info.id_card_1) : ''

            let figureClass1 = isCard1 ? (Card1Info.type_2 ? "card--"+Card1Info.type_2 : "card--"+Card1Info.type_1) : ""
            let image1 = isCard1 ? Card1Info.image : "https://cdn-icons-png.flaticon.com/512/59/59254.png"
            let name1 = isCard1 ?Card1Info.name : "Aucun pokemon"
            let cardType1 = isCard1 ? (Card1Info.type_2 ? Card1Info.type_2+'/'+Card1Info.type_1 :Card1Info.type_1) : "Aucun type"
            let HP1 = isCard1 ? Card1Info.HP : "X"
            let attack1 = isCard1 ? Card1Info.attack : "X"
            let defense1 = isCard1 ? Card1Info.defense : "X"
            let special_attack1 = isCard1 ? Card1Info.special_attack : "X"
            let special_defense1 = isCard1 ? Card1Info.special_defense : "X"
            let speed1 = isCard1 ? Card1Info.speed : "X"

            document.getElementById('load-card-1').innerHTML =  `${this.cardHtml(figureClass1, image1, name1, cardType1, HP1, attack1, defense1, special_attack1, special_defense1, speed1)}`


            //Carte 2
            let isCard2 = user_info.id_card_2
            let Card2Info = isCard2 ? await this.model.getCardById(user_info.id_card_2): ''

            let figureClass2 = isCard2 ? (Card2Info.type_2 ? "card--"+(Card2Info.type_2) : "card--"+Card2Info.type_1) : ""
            let image2 = isCard2 ? Card2Info.image : "https://cdn-icons-png.flaticon.com/512/59/59254.png"
            let name2 = isCard2 ?Card2Info.name : "Aucun pokemon"
            let cardType2 = isCard2 ? (Card2Info.type_2 ? Card2Info.type_2+'/'+Card2Info.type_1 :Card2Info.type_1) : "Aucun type"
            let HP2 = isCard2 ? Card2Info.HP : "X"
            let attack2 = isCard2 ? Card2Info.attack : "X"
            let defense2 = isCard2 ? Card2Info.defense : "X"
            let special_attack2 = isCard2 ? Card2Info.special_attack : "X"
            let special_defense2 = isCard2 ? Card2Info.special_defense : "X"
            let speed2 = isCard2 ? Card2Info.speed : "X"

            document.getElementById('load-card-2').innerHTML =  `${this.cardHtml(figureClass2, image2, name2, cardType2, HP2, attack2, defense2, special_attack2, special_defense2, speed2)}`

            //Carte 3
            let isCard3 = user_info.id_card_3
            let Card3Info = isCard3 ? await this.model.getCardById(user_info.id_card_3): ''

            let figureClass3 = isCard3 ? (Card3Info.type_2 ? "card--"+(Card3Info.type_2) : "card--"+Card3Info.type_1) : ""
            let image3 = isCard3 ? Card3Info.image : "https://cdn-icons-png.flaticon.com/512/59/59254.png"
            let name3 = isCard3 ?Card3Info.name : "Aucun pokemon"
            let cardType3 = isCard3 ? (Card3Info.type_2 ? Card3Info.type_2+'/'+Card3Info.type_1 :Card3Info.type_1) : "Aucun type"
            let HP3 = isCard3 ? Card3Info.HP : "X"
            let attack3 = isCard3 ? Card3Info.attack : "X"
            let defense3 = isCard3 ? Card3Info.defense : "X"
            let special_attack3 = isCard3 ? Card3Info.special_attack : "X"
            let special_defense3 = isCard3 ? Card3Info.special_defense : "X"
            let speed3 = isCard3 ? Card3Info.speed : "X"

            document.getElementById('load-card-3').innerHTML =  `${this.cardHtml(figureClass3, image3, name3, cardType3, HP3, attack3, defense3, special_attack3, special_defense3, speed3)}`
        } catch (e) {

        }
    }

    async displayCard(id) {
         try {
             this.isTokenValid()

             let chose_card = document.getElementById(`chose-card-${id}`)

             if (chose_card.innerHTML !== '') {
                 return chose_card.innerHTML = ''
             }

             this.closeChoseCard(id);

             chose_card.appendChild(this.load)

             let Cards = await this.model.loadUserCardsWithoutDeck(decodeToken().id_user);

             let content =
                 `<li class="li-card-chose" style="padding-bottom: 5px;padding-top: 5px" onclick='homeController.choseCard(${id}, 0)'>
                <a><img src="../../res/img/pokepiece.png" height="50px" width="50px" loading="lazy">Vider l'emplacement</a>
            </li>`

             Cards.forEach( Card => {
                 content += ` <li class="li-card-chose" id='card' style="padding-bottom: 5px;padding-top: 5px" onclick='homeController.choseCard(${id}, ${JSON.stringify(Card)})'>
                            <a id="card-body"><img src="${Card.sprite}" height="100px" width="100px" loading="lazy" > ${Card.name}, ${Card.HP} HP </a>
                        </li>`
             })

             this.closeChoseCard(id);

             chose_card.innerHTML = `<div style="height: 300px; width: 300px; overflow-y: auto; word-wrap: break-word; background-color: rgba(255,255,255,0.53) ">
                                                                    <ul>
                                                                        <div class="container">
                                                                            <div class="row justify-content-center">
                                                                                <div class="col-md-6">
                                                                                    <form>
                                                                                        <div class="form-group">
                                                                                            <input style="border-radius: 25px;" type="text" class="form-control" id="searchBar" onkeyup="homeController.searchCard()" placeholder="Rechercher un nom, un type ...">
                                                                                        </div>
                                                                                    </form>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </ul>
                                                                    <ul id="all-my-card">
                                                                       ${content}
                                                                    </ul>
                                                                </div>`
         } catch (e) {

         }
    }

    searchCard() {
        this.isTokenValid()

        let container = document.getElementById("all-my-card")
        let input, filter, figure, figcaption, i, txtValue;
        input = document.getElementById('searchBar');
        filter = input.value.toUpperCase();
        figure = container.getElementsByTagName('li');

        for (i = 0; i < figure.length; i++) {
            figcaption = figure[i].getElementsByTagName("a")[0];
            txtValue = figcaption.textContent || figcaption.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                figure[i].style.display = "";
            } else {
                figure[i].style.display = "none";
            }
        }
    }

    closeChoseCard(id) {
        this.isTokenValid()

        let all_chose_card = [1, 2, 3]
        all_chose_card.forEach((one_chose_card, index) => {
            if (one_chose_card.toString() !== id) {
                document.getElementById(`chose-card-${one_chose_card}`).innerHTML = ''
            }
        })
    }

    async choseCard(id_card_user,card) {
         try {
             this.isTokenValid()

             document.getElementById(`chose-card-${id_card_user}`).innerHTML = ``
             await this.model.updateUserChoseCard(decodeToken().id_user, id_card_user, card.id_card ? card.id_card : 0 )
             await this.loadCardsUser()
         } catch (e) {

         }
    }

    async searchPlayer() {
         try {
             let user_info = await this.model.getUserInfo(decodeToken().id_user)
             if (user_info.id_card_1 === null || user_info.id_card_2 === null || user_info.id_card_3 === null) {
                 var errorMessage = document.getElementById("error-message");
                 errorMessage.textContent = "Vous devez selectionner 3 cartes";
             } else {
                 navigate('webSocket')
             }
         } catch (e) {

         }
    }
}

export default () => window.homeController = new homeController()
