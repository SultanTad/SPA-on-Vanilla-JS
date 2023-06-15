import { AbstractView } from "../../common/view.js";
import onChange from "on-change";
import { Header } from "../../components/header/header.js";
import { Search } from "../../components/search/search.js";
import { CardList } from "../../components/card-list/card-list.js";

export class MainView extends AbstractView {
  state = {
    list: [],
    numFound: 0,
    isLoading: false,
    searchQuery: undefined,
    offset: 0,
  };
  constructor(appState) {
    super();
    this.appState = appState;
    this.appState = onChange(this.appState, this.setFavorites.bind(this));
    this.state = onChange(this.state, this.setSearchQuery.bind(this));
    this.setTitle("Поиск книг");
  }

  destroy() {
    onChange.unsubscribe(this.appState)
    onChange.unsubscribe(this.state)
  }

  setFavorites(path) {
    if(path==="favorites")
    this.render()
  }

  async loadList(q, offset) {
    const res = await fetch(
      `https://openlibrary.org/search.json?q=${q}&offset=${offset}`
    );
    return res.json();
  }

  async setSearchQuery(path) {
    if (path === "searchQuery") {
      this.state.isLoading = true;
      const data = await this.loadList(
        this.state.searchQuery,
        this.state.offset
      );
      this.state.isLoading = false;
      this.state.numFound = data.numFound;
      console.log(data);
      this.state.list = data.docs;
    }
    if (path === "list" || "isLoading") {
      this.render();
    }
  }

  render() {
    const main = document.createElement("div");
    main.innerHTML = `
            <h1>
                Найдено книг – ${this.state.numFound}
            </h1>
        `;
    main.append(new Search(this.state).render());
    main.append(new CardList(this.appState, this.state).render());
    this.app.innerHTML = "";
    this.app.append(main);
    this.renderHeader();
  }

  renderHeader() {
    const header = new Header(this.appState).render();
    this.app.prepend(header);
  }
}
