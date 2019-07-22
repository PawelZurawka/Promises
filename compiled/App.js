App = React.createClass({
  displayName: "App",

  getInitialState() {
    return {
      loading: false,
      searchingText: '',
      gif: {}
    };
  },

  handleSearch: function (searchingText) {
    // 1.Pobierz na wejściu wpisywany tekst.
    this.setState({
      loading: true // 2.Zasygnalizuj, że zaczął się proces ładowania.

    });
    this.getGif(searchingText).then(gif => {
      // 3.Rozpocznij pobieranie gifa.
      this.setState({
        //4 Na zakończenie pobierania
        loading: false,
        // a przestań sygnalizować ładowanie,
        gif: gif,
        // b ustaw nowego gifa z wyniku pobierania
        searchingText: searchingText // c ustaw nowy stan dla wyszukiwanego tekstu

      });
    });
  },
  getGif: function (searchingText) {
    const GIPHY_API_URL = 'https://api.giphy.com';
    const GIPHY_PUB_KEY = '9nHaixweXV90T40ZIvRDDwPLKtRy4FnT';
    const url = `${GIPHY_API_URL}/v1/gifs/random?api_key=${GIPHY_PUB_KEY}&tag=${searchingText}`;
    return new Promise(function (resolve, reject) {
      const request = new XMLHttpRequest();

      request.onload = function () {
        if (this.status === 200) {
          let data = JSON.parse(this.responseText).data;
          let gif = {
            url: data.fixed_width_downsampled_url,
            sourceUrl: data.url
          };
          resolve(gif);
        } else {
          reject(new Error(this.statusText));
        }
      };

      request.open('GET', url);
      request.send();
    });
  },
  render: function () {
    const styles = {
      margin: '0 auto',
      textAlign: 'center',
      width: '90%'
    };
    return React.createElement("div", {
      style: styles
    }, React.createElement("h1", null, "Wyszukiwarka GIF-\xF3w"), React.createElement("p", null, "Znajd\u017A gifa na ", React.createElement("a", {
      href: "http://giphy.com"
    }, "giphy"), ". Naciskaj enter, aby pobra\u0107 kolejne gify"), React.createElement(Search, {
      onSearch: this.handleSearch
    }), React.createElement(Gif, {
      loading: this.state.loading,
      url: this.state.gif.url,
      sourceUrl: this.state.gif.sourceUrl
    }));
  }
});