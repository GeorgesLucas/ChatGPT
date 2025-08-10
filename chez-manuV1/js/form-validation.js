// FORM-RSV-01
(() => {
  const form = document.getElementById('reservation-form');
  if (!form) return;

  const showError = (input, msg) => {
    input.setAttribute('aria-invalid', 'true');
    input.closest('.frm-row')?.querySelector('.err')?.replaceChildren(document.createTextNode(msg));
  };
  const clearError = (input) => {
    input.removeAttribute('aria-invalid');
    input.closest('.frm-row')?.querySelector('.err')?.replaceChildren(document.createTextNode(''));
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let ok = true;
    const required = ['name','phone','date','time','guests'].map(id => form.querySelector('#'+id));

    required.forEach((el) => {
      if (!el) return;
      if (!el.value?.trim()) { showError(el, 'Champ requis'); ok = false; }
      else clearError(el);
    });

    const phone = form.querySelector('#phone');
    if (phone && phone.value && !/^[0-9+() .-]{6,}$/.test(phone.value)) {
      showError(phone, 'Téléphone invalide'); ok = false;
    }

    const guests = form.querySelector('#guests');
    if (guests && (+guests.value < 1 || +guests.value > 20)) {
      showError(guests, 'Entre 1 et 20 couverts'); ok = false;
    }

    const date = form.querySelector('#date');
    if (date && date.value) {
      const today = new Date(); today.setHours(0,0,0,0);
      const chosen = new Date(date.value);
      if (chosen < today) { showError(date, 'Date passée'); ok = false; }
    }

    if (!ok) return;
    form.querySelector('.frm-success')?.removeAttribute('hidden');
    form.reset();
  });
})();
