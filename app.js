const express = require("express");
const cors = require("cors");
const movies = require("./src/models/movies");
const users = require("./src/models/users");
// const cookieParser = require('cookie-parser')

//* express 할당
const app = express();

app.use(express.json());
app.use(cors());

function getMovies(page) {
  const moviesList = movies.map((movie) => ({
    ...movie,
    name: users.find((user) => user.id === movie.user_id).name,
  }));

  // 생성일 내림차순 정렬
  moviesList.sort(function (a, b) {
    const prevTImestamp = new Date(a.created_at).getTime();
    const curTImestamp = new Date(b.created_at).getTime();

    return curTImestamp - prevTImestamp;
  });

  //페이지네이션
  const cloneMovies = [...moviesList];
  const lastPage = Math.ceil(movies.length / 10);
  const page = req.query.page || 1;
  const startIndex = (page - 1) * 10;
  const paginationMovies = cloneMovies.splice(startIndex, 10);
}

//* / 경로에 get 요청에 대해 작동
app.get("/movies", (req, res) => {
  const page = null;
  const paginationMovies = getMovies();
  res.send({
    pageInfo: {
      lastPage,
    },
    movies: paginationMovies,
  });
});

app.get("/movies/:id", (req, res) => {
  //splice사용
  // 1. 사용자아이디를 가져온다.
  const id = req.params.id;
  // 2. 해당하는 movie를 가져온다.
  const findMovie = movies.find((movie) => movie.id === Number(id));
  // 3. 가져온 movie에서 hit_count를 +1해준 객체를 만든다.
  const plusView = {
    ...findMovie,
    hit_count: findMovie.hit_count + 1,
  };
  // 4. 해당하는 movie의 인덱스를 가져온다.
  const targetIndex = movies.findIndex((movie) => movie.id === Number(id));
  // 5. 해당 index의 movie의 정보를 새로 만든 객체와 바꿔준다.
  movies.splice(targetIndex, 1, plusView);

  res.send(plusView);
});

app.post("/movies", (req, res) => {
  // 1. 사용자가 등록할 영화의 정보를 주면 받아온다. from요청 (req)
  const newMovie = req.body;
  // console.log(newMovie);
  // 2. 가져온 영화 정보에 id를 부여한다.
  newMovie.id = movies[movies.length - 1].id + 1;
  // 3. 조회수(hit_count)는 기본으로 0
  newMovie.hit_count = 0;
  // 4. 작성일은 현재시각
  newMovie.created_at = new Date().toLocaleString();
  // 5. id까지 부여된 영화 정보를 movies에 추가한다.
  movies.unshift(newMovie);
  res.send(newMovie);
});

//* app listen (서버 실행)
app.listen(3100, () => {
  console.log("✅ 서버가 연결되었습니다. http://localhost:3100");
});
