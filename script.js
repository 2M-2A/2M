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

  // Enlaces directos a los archivos específicos de tu Release v2.0 en GitHub
  const pcFileUrl = 'https://github.com/2M-2A/2M/releases/download/untagged-c90cd913a377b4944935/2M_PC_Tkinter.zip';
  const mobileFileUrl = 'https://github.com/2M-2A/2M/releases/download/untagged-c90cd913a377b4944935/2M_app_movil_2m.zip';

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
    const fileUrl = selectedDownloadType === 'mobile' ? mobileFileUrl : pcFileUrl;
    
    // Abre el archivo en una pestaña nueva para forzar la descarga de forma limpia
    window.open(fileUrl, '_blank');

    downloadStatus.textContent = '¡Descarga iniciada con éxito! Gracias por usar 2M.';
    setTimeout(closeModalWindow, 2500);
  }

  // Eventos de los botones de descarga principal
  if (downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('pc');
    });
  }

  if (downloadMobileBtn) {
    downloadMobileBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('mobile');
    });
  }

  if (supportBtn) {
    supportBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('pc');
    });
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
