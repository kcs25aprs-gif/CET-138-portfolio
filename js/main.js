/* ── TO-DO LIST ── */
class TodoList {
  constructor() { this.items = []; }
  add(text) { this.items.push({ text: text.trim(), done: false }); }
  toggle(i) { this.items[i].done = !this.items[i].done; }
  remove(i) { this.items.splice(i, 1); }
}

const list = new TodoList();
['Build my ePortfolio', 'Learn CSS Grid', 'Study Bootstrap 5'].forEach(t => list.add(t));
list.toggle(0);

function render() {
  const ul = document.getElementById('todo-list');
  ul.innerHTML = '';
  list.items.forEach((item, i) => {
    const li = document.createElement('li');
    if (item.done) li.classList.add('done');

    const check = document.createElement('div');
    check.className = 'check';
    check.textContent = item.done ? '✓' : '';
    check.addEventListener('click', () => { list.toggle(i); render(); });

    const span = document.createElement('span');
    span.textContent = item.text;
    span.style.flex = '1';

    const del = document.createElement('button');
    del.textContent = '×';
    del.style.cssText = 'background:none;border:none;color:#aaa;cursor:pointer;font-size:16px;padding:0 4px;line-height:1;';
    del.addEventListener('click', () => { list.remove(i); render(); });

    li.appendChild(check);
    li.appendChild(span);
    li.appendChild(del);
    ul.appendChild(li);
  });

  const remaining = list.items.filter(t => !t.done).length;
  document.getElementById('todo-count').textContent =
    remaining === 0
      ? 'All tasks complete!'
      : `${remaining} task${remaining !== 1 ? 's' : ''} remaining`;
}

document.getElementById('todo-add').addEventListener('click', () => {
  const input = document.getElementById('todo-input');
  if (input.value.trim()) { list.add(input.value); input.value = ''; render(); }
});

document.getElementById('todo-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') document.getElementById('todo-add').click();
});

render();

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
