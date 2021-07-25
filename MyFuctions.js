$('#myModal').on('shown.bs.modal', function () {   //Modal do bootstrap
    $('#myInput').trigger('focus')
})


function alterar_visibilidade(id) {        //para a tabela com as informações em resumo na pagina dos empregos
    var e = document.getElementById(id);
    if (e.style.display == 'block')
        e.style.display = 'none';
    else
        e.style.display = 'block';
}


 
function alterar_visibilidade_favoritos(id, id2, id3, id4) { //para as tabelas dos favoritos
    var principal = document.getElementById(id);
    var b = document.getElementById(id2);
    var c = document.getElementById(id3);
    var d = document.getElementById(id4);

    if (principal.style.display == 'none') {
        b.style.display = 'none';
        c.style.display = 'none';
        d.style.display = 'none';
        principal.style.display = 'block';
    } else
        principal.style.display = 'none';
}


// variaveis necessárias
var arr = new Array();
let favoritos = [];
let entrevistas = [];
let validas = [];
let expiradas = [];
let candidaturas = [];



function lerLocalStorage() {
    let str = localStorage.getItem("ListaFavoritos")
    if (str != null)
        arr = JSON.parse(str); //parse -> transforma string em object 
}


x = 1; // vai ser respnsável por incrementar em cada adição para nos dar a última linha

function CriarTabela(titulo, empresa, local, data) {

    let table = document.getElementById('Empregos-Validos-tabela');
    var row = table.insertRow(x);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);

    cell1.innerHTML = titulo;
    cell2.innerHTML = empresa;
    cell3.innerHTML = local;
    cell4.innerHTML = data;

    row.id = 'linhaF:' + x++;    // este id vai servir para obter a linha onde clicamos na função obterId()
}

y = 1; //mesma função de x em cima, resposável por incrementar em cada adição para nos dar a ultima linha

function CriarTabelaEntrevistas(titulo, local, data, hora) {
    let table = document.getElementById('Entrevista-Marcada-Tabela');
    var row = table.insertRow(y);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);

    cell1.innerHTML = titulo;
    cell2.innerHTML = local;
    cell3.innerHTML = data;
    cell4.innerHTML = hora;

    row.id = 'linhaE:' + y++;    // este id vai servir para obter a linha onde clicamos na função obterId()
}

z = 1;

function CriarTabelaExpiradas(titulo, local, data, hora) {
    let table = document.getElementById('Empregos-Expirados-tabela');
    var row = table.insertRow(z);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);

    cell1.innerHTML = titulo;
    cell2.innerHTML = local;
    cell3.innerHTML = data;
    cell4.innerHTML = hora;

    row.id = 'linhaX:' + z++;    // este id vai servir para obter a linha onde clicamos na função obterId()
}

w = 1;
function CriarTabelaCandidaturas(titulo, local, data, hora) {
    let table = document.getElementById('Candidaturas-Tabela');
    var row = table.insertRow(w);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);

    cell1.innerHTML = titulo;
    cell2.innerHTML = local;
    cell3.innerHTML = data;
    cell4.innerHTML = hora;

    row.id = 'linhaC:' + w++;    // este id vai servir para obter a linha onde clicamos na função obterId()
}

let nlinha;

var criarModal = function () {
    nlinha = this.id.substring(7);
    SeparadorTabelas = this.id.substring(0, 6);

    let modals = document.getElementById('ModalDescricao');

    while (modals.firstChild) {                             //remover modals já criados para gerar um novo logo abaixo
        modals.removeChild(modals.firstChild);
    }
    if (SeparadorTabelas == "linhaF" && validas[nlinha - 1].candidatura.estado == false) {
        modals.innerHTML += '<div class="modal fade" id="modalOfferDescription" tabindex="-1" role="dialog" aria-labelledby="modalOfferDescription Label" aria-hidden="true">' +
            '<div class="modal-dialog" role="document">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<h5 class="modal-title modal-title-description" id="modalOfferDescription" Label">' + validas[nlinha - 1].titulo + '</h5>' +
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
            '<span aria-hidden="true">&times;</span>' +
            '</button>' +
            '</div>' +
            '<div class="modal-body">' +
            '<p class="modal-body-description">' +
            '<strong>Empresa:</strong> ' + validas[nlinha - 1].empresa +
            '<br><strong>Localização:</strong> ' + validas[nlinha - 1].local +
            '<br><strong>Experiência:</strong> ' + validas[nlinha - 1].experiencia +
            '<br><strong>Email:</strong> ' + validas[nlinha - 1].email +
            '<br><strong>Data limite de candidatura:</strong> ' + validas[nlinha - 1].data +
            '<br><strong>Método de inserção:</strong> ' + validas[nlinha - 1].metodoInsercao +
            '<br><br><strong>Descrição:</strong><br>' +
            validas[nlinha - 1].descricao +
            '</p>' +
            '</div>' +
            '<div class = "modal-footer">' +
            '<a class="btn btn-sm btn-light font-weight-bold float-right" href="javascript:void(0)" data-toggle="modal" data-target="#candidaturaModal" onclick="FecharModalDescricao()">' +
            "Candidatura" + '</a>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
    } else if (SeparadorTabelas == "linhaF" && validas[nlinha - 1].candidatura.estado == true) {
        modals.innerHTML += '<div class="modal fade" id="modalOfferDescription" tabindex="-1" role="dialog" aria-labelledby="modalOfferDescription Label" aria-hidden="true">' +
            '<div class="modal-dialog" role="document">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<h5 class="modal-title modal-title-description" id="modalOfferDescription" Label">' + validas[nlinha - 1].titulo + '</h5>' +
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
            '<span aria-hidden="true">&times;</span>' +
            '</button>' +
            '</div>' +
            '<div class="modal-body">' +
            '<p class="modal-body-description">' +
            '<strong>Empresa:</strong> ' + validas[nlinha - 1].empresa +
            '<br><strong>Localização:</strong> ' + validas[nlinha - 1].local +
            '<br><strong>Experiência:</strong> ' + validas[nlinha - 1].experiencia +
            '<br><strong>Email:</strong> ' + validas[nlinha - 1].email +
            '<br><strong>Data limite de candidatura:</strong> ' + validas[nlinha - 1].data +
            '<br><strong>Método de inserção:</strong> ' + validas[nlinha - 1].metodoInsercao +
            '<br><br><strong>Descrição:</strong><br>' +
            validas[nlinha - 1].descricao +
            '</p>' +
            '</div>' +
            '<div class = "modal-footer">' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
    }else if (SeparadorTabelas == "linhaE") {
        modals.innerHTML += '<div class="modal fade" id="modalOfferDescription" tabindex="-1" role="dialog" aria-labelledby="modalOfferDescription Label" aria-hidden="true">' +
            '<div class="modal-dialog" role="document">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<h5 class="modal-title modal-title-description" id="modalOfferDescription" Label">' + entrevistas[nlinha - 1].titulo + '</h5>' +
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
            '<span aria-hidden="true">&times;</span>' +
            '</button>' +
            '</div>' +
            '<div class="modal-body">' +
            '<p class="modal-body-description">' +
            '<strong>Empresa:</strong> ' + entrevistas[nlinha - 1].empresa +
            '<br><strong>Localização:</strong> ' + entrevistas[nlinha - 1].local +
            '<br><strong>Experiência:</strong> ' + entrevistas[nlinha - 1].experiencia +
            '<br><strong>Email:</strong> ' + entrevistas[nlinha - 1].email +
            '<br><strong>Data da entrevista:</strong> ' + entrevistas[nlinha - 1].entrevistas[0].data +
            '<br><strong>Hora da entrevista:</strong> ' + entrevistas[nlinha - 1].entrevistas[0].hora +
            '<br><strong>Notas Entrevista:</strong> ' + entrevistas[nlinha - 1].entrevistas[0].notas +
            '<br><strong>Estado e data do recrutamento:</strong> ' + entrevistas[nlinha - 1].recrutamento.data + ' ' + entrevistas[nlinha - 1].recrutamento.estado +
            '<br><strong>Método de inserção:</strong> ' + entrevistas[nlinha - 1].metodoInsercao +
            '<br><br><strong>Descrição:</strong><br>' +
            entrevistas[nlinha - 1].descricao +
            '</p>' +
            '</div>' +
            '<div class = "modal-footer">' +
            '<button type="button" class="btn btn-sm btn-light font-weight-bold mr-2 float-right" href="javascript:void(0)" data-toggle="modal" data-target="#recrutamentoModal" onclick="FecharModalDescricao()">'
            + "Estado" + '</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
    } else if (SeparadorTabelas == "linhaX") {
        modals.innerHTML += '<div class="modal fade" id="modalOfferDescription" tabindex="-1" role="dialog" aria-labelledby="modalOfferDescription Label" aria-hidden="true">' +
            '<div class="modal-dialog" role="document">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<h5 class="modal-title modal-title-description" id="modalOfferDescription" Label">' + expiradas[nlinha - 1].titulo + '</h5>' +
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
            '<span aria-hidden="true">&times;</span>' +
            '</button>' +
            '</div>' +
            '<div class="modal-body">' +
            '<p class="modal-body-description">' +
            '<strong>Empresa:</strong> ' + expiradas[nlinha - 1].empresa +
            '<br><strong>Localização:</strong> ' + expiradas[nlinha - 1].local +
            '<br><strong>Experiência:</strong> ' + expiradas[nlinha - 1].experiencia +
            '<br><strong>Email:</strong> ' + expiradas[nlinha - 1].email +
            '<br><strong>Data limite de candidatura:</strong> ' + expiradas[nlinha - 1].data +
            '<br><strong>Método de inserção:</strong> ' + expiradas[nlinha - 1].metodoInsercao +
            '<br><br><strong>Descrição:</strong><br>' +
            expiradas[nlinha - 1].descricao +
            '</p>' +
            '</div>' +
            '<div class = "modal-footer">' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
    } else if (SeparadorTabelas == "linhaC") {
        modals.innerHTML += '<div class="modal fade" id="modalOfferDescription" tabindex="-1" role="dialog" aria-labelledby="modalOfferDescription Label" aria-hidden="true">' +
            '<div class="modal-dialog" role="document">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<h5 class="modal-title modal-title-description" id="modalOfferDescription" Label">' + candidaturas[nlinha - 1].titulo + '</h5>' +
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
            '<span aria-hidden="true">&times;</span>' +
            '</button>' +
            '</div>' +
            '<div class="modal-body">' +
            '<p class="modal-body-description">' +
            '<strong>Empresa:</strong> ' + candidaturas[nlinha - 1].empresa +
            '<br><strong>Localização:</strong> ' + candidaturas[nlinha - 1].local +
            '<br><strong>Experiência:</strong> ' + candidaturas[nlinha - 1].experiencia +
            '<br><strong>Email:</strong> ' + candidaturas[nlinha - 1].email +
            '<br><strong>Data da candidatura:</strong> ' + candidaturas[nlinha - 1].candidatura.data +
            '<br><strong>Estado e data do recrutamento:</strong> ' + candidaturas[nlinha - 1].recrutamento.data + ' ' + candidaturas[nlinha - 1].recrutamento.estado +
            '<br><strong>Método de inserção:</strong> ' + candidaturas[nlinha - 1].metodoInsercao +
            '<br><br><strong>Descrição:</strong><br>' +
            candidaturas[nlinha - 1].descricao +
            '</p>' +
            '</div>' +
            '<div class = "modal-footer">' +
            '<a class="btn btn-sm btn-light font-weight-bold float-right" href="javascript:void(0)" data-toggle="modal" data-target="#entrevistaModal" onclick="FecharModalDescricao()">' +
            "Entrevista" + '</a>' +
            '<button type="button" class="btn btn-sm btn-light font-weight-bold mr-2 float-right" href="javascript:void(0)" data-toggle="modal" data-target="#recrutamentoModal" onclick="FecharModalDescricao()">'
            + "Estado" + '</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
    }
    $('#modalOfferDescription').modal('show');  //modal do bootstrap
}

function CriarEntrevista(aData, aHora, aObservações, indice) { //cria objeto entrevista

    let entrevista = {
        data: aData,
        hora: aHora,
        notas: aObservações,
    }

    favoritos[indice].entrevistas.push(entrevista);


}


function LimparTabela() {  //limpa local storage limpando assim as tabelas
    arr.length = 0;
    localStorage.clear();
    location.reload();
}



function ObterId(tabela, tabela2, tabela3, tabela4) {  //função que obtem o id da tabela que clicamos 
    x = 1;

    for (i = 0; i < validas.length; i++) {
        document.getElementById(tabela + x++).onclick = criarModal;
    }
    x = 1;
    for (i = 0; i < entrevistas.length; i++) {
        document.getElementById(tabela2 + x++).onclick = criarModal;
    }
    x = 1;
    for (i = 0; i < expiradas.length; i++) {
        document.getElementById(tabela3 + x++).onclick = criarModal;
    }
    x = 1;
    for (i = 0; i < candidaturas.length; i++) {
        document.getElementById(tabela4 + x++).onclick = criarModal;
    }
}


function FecharModalDescricao() {                    //fechar modal bootstrap (função predefinida no bootstrap)
    $('#modalOfferDescription').modal('hide');
}

function VerificarData(data) {

    exp = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;  // expressão para comparar com data

    if (data != null && !data.match(exp)) {
        return false;
    }
    return true;
}

function VerificarHora(hora) {

    
    exp = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/; // expressão para comparar com hora

    if (hora != null && !hora.match(exp)) {
        return false;
    }
    return true;
}

function HoraAtual() {
    var hoje = new Date();
    var dd = hoje.getDate();
    var mm = hoje.getMonth() + 1; //janeiro é 0

    var yyyy = hoje.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var hoje = dd + '/' + mm + '/' + yyyy;

    return (hoje);
}

function CompararDatas(dataDada, hoje) {    // compara dia por dia, mes por mes e ano por ano para saber qual a data mais recente

    var dd = dataDada.substring(0, 2);
    var mm = dataDada.substring(3, 5);
    var yyyy = dataDada.substring(6, 10);

    var ddHoje = hoje.substring(0, 2);
    var mmHoje = hoje.substring(3, 5);
    var yyyyHoje = hoje.substring(6, 10);

    if (yyyy > yyyyHoje)
        return true;
    else if (yyyy < yyyyHoje)
        return false;

    if (mm > mmHoje)
        return true;
    else if (mm < mmHoje)
        return false;

    if (dd > ddHoje)
        return true;
    else if (dd < ddHoje)
        return false;

    return true;
}