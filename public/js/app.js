// Base de Donnée
import data from "../../data.js"

const planet = data[0].destinations;
const member = data[0].crew;
const transports = data[0].technology;
// Scripts Chargement d'images
var imagesPlanet = planet.map(i => {
  return i.images.webp;
})
var imagesCrew = member.map(i => {
  return i.images.webp;
})
var imagesTechnoPortrait = transports.map(i => {
  return i.images.portrait;
})
var imagesTechnoLandscape = transports.map(i => {
  return i.images.landscape;
})

var preloaded = 0;
var images = [...imagesCrew, ...imagesPlanet,...imagesTechnoLandscape,...imagesTechnoPortrait, '../../assets/crew/background-crew-desktop.jpg','../../assets/crew/background-crew-mobile.jpg','../../assets/crew/background-crew-tablet.jpg', '../../assets/destination/background-destination-desktop.jpg', '../../assets/destination/background-destination-mobile.jpg', '../../assets/destination/background-destination-tablet.jpg', '../../assets/technology/background-technology-desktop.jpg','../../assets/technology/background-technology-mobile.jpg', '../../assets/technology/background-technology-tablet.jpg']
 console.log(images);
function preLoader(e) {
    for (var i = 0; i < images.length; i++) {
        var tempImage = new Image();
         
        tempImage.addEventListener("load", progress, true);
        tempImage.src = images[i];
    }
}
 
function progress() {
    preloaded++;
     
    if (preloaded == images.length) {
        console.log("images préchargées");
    }
}


window.addEventListener("DOMContentLoaded", function(e) {
  preLoader(e);
    // Déclarations des Constantes 
    const nav = document.querySelector(".head-navbar");
    const hamburger = document.querySelector("#hamburger");

    // Déclarations Variables Dynamiques
    var explore;
    var wrapper;
    var menu;
    var modifier;
    // Variable indiquant si une animation est en cours;
    var isAnimated = false;
    // Sélections des Boutons
    const bindButtons = () => {
      explore = document.querySelector(".button-explore");
      wrapper = document.querySelector(".wrapper");
      menu = document.querySelectorAll(".menu-categories");
      modifier = document.querySelector(".wrapper-modifier")
    };bindButtons()

    // Fonction Hamburger
    function toggleHamburger(e) {
      e.target.classList.toggle("navbar-hamburger_active");
      nav.classList.toggle("head-navbar_active")
    }
    // Évenements DOM
    hamburger.addEventListener("click", toggleHamburger);
    menu.forEach(category => {
        category.addEventListener("click", toggleCategories)
        triggerExplore(category, explore);
    })
    // Fonctions Principales
    
    function checkNavBar() {
      if(!hamburger.classList.contains("navbar-hamburger_active")) return;
        const eventClick = new Event("click");
        hamburger.dispatchEvent(eventClick);
    }
    function changeCategory(i) {
      checkNavBar();
      switch(i) {
      case "0" : {
        const main = document.querySelector("main");
        main.setAttribute("style", "animation: decreaseOpacity 0.5s");
        isAnimated = true;
        setTimeout(() => {
          modifier.removeChild(main);
          setTimeout(()=>{
            modifier.append(createHomePage());
            isAnimated = false;
            
          }, 495)
        }, 400);
      };
        break;
      case "1" : {
        const main = document.querySelector("main");
        isAnimated = true;
        main.setAttribute("style", "animation: decreaseOpacity 0.5s")
        setTimeout(() => {
          modifier.removeChild(main);
          setTimeout(()=>{
            modifier.append(createDestinationPage(0));
      planetNavBarListener();
    
          }, 495)
        }, 400);
      };
    break;
      case "2" : {
        const main = document.querySelector("main");
        isAnimated = true;
        main.setAttribute("style", "animation: decreaseOpacity 0.5s")
        setTimeout(() => {
          modifier.removeChild(main);
          setTimeout(()=>{
            modifier.append(createCrewPage(0));
      crewNavBarListener();
    
          }, 495)
        }, 400);
      };
    break;
      case "3" : {
        const main = document.querySelector("main");
        isAnimated = true;
        main.setAttribute("style", "animation: decreaseOpacity 0.5s")
        setTimeout(() => {
          modifier.removeChild(main);
          setTimeout(()=>{
            modifier.append(createTechnologyPage(0));
            navBarTechnologyListener();
    
          }, 495)
        }, 400);
      };
    break;
      }
    }
    
    function toggleCategories(e) {
      if(isAnimated) return;
        
        e.stopPropagation();
        // navBar
        let category = e.target;
        let i = category.attributes._id.value;
        if(category.classList.contains("menu-categories_active")) return;
        menu.forEach(e => {
            e.classList.remove("menu-categories_active");
        })
        category.classList.add("menu-categories_active");  
    
        changeBackground(category);
        changeCategory(i);
        bindButtons();
    }
    
    // Fonctions Page HOME

    function triggerExplore(category, btn) {
      const exploreEvent = new Event("click");
    
      if(category.attributes.id.value === "destination") {
        if(btn) {
            btn.addEventListener("click", e => {
                category.dispatchEvent(exploreEvent)
            })
        }
    }
    }


   function createHomePage() {
      const main = document.createElement("main");
      const article = document.createElement("article");
      const h2 = document.createElement("h2");
      const h1 = document.createElement("h1");
      const p = document.createElement("p");
      const aside = document.createElement("aside");
      const div = document.createElement("div");
      const button = document.createElement("button");
      main.classList.add("wrapper-content");
      article.classList.add("content-text");
      h2.classList.add("text-heading5");
      h1.classList.add("text-heading1");
      p.classList.add("text-body");
      aside.classList.add("content-button");
      div.classList.add("button-hover");
      button.classList.add("button-explore");
      
      h2.innerText = "SO, YOU WANT TO TRAVEL TO";
      h1.innerText = "SPACE";
      p.innerHTML = "Let’s face it; if you want to go to space, you might as well <br> genuinely go to outer space and not hover kind of on the <br> edge of it. Well sit back, and relax because we’ll give you a <br> truly out of this world experience!";
      button.innerText = "EXPLORE";

      main.append(article, aside);
      article.append(h2,h1,p);
      aside.append(div,button);
      main.setAttribute("style", "animation: increaseOpacity 1.5s ease-in-out")
      menu.forEach(category => {
        triggerExplore(category, button);
    })
      
      return main;   
   }
  //  Fonction Changement Background
    function changeBackground(category) {
//Background
if(category.attributes.id.value === "destination") {
    wrapper.classList.remove("wrapper_home","wrapper_crew","wrapper_technology")
    wrapper.classList.add("wrapper_destination");
} else if(category.attributes.id.value === "home") {
    wrapper.classList.remove("wrapper_destination","wrapper_crew","wrapper_technology")
    wrapper.classList.add("wrapper_home");
} else if(category.attributes.id.value === "crew") {
    wrapper.classList.remove("wrapper_destination","wrapper_home","wrapper_technology")
    wrapper.classList.add("wrapper_crew");
} else if(category.attributes.id.value === "technology") {
    wrapper.classList.remove("wrapper_destination","wrapper_home","wrapper_crew")
    wrapper.classList.add("wrapper_technology");
}
    }
    // Fonctions Pages de Destinations
    function createDestinationPage(i) {
      const main = document.createElement("main");
      const h3 = document.createElement("h3");
      const strong = document.createElement("strong");
      const div = document.createElement("div");
      const img = document.createElement("img");
      const aside = document.createElement("aside");
      const nav = document.createElement("nav");
      const ul = document.createElement("ul");
      const liMoon = document.createElement("li");
      const liMars = document.createElement("li");
      const liEuropa = document.createElement("li");
      const liTitan = document.createElement("li");
      const h1 = document.createElement("h1");
      const p = document.createElement("p");
      const divTxt = document.createElement("div");
      const article = document.createElement("article");
      const h4 = document.createElement("h4");
      const h5 = document.createElement("h5");
      const articleTime = document.createElement("article");
      const h4Time = document.createElement("h4");
      const h5Time = document.createElement("h5");

      main.classList.add("wrapper-destinationContent");
      h3.classList.add("content-sub");
      strong.classList.add("sub-strong");
      div.classList.add("content-elem");
      img.classList.add("elem-planet");
      aside.classList.add("elem-textArea");
      nav.classList.add("textArea-navBar");
      ul.classList.add("navBar-list");
      liMoon.classList.add("list-element", "list-element_active");
      liMars.classList.add("list-element");
      liEuropa.classList.add("list-element");
      liTitan.classList.add("list-element");
      h1.classList.add("textArea-title");
      p.classList.add("textArea-paragraph");
      divTxt.classList.add("textArea-data");
      article.classList.add("data-distance");
      h4.classList.add("distance-text");
      h5.classList.add("distance-value");
      articleTime.classList.add("data-time");
      h4Time.classList.add("time-text");
      h5Time.classList.add("time-value");
      liMoon.setAttribute("_id", "0");
      liMars.setAttribute("_id", "1");
      liEuropa.setAttribute("_id", "2");
      liTitan.setAttribute("_id", "3");
      
      
      h3.innerText = "PICK YOUR DESTINATION";
      strong.innerText = "01";
      img.setAttribute("src", planet[i].images.webp);
      img.setAttribute("alt", "planet");
      liMoon.innerText = 'MOON'
      liMars.innerText = 'MARS'
      liEuropa.innerText = 'EUROPA'
      liTitan.innerText = 'TITAN'
      h1.innerText = planet[i].name;      h1.innerText = planet[i].name;
      p.innerText = planet[i].description;      p.innerText = planet[i].description;
      h4.innerText = "AVG. DISTANCE";
      h4Time.innerText = "EST. TRAVEL TIME";
      h5.innerText = planet[i].distance;      h5.innerText = planet[i].distance;
      h5Time.innerText = planet[i].travel;      h5Time.innerText = planet[i].travel;
      main.append(h3,div);
      h3.prepend(strong)
      div.append(img,aside)
      aside.append(nav,h1,p,divTxt);
      nav.append(ul);
      ul.append(liMoon,liMars,liEuropa,liTitan);
      divTxt.append(article, articleTime);
      article.append(h4, h5);
      articleTime.append(h4Time, h5Time);
      setAnimationDestinationPage(h3,img,aside);
      
      return main;
    }
    function modifyDestinationPage(i) {
      const img = document.querySelector(".elem-planet")
      const h1 = document.querySelector(".textArea-title")
      const p = document.querySelector(".textArea-paragraph")
      const h5 = document.querySelector(".distance-value")
      const h5Time = document.querySelector(".time-value")
      function setAnimation() {
        args.forEach(arg => {
          arg.setAttribute("style", "animation: modifyOpacity 1.5s");
        })
      }
      function clearAnimation() {
        args.forEach(arg => {
          arg.setAttribute("style", "animation: none");
          img.style.opacity = 1;
          isAnimated = false;

        })
      }
      const args = new Array();
      args.push(img,h1,p,h5,h5Time);
      setAnimation()
      isAnimated = true;
      setTimeout(() => {
      img.setAttribute("src", planet[i].images.webp);  
      
      h1.innerText = planet[i].name;
      p.innerText = planet[i].description;
      h5.innerText = planet[i].distance;
      h5Time.innerText = planet[i].travel;

      },750)
      setTimeout(clearAnimation, 1400);
      
      
    }
    function setAnimationDestinationPage(h3,img,aside) {
      h3.setAttribute("style", "animation: increaseOpacity 1s ease-in-out")
          img.setAttribute("style", "animation: increaseOpacity 1.5s 0.5s ease-in-out")
        aside.setAttribute("style", "animation: increaseOpacity 1s 1.5s ease-in-out")
        setTimeout(() => {
          img.style.opacity = 1;
        },2000)
        setTimeout(() => {
          aside.style.opacity = 1;
          isAnimated = false;
  
        },2400)
     }  

     function planetNavBarListener()  {
      const allPlanet = document.querySelectorAll(".list-element")
      allPlanet.forEach(elem => {
        elem.addEventListener("click", e => {
          if(isAnimated) return;
          const list = e.target;
          if(list.classList.contains("list-element_active")) return;
        allPlanet.forEach(e => {
            e.classList.remove("list-element_active");
        })
        list.classList.add("list-element_active");  
          
          const id = parseInt(list.attributes._id.value);
          e.preventDefault();
          e.stopPropagation();
          modifyDestinationPage(id);
        })
      })
    }

    // Fonctions Crew Pages
    function createCrewPage(i) {
      const main = document.createElement("main");
      main.classList.add("wrapper-crewContent");
      const divElemCrew = document.createElement("div");
      divElemCrew.classList.add("content-elemCrew");
      const divLeft = document.createElement("div");
      divLeft.classList.add("elemCrew-leftpart");
      const h3 = document.createElement("h3");
      h3.classList.add("content-subCrew");
      const strong = document.createElement("strong");
      strong.classList.add("sub-strongCrew");
      const divImgContainer = document.createElement("div");
      divImgContainer.classList.add("img-container");
      const imgMobile = document.createElement("img");
      imgMobile.classList.add("elem-imageMobile");
      
      const navMobile = document.createElement("nav");
      navMobile.classList.add("textArea-navBarCrewMobile");
      const ulMobile = document.createElement("ul")
      ulMobile.classList.add("navBar-listCrew")
      const liOneMobile = document.createElement("li")
      liOneMobile.classList.add("list-elementCrew", "list-elementCrew_active");
      const liTwoMobile = document.createElement("li");
      liTwoMobile.classList.add("list-elementCrew");
      const liThreeMobile = document.createElement("li");
      liThreeMobile.classList.add("list-elementCrew");
      const liFourMobile = document.createElement("li");
      liFourMobile.classList.add("list-elementCrew");

      const div = document.createElement('div');
      div.classList.add('elem-imgDesktopContainer');

      const aside = document.createElement("aside");
      aside.classList.add("elem-textAreaCrew");
      
      const h2 = document.createElement("h2");
      h2.classList.add("textArea-statutCrew");

      const h1 = document.createElement("h1");
      h1.classList.add("textArea-titleCrew");

      const p = document.createElement("p")
      p.classList.add("textArea-paragraphCrew")

      const navDesktop = document.createElement("nav");
      navDesktop.classList.add("textArea-navBarCrew");
      const ulDesktop = document.createElement("ul");
      ulDesktop.classList.add("navBar-listCrew");
      const liOneDesktop = document.createElement("li")
      liOneDesktop.classList.add("list-elementCrew", "list-elementCrew_active");
      const liTwoDesktop = document.createElement("li");
      liTwoDesktop.classList.add("list-elementCrew");
      const liThreeDesktop = document.createElement("li");
      liThreeDesktop.classList.add("list-elementCrew");
      const liFourDesktop = document.createElement("li");
      liFourDesktop.classList.add("list-elementCrew");
      liOneDesktop.setAttribute("_id", "0");
      liTwoDesktop.setAttribute("_id", "1");
      liThreeDesktop.setAttribute("_id", "2");
      liFourDesktop.setAttribute("_id", "3");
      liOneMobile.setAttribute("_id", "0");
      liTwoMobile.setAttribute("_id", "1");
      liThreeMobile.setAttribute("_id", "2");
      liFourMobile.setAttribute("_id", "3");
      const imgDesktop = document.createElement("img");
      imgDesktop.classList.add("elem-image");

      ulDesktop.append(liOneDesktop,liTwoDesktop,liThreeDesktop,liFourDesktop);
      navDesktop.append(ulDesktop);

      aside.append(h2,h1,p,navDesktop);

      ulMobile.append(liOneMobile,liTwoMobile,liThreeMobile,liFourMobile);
      navMobile.append(ulMobile);

      divImgContainer.append(imgMobile);

      
      divLeft.append(h3,divImgContainer,navMobile,aside)
      div.append(imgDesktop)
      divElemCrew.append(divLeft, div);
      
      main.append(divElemCrew);
      
      h3.innerText = "MEET YOUR CREW";
      h3.prepend(strong);
      strong.innerText = "02";
      h2.innerText = member[i].role.toUpperCase();
      h1.innerText = member[i].name.toUpperCase();
      p.innerText = member[i].bio;
      imgDesktop.setAttribute("src", member[i].images.webp);
      imgMobile.setAttribute("src", member[i].images.webp);
    setAnimationCrewPage(p,h1,h2,imgDesktop,imgMobile,navDesktop,h3,navMobile);
      return main;

    }  
    function modifyCrewPage(i) {
      isAnimated = true;
      const h2 = document.querySelector('.textArea-statutCrew');
      const h1 = document.querySelector('.textArea-titleCrew');
      const p = document.querySelector('.textArea-paragraphCrew');
      const img = document.querySelector('.elem-image');
      const imgMobile = document.querySelector('.elem-imageMobile');
      const array = new Array();
      array.push(h2,h1,p,img,imgMobile);

      img.style.animation = "modifyOpacity 1.5s ease-in-out";
      imgMobile.style.animation = "modifyOpacity 1.5s ease-in-out";
      p.style.animation = "modifyTranslateLeft 1.5s ease-in-out 1s";
      h1.style.animation = "modifyTranslateLeft 1.5s ease-in-out 1.2s";
    h2.style.animation = "modifyTranslateLeft 1.5s ease-in-out 1.4s";

      setTimeout(() => {
        img.setAttribute("src", member[i].images.webp);
        imgMobile.setAttribute("src", member[i].images.webp);
      },750)
      setTimeout(() => {
        p.innerText = member[i].bio;
      },1750)
      setTimeout(() => {
        h1.innerText = member[i].name;
      },1950)
      setTimeout(() => {
        h2.innerText = member[i].role;
      },2150)

      setTimeout(() => {
        isAnimated = false;
        array.forEach(a => {
          a.style.animation = "none"
        })
      },2850)
    }

    function crewNavBarListener() {
      const AllSelectors = document.querySelectorAll('.list-elementCrew');
      AllSelectors.forEach(selector => {
        selector.addEventListener("click", e => {
          if(isAnimated) return;
          const list = e.target;
          if(list.classList.contains === "list-elementCrew_active") return;
          AllSelectors.forEach(selector => {
            selector.classList.remove("list-elementCrew_active")
          })
          list.classList.add("list-elementCrew_active")
          const id = parseInt(list.attributes._id.value);
          e.preventDefault();
          e.stopPropagation();
          modifyCrewPage(id);
        })
      })
    }

   function setAnimationCrewPage(p,title,statut,img,imgMobile,navbar,sub, navMobile) {
    navbar.style.animation = "increaseOpacity 0.5s ease-in-out";
    navMobile.style.animation = "increaseOpacity 0.5s ease-in-out";
    sub.style.animation = "increaseOpacity 0.5s ease-in-out";
    statut.style.animation = "slideToRight 1.5s ease-in-out 0.05s"
    title.style.animation = "slideToRight 1.5s ease-in-out 1.30s"
    p.style.animation = "increaseOpacity 1.5s ease-in-out 3s"
    img.style.animation = "increaseOpacity 1.5s ease-in-out 3s"
    imgMobile.style.animation = "increaseOpacity 1.5s ease-in-out 3s"
    setTimeout(() => {
      statut.style.transform = "translate(0)"
    }, 1549);
    setTimeout(() => {
      title.style.transform = "translate(0)"
    }, 2799);
    setTimeout(() => {
      p.style.opacity = 1;
      imgMobile.style.opacity = 1;
      img.style.opacity = 1;
      isAnimated = false;

    }, 4400);
   }

  //  Fonctions Technology's

  function createTechnologyPage(i) {
    const main = document.createElement('main');
    main.classList.add('technology-container');
    const h2 = document.createElement('h2');
    h2.innerText = "SPACE LAUNCH 101";
    h2.classList.add('category-title');
    const strong = document.createElement('strong');
    strong.innerText = "03";
    strong.classList.add('title-strong');
    const aside = document.createElement('aside');
    aside.classList.add('article-container');
    const nav = document.createElement('nav');
    nav.classList.add('technology-categories');
    const ul = document.createElement('ul');
    ul.classList.add("technology-menu");
    const liOne = document.createElement('li');
    const liTwo = document.createElement('li');
    const liThree = document.createElement('li');
    liOne.innerText = "1";
    liTwo.innerText = "2";
    liThree.innerText = "3";
    liOne.classList.add('menu-elementTechnology', "menu-elementTechnology_active");
    liTwo.classList.add('menu-elementTechnology');
    liThree.classList.add('menu-elementTechnology');
    liOne.setAttribute("_id", "0");
    liTwo.setAttribute("_id", "1");
    liThree.setAttribute("_id", "2");
    const article = document.createElement('article');
    article.classList.add('technology-article');
    const h3 = document.createElement('h3');
    h3.classList.add('article-subtitle');
    h3.innerText = "THE TERMINOLOGY..."
    const h1 = document.createElement('h1');
    h1.classList.add('article-name');
    h1.innerText = transports[i].name.toUpperCase();
    const p = document.createElement('p');
    p.classList.add('article-p');
    p.innerText = transports[i].description;
    const imgLandscape = document.createElement('img');
    const imgPortrait = document.createElement('img');
    imgLandscape.classList.add('technology-imgLandscape');
    imgPortrait.classList.add('technology-imgPortrait');
    imgLandscape.setAttribute("alt", "Launch Vehicle");
    imgPortrait.setAttribute("alt", "Launch Vehicle");
    imgLandscape.setAttribute("src", transports[i].images.landscape);
    imgPortrait.setAttribute("src", transports[i].images.portrait);
    article.append(h3,h1,p)
    ul.append(liOne,liTwo,liThree);
    nav.append(ul)
    aside.append(nav,article)
    h2.prepend(strong)
    main.append(h2,aside,imgPortrait,imgLandscape)
    setAnimationTechnologyPage(main);



    return main;
  }

  function setAnimationTechnologyPage(main) {
    main.style.animation = "increaseOpacity 1.250s ease-in-out"
    setTimeout(() => {
      isAnimated = false;
    },1250)
  }

  function navBarTechnologyListener() {
    const AllSelectors = document.querySelectorAll('.menu-elementTechnology');
      AllSelectors.forEach(selector => {
        selector.addEventListener("click", e => {
          if(isAnimated) return;
          const list = e.target;
          if(list.classList.contains === "menu-elementTechnology_active") return;
          AllSelectors.forEach(selector => {
            selector.classList.remove("menu-elementTechnology_active")
          })
          list.classList.add("menu-elementTechnology_active")
          const id = parseInt(list.attributes._id.value);
          e.preventDefault();
          e.stopPropagation();
          modifyTechnologyPage(id);
        })
      })
  }

  function modifyTechnologyPage(id) {
    isAnimated = true;
    const article = document.querySelector('.technology-article');
    const imgPortrait = document.querySelector('.technology-imgPortrait');
    const imgLandscape = document.querySelector('.technology-imgLandscape');
    const h1 = document.querySelector(".article-name")
    const p = document.querySelector(".article-p")



    article.style.animation = "modifyOpacity 1s ease-in-out"
    imgPortrait.style.animation = "modifyOpacity 1s ease-in-out"
    imgLandscape.style.animation = "modifyOpacity 1s ease-in-out"

    setTimeout(() => {
      h1.innerText = transports[id].name.toUpperCase();
      p.innerText = transports[id].description;
      imgPortrait.setAttribute("src", transports[id].images.portrait)
      imgLandscape.setAttribute("src", transports[id].images.landscape)
    },500)

    setTimeout(() => {
      isAnimated = false;
      article.style.animation = "none";
      imgLandscape.style.animation = "none";
      imgPortrait.style.animation = "none";
    },1000)
  }
},true)

