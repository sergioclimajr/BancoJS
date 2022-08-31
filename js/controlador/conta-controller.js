class ContaController {
    constructor() {
        this.repositorioContas = new RepositorioContas();
    }

    adicionarConta(conta) {
        this.repositorioContas.adicionar(conta);
    }

    listar() {
        this.repositorioContas.getContas().forEach(conta =>
            this.inserirContaNoHTML(conta)
        );
    }

    inserir(evento) {
        evento.preventDefault();
        const elementoNumero = document.querySelector("#numero");
        const elementoSaldo = document.querySelector("#saldo");
        const elementoTipoConta = document.querySelector("#tipoContas");
        const elementoDataAniver = document.querySelector("#dataAniversario");
        switch(elementoTipoConta.value) {
            case "conta":
                const conta = new Conta(elementoNumero.value, Number(elementoSaldo.value));
                this.repositorioContas.adicionar(conta);
                this.inserirContaNoHTML(conta);
                break
            case "conta_bonificada":
                const contaBonificada = new ContaBonificada(elementoNumero.value, Number(elementoSaldo.value));
                this.repositorioContas.adicionar(contaBonificada);
                this.inserirContaNoHTML(contaBonificada);
                break
            case "conta_poupanca":
                const contaPoupanca = new ContaPoupanca(elementoNumero.value,
                Number(elementoSaldo.value), elementoDataAniver.value);
                this.repositorioContas.adicionar(contaPoupanca);
                this.inserirContaNoHTML(contaPoupanca);
                break
        }
        
        

        const conta = new Conta(elementoNumero.value,
            Number(elementoSaldo.value), elementoTipoConta.value);
        this.repositorioContas.adicionar(conta);
        this.inserirContaNoHTML(conta);
    }

    inserirContaNoHTML(conta) {
        const elementoP = document.createElement('p');
        elementoP.textContent = 'Conta ' + conta.numero + ': ' + conta.saldo;
        const botaoApagar = document.createElement('button');
        botaoApagar.textContent = 'X';

        botaoApagar.addEventListener('click', (event) => {
            this.repositorioContas.remover(conta.numero);
            event.target.parentElement.remove();
        });

        elementoP.appendChild(botaoApagar);
        document.body.appendChild(elementoP);
    }
}
