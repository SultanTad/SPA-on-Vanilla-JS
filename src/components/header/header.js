import { DivComponent } from "../../common/div-component";
import "../header/header.css";

export class Header extends DivComponent {
  constructor(appState) {
    super();
    this.appState = appState;
  }

  render() {
    this.el.classList.add("header");
    this.el.innerHTML = `
    
        <div class="logo">
            <img src="/static/assets/logo.svg" />
        </div>
        <div class="menu">
            <ul class="menu__list">
                <li class="menu__item">
                    <a class="menu__link" href="#">
                        <img src="/static/assets/search.svg" />
                        <span class="search-book">Поиск книг</span>
                    </a>
                </li>
                <li class="menu__item">
                    <a class="menu__link" href="#favorites">
                        <img src="/static/assets/favorites.svg" />
                        <span class="favorites-book">Избранное</span>  
                        <div class="menu__counter"> 
                            <span>${this.appState.favorites.length}</span>
                        </div>
                    </a>    
                </li>
            </ul>
        </div>
    
    `;
    return this.el;
  }
}
