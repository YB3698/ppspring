document.addEventListener("DOMContentLoaded", () => {
  window.scrollTo(0, 0);

  const navLinks = document.querySelectorAll("nav a");
  const page1 = document.getElementById("page1");
  const page2 = document.getElementById("page2");
  const end = document.getElementsByClassName("content-end")[0];
  const vh = window.innerHeight;

  // sections 배열에 상단바 메뉴 id들 모두 넣기 (추가)
  // 반드시 HTML에서 각 섹션의 id와 일치해야 함
  const sections = ["page1", "page2", "interview", "project"];
  const sectionPositions = {};

  function calculatePositions() {
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) sectionPositions[id] = el.offsetTop;
    });
  }
  calculatePositions();
  window.addEventListener("resize", calculatePositions);

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const fh = document.body.scrollHeight;

    if (scrollY < vh) {
      page1.style.display = "flex";
      page1.style.pointerEvents = "auto";
    } else {
      page1.style.display = "none";
      page1.style.pointerEvents = "none";
    }

    if (scrollY <= vh) {
      page2.style.position = "fixed";
      page2.style.top = `${vh - scrollY}px`;
      page2.style.left = "0";
      page2.style.width = "100vw";
      page2.style.height = "100vh";
      page2.style.zIndex = "150";
    } else {
      page2.style.position = "relative";
      page2.style.top = "auto";
      page2.style.zIndex = "1";
    }

    if (scrollY >= fh - vh - 150) {
      end.style.display = "flex";
      setTimeout(() => end.classList.add("show"), 10);
    } else {
      end.classList.remove("show");
      setTimeout(() => {
        if (!end.classList.contains("show")) end.style.display = "none";
      }, 1000);
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);

      if (targetId === "page1" || targetId === "aboutme") {
        // aboutme도 최상단으로 이동 처리 (추가)
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        if (targetId === "page2") {
          page2.style.position = "relative";
          page2.style.top = "auto";
          page2.style.zIndex = "1";
        }

        const scrollToPos = sectionPositions[targetId];
        if (scrollToPos !== undefined) {
          window.scrollTo({ top: scrollToPos, behavior: "smooth" });
        }
      }
    });
  });
});
