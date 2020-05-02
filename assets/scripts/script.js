const btn = document.querySelector('button');
const blockquote = document.querySelector('blockquote');

class FetchRequest {
  constructor(url) {
    this.url = url;
  }

  render() {
    return fetch(this.url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong!');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

class GetQuote {
  constructor(element, button) {
    this.element = element;
    this.button = button;
  }

  render() {
    const fetchReq = new FetchRequest('https://type.fit/api/quotes');
    fetchReq
      .render()
      .then((responseData) => {
        const index = Math.floor(Math.random() * responseData.length);

        this.element.querySelector('p').textContent = responseData[index].text;
        this.element.querySelector('cite').textContent =
          responseData[index].author;

        this.element.classList.add('visible');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  showQuote() {
    this.button.addEventListener('click', this.render.bind(this));
  }
}

const getQuote = new GetQuote(blockquote, btn);
getQuote.showQuote();
