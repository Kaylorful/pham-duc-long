function formatDate(fbdate) {
  const unixTimestamp = fbdate._seconds;
  const date = new Date(unixTimestamp * 1000);

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  return date.toLocaleString('en-US', options);
}

function list(info) {
  if (!info?.data) return;

  const {data} = info;
  const arr = [];

  for (const {id,created,message,name,removed} of data) {
    if (removed || !name || !message) continue;
    arr.push({
      id,
      name,
      message: message.replace(/\n/g, '<br\/>'),
      date: formatDate(created),
    });
  }
  return arr;
}

function draw(data) {
  const info = list(data);
  if (!info) return;

  const _el = (id) => document.getElementById(id);
  const el = _el('list');

  for (const {id,name,date,message} of info) {
    el.innerHTML += `
      <div class='tribute' id='${id}'>
        <hr class='push-1' />
        <h3 class='name accent'>${name}</h3>
        <small class='text-fade squeeze-2 push-1'>${date}</small>
        <div class='tribute-message'>${message}</div>
      </div>
    `;
  }
}

async function callback() {
  try {
    const info = await get('/list');
    draw(info);
    query('#tribute').hidden = false;
    return true;
  } catch {
    return false;
  }
}

callback();

