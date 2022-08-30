const URL = "https://opentdb.com/api.php?amount=10";
const form = document.querySelector("form");
const main = document.querySelector("main");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  deleteOldQuestions();
  getData(URL);
});

const getData = (url) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => createCard(data.results))
    .catch(console.log);
};

const createCard = (questions) => {
  for (let question of questions) {
    console.log(question);
    const article = document.createElement("article");
    article.classList.add("card");
    article.classList.add(question.difficulty);

    const h2 = document.createElement("h2");
    h2.textContent = question.category;

    const p = document.createElement("p");
    p.innerText = decodeHtmlEntity(question.question);

    const button = document.createElement("button");
    button.textContent = "Show Content";
    button.addEventListener("click", (e) => {
      e.target.nextElementSibling.classList.toggle("hidden");
    });

    const p2 = document.createElement("p");
    p2.classList.add("hidden");
    p2.textContent = question.correct_answer;
    article.append(h2, p, button, p2);

    main.append(article);
  }
};

const deleteOldQuestions = () => {
  main.innerHTML = "";
};

const decodeHtmlEntity = (html) => {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};
