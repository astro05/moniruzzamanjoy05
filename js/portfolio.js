/**
 * portfolio.js
 * Progressive enhancement & interactive behaviours
 */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------
     Hamburger menu toggle
  -------------------------------------------------- */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks  = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when a nav link is clicked
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* --------------------------------------------------
     Active nav link on scroll
  -------------------------------------------------- */
  const sections = document.querySelectorAll('.section[id]');
  const allNavLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          allNavLinks.forEach((link) => {
            link.classList.toggle(
              'active',
              link.getAttribute('href') === '#' + entry.target.id
            );
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach((section) => observer.observe(section));

  /* --------------------------------------------------
     Smooth scroll for anchor links (fallback)
  -------------------------------------------------- */
  allNavLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* --------------------------------------------------
     Staggered card entrance animations
  -------------------------------------------------- */
  const animatableCards = document.querySelectorAll(
    '.exp-card, .proj-card, .skill-group, .edu-card, .research-card, .ach-group'
  );

  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 60);
          cardObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  animatableCards.forEach((card) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(14px)';
    card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    cardObserver.observe(card);
  });

  /* Project modal */
  const projectData = [
    {
      num: "01", 
      title: "VP_DDL – Healthcare Platform Modernization",
      body: "Large-scale backend modernization at Veradigm targeting a legacy healthcare platform. Migrated MSSQL stored procedures to Snowflake while maintaining data integrity and security standards.",
      highlights: [
        "Migrated 67 stored procedures from SQL Server to Snowflake with zero data loss",
        "Achieved 8.62× query performance improvement after migration",
        "Reached 97% MSTest coverage within Azure DevOps CI/CD pipeline",
        "Handled datasets exceeding 1 billion records in production",
        "Reduced regression defects by 60% through test automation"
      ],
      tags: [".NET Core", "C#", "Snowflake", "MSSQL", "MSTest", "Azure DevOps", "CI/CD"]
    },
    {
      num: "02", 
      title: "OSDS Conversion – Enterprise Platform Upgrade",
      body: "Full modernization of the legacy OSDS platform from ASP.NET MVC to .NET Core with Angular v15+. Re-architected data access, introduced modern auth, and restructured the database schema.",
      highlights: [
        "Migrated from ASP.NET MVC to .NET Core using clean architecture",
        "Rebuilt frontend with Angular v15+, TypeScript, and SCSS",
        "Implemented OAuth 2.0 / JWT authentication",
        "Applied Dependency Injection and LINQ across all data access layers",
        "Redesigned database schema for improved scalability"
      ],
      tags: [".NET Core", "Angular", "TypeScript", "OAuth/JWT", "SCSS", "Bootstrap", "MSSQL"]
    },
    {
      num: "03", 
      title: "Drishti (JTI) – Secondary Sales & Supply Chain",
      body: "Enterprise platform for Japan Tobacco International managing secondary sales, supply chain, inventory, and distribution logistics across Bangladesh.",
      highlights: [
        "End-to-end secondary sales lifecycle management for JTI Bangladesh",
        "Real-time supply chain tracking and distribution logistics",
        "Integrated inventory management with automated stock alerts",
        "KPI dashboards for sales and logistics performance",
        "Scalable architecture supporting multi-region distribution"
      ],
      tags: ["ASP.NET", "C#", "MSSQL", "REST API", "Angular", "Supply Chain"]
    },
    {
      num: "04", 
      title: "OSDS – Online Sales & Distribution System",
      body: "Original OSDS enterprise solution for sales operations, inventory control, and logistics with real-time KPI reporting via SSRS and optimized MSSQL queries.",
      highlights: [
        "Comprehensive sales, inventory, and logistics modules",
        "Real-time KPI reporting using SSRS",
        "Optimized MSSQL queries for high-volume transactional workloads",
        "REST APIs consumed by frontend and third-party integrations",
        "20% faster delivery through proactive technical debt reduction"
      ],
      tags: ["ASP.NET MVC", "C#", "MSSQL", "REST API", "SSRS", "JavaScript"]
    }
  ];

  const backdrop = document.getElementById('modal-backdrop');
  const modalClose = document.getElementById('modal-close');

  document.querySelectorAll('.proj-card').forEach(card => {
    card.addEventListener('click', () => {
      const p = projectData[+card.dataset.index];
      document.getElementById('modal-num').textContent = 'Project ' + p.num;
      document.getElementById('modal-title').textContent = p.title;
      document.getElementById('modal-body').textContent = p.body;
      document.getElementById('modal-highlights').innerHTML =
        p.highlights.map(h => `<li>${h}</li>`).join('');
      document.getElementById('modal-tags').innerHTML =
        p.tags.map(t => `<span class="proj-tag">${t}</span>`).join('');
      backdrop.classList.add('open');
      modalClose.focus();
    });
  });

  modalClose.addEventListener('click', () => backdrop.classList.remove('open'));
  backdrop.addEventListener('click', e => { if (e.target === backdrop) backdrop.classList.remove('open'); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') backdrop.classList.remove('open'); });

});