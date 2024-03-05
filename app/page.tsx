import Link from "next/link";
import { getAlbums } from "@/api";

type Album = {
  id: number;
  title: string;
  userId: number;
};

export default async function Home() {
  const albums: Album[] = await getAlbums().catch((error) => {
    if (error.code === "ECONNABORTED") {
      // Gérer le timeout (trop de temps)
      alert("Timeout: La requête a pris trop de temps pour répondre.");
    } else if (error.response) {
      // Gérer les erreurs de statut HTTP
      alert(`Statut de la réponse: ${error.response.status}`);
    } else if (error.code === "ENOTFOUND" || error.code === "EAI_AGAIN") {
      // Gérer l'absence de connexion Internet
      alert("Pas de connexion Internet.");
    } else {
      // Gérer d'autres erreurs
      console.error("Erreur lors de la requête vers l'API:", error.message);
    }
  });

  return (
    <main className="flex min-h-screen flex-col p-5 pt-20 max-w-7xl mx-auto">
      <h1 className="text-6xl font-bold tracking-tighter">Albums</h1>

      {albums.length === 0 ? (
        <div className="flex items-center gap-3 p-3 mt-5 rounded-full bg-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 animate-spin"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
          <span>Loading...</span>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {albums.map((album) => (
            <Link
              href={`/album/${album.id}`}
              key={album.id}
              className="flex p-3 bg-white rounded-xl h-32 relative overflow-hidden shadow hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              <h2 className="text-xl tracking-tight">{album.title}</h2>
              <span className="absolute -bottom-2.5 text-gray-200/90 tracking-tighter right-2 font-extrabold text-7xl">
                {album.id}
              </span>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
