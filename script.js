/* =========================================================
   FIREBASE INITIALIZATION & AUTHENTICATION
   ========================================================= */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAWm0HzLbeZCjFJxpsnTa7AJmmB6b1Z4ZM",
  authDomain: "rsap-tech-labs.firebaseapp.com",
  projectId: "rsap-tech-labs",
  storageBucket: "rsap-tech-labs.firebasestorage.app",
  messagingSenderId: "515942854779",
  appId: "1:515942854779:web:af61ac78027ac309e9b2de",
  measurementId: "G-N03TQE7FP4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

let currentUser = null;

// Listen for Login / Logout state changes
onAuthStateChanged(auth, (user) => {
  const authBtn = document.getElementById("authBtn");
  if (!authBtn) return;

  if (user) {
    currentUser = user;
    const firstName = user.displayName ? user.displayName.split(" ")[0] : "User";
    authBtn.innerHTML = `Sign Out (${firstName})`;
    authBtn.classList.replace("btn-primary", "btn-ghost");
    console.log("Logged in user UID:", user.uid);
  } else {
    currentUser = null;
    authBtn.innerText = "Login with Google";
    authBtn.classList.replace("btn-ghost", "btn-primary");
  }
});

/* =========================================================
   RSAP TECH LABS — CENTRAL CONTENT TEMPLATE
   Add, remove, or modify items directly inside this object!
   ========================================================= */
const RSAP_CONFIG = {
  ticker: [
    "Enrolling for Weekend Enterprise Batches",
    "1-on-1 Confidential Job Support Slots Open",
    "Functional Spec (FS) Architecture Blueprints Available",
    "Emergency Ticket Debugging Sessions Available"
  ],

  courses: [
    {
      id: "sap-sd",
      tag: "ENTERPRISE ERP",
      badge: "Hands-on S/4 HANA",
      title: "SAP SD End-to-End Implementation",
      desc: "Full Order-to-Cash (OTC) lifecycle, business partner setup, pricing procedures, and integration touchpoints.",
      duration: "8 Weeks",
      modulesCount: "6 Core Modules",
      topics: [
        {
          main: "1. Enterprise Structure & Master Data",
          subtopics: [
            {
              title: "Organizational Hierarchy & Assignments",
              type: "video",
              mediaUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
              content: "Step-by-step walkthrough covering Sales Org, Distribution Channel, Division, and mapping them to Company Codes and Plants."
            },
            {
              title: "Business Partner Setup (CVI Mapping)",
              type: "image",
              mediaUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
              content: "Architectural overview of Customer-Vendor Integration (CVI) and business partner role assignment in S/4 HANA."
            }
          ]
        },
        {
          main: "2. Pricing Procedure Determination",
          subtopics: [
            {
              title: "16 Fields in Pricing Calculation",
              type: "text",
              content: "Practical breakdown of Step, Counter, Condition Type, From-To, Statistical, Requirement routines, and Account Keys."
            }
          ]
        }
      ]
    },
    {
      id: "cloud-integration",
      tag: "ARCHITECTURE",
      badge: "API & Middleware",
      title: "Enterprise Systems Integration",
      desc: "Connecting enterprise core platforms with cloud applications via REST APIs, Kafka event streams, and secure pipelines.",
      duration: "6 Weeks",
      modulesCount: "4 Modules",
      topics: [
        {
          main: "1. Messaging & Gateways",
          subtopics: [
            {
              title: "Synchronous REST vs Asynchronous Kafka",
              type: "image",
              mediaUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
              content: "Comparative breakdown of low-latency REST calls versus event-driven streaming queues in high-throughput enterprise pipelines."
            }
          ]
        }
      ]
    }
  ],

  supportPlans: [
    {
      tag: "CRITICAL SUPPORT",
      badge: "Instant Screen Share",
      title: "Pay-Per-Hour Ticket Debugging",
      desc: "Stuck on a production issue or tight deadline? Jump on a direct 1:1 screen-share session to trace the root cause and test the fix.",
      duration: "Hourly Ad-hoc",
      actionText: "Book Session"
    },
    {
      tag: "MONTHLY RETAINER",
      badge: "Most Popular",
      title: "Dedicated Sprint Shadowing",
      desc: "Daily 1-hour screen sharing to review your sprint backlog, configure solutions, write functional specs, and prep for standups.",
      duration: "Monthly Retainer",
      actionText: "Inquire Plan"
    },
    {
      tag: "INTERVIEW PREP",
      badge: "Career Shift",
      title: "Project Scenario Prep & CV Refactor",
      desc: "Detailed project scenario walk-throughs, technical role-play interviews, and end-to-end resume tuning for consultants.",
      duration: "3 Interactive Sessions",
      actionText: "Schedule Prep"
    }
  ]
};

// =========================================================
// RENDER & DOM CONTROLLER
// =========================================================
let currentActiveCourse = null;

function renderCourseCards(coursesToRender) {
  const courseGrid = document.getElementById("courseGrid");
  if (!courseGrid) return;

  if (coursesToRender.length === 0) {
    courseGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 48px 24px; border: 1px dashed var(--line); border-radius: var(--radius); background: rgba(20, 31, 54, 0.4);">
        <p style="font-size: 18px; font-weight: 700; color: #fff; margin-bottom: 8px;">No courses found matching your search.</p>
        <p style="font-size: 14px; color: var(--muted);">Try keywords like "SAP", "Pricing", "API", or "Cloud".</p>
      </div>
    `;
    return;
  }

  courseGrid.innerHTML = coursesToRender.map((course) => {
    const originalIndex = RSAP_CONFIG.courses.findIndex(c => c.id === course.id);
    return `
      <article class="card">
        <div>
          <div class="card-header">
            <span class="tag">${course.tag}</span>
            <span class="badge">${course.badge}</span>
          </div>
          <h3>${course.title}</h3>
          <p>${course.desc}</p>
        </div>
        <div>
          <div class="card-meta">
            <span>Duration: <b>${course.duration}</b></span>
            <span>${course.modulesCount}</span>
          </div>
          <button class="btn btn-ghost" style="width:100%; margin-top:14px;" onclick="openCourseViewer(${originalIndex})">
            View Syllabus & Lessons →
          </button>
        </div>
      </article>
    `;
  }).join("");
}

function renderHomePage() {
  // 1. Marquee Ticker
  const tickerContainer = document.getElementById("tickerTrack");
  if (tickerContainer) {
    const tickerItems = RSAP_CONFIG.ticker.map(item => `<span>⚡ <b>Update:</b> ${item}</span>`).join("");
    tickerContainer.innerHTML = tickerItems + tickerItems;
  }

  // 2. Initial Courses Render
  renderCourseCards(RSAP_CONFIG.courses);

  // 3. Support Cards
  const supportGrid = document.getElementById("supportGrid");
  if (supportGrid) {
    supportGrid.innerHTML = RSAP_CONFIG.supportPlans.map(plan => `
      <article class="card">
        <div>
          <div class="card-header">
            <span class="tag">${plan.tag}</span>
            <span class="badge">${plan.badge}</span>
          </div>
          <h3>${plan.title}</h3>
          <p>${plan.desc}</p>
        </div>
        <div>
          <div class="card-meta">
            <span>Model: <b>${plan.duration}</b></span>
            <span style="color:var(--accent);">1-on-1 Remote</span>
          </div>
          <a class="btn btn-primary" style="width:100%; margin-top:14px;" href="#contact">
            ${plan.actionText}
          </a>
        </div>
      </article>
    `).join("");
  }
}

// =========================================================
// SEARCH ENGINE CONTROLLER
// =========================================================
function setupCourseSearch() {
  const searchInput = document.getElementById("courseSearchInput");
  if (!searchInput) return;

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();

    const filtered = RSAP_CONFIG.courses.filter(course => {
      const matchTitle = course.title.toLowerCase().includes(query);
      const matchDesc = course.desc.toLowerCase().includes(query);
      const matchTag = course.tag.toLowerCase().includes(query);

      const matchTopics = course.topics.some(topic => 
        topic.main.toLowerCase().includes(query) ||
        topic.subtopics.some(sub => sub.title.toLowerCase().includes(query))
      );

      return matchTitle || matchDesc || matchTag || matchTopics;
    });

    renderCourseCards(filtered);

    if (query.length === 1) {
      document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" });
    }
  });
}

// =========================================================
// COURSE VIEWER CONTROLLER (MODAL & SIDEBAR)
// =========================================================
function openCourseViewer(courseIndex) {
  currentActiveCourse = courseIndex;
  const course = RSAP_CONFIG.courses[courseIndex];
  if (!course) return;

  document.getElementById("viewerTitle").innerText = course.title;

  const sidebar = document.getElementById("sidebarTopics");
  sidebar.innerHTML = course.topics.map((topic, tIdx) => `
    <div class="topic-group">
      <div class="topic-title" onclick="toggleTopicAccordion(${tIdx})">
        <span>${topic.main}</span>
        <span id="accordion-icon-${tIdx}">+</span>
      </div>
      <ul class="subtopic-list" id="subtopic-list-${tIdx}">
        ${topic.subtopics.map((sub, sIdx) => `
          <li class="subtopic-item" id="sub-item-${tIdx}-${sIdx}" onclick="loadLessonContent(${tIdx}, ${sIdx})">
            ${sub.title}
          </li>
        `).join("")}
      </ul>
    </div>
  `).join("");

  document.getElementById("viewerModal").classList.add("active");
  document.body.style.overflow = "hidden";

  if (course.topics.length > 0) {
    toggleTopicAccordion(0);
    if (course.topics[0].subtopics.length > 0) {
      loadLessonContent(0, 0);
    }
  }
}

function toggleTopicAccordion(topicIndex) {
  const list = document.getElementById(`subtopic-list-${topicIndex}`);
  const icon = document.getElementById(`accordion-icon-${topicIndex}`);
  if (!list || !icon) return;

  const isOpen = list.classList.contains("open");
  list.classList.toggle("open", !isOpen);
  icon.innerText = isOpen ? "+" : "−";
}

function loadLessonContent(topicIndex, subIndex) {
  document.querySelectorAll(".subtopic-item").forEach(item => item.classList.remove("active"));
  const activeItem = document.getElementById(`sub-item-${topicIndex}-${subIndex}`);
  if (activeItem) activeItem.classList.add("active");

  const lesson = RSAP_CONFIG.courses[currentActiveCourse].topics[topicIndex].subtopics[subIndex];
  const targetArea = document.getElementById("viewerArticle");

  let mediaHtml = "";
  if (lesson.type === "video" && lesson.mediaUrl) {
    mediaHtml = `<div class="media-container"><iframe src="${lesson.mediaUrl}" allowfullscreen></iframe></div>`;
  } else if (lesson.type === "image" && lesson.mediaUrl) {
    mediaHtml = `<div class="media-container"><img src="${lesson.mediaUrl}" alt="${lesson.title}" /></div>`;
  }

  targetArea.innerHTML = `
    <span class="tag">TOPIC LESSON</span>
    <h2>${lesson.title}</h2>
    ${mediaHtml}
    <p>${lesson.content}</p>
  `;
}

function closeCourseViewer() {
  document.getElementById("viewerModal").classList.remove("active");
  document.body.style.overflow = "auto";
}

// Make functions accessible from HTML onclick attributes
window.openCourseViewer = openCourseViewer;
window.toggleTopicAccordion = toggleTopicAccordion;
window.loadLessonContent = loadLessonContent;
window.closeCourseViewer = closeCourseViewer;

// =========================================================
// EVENT LISTENERS & BOOTSTRAP
// =========================================================
document.addEventListener("DOMContentLoaded", () => {
  renderHomePage();
  setupCourseSearch();

  // Mobile menu toggle
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");
  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => navLinks.classList.toggle("open"));
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => navLinks.classList.remove("open"));
    });
  }

  // Google Login / Logout handler
  const authBtn = document.getElementById("authBtn");
  if (authBtn) {
    authBtn.addEventListener("click", async () => {
      if (currentUser) {
        await signOut(auth);
      } else {
        try {
          await signInWithPopup(auth, provider);
        } catch (error) {
          console.error("Login failed:", error.message);
          alert("Login error: " + error.message);
        }
      }
    });
  }

  // Close viewer button
  const closeBtn = document.getElementById("closeViewerBtn");
  if (closeBtn) closeBtn.addEventListener("click", closeCourseViewer);

  // Close modal when pressing the ESC key
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeCourseViewer();
  });
});