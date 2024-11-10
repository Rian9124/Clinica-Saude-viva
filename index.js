const diasContainer = document.getElementById("dias");
const mesAno = document.getElementById("mesAno");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");
const diaSelecionadoEl = document.getElementById("dia");
const diaSemanaEl = document.querySelector(".horario p");
const mesSelecionadoEl = document.getElementById("mesSelecionado");

let diaSemanaFormatado = "";
let dataAtual = new Date();

function carregarCalendario(data) {
    const ano = data.getFullYear();
    const mes = data.getMonth();
    const nomeMes = data.toLocaleString("pt-BR", { month: "long" });
    mesAno.textContent = `${nomeMes.charAt(0).toUpperCase() + nomeMes.slice(1)} ${ano}`;

    diasContainer.innerHTML = "";
    const primeiroDia = new Date(ano, mes, 1).getDay();
    const ultimoDia = new Date(ano, mes + 1, 0).getDate();

    let diaAtual = 1;
    for (let i = 0; i < 6; i++) {
        const linha = document.createElement("tr");
        for (let j = 0; j < 7; j++) {
            const celula = document.createElement("td");

            if (i === 0 && j < primeiroDia) {
                celula.classList.add("disabled");
            } else if (diaAtual > ultimoDia) {
                celula.classList.add("disabled");
            } else {
                celula.textContent = diaAtual;
                celula.classList.add("dia");

                // Passar o dia, mês e ano corretos para a função
                celula.addEventListener("click", (() => {
                    const diaClicado = diaAtual; // Captura o dia atual ao adicionar o evento
                    return () => selecionarDia(diaClicado, mes, ano);
                })());

                diaAtual++;
            }
            linha.appendChild(celula);
        }
        diasContainer.appendChild(linha);
    }
}

function navegarMes(direcao) {
    dataAtual.setMonth(dataAtual.getMonth() + direcao);
    carregarCalendario(dataAtual);
}

function selecionarDia(dia, mes, ano) {
    const dataSelecionada = new Date(ano, mes, dia);
    const nomeDiaSemana = dataSelecionada.toLocaleDateString("pt-BR", { weekday: "long" });
    
    // Atualize a variável global
    diaSemanaFormatado = nomeDiaSemana.charAt(0).toUpperCase() + nomeDiaSemana.slice(1);
    diaSemanaEl.textContent = diaSemanaFormatado;
    
    // Atualizar o restante dos dados
    diaSelecionadoEl.textContent = dia;
    const nomeMes = dataSelecionada.toLocaleDateString("pt-BR", { month: "long" });
    mesSelecionadoEl.textContent = nomeMes.charAt(0).toUpperCase() + nomeMes.slice(1);
}


prevMonthBtn.addEventListener("click", () => navegarMes(-1));
nextMonthBtn.addEventListener("click", () => navegarMes(1));

carregarCalendario(dataAtual);

// agendemento outro lado


function confirmAgendamento() {
    var nomePaciente = document.getElementById('nomePaciente').value;
    var confirmNome = document.getElementById('paciente');
    confirmNome.innerHTML = nomePaciente;

    var numeroPaciente =  document.getElementById('telPaciente').value;
    var confirmtel =  document.getElementById('numPaciente');
    confirmtel.innerHTML = numeroPaciente;

    var diaHora = document.getElementById('diaHora');
    var horaSelecionada = document.getElementById('horaSelecionada').value;

    diaHora.innerText = ` ${diaSemanaFormatado}, ${diaSelecionadoEl.textContent} de ${mesSelecionadoEl.textContent} às ${horaSelecionada}`;

    var doutor = document.getElementById('Doutor').value;
    var profissional = document.getElementById('profissional');
    profissional.innerText = doutor;
}