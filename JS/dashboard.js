/* ============================================ ADMIN DASHBOARD SECTION ==============================================  */
/* ================== KPI CARD HOVER EFFECTS ================  */
const kpiCards = document.querySelectorAll('.kpis > div');
kpiCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-2px)';
        this.style.transition = 'transform 0.2s ease-out';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
    });
});

/* ================== SIDEBAR TOGGLE ================  */
const openBtn = document.getElementById("openSidebarBtn");
const closeBtn = document.getElementById("closeSidebarBtn");
const sidebar = document.getElementById("mobile-sidebar");
const sidebarContent = document.getElementById("mobile-sidebar-content");

openBtn?.addEventListener("click", () => {
  sidebar.classList.remove("hidden");
  setTimeout(() => {
    sidebarContent.classList.remove("translate-x-full");
  }, 10);
});

closeBtn?.addEventListener("click", () => {
  sidebarContent.classList.add("translate-x-full");
  setTimeout(() => {
    sidebar.classList.add("hidden");
  }, 300);
});

sidebar?.addEventListener("click", (e) => {
  if (e.target === sidebar) {
    closeBtn.click();
  }
});

/* ================== MOBILE SIDEBAR LINK ================  */
document.querySelectorAll('#mobile-sidebar nav a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
      section.classList.add('hidden');
    });

    // Show the selected section
    if (targetSection) {
      targetSection.classList.remove('hidden');
    }

    // ===== 🔥 Highlight Active Link =====
    document.querySelectorAll('#mobile-sidebar nav a').forEach(l => {
      l.classList.remove('bg-primary-50', 'text-primary', 'font-medium');
      l.classList.add('text-text-secondary');
    });

    this.classList.add('bg-primary-50', 'text-primary', 'font-medium');
    this.classList.remove('text-text-secondary');

    // Re-initialize charts if finance
    if (targetId === "#finance") {
      if (Chart.getChart("financialLineChart")) Chart.getChart("financialLineChart").destroy();
      if (Chart.getChart("revenueChart")) Chart.getChart("revenueChart").destroy();
      setTimeout(() => initCharts(), 50);
    }

    // Optional: close sidebar
    document.getElementById('closeSidebarBtn')?.click();
  });
});


/* ================== Financial Reports MOBILE SIDEBAR LINK ================  */
document.querySelectorAll('#mobile-sidebar nav a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
      section.classList.add('hidden');
    });

    // Show the selected section
    if (targetSection) {
      targetSection.classList.remove('hidden');
    }

    // Re-initialize charts if finance
    if (targetId === "#finance") {
      if (Chart.getChart("financialLineChart")) Chart.getChart("financialLineChart").destroy();
      if (Chart.getChart("revenueChart")) Chart.getChart("revenueChart").destroy();
      setTimeout(() => initCharts(), 50);
    }

    // Optional: close sidebar
    document.getElementById('closeSidebarBtn')?.click();
  });
});

/* ================== SECTION TOGGLE AND SIDEBAR NAVIGATION ================  */
document.addEventListener("DOMContentLoaded", () => {
  const desktopLinks = document.querySelectorAll("#desktop-sidebar a");
  const mobileLinks = document.querySelectorAll("#mobile-nav a");
  const sections = document.querySelectorAll(".content-section");

  function showSection(id) {
    // Hide all sections
    sections.forEach(section => section.classList.add("hidden"));

    // Show the target section
    const target = document.querySelector(id);
    if (target) target.classList.remove("hidden");

    // Handle Desktop Nav
    desktopLinks.forEach(link => {
      link.classList.remove("bg-primary-50", "text-primary", "font-medium");
      link.classList.add("text-text-secondary");
    });

    const desktopActive = document.querySelector(`#desktop-sidebar a[href="${id}"]`);
    if (desktopActive) {
      desktopActive.classList.add("bg-primary-50", "text-primary", "font-medium");
      desktopActive.classList.remove("text-text-secondary");
    }

    // Handle Mobile Nav
    mobileLinks.forEach(link => {
      link.classList.remove("text-primary");
      link.classList.add("text-text-secondary");
    });

    const mobileActive = document.querySelector(`#mobile-nav a[href="${id}"]`);
    if (mobileActive) {
      mobileActive.classList.add("text-primary");
      mobileActive.classList.remove("text-text-secondary");
    }

    // Init charts if on finance
    if (id === "#finance") {
      if (Chart.getChart("financialLineChart")) Chart.getChart("financialLineChart").destroy();
      if (Chart.getChart("revenueChart")) Chart.getChart("revenueChart").destroy();
      setTimeout(() => {
        initCharts();
      }, 50);
    }

    // Trigger bar chart animation if on analytics
    if (id === "#analytics") {
      const bars = document.querySelectorAll("#revenue-chart > div");
      const heights = ["45%", "60%", "35%", "80%", "90%", "70%", "100%"];
      bars.forEach((bar, i) => {
        bar.style.height = "0%";
        setTimeout(() => {
          bar.style.transition = "height 0.8s ease";
          bar.style.height = heights[i];
        }, i * 100);
      });
    }
  }

  // Attach click listeners
  [...desktopLinks, ...mobileLinks].forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      showSection(targetId);
    });
  });

  // Show dashboard by default
  showSection("#dashboard");
});

/* ================== CHART INITIALIZATIONFUNCTION ================  */
function initCharts() {
    /* ================== LINE CHART FOR FINANCIAL TRENDS ================  */
    const financialLineCtx = document.getElementById('financialLineChart')?.getContext('2d');
    if (financialLineCtx) {
        new Chart(financialLineCtx, {
            type: 'line',
            data: {
                labels: ['Mar 1', 'Mar 7', 'Mar 13', 'Mar 19', 'Mar 25'],
                datasets: [{
                    label: 'Revenue',
                    data: [200, 1800, 700, 2200, 2700],
                    borderColor: '#27AE60',
                    backgroundColor: 'rgba(39, 174, 96, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 3,
                    pointBackgroundColor: '#27AE60',
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        ticks: {
                            callback: value => `₦${value}`
                        },
                        beginAtZero: true,
                        grid: {
                            color: '#f0f0f0'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    /* ================== DOUGHNUT CHART FOR REVENUE BY CATEGORY ================  */
    const revenueChartCtx = document.getElementById('revenueChart')?.getContext('2d');
    if (revenueChartCtx) {
        new Chart(revenueChartCtx, {
            type: 'doughnut',
            data: {
                labels: ['Food', 'Delivery', 'Subscriptions', 'Ads'],
                datasets: [{
                    data: [500000, 300000, 250000, 153456],
                    backgroundColor: [
                        '#FF6B6B',  // Coral Red
                        '#6BCB77',  // Vibrant Green
                        '#4D96FF',  // Sky Blue
                        '#F7C948'   // Golden Yellow
                    ],
                    borderColor: '#ffffff',
                    borderWidth: 2,
                    hoverOffset: 12
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#374151', // Tailwind gray-700
                            font: {
                                size: 14,
                                weight: '600'
                            },
                            boxWidth: 16,
                            padding: 20
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                const value = context.raw.toLocaleString('en-NG');
                                return `${context.label}: ₦${value}`;
                            }
                        }
                    }
                },
                cutout: '65%',
                animation: {
                    animateScale: true
                }
            }
        });
    }
}


/* ============================================ RESTAURANT DASHBOARD SECTION =========================================  */
/* ================= Analytics Overview =================  */
// Sales Line Chart
new Chart(document.getElementById("salesLineChart"), {
  type: "line",
  data: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [{
      label: "Sales",
      data: [10, 25, 15, 30, 20, 35, 40],
      borderColor: "#3b82f6",
      fill: false,
      tension: 0.4
    }]
  },
  options: {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true } }
  }
});

// Donut Chart
new Chart(document.getElementById("menuDonutChart"), {
  type: "doughnut",
  data: {
    labels: ["Margherita", "Caesar Salad", "Spaghetti", "Other"],
    datasets: [{
      data: [40, 25, 20, 15],
      backgroundColor: ["#3b82f6", "#22c55e", "#06b6d4", "#e5e7eb"],
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false, // ✅ This is key
    plugins: {
      legend: { display: false }
    },
    cutout: "70%"
  }
});


