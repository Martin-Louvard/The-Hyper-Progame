import 'bootstrap';
import "../saas/styles.css";
import "../saas/styles.scss";
import { PageList } from './PageList';
import { routes } from "./routes"


let pageArgument;

const setRoute = () => {
    let path = window.location.hash.substring(1).split("/");
    pageArgument = path[1] || "";
    var pageContent = document.getElementById("pageContent");
    routes[path[0]](pageArgument);
    return true;
};

window.addEventListener("hashchange", () => setRoute());
window.addEventListener("DOMContentLoaded", () => setRoute());
let searchBar = document.getElementById("searchBar");
searchBar.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        PageList(searchBar.value)
    }
});
let homebtn = document.querySelector('.navbar-brand');
homebtn.addEventListener("click", () => PageList());
PageList();