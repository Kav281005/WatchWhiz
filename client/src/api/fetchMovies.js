// const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

// export async function fetchMovies(query = "batman") {
//   try {
//     const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`;
//     const res = await fetch(url);
//     const data = await res.json();
//     console.log("Movies:", data);
//     return data.Search || [];
//   } catch (err) {
//     console.error("API fetch failed:", err);
//     return [];
//   }
// }
// const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

// export async function fetchMovies(query = "batman") {
//   const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`;
//   const res = await fetch(url);
//   const data = await res.json();
//   console.log("API result:", data); // 👈 ADD THIS
//   return data.Search || [];
// }
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export async function fetchMovies(query = "legend") {
  if (!API_KEY || API_KEY === 'your_api_key_here' || API_KEY === '9db88172') {
    console.error("Missing or invalid OMDB API Key. Please set VITE_OMDB_API_KEY in client/.env");
    return [];
  }

  const urlPage1 = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&page=1`;
  const urlPage2 = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&page=2`;

  try {
    const res1 = await fetch(urlPage1);
    const res2 = await fetch(urlPage2);

    const data1 = await res1.json();
    const data2 = await res2.json();

    if (data1.Response === "False") {
      console.error("OMDB API Error:", data1.Error);
      return [];
    }

    const combined = [...(data1.Search || []), ...(data2.Search || [])].slice(0, 15);
    return combined;
  } catch (err) {
    console.error("Fetch error:", err);
    return [];
  }
}
// const KEY = import.meta.env.VITE_RAPIDAPI_KEY;
// const HOST = import.meta.env.VITE_RAPIDAPI_HOST;

// export async function fetchMovies(query = "legend") {
//   const url = `https://${HOST}/api/imdb/search?type=movie&query=${encodeURIComponent(query)}`;

//   const res = await fetch(url, {
//     method: 'GET',
//     headers: {
//       'X-RapidAPI-Key': KEY,
//       'X-RapidAPI-Host': HOST
//     }
//   });
//   const data = await res.json();
//   return data.results || [];
// }
