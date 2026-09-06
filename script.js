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
import {
  getFirestore,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

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
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

let currentUser = null;
let currentActiveCourse = null;
let pendingCourseIndex = null;

// Listen for Login / Logout state changes
onAuthStateChanged(auth, (user) => {
  const authBtn = document.getElementById("authBtn");
  if (!authBtn) return;

  if (user) {
    currentUser = user;
    const firstName = user.displayName ? user.displayName.split(" ")[0] : "User";
    authBtn.innerHTML = `Sign Out (${firstName})`;
    authBtn.classList.replace("btn-primary", "btn-ghost");
  } else {
    currentUser = null;
    authBtn.innerText = "Login with Google";
    authBtn.classList.replace("btn-ghost", "btn-primary");
  }
});

/* =========================================================
   RSAP TECH LABS — CENTRAL CONTENT TEMPLATE
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
      id: "sap-fundamentals",
      tag: "FOUNDATIONS",
      badge: "Architecture & Basics",
      title: "SAP Fundamentals & SD Overview",
      desc: "Core concepts of ERP, 3-tier R/3 architecture, system landscape (DEV/QAS/PRD), modular integration, and version evolutions.",
      duration: "1 Week",
      modulesCount: "3 Modules",
      topics: [
        {
          main: "1. Introduction to ERP & SAP Ecosystem",
          subtopics: [
            {
              title: "What is ERP & The Role of 4 M's",
              type: "text",
              content: "<b>SAP</b> stands for <i>System Application & Products in Data Processing</i>.<br><br>" +
                       "Enterprise Resource Planning (ERP) coordinates the <b>4 M's</b> across all enterprise departments:<br>" +
                       "• <b>Machinery:</b> Plant, equipment, and manufacturing assets.<br>" +
                       "• <b>Material:</b> Raw inventory, semi-finished goods, and finished products.<br>" +
                       "• <b>Manpower:</b> Human capital, consultants, and workforce allocation.<br>" +
                       "• <b>Money:</b> Financial accounting, cash flow, and cost controlling.<br><br>" +
                       "<b>Key ERP Competitors:</b> Oracle (Financial focus), PeopleSoft / Workday (HR focus), Siebel (CRM focus), and Baan."
            },
            {
              title: "Why Enterprises Prefer SAP",
              type: "text",
              content: "<b>1. Universal Cross-Functional Fit:</b> Delivers unified solutions across SD, MM, FI, CO, PP, and QM rather than siloed point solutions.<br>" +
                       "<b>2. Seamless Integration:</b> Actions executed in one department (e.g., Post Goods Issue in SD/MM) automatically trigger real-time postings in Financial Accounting without manual handoffs.<br>" +
                       "<b>3. Enterprise Data Security & Market Share:</b> Robust authorization matrix with extensive market adoption across global manufacturing and services leaders."
            },
            {
              title: "Core SAP Modules & Version Evolution",
              type: "text",
              content: "<b>Core Modules:</b><br>" +
                       "• <b>SD:</b> Sales & Distribution<br>" +
                       "• <b>MM:</b> Materials Management<br>" +
                       "• <b>FI/CO:</b> Financial Accounting & Controlling<br>" +
                       "• <b>PP:</b> Production Planning<br>" +
                       "• <b>QM / PM / PS:</b> Quality Management, Plant Maintenance, Project Systems<br><br>" +
                       "<b>Version Evolution:</b> R/3 4.0 → 4.6C → 4.7 Enterprise → ERP Central Component (ECC 5.0 / 6.0 EHP 1–8) → SAP S/4HANA."
            }
          ]
        },
        {
          main: "2. SAP Architecture & System Landscape",
          subtopics: [
            {
              title: "3-Tier R/3 Architecture",
              type: "text",
              content: "SAP R/3 operates on a high-throughput 3-tier client/server framework:<br><br>" +
                       "• <b>1. Presentation Layer (GUI / Fiori):</b> The user workstation or browser interface sending screen input and receiving processed output.<br>" +
                       "• <b>2. Application Layer:</b> The processing mediator where ABAP programs, business logic, and dispatchers execute.<br>" +
                       "• <b>3. Database Layer:</b> Central relational database storing all enterprise business tables, configuration data, and transaction logs."
            },
            {
              title: "System Landscape: DEV, QAS & PRD",
              type: "text",
              content: "A standard enterprise SAP landscape segregates servers to safeguard business operations:<br><br>" +
                       "• <b>Development Server (DEV):</b> Dedicated environment for consultants and developers to build configurations (SPRO) and ABAP customizations. End users have no access.<br>" +
                       "• <b>Quality Assurance Server (QAS):</b> Staging environment where functional consultants and Core Users (domain experts) validate end-to-end business scenarios, conduct User Acceptance Testing (UAT), and verify transport requests.<br>" +
                       "• <b>Production Server (PRD):</b> The live environment where end users process daily sales orders, deliveries, and billing documents. Functional consultants have restricted, read-only/support access to protect transaction integrity."
            }
          ]
        },
        {
          main: "3. SAP SD Consulting & Interview Roadmap",
          subtopics: [
            {
              title: "Core Functional Deliverables for Consultants",
              type: "text",
              content: "Mastering SD consulting requires fluency across end-to-end processes:<br>" +
                       "• Standard Sales (Order-to-Cash), Third-Party Processing (TAS), and Individual Purchase Orders (TAB)<br>" +
                       "• Stock Transport Orders (STO) and Intercompany Billing<br>" +
                       "• Condition Technique & Pricing Procedure Determination<br>" +
                       "• Credit Management, Availability Checks (ATP), and Output Determination<br>" +
                       "• Functional Specification (FS) drafting, Gap Analysis, User Exits, and Cutover Activities."
            }
          ]
        }
      ]
    },
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

  const resultCount = document.getElementById("courseResultCount");
  if (resultCount) resultCount.textContent = `${String(coursesToRender.length).padStart(2,"0")} learning track${coursesToRender.length === 1 ? "" : "s"}`;

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
  const tickerContainer = document.getElementById("tickerTrack");
  if (tickerContainer) {
    const tickerItems = RSAP_CONFIG.ticker.map(item => `<span>⚡ <b>Update:</b> ${item}</span>`).join("");
    tickerContainer.innerHTML = tickerItems + tickerItems;
  }

  renderCourseCards(RSAP_CONFIG.courses);

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
        topic.subtopics.some(sub => sub.title.toLowerCase().includes(query) || (sub.content || "").toLowerCase().includes(query))
      );
      const matchBadge = course.badge.toLowerCase().includes(query);

      return !query || matchTitle || matchDesc || matchTag || matchTopics || matchBadge;
    });

    renderCourseCards(filtered);

    if (query.length === 1) {
      document.getElementById("courses")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      searchInput.value = "";
      renderCourseCards(RSAP_CONFIG.courses);
      searchInput.blur();
    }
    if (e.key === "Enter") document.getElementById("courses")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

// =========================================================
// AUTHENTICATION & ADMIN WHITELIST GATEKEEPER
// =========================================================
async function verifyUserAuthorization(user) {
  if (!user || !user.email) return { authorized: false };
  const emailKey = user.email.toLowerCase().trim();
  const userDocRef = doc(db, "allowed_users", emailKey);

  try {
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      // Accepts lowercase or capitalized status ('approved' or 'Approved')
      const statusValue = (data.status || data.Status || "").toLowerCase();
      if (statusValue === "approved") {
        return { authorized: true, data };
      }
    }
    return { authorized: false };
  } catch (error) {
    console.error("Whitelist check error:", error);
    return { authorized: false };
  }
}

async function handleGoogleLogin() {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const authCheck = await verifyUserAuthorization(user);

    if (!authCheck.authorized) {
      const attemptedEmail = user.email;
      await signOut(auth);

      const emailPlaceholder = document.getElementById("deniedUserEmail");
      if (emailPlaceholder) emailPlaceholder.innerText = attemptedEmail;

      closeAuthGateModal();
      const deniedModal = document.getElementById("accessDeniedModal");
      if (deniedModal) {
        deniedModal.style.display = "flex";
        deniedModal.classList.add("active");
      }
      return;
    }

    closeAuthGateModal();

    if (pendingCourseIndex !== null) {
      openCourseViewer(pendingCourseIndex);
      pendingCourseIndex = null;
    }

  } catch (err) {
    if (err.code !== "auth/popup-closed-by-user") {
      console.error("Login process error:", err);
      alert("Authentication error: " + err.message);
    }
  }
}

function closeAccessDeniedModal() {
  const modal = document.getElementById("accessDeniedModal");
  if (modal) {
    modal.classList.remove("active");
    modal.style.display = "none";
  }
}

// =========================================================
// COURSE VIEWER CONTROLLERS
// =========================================================
function openCourseViewer(courseIndex) {
  if (!currentUser) {
    pendingCourseIndex = courseIndex;
    const authModal = document.getElementById("authGateModal");
    if (authModal) {
      authModal.style.display = "flex";
      authModal.classList.add("active");
    }
    return;
  }

  currentActiveCourse = courseIndex;
  const course = RSAP_CONFIG.courses[courseIndex];
  if (!course) return;

  const viewerTitle = document.getElementById("viewerTitle");
  if (viewerTitle) viewerTitle.innerText = course.title;

  const sidebar = document.getElementById("sidebarTopics");
  if (sidebar) {
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
  }

  const viewerModal = document.getElementById("viewerModal");
  if (viewerModal) {
    viewerModal.style.display = "flex";
    viewerModal.classList.add("active");
  }
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
  if (!targetArea) return;

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

  document.querySelector(".viewer-main")?.scrollTo({ top: 0, behavior: "instant" });
}

function closeCourseViewer() {
  const viewer = document.getElementById("viewerModal");
  if (viewer) {
    viewer.classList.remove("active");
    viewer.style.display = "none";
  }
  document.body.style.overflow = "auto";
}

function closeAuthGateModal() {
  const authModal = document.getElementById("authGateModal");
  if (authModal) {
    authModal.classList.remove("active");
    authModal.style.display = "none";
  }
  pendingCourseIndex = null;
}

// Global attachments for inline event handlers
window.openCourseViewer = openCourseViewer;
window.toggleTopicAccordion = toggleTopicAccordion;
window.loadLessonContent = loadLessonContent;
window.closeCourseViewer = closeCourseViewer;
window.closeAuthGateModal = closeAuthGateModal;
window.closeAccessDeniedModal = closeAccessDeniedModal;

/* =========================================================
   EVENT LISTENERS & BOOTSTRAP
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  renderHomePage();
  setupCourseSearch();

  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");
  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(open));
    });
    navLinks.querySelectorAll("a, button").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  const closeAuthBtn = document.getElementById("closeAuthGateBtn");
  const modalGoogleBtn = document.getElementById("modalGoogleLoginBtn");

  if (closeAuthBtn) closeAuthBtn.addEventListener("click", closeAuthGateModal);
  if (modalGoogleBtn) modalGoogleBtn.addEventListener("click", handleGoogleLogin);

  const authBtn = document.getElementById("authBtn");
  if (authBtn) {
    authBtn.addEventListener("click", async () => {
      if (currentUser) {
        await signOut(auth);
      } else {
        await handleGoogleLogin();
      }
    });
  }

  ["viewerModal", "authGateModal", "accessDeniedModal"].forEach(id => {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        if (id === "viewerModal") closeCourseViewer();
        else if (id === "authGateModal") closeAuthGateModal();
        else if (id === "accessDeniedModal") closeAccessDeniedModal();
      }
    });
  });

  const closeBtn = document.getElementById("closeViewerBtn");
  if (closeBtn) closeBtn.addEventListener("click", closeCourseViewer);

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCourseViewer();
      closeAuthGateModal();
      closeAccessDeniedModal();
    }
  });
});