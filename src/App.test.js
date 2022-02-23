//Precisamos carregar o React também 
import React from 'react';
//além disso precisamos renderizar o elemento e usar o screen para 
//que o nosso teste possa acessar o componente criado
import { render, screen, fireEvent, act } from '@testing-library/react';


//importamos o componente que será testado 
import App, {calcularNovoSaldo} from './App';

//Quero saber se o nome da minha aplicação está aparecendo
//porque quero sempre que os usuários saibam que estão no APP da minha aplicação. 
describe('Componente principal', ()=>{
    describe('Quando eu abro o app do banco', ()=>{
        it('o nome é exibido', ()=>{
            //após importar o react, render e screen
            //renderizando o componente dentro do teste
            act(() => {
                render(<App />);
              })
    
            //espero que o nome do banco sempre esteja no doc html
            //verifcamos então as palavras esperadas 
            // usamos o screen buscando a string do testo procurado ao invé disso = expect('ByteBank').toBeInTheDocument();
            expect(screen.getByText('ByteBank')).toBeInTheDocument();
        })
        it('o nome saldo deve ser exibido', ()=>{
            act(() => {
                render(<App />);
              })
        
            expect(screen.getByText('Saldo:')).toBeInTheDocument();
        })
    
        it('o botão de realizar operação deve ser exibido', ()=>{
            act(() => {
                render(<App />);
              })
        
            expect(screen.getByText('Realizar operação')).toBeInTheDocument();
        })
    })
    describe('Quando eu realizar uma transação', ()=>{
        it('que é um saque, o valor do saldo deve diminuir', ()=>{
            const valores = {
                transacao: 'saque',
                valor: 50,
            }
            const novoSaldo = calcularNovoSaldo(valores, 150)
            expect(novoSaldo).toBe(100)
        })
        it('que é um saque com valor maior que o saldo, o valor do saldo deve ficar negativo', async ()=>{
            const valores = {
                transacao: 'saque',
                valor: 160,
            }
            const novoSaldo = calcularNovoSaldo(valores, 150)
            expect(novoSaldo).toBe(-10)
        })

        it('que é um saque, a transação deve ser realizada',  ()=>{

            render(<App />)

       
            const saldo =  screen.getByText('R$ 1000')
            const transacao = screen.getByLabelText('Saque')
            const valor = screen.getByTestId('valor')
            const botaoTransacao = screen.getByText('Realizar operação')

             expect(saldo.textContent).toBe('R$ 1000')

            fireEvent.click(transacao, { target: {value: 'saque'}});
            fireEvent.change(valor, {target: { value: 10 }})
            fireEvent.click(botaoTransacao)

             expect(saldo.textContent).toBe('R$ 990')
    })
    })
})

