async function add(e) {
  const ins = document.querySelectorAll('#tribute-add input, #tribute-add textarea');
  const data = { };

  // e.disabled = true;

  ins.forEach( i => {
    i.classList.remove('error');

    if (!i.value) {
      i.classList.add('error');
      return;
    }

    data[i.name] = i.value;
    i.disabled = true;
  } );

  const {name,phone,message} = data;

  const ret = await post(`/insert`, {
    phone,
    name,
    message,
  });

  if (ret?.success)
    location.href = '/tribute';
}
