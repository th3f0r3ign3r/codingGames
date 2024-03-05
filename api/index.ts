import axios from "axios";

const ALBUMS_URL = "https://jsonplaceholder.typicode.com/albums";
const PHOTOS_URL = "https://jsonplaceholder.typicode.com/photos";

export const getAlbums = async () => {
  const response = await axios(ALBUMS_URL);
  return response.data;
};

export const getPhotoByAlbumId = async (albumId: string | number) => {
  const response = await axios(PHOTOS_URL + "?albumId=" + albumId);
  return response.data;
};

export const getAlbum = async (id: string | number) => {
  const response = await axios(ALBUMS_URL + "/" + id);
  return response.data;
}

export const getPhotoDetails = async (id: string | number) => {
  const response = await axios(PHOTOS_URL + "/" + id);
  return response.data;
}