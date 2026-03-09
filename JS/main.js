
/*================== NAV MODAL ================*/
const modalViews = document.querySelectorAll('.overlay_modal'),
      modalBtns = document.querySelectorAll('.modal_button'),
      modalCloses = document.querySelectorAll('.overlay_modal-close')

let modal = function(modalClick){
    modalViews[modalClick].classList.add('active-modal')
}

modalBtns.forEach((modalBtn, i) => {
    modalBtn.addEventListener('click', () =>{
        modal(i)
    })
})

modalCloses.forEach((modalClose) => {
    modalClose.addEventListener('click', () =>{
        modalViews.forEach((modalView) =>{
            modalView.classList.remove('active-modal')
        })
    })
})

/* ====================== ADD TO CART ====================  */
document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemCount = document.querySelector('.cart-icon span');
    const cartItemList = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
    const cartIcon = document.querySelector('.cart-icon');
    const sidebar = document.getElementById('sidebar');
    const closeButton = document.querySelector('.sidebar-close');

    let cartItems = [];
    let totalAmount = 0;

    // Add to cart functionality
    addToCartButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const itemName = document.querySelectorAll('.card .card--title')[index].textContent;
            const rawPrice = document.querySelectorAll('.price')[index].textContent.slice(1);
            const itemPrice = parseFloat(rawPrice.replace(/,/g, '')); // ✅ remove commas

            const item = { name: itemName, price: itemPrice, quantity: 1 };

            const existingItem = cartItems.find(cartItem => cartItem.name === item.name);
            if (existingItem) {
                existingItem.quantity++;
                totalAmount += item.price;
            } else {
                cartItems.push(item);
                totalAmount += item.price;
            }

            updateCartUI();

            // ✅ Animate the add-to-cart button
            button.classList.add('clicked');
            setTimeout(() => {
                button.classList.remove('clicked');
            }, 300); // Match animation duration
        });
    });


    // Update Cart UI
    function updateCartUI() {
        updateCartItemCount();
        updateCartItemList();
        updateCartTotal();
    }

    // Update the cart item count badge
    function updateCartItemCount() {
        cartItemCount.textContent = cartItems.reduce((sum, item) => sum + item.quantity, 0);

        // Bounce animation
        const cartIconEl = document.getElementById('cartIcon');
        cartIconEl.classList.add('animate');

        setTimeout(() => {
            cartIconEl.classList.remove('animate');
        }, 400); // Match animation duration
    }


    // Update the cart item list display
    function updateCartItemList() {
        cartItemList.innerHTML = ''; // Clear current cart items
        cartItems.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('individual-cart-item');
            cartItem.innerHTML = `
                <div class="item-content">
                    <span>${item.name}</span>
                    <div class="item-quantity">
                        <button class="quantity-icon decrease" data-index="${index}">
                            <i class="uil uil-minus"></i>
                        </button>

                        <span>${item.quantity}</span>
                        <button class="quantity-icon increase" data-index="${index}">
                            <i class="uil uil-plus"></i>
                        </button>
                    </div>
                </div>
                <span class="cart-item-price">
                    &#8358;${(item.price * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
                <button class="remove-btn remove-item" data-index="${index}">
                    <i class="uil uil-trash-alt"></i>
                </button>
            `;
            cartItemList.appendChild(cartItem);
        });

        // Event delegation for remove button clicks
        cartItemList.addEventListener('click', (event) => {
            if (event.target.classList.contains('remove-btn')) {
                const index = event.target.dataset.index;
                removeItemFromCart(index);
            }
        });
    }

    // Handle plus and minus button clicks using event delegation
    cartItemList.addEventListener('click', (event) => {
        const target = event.target;

        if (target.closest('.remove-item')) {
            const index = target.closest('.remove-item').dataset.index;
            removeItemFromCart(index);
        }

        if (target.closest('.increase')) {
            const index = target.closest('.increase').dataset.index;
            cartItems[index].quantity++;
            totalAmount += cartItems[index].price;
            updateCartUI();
        }

        if (target.closest('.decrease')) {
            const index = target.closest('.decrease').dataset.index;
            if (cartItems[index].quantity > 1) {
                cartItems[index].quantity--;
                totalAmount -= cartItems[index].price;
            } else {
                // Optionally remove if quantity hits zero
                totalAmount -= cartItems[index].price;
                cartItems.splice(index, 1);
            }
            updateCartUI();
        }
    });


    // Remove item from cart
    function removeItemFromCart(index) {
        const removedItem = cartItems.splice(index, 1)[0];
        totalAmount -= removedItem.price * removedItem.quantity;
        updateCartUI();
    }


    // Update the cart total amount display
    function updateCartTotal() {
        cartTotal.innerHTML = `<p>&#8358;${totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>`;
    }

    // Toggle sidebar visibility
    cartIcon.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    // Close sidebar when close button is clicked
    closeButton.addEventListener('click', () => {
        sidebar.classList.remove('open');
    });
});

/* ====================== CONTACT ME ====================  */
document.addEventListener("DOMContentLoaded", function () {
  const fabButton = document.getElementById("fabButton");
  const fabMenu = document.getElementById("fabMenu");

  fabButton.addEventListener("click", function () {
    fabMenu.classList.toggle("hidden");
  });
});


/* ================== LOCATION MENU ==============  */
// Select all menu links and close icons
const menuLinks = document.querySelectorAll('.current-location-menu');
const closeIcons = document.querySelectorAll('.loction-close-icon');

// Toggle dropdown when a menu link is clicked
menuLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault(); // Prevent default link behavior
  
      // Get the parent <li>
      const parentLi = this.parentElement;
  
      // Close all other open dropdowns
      document.querySelectorAll('ul > li').forEach(item => {
        if (item !== parentLi) {
          item.classList.remove('show');
        }
      });
  
      // Toggle 'show' class for the current menu
      parentLi.classList.toggle('show');
    });
});

// Close dropdown when close icon is clicked
closeIcons.forEach(icon => {
    icon.addEventListener('click', function () {
      // Find the closest <li> and remove 'show' class
      const parentLi = this.closest('li').parentElement.parentElement;
      if (parentLi) {
        parentLi.classList.remove('show');
      }
    });
});

/* ================== HERO SWIPER ==============  */
// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
  const swiper = new Swiper(".hero-swiper", {
    loop: true,
    effect: "fade",
    speed: 800,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});

/*================== DATA-CONTENT TABS ==============*/
const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]')

tabs.forEach(tab =>{
    tab.addEventListener('click', () =>{
        const target = document.querySelector(tab.dataset.target)

        tabContents.forEach(tabContent  =>{
            tabContent.classList.remove('content-active')
        })
        target.classList.add('content-active')

        tabs.forEach(tab =>{
            tab.classList.remove('content-active')
        })
        tab.classList.add('content-active')
    })
})

/* ====================== SCROLL SECTIONS ACTIVE LINK ====================  */
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)


/* ================== CHANGE BACKGROUND HEADER ================  */
function scrollHeader(){
    const nav = document.getElementById('header')
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/* ================== Geolocation for Dynamic Subheadline ================  */
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const neighborhoods = ['Downtown', 'Midtown', 'Uptown', 'Riverside', 'Hillcrest'];
            const randomNeighborhood = neighborhoods[Math.floor(Math.random() * neighborhoods.length)];

            const subheadline = document.getElementById('dynamic-subheadline');
            if (subheadline) {
                subheadline.innerHTML = `Get restaurant meals delivered in <span class="text-primary font-semibold">23 minutes</span> to ${randomNeighborhood}`;
            }
        },
        () => {
            console.log('Geolocation not available');
        }
    );
}

/* ================== DARK LIGHT THEME ================  */
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
// const iconTheme = 'uil-sun'
const iconTheme = 'uil-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains('darkTheme') ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains('iconTheme') ? 'uil-moon' : 'uil-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})
