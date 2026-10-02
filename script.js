// ===== Theme Toggle =====
const themeToggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark');
}
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

// ===== 1. Console =====
document.querySelectorAll('[data-console]').forEach(btn => {
  btn.addEventListener('click', () => {
    const type = btn.dataset.console;
    switch (type) {
      case 'log':
        console.log('Hello from console.log()', { foo: 'bar', num: 42 });
        break;
      case 'warn':
        console.warn('This is a warning!');
        break;
      case 'error':
        console.error('Something went wrong!');
        break;
      case 'table':
        console.table([
          { name: 'Alice', age: 30 },
          { name: 'Bob', age: 25 },
          { name: 'Charlie', age: 35 }
        ]);
        break;
      case 'group':
        console.group('User Details');
        console.log('Name: Alice');
        console.log('Age: 30');
        console.groupEnd();
        break;
      case 'time':
        console.time('timer');
        setTimeout(() => {
          console.timeEnd('timer');
        }, 500);
        break;
      case 'count':
        console.count('button-click');
        break;
      case 'assert':
        const x = 5;
        console.assert(x === 10, 'x is not 10, it is', x);
        break;
    }
  });
});

// ===== 2. Elements & Styles =====
const domText = document.getElementById('dom-text');
const btnHighlight = document.getElementById('btn-highlight');
const domList = document.getElementById('dom-list');
const btnAddItem = document.getElementById('btn-add-item');
const btnRemoveItem = document.getElementById('btn-remove-item');

btnHighlight.addEventListener('click', () => {
  domText.classList.toggle('highlight');
});

let itemCount = 1;
btnAddItem.addEventListener('click', () => {
  itemCount++;
  const li = document.createElement('li');
  li.textContent = `Item ${itemCount}`;
  domList.appendChild(li);
});

btnRemoveItem.addEventListener('click', () => {
  if (domList.children.length > 1) {
    domList.removeChild(domList.lastElementChild);
    itemCount--;
  } else {
    console.warn('Cannot remove the last item.');
  }
});

// ===== 3. Events =====
const btnCount = document.getElementById('btn-count');
const clickCountSpan = document.getElementById('click-count');
let clickCount = 0;

btnCount.addEventListener('click', () => {
  clickCount++;
  clickCountSpan.textContent = clickCount;
});

const mousePosSpan = document.getElementById('mouse-pos');
document.addEventListener('mousemove', (e) => {
  mousePosSpan.textContent = `X: ${e.clientX}, Y: ${e.clientY}`;
});

// Form submit
const signupForm = document.getElementById('signup-form');
const emailInput = document.getElementById('email');
const formMsg = document.getElementById('form-msg');

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = emailInput.value.trim();
  if (!email) {
    formMsg.textContent = 'Please enter an email address.';
    formMsg.className = 'msg error';
    return;
  }
  if (!email.includes('@') || !email.includes('.')) {
    formMsg.textContent = 'Please enter a valid email address.';
    formMsg.className = 'msg error';
    return;
  }
  formMsg.textContent = `Thanks! ${email} has been submitted.`;
  formMsg.className = 'msg success';
  emailInput.value = '';
});

// ===== 4. Network =====
const btnFetchOk = document.getElementById('btn-fetch-ok');
const btnFetchFail = document.getElementById('btn-fetch-fail');
const networkOutput = document.getElementById('network-output');

btnFetchOk.addEventListener('click', async () => {
  networkOutput.textContent = 'Loading...';
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    const data = await res.json();
    networkOutput.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    networkOutput.textContent = `Error: ${err.message}`;
  }
});

btnFetchFail.addEventListener('click', async () => {
  networkOutput.textContent = 'Loading...';
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/999999');
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} - ${res.statusText}`);
    }
    const data = await res.json();
    networkOutput.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    networkOutput.textContent = `Error: ${err.message}`;
  }
});

// ===== 5. Storage =====
const storageInput = document.getElementById('storage-input');
const btnSave = document.getElementById('btn-save');
const btnLoad = document.getElementById('btn-load');
const btnClear = document.getElementById('btn-clear');
const storageValue = document.getElementById('storage-value');

btnSave.addEventListener('click', () => {
  const val = storageInput.value;
  localStorage.setItem('devtools-demo', val);
  storageValue.textContent = val || '—';
  storageInput.value = '';
});

btnLoad.addEventListener('click', () => {
  const val = localStorage.getItem('devtools-demo');
  storageValue.textContent = val !== null ? val : '—';
  if (val !== null) storageInput.value = val;
});

btnClear.addEventListener('click', () => {
  localStorage.removeItem('devtools-demo');
  storageValue.textContent = '—';
  storageInput.value = '';
});

// Load initial value on page load
const initialStored = localStorage.getItem('devtools-demo');
if (initialStored !== null) {
  storageValue.textContent = initialStored;
}

// ===== 6. Debugging =====
const btnCalc = document.getElementById('btn-calc');
const calcOutput = document.getElementById('calc-output');

function calculateTotal(cart) {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].price * cart[i].quantity;
  }
  return total;
}

btnCalc.addEventListener('click', () => {
  const cart = [
    { name: 'Widget', price: 9.99, quantity: 3 },
    { name: 'Gadget', price: 19.99, quantity: 1 },
    { name: 'Doohickey', price: 4.5, quantity: 5 }
  ];
  const total = calculateTotal(cart);
  calcOutput.textContent = `Total: $${total.toFixed(2)}`;
});

// ===== 7. Performance =====
const btnBlock = document.getElementById('btn-block');
const btnAnimate = document.getElementById('btn-animate');
const box = document.getElementById('box');

btnBlock.addEventListener('click', () => {
  const start = performance.now();
  // Block main thread for ~1.5 seconds
  while (performance.now() - start < 1500) {
    // Busy wait
  }
  console.log('Main thread blocked for ~1.5s');
});

btnAnimate.addEventListener('click', () => {
  box.classList.toggle('animate');
});