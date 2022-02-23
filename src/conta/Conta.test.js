import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Conta from './Conta'

describe('Componente de conta', ()=>{
    it('Exibir o saldo da conta como valor monetário', ()=>{
        //precisamos renderizar nosso elemento 
        //passando já o valor da propriedade saldo 
       render(<Conta saldo={1000}/>)
        //como não sabemos se a formatação está vindo correta, usamos a forma abaixo
        //para garantir que consigamos pegar o valor independente do valor que ele tenha
        const saldo = screen.getByTestId('saldo-conta')
        //agora no sado, precisamos filtrar para pegar somente o texto desse elemento

      
      expect(saldo.textContent).toBe('R$ 1000')
    })

    it('Chama a função de realizar transação quando o botão for clicado', ()=>{
      const funcaoRealizaTransacao = jest.fn()
      render(<Conta saldo={1000} realizarTransacao={funcaoRealizaTransacao} />)

      fireEvent.click(screen.getByText('Realizar operação'))
      
      expect(funcaoRealizaTransacao).toHaveBeenCalled()
    })
})