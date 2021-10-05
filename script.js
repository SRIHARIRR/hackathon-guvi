const API_URL = "https://api.jikan.moe/v3/search/anime";

const dateFormater = (date) => {
  let newDate = new Date(date);
  let dd = newDate.getDate();
  let mm = newDate.getMonth() + 1;

  let yyyy = newDate.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  let formattedDate = dd + "/" + mm + "/" + yyyy;
  return formattedDate;
};

const createSeriesList = (seriesDetails) => {
  let seriesList = document.createElement("div");
  seriesList.setAttribute("class", "container");

  let cardRow = document.createElement("div");
  cardRow.setAttribute("class", "row");

  seriesDetails.map((data) => {
    let cardColumn = document.createElement("div");
    cardColumn.setAttribute("class", "column");
    cardColumn.style.padding = "3% 5%";
    let card = document.createElement("div");
    card.setAttribute("class", "card");
    card.style.width = "100%";
    card.style.height = "100%";
    let image = document.createElement("img");
    image.setAttribute("class", "card-img-top");
    image.setAttribute("src", data.image_url);
    image.style.width = "100%";
    image.style.height = "55%";
    cardColumn.appendChild(card);
    let title = document.createElement("h3");
    let titleHyperLink = document.createElement("a");
    title.setAttribute("class", "title paddingXY");
    let rating = document.createElement("h4");
    rating.setAttribute("class", "rating paddingXY");
    let startDate = document.createElement("h4");
    startDate.setAttribute("class", "details-txt");
    let endDate = document.createElement("h4");
    endDate.setAttribute("class", "details-txt");
    let type = document.createElement("h4");
    type.setAttribute("class", "details-txt");
    let titleText = document.createTextNode(data.title);
    titleHyperLink.title = data.title;
    titleHyperLink.href = data.url;
    titleHyperLink.style.textDecoration = "none";
    titleHyperLink.setAttribute("target", "_blank");
    let ratingText = document.createTextNode(`IMDB rating: ${data.score}`);
    let startDateText = document.createTextNode(
      `Start Date: ${dateFormater(data.start_date)}`
    );
    let endDateText = document.createTextNode(
      `End Date: ${dateFormater(data.end_date)}`
    );
    let typeText = document.createTextNode(`Series type: ${data.type}`);

    card.appendChild(image);
    card.appendChild(title);
    title.appendChild(titleHyperLink);
    titleHyperLink.appendChild(titleText);
    card.appendChild(rating);
    rating.appendChild(ratingText);
    card.appendChild(startDate);
    startDate.appendChild(startDateText);
    card.appendChild(endDate);
    endDate.appendChild(endDateText);
    card.appendChild(type);
    type.appendChild(typeText);
    cardRow.append(cardColumn);
  });
  let contDiv = document.getElementById('cont');
  seriesList.appendChild(cardRow);
  document.body.append(seriesList);
};

const getSeries = async () => {
  console.log("nbbnn:");
  let response = await fetch(`${API_URL}?q=${document.getElementById('search-input').value}`);
  response
    .json()
    .then((res) => {
      console.log(res.results);
      createSeriesList(res.results);
    })
    .catch((err) => {
      console.log("err:", err);
    });
};

const initialDataLoad = (input) => {
  getSeries(input);
};

let searchContainer = document.createElement("div");
searchContainer.setAttribute("class", "search-container");
let searchInput = document.createElement("input");
searchInput.setAttribute("id", "search-input");
searchInput.setAttribute("placeholder", "Search series here....");
searchInput.setAttribute("type", "text");
searchInput.addEventListener(
  "change",
  getSeries
);

searchContainer.appendChild(searchInput);
document.body.appendChild(searchContainer);
