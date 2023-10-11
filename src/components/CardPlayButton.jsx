import { Pause, Play } from "./Player"
import { usePlayerStore } from '@/store/playerStore'

export function CardPlayButton({ id }) {

    const {
        currentMusic,
        isPlaying,
        setIsPlaying,
        setCurrentMusic,
    } = usePlayerStore(state => state)

    const isPlayingPlayList = isPlaying && currentMusic?.playlist?.id === id

    const handleClick = () => {
        if(isPlayingPlayList){
            setIsPlaying(false)
            return
        }
//promises
        fetch(`/api/get-info-playlist.json?id=${id}`)
        .then(res => res.json())
        .then(data => {
            const { songs, playlist } = data

            setIsPlaying(true)
            setCurrentMusic({ songs, playlist, song: songs[0] })

            //console.log({songs, playlist})
        })

        
        //async/await se hace así:
        //const res = await fetch(`/api/get-info-playlist.json?id=${id}`)
        //const data = await res.json()
    }



    return (
        <button onClick={handleClick} className="card-play-button rounded-full bg-green-500 p-4">
            {isPlayingPlayList ? <Pause /> : <Play />}
        </button>
    )
}

