import { allPlaylists, songs as allSongs} from "@/lib/data"

export async function GET({ params, request }) {
    //get the id from the url search params
    const { url } = request

    //Una forma de recuperar el id en el querystring: 
    //const [, querystring] = url.split("?")
    //const searchparams = new URLSearchParams(querystring)

    //Otra forma mas sencilla:
    const urlObject = new URL(url)
    const id = urlObject.searchParams.get('id')

    const playlist = allPlaylists.find((playlist) => playlist.id === id)
    const songs = allSongs.filter(song => song.albumId === playlist?.albumId)

    return new Response(JSON.stringify({ playlist, songs }), {
        headers: { "content-type": "application/json" },
    })
}
