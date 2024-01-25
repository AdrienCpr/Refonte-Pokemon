import BaseController from "./basecontroller.js";

class webSocketController extends BaseController {
    constructor() {
        super()

        // this.socket = io("http://localhost:3000/");
        this.socket = io("https://api.pokemon.adriencompare.com/");

        this.searchPlayer()
    }

    createChrono() {
        var startTime = Date.now();
        var timerInterval;

        function updateTime() {
            var currentTime = Date.now();
            var elapsedTime = Math.floor((currentTime - startTime) / 1000); // en secondes
            var minutes = Math.floor(elapsedTime / 60);
            var seconds = elapsedTime % 60;
            document.getElementById("chrono").innerHTML = `Recherche d'un adversaire...<br>${
                (minutes < 10 ? "0" + minutes : minutes) + ":" +
                (seconds < 10 ? "0" + seconds : seconds)}`
        }

        function startChrono() {
            startTime = Date.now();
            timerInterval = setInterval(updateTime, 1000);
        }

        function stopChrono() {
            clearInterval(timerInterval);
            document.getElementById("chrono").remove()
        }

        startChrono();

        return {
            stop: stopChrono
        };
    }

    async searchPlayer() {
        let user = await this.model.getUserInfo(decodeToken().id_user)

        let chrono = ''
        this.socket.emit('join-room', user);                           //envoie au serveur les données du joueur

        this.socket.on('same-account', () => {
            localStorage.setItem("sameaccount", "true")
            navigate('home')
        });

        this.socket.on('joined-lobby', (roomName) => {
            // console.log(`Vous avez rejoint la room: ${roomName}`);      // informe le client quelle room il a rejoint
            // document.getElementById('room').innerHTML = roomName        //affiche le nom de la room

            chrono = this.createChrono()
        });


        this.socket.on('waiting-for-player', () => {
            // console.log(`En attente de joueurs`);          // informe le client qui a rejoint la room
        });

        this.socket.on('game-created', async (usersRoom) => {

            chrono.stop()
            document.getElementById('turn').classList.remove("d-none")
            for (const userRoom of usersRoom) {                     //Sur les utilisateurs d'une room
                if (decodeToken().id_user === userRoom.id_user) {           //Si c'est moi, affiche mes cartes
                    const CardsPlayer = await this.model.getCardsUserByUserId(userRoom.id_user)

                    let content = ``
                    CardsPlayer.forEach((Card,index) => {
                        index++
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

                        content = `${this.cardHtml(figureClass, image, name, cardType, HP, attack, defense, special_attack, special_defense, speed)}`
                        document.getElementById(`card-${index}`).innerHTML = content
                    })
                } else {
                    let div_opponent = document.getElementById('opponent')
                    div_opponent.classList.remove("d-none")
                    div_opponent.innerHTML = `<i class="fa-solid fa-globe" style="color: #005eff;"></i> ${(await this.model.getUserInfo(userRoom.id_user)).pseudo}`
                }


            }
        });

        function getIconClass(type) {
            switch (type) {
                case "normal":
                    return "fas fa-circle";
                case "combat":
                    return "fas fa-fist-raised";
                case "vol":
                    return "fas fa-feather-alt";
                case "poison":
                    return "fas fa-skull-crossbones";
                case "sol":
                    return "fas fa-mountain";
                case "roche":
                    return "fas fa-gem";
                case "insecte":
                    return "fas fa-bug";
                case "spectre":
                    return "fas fa-ghost";
                case "acier":
                    return "fas fa-shield-alt";
                case "feu":
                    return "fas fa-fire";
                case "eau":
                    return "fas fa-tint";
                case "plante":
                    return "fas fa-leaf";
                case "electrik":
                    return "fas fa-bolt";
                case "psy":
                    return "fas fa-brain";
                case "glace":
                    return "fas fa-snowflake";
                case "dragon":
                    return "fas fa-dragon";
                case "tenebres":
                    return "fas fa-moon";
                case "fee":
                    return "fas fa-heart";
                default:
                    return "";
            }
        }
        function UpperFirstLetter(a){
            return (a+'').charAt(0).toUpperCase()+a.substr(1);
        }

        this.socket.on('turn-player', async (userStart, userCard, RoomFull) => {
            const socket = this.socket;
            let userIdTurn = decodeToken().id_user
            if (userIdTurn === userStart.id_user) { //Définie a qui le tour
                document.getElementById('turn').innerHTML = `<i class="fa-solid fa-arrows-rotate fa-spin" style="color: #005eff;"></i> C'est a vous de jouer <i class="fa-solid fa-arrows-rotate fa-spin" style="color: #005eff;"></i>`

                for (let i = 1; i <= 3; i++) {
                    let pokemonChoose = await this.model.getCardsUserByUserId(decodeToken().id_user)

                    document.getElementById(`card-${i}`).onclick = async function () {
                        let cardsIndex = ['1', '2', '3']
                        cardsIndex.splice(i - 1, 1)
                        cardsIndex.forEach(cardIndex => {
                            document.getElementById(`chose-action-${cardIndex}`).innerHTML = ''
                        })
                        if (userCard[i-1].HP > 0) {
                            let type_1 = pokemonChoose[i - 1].type_1
                            let type_2 = pokemonChoose[i - 1].type_2 ? pokemonChoose[i - 1].type_2 : null


                            let content = `<button id="attack-1-${i}" class="btn btn-pokemon btn-normal"   data-text="0"><i class="${getIconClass("normal")}"></i>&nbsp; Normal</button>
                                       <button id="attack-2-${i}" class="btn btn-pokemon btn-${type_1}"  data-text="1"><i class="${getIconClass(type_1) }"></i>&nbsp; ${UpperFirstLetter(type_1)}</button>`

                            if (type_2 !== null) {
                                content += `<button id="attack-3-${i}" class="btn btn-pokemon btn-${type_2}" data-text="2"><i class="${getIconClass(type_2) }"></i>&nbsp; ${UpperFirstLetter(type_2)}</button>`
                            }

                            document.getElementById(`chose-action-${i}`).innerHTML = content

                            // document.getElementById('pokemon-player-1').innerHTML = `<img src="${pokemonChoose[i - 1].sprite}">`

                            // définir les propriétés onclick ici, après la création des boutons

                            let normalAttack = document.getElementById(`attack-1-${i}`)
                            let type1Attack = document.getElementById(`attack-2-${i}`)

                            normalAttack.onclick = function () {
                                const action = 'attack';
                                const type_action = normalAttack.dataset.text
                                socket.emit('player-action', i, action, userIdTurn, RoomFull, type_action);
                            };

                            type1Attack.onclick = function () {
                                const action = 'attack';
                                const type_action = type1Attack.dataset.text
                                socket.emit('player-action', i, action, userIdTurn, RoomFull,type_action);
                            };

                            if (type_2 !== null) {
                                let type2Attack = document.getElementById(`attack-3-${i}`)

                                type2Attack.onclick = function () {
                                    const action = 'attack';
                                    const type_action = type2Attack.dataset.text
                                    socket.emit('player-action', i, action, userIdTurn, RoomFull,type_action);
                                };
                            }
                        }
                    }
                }
            } else {
                document.getElementById('turn').innerHTML = `<i class="fa-solid fa-hand fa-beat-fade" style="color: #ff0000;"></i> C'est a l'adversaire de jouer <i class="fa-solid fa-hand fa-beat-fade" style="color: #ff0000;"></i>`
                document.getElementById(`chose-action-1`).innerHTML = ''
                document.getElementById(`chose-action-2`).innerHTML = ''
                document.getElementById(`chose-action-3`).innerHTML = ''
                document.getElementById(`card-1`).onclick = ''
                document.getElementById(`card-2`).onclick = ''
                document.getElementById(`card-3`).onclick = ''
            }
        });

        this.socket.on('display round', (J1, J2, playerFirstAndPourcent, user1turn, user2turn, playerStartResult, playerFinishResult) => {
            // console.log(playerStartResult, playerFinishResult)
            document.getElementById(`chose-action-1`).innerHTML = ''
            document.getElementById(`chose-action-2`).innerHTML = ''
            document.getElementById(`chose-action-3`).innerHTML = ''
            document.getElementById(`card-1`).onclick = ''
            document.getElementById(`card-2`).onclick = ''
            document.getElementById(`card-3`).onclick = ''

            let pseudoPlayerPlayFirst = playerFirstAndPourcent[0].pseudo
            let commentPlayer1 = user1turn[3]
            let result_content = `${J1.pseudo} : <img src="${user1turn[0].sprite}" height="80em" width="80em"> <i class="${getIconClass(user1turn[2])}"></i> | `

            if (pseudoPlayerPlayFirst === J1.pseudo) {
                result_content += `<i class="fa-solid fa-hourglass-start"></i> ${playerFirstAndPourcent[1]}% | <i class="fas fa-hand-rock"></i>`
                if (commentPlayer1) {
                    result_content += commentPlayer1
                }
                if (playerStartResult[0] === false){
                    if (playerFinishResult[0] === true) {
                        result_content += ` | <i class="fas fa-skull"></i>`
                    } else {
                        result_content += `<i class="fas fa-heart"></i> ${playerFinishResult[2].HP}`
                    }
                }

            } else {
                result_content += `<i class="fa-solid fa-hourglass-end"></i> | `
                if (playerStartResult[0] === true) {
                    result_content += `<i class="fas fa-skull"></i>`
                } else {
                    result_content += `<i class="fas fa-heart"></i> ${playerStartResult[2].HP} | <i class="fas fa-hand-rock"></i> `
                    if (user2turn[3]) {
                        result_content += user2turn[3]
                    }
                }
            }

            result_content += `<br>`

            result_content += `${J2.pseudo} : <img src="${user2turn[0].sprite}" height="80em" width="80em"> <i class="${getIconClass(user2turn[2])}"></i> | `
            if (pseudoPlayerPlayFirst === J2.pseudo) {
                result_content +=  `<i class="fa-solid fa-hourglass-start"></i> ${playerFirstAndPourcent[1]}% | <i class="fas fa-hand-rock"></i>`
                if (user2turn[3]) {
                    result_content += user2turn[3]
                }
                if (playerStartResult[0] === false){
                    if (playerFinishResult[0] === true) {
                        result_content += ` | <i class="fas fa-skull"></i>`
                    } else {
                        result_content += `<i class="fas fa-heart"></i> ${playerFinishResult[2].HP}`
                    }
                }
            } else {
                result_content += `<i class="fa-solid fa-hourglass-end"></i> | `
                if (playerStartResult[0]) {
                    result_content += `<i class="fas fa-skull"></i>`
                } else {
                    result_content += `<i class="fas fa-heart"></i> ${playerStartResult[2].HP} | <i class="fas fa-hand-rock"></i> `
                    if (user1turn[3]){
                        result_content += user1turn[3]
                    }
                }
            }


            document.getElementById('display-result').innerHTML = result_content
        });

        this.socket.on('update-card', (player1 , player1Cards, player2, player2Cards) => {
            if (decodeToken().id_user === player1.id_user) {
                let content = ``
                player1Cards.forEach((Card,index) => {
                    index++
                    let figureClass = Card.HP <= 0 ? "card-pokemon" :Card.type_2 ? "card--" + (Card.type_2) : "card--" + Card.type_1
                    let image = Card.image
                    let name = Card.name
                    let cardType = Card.type_2 ? Card.type_2 + '/' + Card.type_1 : Card.type_1
                    let HP = Card.HP
                    let attack = Card.attack
                    let defense = Card.defense
                    let special_attack = Card.special_attack
                    let special_defense = Card.special_defense
                    let speed = Card.speed

                    content = `${this.cardHtml(figureClass, image, name, cardType, HP, attack, defense, special_attack, special_defense, speed)}`
                    document.getElementById(`card-${index}`).innerHTML = content
                })
            }else{
                let content = ``
                player2Cards.forEach((Card,index) => {
                    index++
                    let figureClass = Card.HP <= 0 ? "card-pokemon" :Card.type_2 ? "card--" + (Card.type_2) : "card--" + Card.type_1
                    let image = Card.image
                    let name = Card.name
                    let cardType = Card.type_2 ? Card.type_2 + '/' + Card.type_1 : Card.type_1
                    let HP = Card.HP
                    let attack = Card.attack
                    let defense = Card.defense
                    let special_attack = Card.special_attack
                    let special_defense = Card.special_defense
                    let speed = Card.speed

                    content = `${this.cardHtml(figureClass, image, name, cardType, HP, attack, defense, special_attack, special_defense, speed)}`
                    document.getElementById(`card-${index}`).innerHTML = content
                })
            }
        });

        this.socket.on('new-success', () => {
            // console.log('NewSucces')
            localStorage.setItem("isNewSucces", 'true');
        })
        this.socket.on('log', ($total) => {
            console.log($total)
        })

        this.socket.on('end-game', (playerWin, Room) => {
            document.getElementById('turn').innerHTML= `<i class="fa-solid fa-trophy fa-flip" style="color: #ffea00;"></i> ${playerWin.pseudo} a gagné la partie <i class="fa-solid fa-trophy fa-flip" style="color: #ffea00;"></i>`
            document.getElementById(`card-1`).innerHTML = ''
            document.getElementById(`card-2`).innerHTML = ''
            document.getElementById(`card-3`).innerHTML = ''
            document.getElementById('return-lobby').innerHTML = `<a onclick="navigate('home')" type="button" class="btn btn-primary">Retour à l'accueil</a>`

            let user_id = decodeToken().id_user
            this.socket.emit('normal-end-game',Room, user_id);
        });

        this.socket.on('disconnect-normal', () => {
            this.socket.disconnect();
        });
    }
}

export default () => window.webSocketController = new webSocketController()
