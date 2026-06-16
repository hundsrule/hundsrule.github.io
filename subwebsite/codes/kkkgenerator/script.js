// ===== Mode Switching =====
let currentMode = 'random';

function switchMode(mode) {
  currentMode = mode;
  document.getElementById('modeRandom').classList.toggle('active', mode === 'random');
  document.getElementById('modeFind').classList.toggle('active', mode === 'find');
  document.getElementById('randomOptions').classList.toggle('hidden', mode !== 'random');
  document.getElementById('findOptions').classList.toggle('hidden', mode !== 'find');

  // Sync slider with number input for random mode
  if (mode === 'random') {
    syncSliderAndNumber();
  }
}

// ===== Slider & Number Sync =====
function syncSliderAndNumber() {
  const ratio = document.getElementById('replaceRatio').value;
  document.getElementById('replaceSlider').value = ratio;
}

// Event listeners for slider/number sync
document.addEventListener('DOMContentLoaded', function() {
  const replaceRatio = document.getElementById('replaceRatio');
  const replaceSlider = document.getElementById('replaceSlider');

  replaceRatio.addEventListener('input', function() {
    replaceSlider.value = this.value;
  });

  replaceSlider.addEventListener('input', function() {
    replaceRatio.value = this.value;
  });
});

// ===== Sample Text =====
function setSampleText() {
  const sampleText = document.getElementById('sampleText').value;
  document.getElementById('inputText').value = sampleText;
}

// ===== Random Ratio =====
function generateRandomRatio() {
  const randomRatio = (Math.random()).toFixed(2);
  document.getElementById('replaceRatio').value = randomRatio;
  document.getElementById('replaceSlider').value = randomRatio;
  showToast('🎲 随机比例: ' + randomRatio);
}

// ===== Main Replace Function =====
function replaceText() {
  const text = document.getElementById('inputText').value;

  if (!text) {
    showToast('⚠️ 请先输入文本');
    return;
  }

  if (currentMode === 'random') {
    randomReplace(text);
  } else {
    findReplace(text);
  }
}

// ===== Random Replacement =====
function randomReplace(text) {
  const char = document.getElementById('replaceChar').value || 'K';
  const ratio = parseFloat(document.getElementById('replaceRatio').value);

  if (char.length !== 1) {
    showToast('⚠️ 替换字符必须是单个字符');
    return;
  }

  if (isNaN(ratio) || ratio < 0 || ratio > 1) {
    showToast('⚠️ 替换比例必须在 0 到 1 之间');
    return;
  }

  const numToReplace = Math.floor(text.length * ratio);
  const textArray = text.split('');

  // Shuffle indices using Fisher-Yates
  const indices = Array.from({ length: text.length }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  // Replace first numToReplace indices
  for (let i = 0; i < numToReplace; i++) {
    textArray[indices[i]] = char;
  }

  const outputText = textArray.join('');
  document.getElementById('outputText').value = outputText;
  updateStats(numToReplace, text.length);
  showToast('✅ 替换完成！共替换 ' + numToReplace + ' 个字符');
}

// ===== Find & Replace =====
function findReplace(text) {
  const findChar = document.getElementById('findChar').value;
  const replaceWith = document.getElementById('replaceWith').value || 'K';
  const findMode = document.getElementById('findMode').value;

  if (!findChar) {
    showToast('⚠️ 请输入要查找的字符');
    return;
  }

  if (findChar.length !== 1 || replaceWith.length !== 1) {
    showToast('⚠️ 查找和替换字符都必须是单个字符');
    return;
  }

  // Find all positions of the target character
  const positions = [];
  for (let i = 0; i < text.length; i++) {
    if (text[i] === findChar) {
      positions.push(i);
    }
  }

  if (positions.length === 0) {
    showToast('⚠️ 未找到字符「' + findChar + '」');
    updateStats(0, 0);
    return;
  }

  const textArray = text.split('');

  if (findMode === 'all') {
    // Replace all occurrences
    for (const pos of positions) {
      textArray[pos] = replaceWith;
    }
    const outputText = textArray.join('');
    document.getElementById('outputText').value = outputText;
    updateStats(positions.length, positions.length);
    showToast('✅ 全部替换完成！共替换 ' + positions.length + ' 个「' + findChar + '」');
  } else {
    // Replace by ratio
    const ratio = parseFloat(document.getElementById('findRatio').value);
    if (isNaN(ratio) || ratio < 0 || ratio > 1) {
      showToast('⚠️ 替换比例必须在 0 到 1 之间');
      return;
    }

    const numToReplace = Math.max(1, Math.floor(positions.length * ratio));
    
    // Shuffle positions and pick first numToReplace
    const shuffled = [...positions];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    for (let i = 0; i < numToReplace; i++) {
      textArray[shuffled[i]] = replaceWith;
    }

    const outputText = textArray.join('');
    document.getElementById('outputText').value = outputText;
    updateStats(numToReplace, positions.length);
    showToast('✅ 按比例替换完成！替换 ' + numToReplace + '/' + positions.length + ' 个「' + findChar + '」');
  }
}

// ===== Update Stats =====
function updateStats(replaced, total) {
  document.getElementById('statsBadge').textContent = replaced + ' / ' + total;
}

// ===== Copy Result =====
function copyResult() {
  const outputText = document.getElementById('outputText');
  if (!outputText.value) {
    showToast('⚠️ 没有内容可复制');
    return;
  }

  outputText.select();
  outputText.setSelectionRange(0, 99999);

  try {
    navigator.clipboard.writeText(outputText.value).then(() => {
      showToast('📋 已复制到剪贴板');
    }).catch(() => {
      document.execCommand('copy');
      showToast('📋 已复制到剪贴板');
    });
  } catch (err) {
    document.execCommand('copy');
    showToast('📋 已复制到剪贴板');
  }
}

// ===== Clear All =====
function clearAll() {
  document.getElementById('inputText').value = '';
  document.getElementById('outputText').value = '';
  updateStats(0, 0);
  showToast('🗑️ 已清空');
}

// ===== Toast Notification =====
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2000);
}