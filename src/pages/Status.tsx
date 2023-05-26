import { FormEvent, KeyboardEvent, useState } from 'react';
import { PaperPlaneRight } from 'phosphor-react';

import { Header } from '../components/Header';
import { Separator } from '../components/Separator';
import { Tweet } from '../components/Tweet';

import './Status.css';

/**
 * Fluxo de renderização:
 * 
 * 1. Toda vez que alteramos o estado de um componente, TODO componente é recalculado.
 * 2. Toda vez que o seu componente PAI renderizar.
 * 3. Toda vez que alguma das suas propriedades mudarem.
 * 
 */

/** 
 * Algoritmo de reconciliação:
 * 
 * 1. Criar em memória a nova versão do HTML do componente.
 * 2. Compara essa nova versão com a versão anterior do HTML.
 * 3. Aplicar as operações JavaScript para alterar somente o necessário no HTML.
 * 
*/

export function Status() {
    const [newAnswer, setNewAnswer] = useState('');
    const [answers, setAnswers] = useState([
        'Concordo....',
        'Olha, faz sentido.',
        'Parabéns pelo progresso!',
    ]);

    function handleHotKeySubmit(event: KeyboardEvent) {
        if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
            setAnswers([...answers, newAnswer]);
            setNewAnswer('');
        }
    }

    function createNewAnswer(event: FormEvent) {
        event.preventDefault();

        setAnswers([...answers, newAnswer]);
        setNewAnswer('');
    }

    return (
        <main className='status'>
            <Header title='Tweet' />

            <Tweet content='Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium eum rerum quis, neque molestias officiis? Provident tempore facilis accusamus eligendi ipsum eum tenetur. Magnam voluptatem sed mollitia quibusdam eos perferendis?' />

            <Separator />

            <form onSubmit={createNewAnswer} className="answer-tweet-form">
                <label htmlFor="answer">
                    <img src="https://github.com/neanderdev.png" alt="Neander de Souza" />

                    <textarea
                        id="answer"
                        placeholder="Tweet your answer"
                        value={newAnswer}
                        onKeyDown={handleHotKeySubmit}
                        onChange={(event) => setNewAnswer(event.target.value)}
                    />
                </label>

                <button type="submit">
                    <PaperPlaneRight />

                    <span>Answer</span>
                </button>
            </form>

            {
                answers.map((answer, index) => {
                    return <Tweet key={index} content={answer} />
                })
            }
        </main>
    );
}