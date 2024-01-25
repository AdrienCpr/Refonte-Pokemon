import BaseController from "./basecontroller.js";

class collectionController extends BaseController {
    constructor() {
        super()

        this.collection_cards = document.getElementById('collection-cards')
        this.collection_cards.appendChild(this.load)


        this.loadUserCard()
        this.isNewPokemon()
    }
    async loadUserCard() {
        try {
            let Cards = await this.model.getUserCards(decodeToken().id_user)

            let content = ``;

            Cards.forEach(Card => {
                let figureClass = Card.type_2 ? "card--" + (Card.type_2) : "card--" + Card.type_1
                let image = Card.image
                let name = Card.name
                let cardType = Card.type_2 ? Card.type_2 + '/' + Card.type_1 : Card.type_1
                let HP = Card.HP
                let attack = Card.attack
                let defense = Card.defense
                let special_attack = Card.special_attack
                let special_defense = Card.special_defense
                let speed = Card.speed

                content += `${this.cardHtml(figureClass,image,name,cardType,HP,attack,defense,special_attack,special_defense,speed)}`
            })

            if (content === ''){
                content = `<h1 style="color: white">Votre pokédex est vide</h1>`
            }

            this.collection_cards.innerHTML = `${content}`
        } catch (e) {

        }
    }
    async isNewPokemon() {
        try {
            let id_user = decodeToken().id_user
            let user_info = await this.model.getUserInfo(id_user)
            let name_pokemon = localStorage.getItem("isNewPokemon")
            let new_success = !!localStorage.getItem("isNewSucces")


            if (name_pokemon !== null) {
                document.getElementById("coins").innerHTML = `<a style="cursor: pointer; color: white; margin-right: 3em" onclick="navigate('shop')">${user_info.coins} <img src="../../res/img/pokepiece.png" height="25em" width="25em"></a>`
                document.getElementById("new-pokemon").innerHTML = `<div class="alert alert-success" role="alert">
                                                                                ${name_pokemon} a été ajouté à votre collection
                                                                            </div>`
                localStorage.removeItem("isNewPokemon");
            }

            if (new_success) {
                this.toast('toast-trophy')
                localStorage.removeItem("isNewSucces");
            }
        } catch (e) {

        }
    }
    search(){
        this.isTokenValid()
        this.globalSearch(this.collection_cards)
    }
    async showSuccess() {
        try {
            this.isTokenValid()

            let id_user = decodeToken().id_user
            let userTrophies = await this.model.getUserTrophy(id_user)

            let userTrophiesRemaining = await this.model.getUserTrophyRemaining(id_user)

            let content  = ''

            let i = 0
            for (const userTrophy of userTrophies) {
                i++
                content += `<div class="col-md-4">
                          <div class="card mb-4">
                            <div class="card-body">
                              <div class="d-flex align-items-center">
                                <div class="mr-3">
                                  ${userTrophy.svg}
                                </div>
                                <div>
                                  <h5 class="card-title ms-2">${userTrophy.name}</h5>
                                  <p class="card-text ms-2">${userTrophy.description}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>`
            }

            if (i === 0) {
                content = `<h5>Jouer pour débloquer des trophées !</h5>`
            }

            document.getElementById('modal-body').innerHTML = `<h3 style="text-decoration: underline">Mes succès :</h3>
                                                                     <div class="row mt-5">
<!--                                                                        <div class="card-deck card-equal-height">-->
                                                                            ${content}
<!--                                                                        </div>-->
                                                                    </div>`

            let content2  = ''

            for (const userTrophyRemaining of userTrophiesRemaining) {
                let trophy = await this.model.getTrophyById(userTrophyRemaining.id_trophy)

                content2 += `<div class="col-md-4">
                          <div class="card mb-4">
                            <div class="card-body">
                              <div class="d-flex align-items-center">
                                <div class="mr-3">
                                    <span id="test" style="filter: grayscale(100%);">${trophy.svg}</span>                                  
                                </div>
                                <div>
                                  <h5 class="card-title ms-2">${trophy.name}</h5>
                                  <p class="card-text ms-2">${trophy.description}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>`
            }

            document.getElementById('modal-footer').innerHTML = `<h3 style="text-decoration: underline; text-align: left">Succès a débloquer :</h3>
                                                                     <div class="row mt-5">
<!--                                                                        <div class="card-deck card-equal-height">-->
                                                                            ${content2}
<!--                                                                        </div>-->
                                                                    </div>`
        }catch (e) {

        }
    }

}

export default () => window.collectionController = new collectionController()
