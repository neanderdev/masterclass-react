import { FormEvent, KeyboardEvent, useState } from 'react';

import { Header } from '../components/Header';
import { Separator } from '../components/Separator';
import { Tweet } from '../components/Tweet';

import './Timeline.css';

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

export function Timeline() {
    const [newTweet, setNewTweet] = useState('');
    const [tweets, setTweets] = useState([
        'Meu primeiro tweet',
        'Teste',
        'Deu certo twretar!',
    ]);

    function handleHotKeySubmit(event: KeyboardEvent) {
        if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
            setTweets([...tweets, newTweet]);
            setNewTweet('');
        }
    }

    function createNewTweet(event: FormEvent) {
        event.preventDefault();

        setTweets([...tweets, newTweet]);
        setNewTweet('');
    }

    return (
        <main className='timeline'>
            <Header title='Home' />

            <form className="new-tweet-form" onSubmit={createNewTweet}>
                <label htmlFor="tweet">
                    <img src="https://github.com/neanderdev.png" alt="Neander de Souza" />

                    <textarea
                        id="tweet"
                        placeholder="What's happening?"
                        value={newTweet}
                        onKeyDown={handleHotKeySubmit}
                        onChange={(event) => setNewTweet(event.target.value)}
                    />
                </label>

                <button type="submit">Tweet</button>
            </form>

            <Separator />

            {
                tweets.map((tweet, index) => {
                    return <Tweet key={index} content={tweet} />
                })
            }
        </main>
    );
}