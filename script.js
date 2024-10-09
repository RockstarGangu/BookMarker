const addToBookmark = document.getElementById("bookmark-form");
addToBookmark.addEventListener("submit", saveBookmark);

function saveBookmark(e) {
  const siteUrl = document.getElementById("bookmark-url").value;
  const siteName = document.getElementById("site-name").value;

  if (!siteName) {
    alert("Please add site-name");
  }

  const expression =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  const regex = new RegExp(expression);
  if (!siteUrl.match(regex)) {
    return alert("Please enter a valid URL");
  }

  var bookMark = {
    name: siteName,
    url: siteUrl,
  };

  if (localStorage.getItem("savedBookmarks") === null) {
    var bookMarks = [];

    bookMarks.push(bookMark);

    localStorage.setItem("savedBookmarks", JSON.stringify(bookMarks));
  } else {
    var bookMarks = JSON.parse(localStorage.getItem("savedBookmarks"));

    bookMarks.push(bookMark);
    localStorage.setItem("savedBookmarks", JSON.stringify(bookMarks));
  }

  document.getElementById("bookmark-form").reset();

  fetchBookMarks();

  e.preventDefault();
}

function deleteBookMark(siteName) {
  var bookMarks = JSON.parse(localStorage.getItem("savedBookmarks"));

  for (var i = 0; i < bookMarks.length; i++) {
    if (bookMarks[i].name == siteName) {
      bookMarks.splice(i, 1);
    }
  }
  localStorage.setItem("savedBookmarks", JSON.stringify(bookMarks));
  if (JSON.parse(localStorage.getItem("savedBookmarks").length) === 0) {
    localStorage.removeItem("savedBookmarks");
  }
  fetchBookMarks();
}

function fetchBookMarks() {
  var bookMarks = JSON.parse(localStorage.getItem("savedBookmarks"));

  var wrapper = document.getElementById("bookmark-wrapper");
  wrapper.innerHTML = "";

  for (var i = 0; i < bookMarks.length; i++) {
    var name = bookMarks[i].name;
    var url = bookMarks[i].url;

    wrapper.innerHTML += `
    <div class="active">
    <h2>${name.length > 6 ? name.slice(0, 6) + "..." : name}</h2>
    <div class="call-to-action">
              <button type="button" id="visit-button">
                <a href=${
                  url.includes("https://") ? url : `https://www.${url}`
                } target="_blank" style="text-decoration: none; color: aliceblue;" >Visit 🚀</a>
              </button>
              <button onclick="deleteBookMark('${name}')" type="button" id="delete-button">
                Delete 🗑️
              </button>
            </div>
    </div>
    `;
  }
}

fetchBookMarks();
