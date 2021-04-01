// Animate on scroll starting
AOS.init();

// Contact form - display on input

function displayOnInput(parent, child) {
    parent.oninput = function(){
        if (parent.value !== 0) {
            $(child).fadeIn();
        }
    }
}
var input_name = document.getElementById('name');
var input_email = document.getElementById('email');
var input_textarea = document.getElementById('message');
var input_submit = document.getElementById('submit_form');

displayOnInput(input_name, input_email);
displayOnInput(input_email, input_textarea);
displayOnInput(input_textarea, input_submit);


// Menu 
var menuBtn = document.getElementById("menu-btn");
var menuContent = document.getElementById("menu-content");
var dim = document.getElementById("dim");
var rtt = document.getElementById("rtt");

function closeMenu() {
    $(rtt).fadeToggle();
    menuContent.classList.toggle("hidden");
    menuBtn.classList.toggle("opened");
    $(dim).fadeToggle();
}
// remove class when click
menuBtn.onclick = function() {
    closeMenu();
}

//if escape pressed close menu
document.onkeydown = function(evt) {
    evt = evt || window.event;
    if(evt.key === "Escape"){
        if(!$(menuContent).hasClass("hidden")) {
            closeMenu();
        }
    }
}

// if click outside of the menu, close menu
var section = document.querySelectorAll("section");
dim.onclick = function() {
    if(!$(menuContent).hasClass("hidden")) {
        closeMenu();
    }
}

// if click on link close menu 
var links = document.querySelectorAll("nav a");
links.forEach(element => {
    element.onclick = function() {
        if(!$(menuContent).hasClass("hidden")) {
            closeMenu();
        }
    }
});

// move text on mouse (title)
// var title = document.getElementById("site_title");
// if (window.innerWidth > 1100) {
//     document.addEventListener('mousemove', (mouse) => {
//        title.style.transform  = "translate(" + - mouse.clientY / 15 + "px, " + mouse.clientX / 15 + "px)";
//     });
// }

//return to top
window.addEventListener('scroll', function(e) {
    if(window.scrollY > 50) {
        $(rtt).fadeIn();
    } else {
        $(rtt).fadeOut();
    }
  });
rtt.onclick = function() {
    window.scrollTo(0,0);
}




// competences onclick  
var competences = document.querySelectorAll("div.all-competences > div.competence");
var alone = document.querySelectorAll("div.alone");
var backBtn = document.querySelectorAll("a.back");
var competencesOffsetTop = document.getElementById("competences").offsetTop;
competences.forEach(element => {
    var id =  element.getAttribute('id');
    element.onclick = function() {
        var toDisplay = document.getElementById('only-' + id);
        toDisplay.classList.add('translated');
        // onclick, go back to the head of article (.alone)
        window.scrollTo(0,competencesOffsetTop);
    }
});

backBtn.forEach(element => {
    element.onclick = function() {
        alone.forEach(item => {
            item.classList.remove('translated')
        });
    }
});


// portfolio categories

// var PortfolioBoutonsTri = document.querySelectorAll("span.selector.category");
// var PortfolioTousItems = document.querySelectorAll(".items article");
// PortfolioBoutonsTri.forEach(element => {
//     element.onclick = function() {
//         var filter = element.getAttribute('filter');
//         PortfolioTousItems.forEach(element => {
//             $(element).fadeOut();
//         });
//         var PortfolioToDisplay = document.querySelectorAll("article." + filter);
//         PortfolioToDisplay.forEach(element => {
//             $(element).fadeIn();
//         });
//         if (filter === 'all') {
//             PortfolioTousItems.forEach(element => {
//                 $(element).fadeIn();
//             });
//         }
//     }
// });

// in-view.js
inView.offset(500);
inView('#portfolio .items article')
    .on('enter', el => {
        portfolioToUpperScale(el);
    })
    .on('exit', el => {
        portfolioToLowerScale(el);
    } );


function portfolioToUpperScale(el) {
    el.style.transform = "scale(1.05)";
}
function portfolioToLowerScale(el) {
    el.style.transform = "scale(0.8)";
}

// Ajax contact form 

$(document).ready(function() {
    $('form.contact').submit(function(event){
        var formData = {
            'name'              : $('input[name=name]').val(),
            'email'             : $('input[name=email]').val(),
            'message'           : $('textarea[name=message]').val()
        };
        $.ajax({
            type: 'POST', 
            url: 'send.php',
            data: formData, 
            dataType: 'json', 
            encode: true
        })
        .done(function(data) {

            // log data to the console so we can see
            console.log(data);

            if(data.success) {
                $('form.contact').html('<div class="alert alert-success">' + "C'est tout bon ! Merci pour votre message. Promis, je réponds rapidement !" + '</div>');
            }
    });

    event.preventDefault();
})
});
