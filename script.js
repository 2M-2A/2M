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
  const downloadUrl =
    "https://github.com/2M-2A/2M/releases/download/v1.0-Beta/2M-1.0-Beta.zip";

  // Crear enlace de descarga
  const link = document.createElement("a");
  link.href = downloadUrl;
  link.target = "_blank";
  link.rel = "noopener noreferrer";

  document.body.appendChild(link);
  link.click();
  link.remove();

  // Mostrar mensaje y ventana de apoyo
  setTimeout(() => {
    downloadStatus.textContent =
      "La descarga de 2M se ha iniciado.";
    openModal();
  }, 1000);
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
