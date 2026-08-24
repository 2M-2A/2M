document.addEventListener('DOMContentLoaded', () => {
  const downloadBtn = document.getElementById('downloadBtn');
  const downloadMobileBtn = document.getElementById('downloadMobileBtn');
  const supportBtn = document.getElementById('supportBtn');
  const donationModal = document.getElementById('donationModal');
  const closeModal = document.getElementById('closeModal');
  const declineBtn = document.getElementById('declineBtn');
  const amountButtons = document.querySelectorAll('.amount');
  const paypalBtn = document.getElementById('paypalBtn');
  const downloadStatus = document.getElementById('downloadStatus');

  let selectedDownloadType = 'pc'; // Por defecto PC

  function openModal(type) {
    selectedDownloadType = type;
    donationModal.classList.add('active');
    donationModal.setAttribute('aria-hidden', 'false');
    downloadStatus.textContent = '';
  }

  function closeModalWindow() {
    donationModal.classList.remove('active');
    donationModal.setAttribute('aria-hidden', 'true');
  }

  function triggerDownload() {
    // Redirige directamente a la sección de Releases de tu repositorio
    window.open('https://github.com/2M-2A/2M/releases', '_blank');
    downloadStatus.textContent = '¡Redirigiendo a las descargas oficiales!';
    setTimeout(closeModalWindow, 2000);
  }

  // Eventos de los botones de descarga principal
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => openModal('pc'));
  }

  if (downloadMobileBtn) {
    downloadMobileBtn.addEventListener('click', () => openModal('mobile'));
  }

  if (supportBtn) {
    supportBtn.addEventListener('click', () => openModal('pc'));
  }

  // Cerrar modal
  if (closeModal) closeModal.addEventListener('click', closeModalWindow);
  if (declineBtn) {
    declineBtn.addEventListener('click', () => {
      triggerDownload();
    });
  }

  // Selección de montos para donación
  amountButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      amountButtons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    });
  });

  // Botón de PayPal
  if (paypalBtn) {
    paypalBtn.addEventListener('click', () => {
      window.open('https://paypal.me', '_blank');
      triggerDownload();
    });
  }

  // Cerrar modal haciendo clic fuera de la caja
  donationModal.addEventListener('click', (e) => {
    if (e.target === donationModal) {
      closeModalWindow();
    }
  });
});
