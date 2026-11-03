const BUSINESS = {
  whatsappPhone: "554198182730",
  address: "Rua Antônio Escorsin, 1395 - Santa Felicidade, Curitiba - PR, 82015-000",
};

const form = document.querySelector("#quote-form");
const serviceSelect = document.querySelector("#service-select");
const quantityInput = document.querySelector("#quantity-input");
const formMessage = document.querySelector("#form-message");
const addressElement = document.querySelector("#business-address");
const mapsLink = document.querySelector("#maps-link");
const mapFrame = document.querySelector("#map-frame");
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");

function showConfigurationMessage() {
  formMessage.textContent =
    "O WhatsApp ainda não foi configurado. Atualize o número em script.js para receber pedidos.";
}

function createWhatsAppUrl(message) {
  const phone = BUSINESS.whatsappPhone.replace(/\D/g, "");
  if (!phone) return null;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  formMessage.textContent = "";

  if (!serviceSelect.value) {
    serviceSelect.focus();
    return;
  }

  const quantity = quantityInput.value.trim();
  const message = [
    "Olá! Gostaria de pedir um orçamento.",
    `Serviço: ${serviceSelect.value}.`,
    quantity ? `Quantidade aproximada: ${quantity}.` : "",
  ]
    .filter(Boolean)
    .join(" ");

  const url = createWhatsAppUrl(message);
  if (!url) {
    showConfigurationMessage();
    return;
  }

  window.open(url, "_blank", "noopener,noreferrer");
});

document.querySelectorAll("[data-service]").forEach((link) => {
  link.addEventListener("click", () => {
    serviceSelect.value = link.dataset.service;
  });
});

if (BUSINESS.address) {
  addressElement.textContent = BUSINESS.address;
  const encodedAddress = encodeURIComponent(BUSINESS.address);
  mapsLink.href = `https://maps.google.com/?q=${encodedAddress}`;
  mapFrame.src = `https://maps.google.com/maps?q=${encodedAddress}&output=embed`;
}

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.querySelector(".sr-only").textContent = isExpanded ? "Abrir menu" : "Fechar menu";
  mainNav.classList.toggle("is-open", !isExpanded);
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    mainNav.classList.remove("is-open");
  });
});

document.querySelector(".floating-whatsapp").addEventListener("click", (event) => {
  event.preventDefault();
  const behavior = matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
  document.querySelector("#orcamento").scrollIntoView({ behavior });
  serviceSelect.focus({ preventScroll: true });
});
