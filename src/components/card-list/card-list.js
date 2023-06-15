import { DivComponent } from "../../common/div-component";
import { Card } from "../card/card";
import "./card-list.css";

export class CardList extends DivComponent {
  constructor(appState, state) {
    super();
    this.appState = appState;
    this.state = state;
  }

  render() {
    if (this.state.isLoading) {
      this.el.innerHTML = `
              <div>Загрузка...</div>
          `;
      return this.el;
    }
    const cardGrid = document.createElement("div")
    cardGrid.classList.add("card-grid");
    this.el.append(cardGrid)
    for (const card of this.state.list) {
      cardGrid.append(new Card(this.appState, card).render());
    }
    return this.el;
  }
}
