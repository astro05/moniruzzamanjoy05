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
      title: "OSDS – Online Sales & Distribution System",
      body: "Original OSDS enterprise solution for sales operations, inventory control, and logistics with real-time KPI reporting via SSRS and optimized MSSQL queries.",
      highlights: [
        "Comprehensive sales, inventory, and logistics modules",
        "Real-time KPI reporting using SSRS",
        "Optimized MSSQL queries for high-volume transactional workloads",
        "REST APIs consumed by frontend and third-party integrations",
        "20% faster delivery through proactive technical debt reduction"
      ],
      tags: ["ASP.NET MVC", "C#", "MSSQL", "REST API", "SSRS", "JavaScript"],
      //github: "https://github.com/astro05"
    },
    {
      num: "02",
      title: "Drishti (JTI) – Secondary Sales & Supply Chain",
      body: "Enterprise platform for Japan Tobacco International managing secondary sales, supply chain, inventory, and distribution logistics across Bangladesh.",
      highlights: [
        "End-to-end secondary sales lifecycle management for JTI Bangladesh",
        "Integrated inventory management with automated stock alerts",
        "Scalable architecture supporting multi-region distribution"
      ],
      tags: ["ASP.NET", "C#", "MSSQL", "REST API", "Angular", "Supply Chain"],
      //github: "https://github.com/astro05"
    },
    {
      num: "03",
      title: "OSDS Conversion – Enterprise Platform Upgrade",
      body: "Full modernization of the legacy OSDS platform from ASP.NET MVC to .NET Core with Angular v15+. Re-architected data access, introduced modern auth, and restructured the database schema.",
      highlights: [
        "Migrated from ASP.NET MVC to .NET Core using clean architecture",
        "Rebuilt frontend with Angular v15+, TypeScript, and SCSS",
        "Implemented JWT authentication",
        "Applied Dependency Injection and LINQ across all data access layers",
        "Redesigned database schema for improved scalability"
      ],
      tags: [".NET Core", "Angular", "TypeScript", "JWT", "Kendo UI", "Bootstrap", "MSSQL"],
      //github: "https://github.com/astro05"
    },
    {
      num: "04",
      title: "VP_DDL – Healthcare Platform Modernization",
      body: "Large-scale backend modernization at Veradigm targeting a legacy healthcare platform. Migrated MSSQL stored procedures to Snowflake while maintaining data integrity and security standards.",
      highlights: [
        "Migrated 67 stored procedures from SQL Server to Snowflake with zero data loss",
        "Achieved 8.62× query performance improvement after migration",
        "Reached 97% MSTest coverage within Azure DevOps CI/CD pipeline",
        "Handled datasets exceeding 1 billion records in production",
        "Reduced regression defects by 60% through test automation"
      ],
      tags: [".NET Core", "C#", "Snowflake", "MSSQL", "MSTest", "Azure DevOps", "CI/CD"],
      //github: "https://github.com/astro05"
    },
    {
      num: "05",
      title: "Workforce Management Platform",
      body: "A full-stack, event-driven workforce platform built with .NET 10 and React (TypeScript), leveraging dual databases (SQL Server and MongoDB), RabbitMQ for messaging, and Docker for containerization, with development assisted by Claude and Copilot.",
      highlights: [
        "<strong>Full-Stack Distributed System</strong> – Built with .NET 10 API, React + TypeScript frontend, and two polyglot background workers (C# and Node.js) communicating via RabbitMQ message broker.",
        "<strong>Multi-Database Architecture</strong> – MSSQL for relational employee/project data with referential integrity, plus MongoDB for document-oriented leave requests and immutable audit logs.",
        "<strong>Event-Driven Background Processing</strong> – Worker 1 (.NET) generates audit logs with idempotent, retry-safe logic; Worker 2 (Node.js) runs scheduled aggregations for dashboard reports.",
        "<strong>Single-Command Deployment</strong> – Complete Docker Compose orchestration spins up 7+ containers with health checks, dependency ordering, and multi-stage builds for minimal image sizes.",
        "<strong>CI/CD Pipeline</strong> – GitHub Actions automates build, test, lint, and Docker verification on every push with passing status badge in README.",
        "<strong>AI-Assisted Development</strong> – Completed under mandated AI workflow with documented tooling, architecture planning, debugging iterations, and honest reflection in dedicated AI-WORKFLOW.md."
      ],
      tags: [".NET", "C#", "React", "Node.js", "MSSQL", "MongoDB", "RabbitMQ", "Docker", "CI/CD"],
      github: "https://github.com/astro05/workforce-platform.git"
    },
    {
      num: "06",
      title: "agentic-genai-orchestration",
      body: "Agentic GenAI orchestration with GitHub Models, Ollama, RAG, CRAG, AI Agents, S/LLMs, and MCP for scalable multi-model AI workflows.",
      highlights: [
        "<strong>Unified Model Gateway</strong> – Built an abstraction layer supporting GitHub Models (GPT-4o, Llama 3.3 70B) and Ollama-hosted local models (Llama 3.2, Phi-3, Mistral) with intelligent request routing based on task complexity and latency requirements.",
        "<strong>Multi-Agent Collaboration Framework</strong> – Designed agentic system with specialized agents (Planner, Researcher, Coder, Reviewer) that communicate via message passing, share context through MCP, and converge on solutions through iterative refinement.",
        "<strong>Hybrid Cloud-Local Orchestration</strong> – Deployed fallback chains where primary GitHub Models handle complex reasoning while Ollama-powered small models (3B–8B) manage fast, cost-effective tasks like classification, extraction, and formatting."
      ],
      tags: [".NET", "GenAI", "Ollama", "RAG", "OpenAI", "AI Agents", "S/LLMs", "GitHub Models"],
      github: "https://github.com/astro05/agentic-genai-orchestration.git"
    },    


  ];

  const backdrop = document.getElementById('modal-backdrop');
  const modalClose = document.getElementById('modal-close');
  const modalGithubBtn = document.getElementById('modal-github-btn');

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

      // Update GitHub button
      if (p.github) {
        modalGithubBtn.href = p.github;
        modalGithubBtn.style.display = 'inline-flex';
      } else {
        modalGithubBtn.style.display = 'none';
      }

      backdrop.classList.add('open');
      modalClose.focus();
    });
  });

  modalClose.addEventListener('click', () => backdrop.classList.remove('open'));
  backdrop.addEventListener('click', e => { if (e.target === backdrop) backdrop.classList.remove('open'); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') backdrop.classList.remove('open'); });

});
