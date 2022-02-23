import React from "react";
import { render } from "@testing-library/react";
import Transacao from "./Transacao";

describe('Componente de criação das informações da lista de extrato',()=>{
    it('O snapshot do component deve permanecer sempre o mesmo', ()=>{
        //uso o elemento container do objeto render
        const {container} = render(<Transacao 
            data="08/10/2022"
            tipo="saque"
            valor="85.00"
        />)
        //para pegar o html criado pela função render referente ao meu componente
        //uso o método firstChild do objeto container de render
        expect(container.firstChild).toMatchSnapshot();

    })
})