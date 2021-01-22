import { useEffect, useRef, useState } from "react";
import './MusicPlayer.css';

const MusicPlayer = () => {
    let [reproducing, setReproducing] = useState(false);
    let [actualIndex, setactualIndex] = useState(null);
    let player = useRef(null);
    const [state, setState] = useState({
        urlApi: 'https://assets.breatheco.de/apis/sound/songs',
        musicMario: null
    });


    //sando Fetch para acceder a la API
    const getPlayer = () => {
        fetch(state.urlApi, {})
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setState({
                    ...state,
                    musicMario: data
                })
            })
    }

    //Funcion para concatenar la URL de la API
    function link(url, i) {
        setactualIndex(actualIndex = i);
        player.current.src = `https://assets.breatheco.de/apis/sound/${url}`;
        setReproducing(true);
    }
    //Funcion para darle fncionalidad al boton play
    function playButton() {
        if (actualIndex === null) {
            setReproducing(reproducing = true);
            link(state.musicMario[0].url, 0)
            player.current.play();
        }
        else {
            let continua = actualIndex;
            link(state.musicMario[continua].url, continua)
            player.current.play();
        }
    };
    //Fuuncion para darle fncionalidad al boton pase
    function pauseButton() {
        setReproducing(false);
        player.current.pause();
    }
    //Funcion para conmutar del play a pase
    function buttonPlayPause() {
        (reproducing === false) ? playButton() : pauseButton();

    }
    ///Funcion para darle funcionalidad al boton next
    function nextButton() {
        let next1;
        if (actualIndex == null) {
            next1 = 0;
            link(state.musicMario[next1].url, next1);
        }
        else if (actualIndex === state.musicMario.length - 1) {
            setactualIndex(actualIndex = 0);
            next1 = actualIndex;
            link(state.musicMario[next1].url, next1);
        }
        else {
            setactualIndex(actualIndex++);
            next1 = actualIndex;
            link(state.musicMario[next1].url, next1);
        }
    }
    ///Funcion para darle funcionalidad al boton preview
    function previewButton() {
        let prev;
        if (actualIndex == null) {
            prev = 0;
            link(state.musicMario[prev].url, prev);
        } else if (actualIndex === 0) {
            setactualIndex(actualIndex = 2);
            prev = actualIndex;
            link(state.musicMario[prev].url, prev);
        }
        else {
            setactualIndex(actualIndex--);
            prev = actualIndex;
            link(state.musicMario[prev].url, prev);
        }
    }
    
    useEffect(() => {
        getPlayer()
    }, []);

    return (
        <div className='classDiv container'>
            <div className="card-body"  >
                <ul id='ulid' className="list-group " style={{ cursor: 'pointer'}}>
                    {
                        !!state.musicMario && state.musicMario.length > 0 &&
                        state.musicMario.map((val, i) => {
                            return <li id='liid' className="list-group-item list-group-item-action" key={i} onClick={(e) => link(val.url, i)}>
                                {val.name}
                            </li>
                        })
                    }
                </ul>
                <audio id='audio' ref={player} autoPlay type="audio/mp3" />

                <div className="card-footer d-flex justify-content-center bg-secondary">
                    <button className="btn btn-secondary fa  fa-step-backward" type="button" onClick={() => previewButton()} ></button>
                    <button className={"btn btn-secondary fa " + ((reproducing) ? 'fa-pause' : 'fa-play')} type="button" onClick={() => buttonPlayPause()}></button>
                    <button className="btn btn-secondary fa fa-step-forward" type="button" onClick={() => nextButton()}></button>
                </div>
            </div>
        </div>

    );
}



export default MusicPlayer;