import BaseController from "./basecontroller.js";

class shopController extends BaseController {
    constructor() {
        super()
        this.shop_cards = document.getElementById('shop-cards')
        this.shop_cards.appendChild(this.load)

        this.loadAllCard()
    }
    async loadAllCard() {
        try {
            let Cards = await this.model.loadUserCardsWithoutOnesHeHas(decodeToken().id_user)

            if (Cards.length === 0) {
                return this.shop_cards.innerHTML = `<h1 style="color: white">Votre pokédex est complet</h1>`
            }
            let content = ``

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
                let price = Card.price

                content += `<a onclick="shopController.showPokemonName('${Card.id_card}','${Card.name}','${Card.sprite}','${Card.HP}','${Card.attack}','${Card.defense}','${Card.special_attack}','${Card.special_defense}','${Card.speed}','${Card.price}')" type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                ${this.cardHtml(figureClass, image, name, cardType, HP, attack, defense, special_attack, special_defense, speed, price)}
                            </a>`
            })
            this.shop_cards.innerHTML = `${content}`
        } catch (e) {

        }

    }
    search(){
        this.isTokenValid()

        this.globalSearch(this.shop_cards)
    }

    showPokemonName(id,name,sprite,hp,attack,defense,special_attack,special_defense,speed,price) {
        this.isTokenValid()

        document.getElementById('pokemon-name').textContent = `Voulez vous acheter ${name} ?`;
        document.getElementById('pokemon-picture').innerHTML = `<img src="${sprite}" style=""/>`;
        document.getElementById('stats').innerHTML = `<ul class="list-group">
                                                                  <li class="list-group-item">HP : ${hp}</li>
                                                                  <li class="list-group-item">Attack : ${attack}</li>
                                                                  <li class="list-group-item">Defense : ${defense}</li>
                                                                  <li class="list-group-item">Special Attack : ${special_attack}</li>
                                                                  <li class="list-group-item">Special Defense : ${special_defense}</li>
                                                                  <li class="list-group-item">Speed : ${speed}</li>
                                                                </ul>`;
        document.getElementById('buy').innerHTML = `<a onclick="shopController.buyCard('${id}','${name}')" type="button" class="btn btn-success" data-bs-dismiss="modal">Acheter ${price}<img src="../../res/img/pokepiece.png" height="25em" width="25em"></a>`
    }

    async buyCard(id_card, name_card) {
        this.isTokenValid()

        const id_user = decodeToken().id_user
        const user_info = await this.model.getUserInfo(id_user)
        let data = {"id_user": id_user, "id_card": id_card}

        let response = await this.model.createUserCard(data)
        if (response === 400) {

            document.getElementById("insufficient-coins").innerHTML = `<div class="alert alert-danger" role="alert">
                                                                    Vous n'avez pas assez de pièces pour acheter ${name_card}
                                                                </div>`
        } else {
            localStorage.setItem("isNewPokemon", name_card);

            document.getElementById('coins').innerHTML = `<a style="cursor: pointer; color: white; margin-right: 3em" onclick="navigate('shop')">${user_info.coins} <img src="../../res/img/pokepiece.png" height="25em" width="25em"></a>`

            let user_card = await this.model.getUserCards(id_user)

            if (user_card.length === 1) {
                await this.model.createTrophyUser(id_user,'hoenn-1')
                localStorage.setItem("isNewSucces", 'true');
            }
            if (user_card.length === 50) {
                await this.model.createTrophyUser(id_user,'hoenn-5')
                localStorage.setItem("isNewSucces", 'true');
            }
            if (user_card.length === 100) {
                await this.model.createTrophyUser(id_user,'hoenn-7')
                localStorage.setItem("isNewSucces", 'true');
            }

            navigate('collection')
        }
    }

    filterPerPrice(){
        document.getElementById('searchBar').value = 'Prix :'
    }
}


export default () => window.shopController = new shopController()
