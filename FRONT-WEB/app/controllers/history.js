import BaseController from "./basecontroller.js";

class historyController extends BaseController {
    constructor() {
        super()
        this.initTable()
    }

    async initTable() {
        try {
            let paginationSelect = document.querySelector('#pagination-size');
            let id_user = decodeToken().id_user
            let tabledata = await this.model.getGameHistory(id_user);
    
            let table = new Tabulator("#example-table", {
                height: "auto",
                pagination: "local", // enable pagination
                paginationSize: parseInt(paginationSelect.value),
                data: tabledata,
                layout: "fitColumns",
                initialSort: [ // set the initial sort order
                    {column: "date", dir: "desc"}
                ],
                columns: [
                    {title: "Résultat", field: "result", headerFilter: "select", headerFilterParams: {values: ['win', 'lose','abandon']}},
                    {title: "Adversaire", field: "opponent", headerFilter: "input"},
                    {title: "Pièces", field: "coins", hozAlign: "center", headerFilter: "number"},
                    {
                        title: "Date",
                        field: "date",
                        hozAlign: "center",
                        headerFilter: "input",
                        formatter: "datetime",
                        // formatterParams: {
                        //     outputFormat: "yyyy-MM-DD HH:mm:ss",
                        //     invalidPlaceholder: ""
                        // },
                        mutator: function(value) {
                            return luxon.DateTime.fromISO(value).toFormat("yyyy-MM-dd HH:mm:ss");
                        }
                    }
                ],
                locale: true, // Activer la localisation
                langs: {
                    // Définir les traductions en français
                    "fr-fr": {
                        "pagination": {
                            "first": "Premier",
                            "first_title": "Première page",
                            "prev": "Précédent",
                            "prev_title": "Page précédente",
                            "next": "Suivant",
                            "next_title": "Page suivante",
                            "last": "Dernier",
                            "last_title": "Dernière page"
                        }
                    }
                }
            });
    
            paginationSelect.addEventListener('change', function(event) {
                table.setPageSize(parseInt(event.target.value));
            });
            
            table.setLocale("fr-fr");
        } catch (e) {
            
        }
    }
}

export default () => window.historyController = new historyController()
