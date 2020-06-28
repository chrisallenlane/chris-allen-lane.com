// create handles on the appropriate DOM elements
// NB: this script loads in the page footer, so the DOM is already loaded here.
const params    = new URLSearchParams(window.location.search);
const form      = document.querySelector('nav form');
const searchbox = document.getElementById('search');
const noMatches = document.getElementById('no-matches');

// return `true` if `haystack` contains `needle`
const match = (needle, haystack) => {

  // normalize whitespace and capitalization
  const n = needle.toLowerCase().trim();
  const h = haystack.toLowerCase().trim();

  // return false if `needle` is an empty string
  if (n === '') {
    return false;
  }

  // search for `needle` in `haystack`
  return h.indexOf(n) != -1;
}

// filter the articles per the search terms
const filter = (search) => {

  // hide the "no matches" text
  noMatches.style.display = 'none';

  // count the number of matching articles
  let matches = false;

  // iterate over each article and search for matches
  document.querySelectorAll('article').forEach(article => {

    // aggregate the text to search
    const haystack = [
      article.querySelector('h1').innerText.toLowerCase(),
      article.getAttribute('data-keywords'),
      article.querySelector('div.summary').innerText.toLowerCase(),
    ].join(' ');

    // search the text
    if (match(search, haystack)) {
      matches = true;
      article.style.display = 'block';
    }

    // hide articles that don't match
    else {
      article.style.display = 'none';
    }
  });

  // if there we no matches, show the "no match" text
  if (! matches) {
    noMatches.style.display = 'block';
  }
}

// if a search parameter was specified, filter immediately on page load
if (params.has('q')) {
  filter(params.get('q'));
}

// prevent the page from reloading on additional searches
form.addEventListener("submit", event => {
  event.preventDefault();
  filter(searchbox.value);
})
