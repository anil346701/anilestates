document.addEventListener("DOMContentLoaded", function () {
    // City Locations Data
    const locationData = {
        "Visakhapatnam": [
            "Madhurawada", "MVP Colony", "Gajuwaka", "Rushikonda", 
            "Dwaraka Nagar", "Seethammadhara", "Siripuram", "PM Palem"
        ],
        "Hyderabad": [
            "Gachibowli", "Madhapur", "Hitech City", "Kukatpally", 
            "Banjara Hills", "Jubilee Hills", "Kondapur"
        ],
        "Bangalore": [
            "Whitefield", "Indiranagar", "Koramangala", "Electronic City", "Yelahanka"
        ]
    };

    const citySelect = document.getElementById('citySelect');
    const locationSelect = document.getElementById('locationSelect');

    if (citySelect && locationSelect) {
        citySelect.addEventListener('change', function () {
            const selectedCity = this.value;
            locationSelect.innerHTML = '<option value="">All Locations</option>';

            if (selectedCity && locationData[selectedCity]) {
                locationData[selectedCity].forEach(function (loc) {
                    const option = document.createElement('option');
                    option.value = loc;
                    option.textContent = loc;
                    locationSelect.appendChild(option);
                });
            }
        });
    }

    // Active Link Highlight on Scroll
    const navLi = document.querySelectorAll('.nav-links li');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLi.forEach(li => {
            li.classList.remove('active');
            if (li.querySelector('a').getAttribute('href') === `#${current}`) {
                li.classList.add('active');
            }
        });
    });

    // Interactive Tabs (About Section)
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            const targetContent = document.getElementById(tabId);
            if (targetContent) targetContent.classList.add('active');
        });
    });

    // Gallery Category Filtering (Gallery Section)
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Statistics Counter Animation
    const counters = document.querySelectorAll('.counter');
    let hasAnimated = false;

    window.addEventListener('scroll', () => {
        const statsSection = document.querySelector('.stats-bar');
        if (!statsSection) return;

        const sectionPos = statsSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight;

        if (sectionPos < screenPos && !hasAnimated) {
            hasAnimated = true;
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                let count = 0;
                const increment = target / 40;

                const updateCount = () => {
                    count += increment;
                    if (count < target) {
                        counter.innerText = Math.ceil(count);
                        setTimeout(updateCount, 30);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
            });
        }
    });
});
// --- CUSTOMER REVIEWS CAROUSEL LOGIC ---
const track = document.querySelector('.reviews-track');
const cards = document.querySelectorAll('.review-card');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dots = document.querySelectorAll('.dot');

if (track && cards.length > 0) {
    let currentIndex = 0;
    const cardCount = cards.length;

    function updateCarousel(index) {
        track.style.transform = `translateX(-${index * 100}%)`;
        
        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[index]) dots[index].classList.add('active');
    }

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % cardCount;
        updateCarousel(currentIndex);
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + cardCount) % cardCount;
        updateCarousel(currentIndex);
    });

    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            currentIndex = idx;
            updateCarousel(currentIndex);
        });
    });

    // Auto Slide every 5 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % cardCount;
        updateCarousel(currentIndex);
    }, 5000);
}
// --- PROJECTS TAB FILTER (On-Going vs Completed) ---
const projectTabBtns = document.querySelectorAll('.project-tab-btn');
const projectCards = document.querySelectorAll('.project-card');

projectTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Toggle active status on buttons
        projectTabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const selectedStatus = btn.getAttribute('data-status');

        // Filter cards based on status
        projectCards.forEach(card => {
            if (card.classList.contains(selectedStatus)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});
// --- CAREERS MODAL CONTROLS ---
const careersLink = document.getElementById('careersLink');
const careersModal = document.getElementById('careersModal');
const closeCareersModal = document.getElementById('closeCareersModal');
const modalOkBtn = document.getElementById('modalOkBtn');

// Also attach event listener to navbar careers link if available
const navCareersLinks = document.querySelectorAll('a[href="#careers"]');

function openModal(e) {
    if (e) e.preventDefault();
    if (careersModal) careersModal.classList.add('active');
}

function closeModal() {
    if (careersModal) careersModal.classList.remove('active');
}

if (careersLink) careersLink.addEventListener('click', openModal);

navCareersLinks.forEach(link => {
    link.addEventListener('click', openModal);
});

if (closeCareersModal) closeCareersModal.addEventListener('click', closeModal);
if (modalOkBtn) modalOkBtn.addEventListener('click', closeModal);

// Close Modal when clicking outside the card
if (careersModal) {
    careersModal.addEventListener('click', (e) => {
        if (e.target === careersModal) {
            closeModal();
        }
    });
}
// --- CAREERS APPLICATION MODAL CONTROLS ---
function openApplyModal(roleName) {
    const applyModal = document.getElementById('applyModal');
    const selectedRoleName = document.getElementById('selectedRoleName');
    
    if (selectedRoleName) {
        selectedRoleName.textContent = roleName;
    }
    
    if (applyModal) {
        applyModal.classList.add('active');
    }
}

function closeApplyModal() {
    const applyModal = document.getElementById('applyModal');
    if (applyModal) {
        applyModal.classList.remove('active');
    }
}

// Close apply modal on clicking backdrop
const applyModal = document.getElementById('applyModal');
if (applyModal) {
    applyModal.addEventListener('click', function (e) {
        if (e.target === applyModal) {
            closeApplyModal();
        }
    });
}

// Handle Form Submission
const careerForm = document.getElementById('careerForm');
if (careerForm) {
    careerForm.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Thank you! Your application has been submitted successfully. Our HR team will get back to you shortly.');
        careerForm.reset();
        closeApplyModal();
    });
}
// --- AUTOMATIC LEAD CAPTURE POPUP LOGIC ---
document.addEventListener("DOMContentLoaded", function () {
    const leadModal = document.getElementById('leadModal');
    const closeLeadModal = document.getElementById('closeLeadModal');
    const leadForm = document.getElementById('leadForm');

    // Function to show popup
    function showLeadModal() {
        if (leadModal && !sessionStorage.getItem('leadSubmitted')) {
            leadModal.classList.add('active');
        }
    }

    // Automatically trigger popup 3 seconds after site load
    setTimeout(showLeadModal, 3000);

    // Close Modal on clicking X button
    if (closeLeadModal) {
        closeLeadModal.addEventListener('click', function () {
            leadModal.classList.remove('active');
        });
    }

    // Close Modal when clicking background overlay
    if (leadModal) {
        leadModal.addEventListener('click', function (e) {
            if (e.target === leadModal) {
                leadModal.classList.remove('active');
            }
        });
    }

    // Handle Form Submission
    if (leadForm) {
        leadForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('clientName').value;
            const phone = document.getElementById('clientPhone').value;
            const location = document.getElementById('clientLocation').value;

            // Log details in browser console
            console.log("New Lead Captured:", { name, phone, location });

            // Store in sessionStorage to prevent popup from showing again in same session
            sessionStorage.setItem('leadSubmitted', 'true');

            // Success feedback
            alert(`Thank you ${name}! Our representative will contact you regarding properties in ${location} shortly.`);
            
            leadForm.reset();
            leadModal.classList.remove('active');
        });
    }
});
document.getElementById("leadForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const submitBtn = document.getElementById("leadSubmitBtn");
  submitBtn.innerText = "Sending...";
  submitBtn.disabled = true;

  const nameVal = document.getElementById("leadName").value;
  const phoneVal = document.getElementById("leadPhone").value;
  const locationVal = document.getElementById("leadLocation").value;
  const currentDate = new Date().toLocaleString();

  const formData = [
    {
      name: nameVal,
      phone: phoneVal,
      location: locationVal,
      date: currentDate
    }
  ];

  const STEIN_LEADS_URL = "https://api.steinhq.com/v1/storages/6a6c606492b1163e972650aa/Leads";

  fetch(STEIN_LEADS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  })
    .then(res => res.json())
    .then(data => {
      alert("Thank you! We will get back to you shortly.");
      document.getElementById("leadForm").reset();
      
      const modal = document.getElementById("leadModal");
      if (modal) modal.style.display = "none";
    })
    .catch(err => {
      console.error("Submission Error:", err);
      alert("Something went wrong. Please try again.");
    })
    .finally(() => {
      submitBtn.innerText = "Get Free Callback";
      submitBtn.disabled = false;
    });
});
document.getElementById("closeLeadModal").addEventListener("click", function() {
  document.getElementById("leadModal").style.display = "none";
});
// Example inside your projects rendering loop:
const whatsappNumber = "918978954154"; // Country code 91 + your number

// Encode the project title so it inserts automatically into the WhatsApp message
const whatsappMessage = encodeURIComponent(
  `Hello ANIL ESTATES, I am interested in getting details for project: ${project.title} (${project.location}). Please share more info!`
);

const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

// Add this button to your project card template:
card.innerHTML = `
  <img src="${project.image}" alt="${project.title}" style="width:100%; height:200px; object-fit:contain; background:#f8f9fa;">
  <h3>${project.title}</h3>
  <p><strong>Location:</strong> ${project.location}</p>
  <p><strong>Price:</strong> ${project.price}</p>
  
  <!-- WHATSAPP DIRECT LINK BUTTON -->
  <a href="${whatsappUrl}" target="_blank" class="whatsapp-card-btn">
    <i class="fa-brands fa-whatsapp"></i> Enquire on WhatsApp
  </a>
`;



