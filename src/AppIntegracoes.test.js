import React from 'react';
import { render, screen } from '@testing-library/react';
import api from './api'
import App from './App'

jest.mock('./api')

describe('Requisições para API', () => {
    it('Exibir lista de transações através da API', async () => {
        api.listaTransacoes.mockResolvedValue([
            {
                "valor": "10",
                "transacao": "saque",
                "data": "10/08/2020",
                "id": 1
            },
            {
                "transacao": "deposito",
                "valor": "20",
                "data": "26/09/2020",
                "id": 2
            },
        ])
        
        render(<App />)
        //pra chegar se um dos elementos tem o saque, no caso o nosso primeiro valor
        // expect(screen.findByText('saque')).toBeInTheDocument;
        //espero que a lista de elementos retornado tenha dois valores

        //primeiro verificamos se os dados de fato estão sendo trazidos pela api mockada, e se são printados em nosso elemento assim que carregarem
        //para isso faremos a busca pela string 'valor' referente ao valor do nosso primeiro objeto retornado da api que vai ser impresso
        //na lista de transações, checando assim o retorno assíncrono 
        expect(await screen.findByText('saque')).toBeInTheDocument();
        expect(screen.getByTestId('transacoes').children.length).toBe(2)
    })
})