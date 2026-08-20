/*
  2M — configuración de la página
  ----------------------------------------------------------
  Para activar PayPal:
  1) Crea tu página/enlace de donación en PayPal.
  2) Copia el enlace que te entregue PayPal.
  3) Pégalo entre las comillas de PAYPAL_DONATION_URL.
*/
const PAYPAL_DONATION_URL = "";

const downloadBtn = document.getElementById("downloadBtn");
const supportBtn = document.getElementById("supportBtn");
const modalBackdrop = document.getElementById("donationModal");
const closeModal = document.getElementById("closeModal");
const declineBtn = document.getElementById("declineBtn");
const paypalBtn = document.getElementById("paypalBtn");
const downloadStatus = document.getElementById("downloadStatus");
const amountButtons = document.querySelectorAll(".amount");

function openModal() {
  modalBackdrop.classList.add("open");
  modalBackdrop.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeDonationModal() {
  modalBackdrop.classList.remove("open");
  modalBackdrop.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

downloadBtn.addEventListener("click", () => {
  // Abrir la versión oficial de 2M en GitHub.
  const releaseUrl =
    "https://github.com/2M-2A/2M/releases/tag/v1.0-Beta";

  window.open(releaseUrl, "_blank");

  // Actualizar el mensaje de estado.
  downloadStatus.textContent =
    "Se abrió la página de descarga de 2M.";

  // Mostrar la ventana de apoyo después de abrir la descarga.
  setTimeout(() => {
    openModal();
  }, 800);
});

supportBtn.addEventListener("click", () => {
  openModal();
});

closeModal.addEventListener("click", closeDonationModal);
declineBtn.addEventListener("click", closeDonationModal);

modalBackdrop.addEventListener("click", (event) => {
  if (event.target === modalBackdrop) closeDonationModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeDonationModal();
});

amountButtons.forEach((button) => {
  button.addEventListener("click", () => {
    amountButtons.forEach((b) => b.classList.remove("selected"));
    button.classList.add("selected");
    const amount = button.dataset.amount;
    if (amount === "other") {
      downloadStatus.textContent = "Puedes donar el monto que prefieras mediante Yape o PayPal.";
    } else {
      downloadStatus.textContent = `Seleccionaste una donación de S/ ${amount}. Coloca ese monto en Yape o PayPal.`;
    }
  });
});

paypalBtn.addEventListener("click", () => {
  if (!PAYPAL_DONATION_URL.trim()) {
    downloadStatus.textContent = "Falta configurar tu enlace de donación de PayPal en script.js.";
    return;
  }
  window.open(PAYPAL_DONATION_URL, "_blank", "noopener,noreferrer");
});
