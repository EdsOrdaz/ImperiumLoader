/* ==========================================================================
   STATE MANAGEMENT & CONSTANTS
   ========================================================================== */
const state = {
  // Tabs
  activeTab: 'visuals',
  
  // ESP Visuals Config
  espEnabled: true,
  drawBox: false,
  drawSkeleton: true,
  drawHeadCircle: true,
  skeletonThickness: 0.5,
  drawHealthBar: true,
  drawPing: true,
  drawRank: true,
  drawPrestige: false,
  drawName: true,
  drawTeamId: true,
  coloredNames: true,
  drawWeapon: true,
  drawDistance: true,
  drawTeammates: false,
  drawSpectators: true,
  spectatorPosX: 0.5,
  spectatorPosY: 0.1,
  drawInputDevice: true,
  drawOffscreenArrow: true,
  arrowRadius: 200,
  drawSnaplines: false,
  espFontSize: 10,
  espMaxDist: 1000,

  // Colors
  colTextColor: '#ffffff',
  colVisibleEnemy: '#a855f7',
  colHiddenEnemy: '#888888',
  colDownedEnemy: '#ffa500',
  colTeammates: '#00bfff',

  // Aimbot Config
  aimbotEnabled: false,
  aimbotInputMode: 'mouse',
  aimbotPrimaryKey: 'Mouse Right',
  aimbotSecondaryKey: 'Mouse Left',
  aimbotBone: 'smart',
  aimbotBlockSpectator: false,
  aimbotVisibleOnly: true,
  aimbotIgnoreDowned: true,
  aimbotSmoothness: 0.15,
  aimbotMaxDist: 500,
  aimbotHumanizer: true,
  aimbotFlickIntensity: 1.0,
  aimbotPulseIntensity: 1.0,
  aimbotShowFov: true,
  aimbotFovRadius: 50,

  // Radar Config
  radarEnabled: true,
  radarScale: 1.5,
  radarRange: 150,
  radarMiniUav: true,
  radarAdvancedUav: true,
  radarShareUav: true,
  radarShareId: 'a7soi12AnvZBxO',
  radarShape: 'square',
  radarPosX: 36,
  radarPosY: 19,
  radarDrawBackground: true,
  radarDrawLines: true,
  colRadarBg: '#07080b',
  colRadarLines: '#ffffff',
  colRadarVisible: '#ff0000',
  colRadarHidden: '#00ff00',

  // Loot Config
  lootEnabled: true,
  lootLines: false,
  lootLineThickness: 2,
  lootShowDistance: false,
  lootFontSize: 12,
  colLootLines: '#ffffff',
  colLootText: '#fbbf24',
  lootGeneral: false,
  lootMoney: false,
  lootCashRegister: false,
  lootArmorPlate: false,
  lootVest: false,
  lootArmorVest: false,
  lootGasMask: false,
  lootArmorBox: false,
  lootMunitionBox: false,
  lootUtilityBox: false,
  lootLegendaryLoot: false,
  lootLootBox: false,
  lootLootBag: false,

  // Global Settings
  accentColor: '#7c3aed',
  language: 'english',
  menuKey: 'insert',
  hudWatermark: true,
  pulsePreview: true,

  // Animation ticks
  ticks: 0
};

// Theme presets map (hex, rgb parts, dark, light)
const themes = {
  purple: {
    hex: '#7c3aed',
    rgb: '124, 58, 237',
    dark: '#4c1d95',
    light: '#a78bfa'
  },
  blue: {
    hex: '#2563eb',
    rgb: '37, 99, 235',
    dark: '#1e3a8a',
    light: '#60a5fa'
  },
  emerald: {
    hex: '#059669',
    rgb: '5, 150, 105',
    dark: '#064e3b',
    light: '#34d399'
  },
  crimson: {
    hex: '#e11d48',
    rgb: '225, 29, 72',
    dark: '#881337',
    light: '#fb7185'
  },
  amber: {
    hex: '#d97706',
    rgb: '217, 119, 6',
    dark: '#78350f',
    light: '#fbbf24'
  }
};

// Lobby player mock database
let players = [
  { name: 'xX_Ghost_Xx', team: 'enemy', distance: 45, weapon: 'KASTOV 762', kd: 1.8, ping: 24, kills: 14, rank: 48 },
  { name: 'Nikto_Shadow', team: 'enemy', distance: 100, weapon: 'KASTOV 762', kd: 2.1, ping: 32, kills: 19, rank: 55 },
  { name: 'Slayer_99', team: 'friendly', distance: 82, weapon: 'M4 CARBINE', kd: 0.9, ping: 18, kills: 4, rank: 12 },
  { name: 'Vanguard_OP', team: 'friendly', distance: 12, weapon: 'FENNEC 45', kd: 1.4, ping: 15, kills: 9, rank: 32 },
  { name: 'Krueger_1', team: 'enemy', distance: 154, weapon: 'MCPR-300', kd: 3.2, ping: 42, kills: 22, rank: 87 },
  { name: 'Roze_Meta', team: 'enemy', distance: 67, weapon: 'LACHMANN SUB', kd: 1.2, ping: 21, kills: 7, rank: 25 },
  { name: 'Price_Captain', team: 'friendly', distance: 190, weapon: 'TAQ-56', kd: 1.5, ping: 29, kills: 11, rank: 64 }
];

// Normalized coordinates of soldier joints on the image (0.0 to 1.0)
const joints = {
  head: { x: 0.525, y: 0.225 },
  neck: { x: 0.525, y: 0.295 },
  pelvis: { x: 0.525, y: 0.525 },
  
  lShoulder: { x: 0.355, y: 0.305 },
  lElbow: { x: 0.255, y: 0.405 },
  lWrist: { x: 0.165, y: 0.485 },
  
  rShoulder: { x: 0.695, y: 0.305 },
  rElbow: { x: 0.795, y: 0.405 },
  rWrist: { x: 0.885, y: 0.485 },
  
  lHip: { x: 0.435, y: 0.565 },
  lKnee: { x: 0.435, y: 0.745 },
  lAnkle: { x: 0.435, y: 0.885 },
  
  rHip: { x: 0.615, y: 0.565 },
  rKnee: { x: 0.615, y: 0.745 },
  rAnkle: { x: 0.615, y: 0.885 }
};

// Radar blip mock data (for radar visualization)
const radarBlips = [
  { angle: 0.4, dist: 60, type: 'enemy', speed: 0.002, sweeped: 0 },
  { angle: 1.8, dist: 110, type: 'enemy', speed: -0.001, sweeped: 0 },
  { angle: 3.2, dist: 35, type: 'friendly', speed: 0.003, sweeped: 0 },
  { angle: 4.5, dist: 80, type: 'loot', speed: 0, sweeped: 0 },
  { angle: 5.6, dist: 130, type: 'enemy', speed: 0.001, sweeped: 0 },
  { angle: 2.5, dist: 90, type: 'loot', speed: 0, sweeped: 0 }
];

// Active mock blips for the preview radar panel (colors & IDs match the image exactly)
const previewRadarBlips = [
  { id: 5, x: 0.05, y: -0.25, color: '#f59e0b', angle: -0.4, speed: 0.0005, turnSpeed: 0.008 }, // Orange (5)
  { id: 4, x: 0.22, y: -0.15, color: '#06b6d4', angle: -0.8, speed: 0.0007, turnSpeed: -0.006 }, // Teal (4)
  { id: 1, x: -0.25, y: -0.08, color: '#3b82f6', angle: -2.5, speed: 0.0006, turnSpeed: 0.01 },  // Blue (1)
  { id: 3, x: -0.18, y: 0.05, color: '#ec4899', angle: -1.8, speed: 0.0004, turnSpeed: 0.005 },  // Pink (3)
  { id: 2, x: -0.28, y: 0.12, color: '#84cc16', angle: -3.0, speed: 0.0005, turnSpeed: -0.007 }, // Lime (2)
  { id: 1, x: -0.18, y: 0.28, color: '#3b82f6', angle: 2.1, speed: 0.0008, turnSpeed: 0.012 },   // Blue (1)
  { id: 2, x: 0.02, y: 0.12, color: '#84cc16', angle: 0.5, speed: 0.0006, turnSpeed: -0.005 }   // Lime (2)
];

/* ==========================================================================
   INITIALIZATION & ELEMENT CACHING
   ========================================================================== */
let previewCanvas, previewCtx;
let radarCanvas, radarCtx;
let sweepAngle = 0;
let soldierImg = new Image();
soldierImg.src = 'soldier.png';

document.addEventListener('DOMContentLoaded', () => {
  initDOM();
  initEventListeners();
  renderPlayersTable();
  startAnimationLoop();
});

// Cache elements and initialize configurations
function initDOM() {
  previewCanvas = document.getElementById('canvas-preview');
  previewCtx = previewCanvas.getContext('2d');
  
  radarCanvas = document.getElementById('canvas-radar');
  if (radarCanvas) {
    radarCtx = radarCanvas.getContext('2d');
  }
  
  // Setup canvas size based on device resolution (Retina display support)
  resizeCanvas(previewCanvas);
  
  // Trigger initial values display
  document.getElementById('val-skeleton-thickness').innerText = state.skeletonThickness;
  document.getElementById('val-spectator-pos-x').innerText = state.spectatorPosX;
  document.getElementById('val-spectator-pos-y').innerText = state.spectatorPosY;
  document.getElementById('val-arrow-radius').innerText = state.arrowRadius;
  document.getElementById('val-esp-font-size').innerText = state.espFontSize;
  document.getElementById('val-esp-max-dist').innerText = state.espMaxDist + 'm';

  document.getElementById('val-aimbot-smoothness').innerText = state.aimbotSmoothness;
  document.getElementById('val-aimbot-max-dist').innerText = state.aimbotMaxDist + 'm';
  document.getElementById('val-aimbot-flick-intensity').innerText = state.aimbotFlickIntensity;
  document.getElementById('val-aimbot-pulse-intensity').innerText = state.aimbotPulseIntensity;
  document.getElementById('val-aimbot-fov-radius').innerText = state.aimbotFovRadius;
  
  // Radar Settings Init
  const lblPosX = document.getElementById('val-radar-pos-x');
  if (lblPosX) lblPosX.innerText = state.radarPosX;
  const lblPosY = document.getElementById('val-radar-pos-y');
  if (lblPosY) lblPosY.innerText = state.radarPosY;
  const lblScale = document.getElementById('val-radar-scale');
  if (lblScale) lblScale.innerText = state.radarScale + 'x';
  const lblRange = document.getElementById('val-radar-range');
  if (lblRange) lblRange.innerText = state.radarRange + 'm';
  
  const lblLootThickness = document.getElementById('val-loot-line-thickness');
  if (lblLootThickness) lblLootThickness.innerText = state.lootLineThickness;
  const lblLootFontSize = document.getElementById('val-loot-font-size');
  if (lblLootFontSize) lblLootFontSize.innerText = state.lootFontSize;

  // Initialize QR Code
  initQRCode();
}

function resizeCanvas(canvas) {
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * window.devicePixelRatio;
  canvas.height = rect.height * window.devicePixelRatio;
}

let qrCodeInstance = null;
function initQRCode() {
  const qrContainer = document.getElementById('qrcode-container');
  if (!qrContainer) return;
  qrContainer.innerHTML = '';
  
  const lblQrId = document.getElementById('lbl-qr-id');
  if (lblQrId) {
    lblQrId.innerHTML = `<span>${state.radarShareId}</span>`;
  }
  
  try {
    qrCodeInstance = new QRCode(qrContainer, {
      text: `https://imperiumcheats.community/share/${state.radarShareId}`,
      width: 120,
      height: 120,
      colorDark: "#ffffff",
      colorLight: "#0e0f14",
      correctLevel: QRCode.CorrectLevel.H
    });
  } catch (e) {
    console.error("Error creating QR Code", e);
  }
}

/* ==========================================================================
   EVENT LISTENERS Setup
   ========================================================================== */
function initEventListeners() {
  // Resize handler
  window.addEventListener('resize', () => {
    resizeCanvas(previewCanvas);
  });

  // Tab switching
  const tabs = document.querySelectorAll('.nav-item');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      const tabId = tab.getAttribute('data-tab');
      state.activeTab = tabId;
      
      const contents = document.querySelectorAll('.tab-content');
      contents.forEach(c => c.classList.remove('active'));
      document.getElementById('tab-' + tabId).classList.add('active');
      
      showToast(`Tab changed to ${tabId.toUpperCase()}`);
    });
  });

  // ESP Panel Listeners
  bindInput('chk-enable-esp', 'espEnabled', 'checked', true);
  bindInput('chk-box', 'drawBox', 'checked', false);
  bindInput('chk-skeleton', 'drawSkeleton', 'checked', true, (val) => {
    const subOpts = document.getElementById('skeleton-options');
    if (subOpts) subOpts.style.display = val ? 'flex' : 'none';
  });
  bindInput('chk-head-circle', 'drawHeadCircle', 'checked', true);
  bindInput('sld-skeleton-thickness', 'skeletonThickness', 'value', 0.5, (val) => {
    document.getElementById('val-skeleton-thickness').innerText = val;
  });
  bindInput('chk-health-bar', 'drawHealthBar', 'checked', true);
  bindInput('chk-ping', 'drawPing', 'checked', true);
  bindInput('chk-rank', 'drawRank', 'checked', true);
  bindInput('chk-prestige', 'drawPrestige', 'checked', false);
  bindInput('chk-name', 'drawName', 'checked', true, (val) => {
    const subOpts = document.getElementById('name-options');
    if (subOpts) subOpts.style.display = val ? 'flex' : 'none';
  });
  bindInput('chk-team-id', 'drawTeamId', 'checked', true);
  bindInput('chk-colored-names', 'coloredNames', 'checked', true);
  bindInput('chk-weapon', 'drawWeapon', 'checked', true);
  bindInput('chk-distance', 'drawDistance', 'checked', true);
  bindInput('chk-teammates', 'drawTeammates', 'checked', false);
  bindInput('chk-spectators', 'drawSpectators', 'checked', true, (val) => {
    const subOpts = document.getElementById('spectator-options');
    if (subOpts) subOpts.style.display = val ? 'flex' : 'none';
  });
  bindInput('sld-spectator-pos-x', 'spectatorPosX', 'value', 0.5, (val) => {
    document.getElementById('val-spectator-pos-x').innerText = val;
  });
  bindInput('sld-spectator-pos-y', 'spectatorPosY', 'value', 0.1, (val) => {
    document.getElementById('val-spectator-pos-y').innerText = val;
  });
  bindInput('chk-input-device', 'drawInputDevice', 'checked', true);
  bindInput('chk-offscreen-arrow', 'drawOffscreenArrow', 'checked', true, (val) => {
    const subOpts = document.getElementById('arrow-options');
    if (subOpts) subOpts.style.display = val ? 'flex' : 'none';
  });
  bindInput('sld-arrow-radius', 'arrowRadius', 'value', 200, (val) => {
    document.getElementById('val-arrow-radius').innerText = val;
  });
  bindInput('chk-snaplines', 'drawSnaplines', 'checked', false);
  bindInput('sld-esp-font-size', 'espFontSize', 'value', 10, (val) => {
    document.getElementById('val-esp-font-size').innerText = val;
  });
  bindInput('sld-esp-max-dist', 'espMaxDist', 'value', 1000, (val) => {
    document.getElementById('val-esp-max-dist').innerText = val + 'm';
  });

  // Color inputs
  bindInput('col-text-color', 'colTextColor', 'value', '#ffffff');
  bindInput('col-visible-enemy', 'colVisibleEnemy', 'value', '#adff2f');
  bindInput('col-hidden-enemy', 'colHiddenEnemy', 'value', '#888888');
  bindInput('col-downed-enemy', 'colDownedEnemy', 'value', '#ffa500');
  bindInput('col-teammates', 'colTeammates', 'value', '#00bfff');

  // Aimbot Panel Listeners
  bindInput('chk-enable-aimbot', 'aimbotEnabled', 'checked', false);
  bindInput('sel-aimbot-input-mode', 'aimbotInputMode', 'value', 'mouse');
  
  // Setup Keybinds
  setupKeybind('btn-aimbot-primary-key', 'aimbotPrimaryKey');
  setupKeybind('btn-aimbot-secondary-key', 'aimbotSecondaryKey');

  bindInput('sel-aimbot-bone', 'aimbotBone', 'value', 'smart');
  bindInput('chk-aimbot-block-spectator', 'aimbotBlockSpectator', 'checked', false);
  bindInput('chk-aimbot-visible-only', 'aimbotVisibleOnly', 'checked', true);
  bindInput('chk-aimbot-ignore-downed', 'aimbotIgnoreDowned', 'checked', true);
  bindInput('sld-aimbot-smoothness', 'aimbotSmoothness', 'value', 0.15, (val) => {
    document.getElementById('val-aimbot-smoothness').innerText = val;
  });
  bindInput('sld-aimbot-max-dist', 'aimbotMaxDist', 'value', 500, (val) => {
    document.getElementById('val-aimbot-max-dist').innerText = val + 'm';
  });
  bindInput('chk-aimbot-humanizer', 'aimbotHumanizer', 'checked', true, (val) => {
    const subOpts = document.getElementById('humanizer-options');
    if (subOpts) subOpts.style.display = val ? 'flex' : 'none';
  });
  bindInput('sld-aimbot-flick-intensity', 'aimbotFlickIntensity', 'value', 1.0, (val) => {
    document.getElementById('val-aimbot-flick-intensity').innerText = val;
  });
  bindInput('sld-aimbot-pulse-intensity', 'aimbotPulseIntensity', 'value', 1.0, (val) => {
    document.getElementById('val-aimbot-pulse-intensity').innerText = val;
  });
  bindInput('chk-aimbot-show-fov', 'aimbotShowFov', 'checked', true, (val) => {
    const subOpts = document.getElementById('fov-options');
    if (subOpts) subOpts.style.display = val ? 'flex' : 'none';
  });
  bindInput('sld-aimbot-fov-radius', 'aimbotFovRadius', 'value', 50, (val) => {
    document.getElementById('val-aimbot-fov-radius').innerText = val;
  });

  // Radar Panel Listeners
  bindInput('chk-enable-radar', 'radarEnabled', 'checked', true);
  bindInput('chk-mini-uav', 'radarMiniUav', 'checked', true);
  bindInput('chk-advanced-uav', 'radarAdvancedUav', 'checked', true);
  bindInput('chk-share-uav', 'radarShareUav', 'checked', true, (val) => {
    const shareOpts = document.getElementById('share-uav-options');
    if (shareOpts) shareOpts.style.display = val ? 'flex' : 'none';
  });
  
  // Copy QR Link event listener
  const btnCopyQr = document.getElementById('btn-copy-qr-link');
  if (btnCopyQr) {
    btnCopyQr.addEventListener('click', (e) => {
      e.preventDefault();
      const link = `https://imperiumcheats.community/share/${state.radarShareId}`;
      navigator.clipboard.writeText(link).then(() => {
        showToast('Link copied to clipboard!');
      }).catch(err => {
        console.error('Failed to copy text: ', err);
        showToast('Failed to copy link', true);
      });
    });
  }

  bindInput('sel-radar-shape', 'radarShape', 'value', 'square');
  bindInput('sld-radar-pos-x', 'radarPosX', 'value', 36, (val) => {
    const lbl = document.getElementById('val-radar-pos-x');
    if (lbl) lbl.innerText = val;
  });
  bindInput('sld-radar-pos-y', 'radarPosY', 'value', 19, (val) => {
    const lbl = document.getElementById('val-radar-pos-y');
    if (lbl) lbl.innerText = val;
  });

  bindInput('chk-radar-background', 'radarDrawBackground', 'checked', true);
  bindInput('chk-radar-lines', 'radarDrawLines', 'checked', true);
  bindInput('col-radar-bg', 'colRadarBg', 'value', '#07080b');
  bindInput('col-radar-lines', 'colRadarLines', 'value', '#ffffff');
  bindInput('col-radar-visible', 'colRadarVisible', 'value', '#ff0000');
  bindInput('col-radar-hidden', 'colRadarHidden', 'value', '#00ff00');

  // Loot Panel Listeners
  bindInput('chk-enable-loot', 'lootEnabled', 'checked', true);
  
  bindInput('chk-loot-lines', 'lootLines', 'checked', false, (val) => {
    const subOpts = document.getElementById('loot-lines-options');
    if (subOpts) subOpts.style.display = val ? 'flex' : 'none';
  });
  bindInput('sld-loot-line-thickness', 'lootLineThickness', 'value', 2, (val) => {
    document.getElementById('val-loot-line-thickness').innerText = val;
  });

  bindInput('chk-loot-show-distance', 'lootShowDistance', 'checked', false, (val) => {
    const subOpts = document.getElementById('loot-distance-options');
    if (subOpts) subOpts.style.display = val ? 'flex' : 'none';
  });
  bindInput('sld-loot-font-size', 'lootFontSize', 'value', 12, (val) => {
    document.getElementById('val-loot-font-size').innerText = val;
  });

  bindInput('col-loot-lines-color', 'colLootLines', 'value', '#ffffff');
  bindInput('col-loot-text-color', 'colLootText', 'value', '#fbbf24');

  bindInput('chk-loot-general', 'lootGeneral', 'checked', false, (val) => {
    const subOpts = document.getElementById('loot-general-options');
    if (subOpts) subOpts.style.display = val ? 'flex' : 'none';
  });

  bindInput('chk-loot-money', 'lootMoney', 'checked', false);
  bindInput('chk-loot-cash-register', 'lootCashRegister', 'checked', false);
  bindInput('chk-loot-armor-plate', 'lootArmorPlate', 'checked', false);
  bindInput('chk-loot-vest', 'lootVest', 'checked', false);
  bindInput('chk-loot-armor-vest', 'lootArmorVest', 'checked', false);
  bindInput('chk-loot-gas-mask', 'lootGasMask', 'checked', false);
  bindInput('chk-loot-armor-box', 'lootArmorBox', 'checked', false);
  bindInput('chk-loot-munition-box', 'lootMunitionBox', 'checked', false);
  bindInput('chk-loot-utility-box', 'lootUtilityBox', 'checked', false);
  bindInput('chk-loot-legendary-loot', 'lootLegendaryLoot', 'checked', false);
  bindInput('chk-loot-loot-box', 'lootLootBox', 'checked', false);
  bindInput('chk-loot-loot-bag', 'lootLootBag', 'checked', false);

  // Settings Actions
  bindInput('sel-language', 'language', 'value', 'english', (val) => {
    showToast(`Language changed to ${val.toUpperCase()}`);
  });
  bindInput('col-accent-color', 'accentColor', 'value', '#7c3aed', (val) => {
    setThemeAccent(val);
  });

  // Profile Action Buttons
  const btnSaveProfile = document.getElementById('btn-save-profile');
  if (btnSaveProfile) {
    btnSaveProfile.addEventListener('click', () => {
      localStorage.setItem('imperium_config', JSON.stringify(state));
      showToast('Profile saved successfully!');
    });
  }

  const btnLoadProfile = document.getElementById('btn-load-profile');
  if (btnLoadProfile) {
    btnLoadProfile.addEventListener('click', () => {
      const saved = localStorage.getItem('imperium_config');
      if (saved) {
        const parsed = JSON.parse(saved);
        Object.assign(state, parsed);
        syncFieldsFromState();
        showToast('Profile loaded successfully!');
      } else {
        showToast('No profile found to load!', true);
      }
    });
  }

  const btnDeleteProfile = document.getElementById('btn-delete-profile');
  if (btnDeleteProfile) {
    btnDeleteProfile.addEventListener('click', () => {
      const saved = localStorage.getItem('imperium_config');
      if (saved) {
        localStorage.removeItem('imperium_config');
        showToast('Profile deleted successfully!');
      } else {
        showToast('No profile found to delete!', true);
      }
    });
  }

  const btnNewProfile = document.getElementById('btn-new-profile');
  if (btnNewProfile) {
    btnNewProfile.addEventListener('click', () => {
      // Reset state to default
      state.espEnabled = true;
      state.drawBox = false;
      state.drawSkeleton = true;
      state.drawHeadCircle = true;
      state.skeletonThickness = 0.5;
      state.drawHealthBar = true;
      state.drawPing = true;
      state.drawRank = true;
      state.drawPrestige = false;
      state.drawName = true;
      state.drawTeamId = true;
      state.coloredNames = true;
      state.drawWeapon = true;
      state.drawDistance = true;
      state.drawTeammates = false;
      state.drawSpectators = true;
      state.spectatorPosX = 0.5;
      state.spectatorPosY = 0.1;
      state.drawInputDevice = true;
      state.drawOffscreenArrow = true;
      state.arrowRadius = 200;
      state.drawSnaplines = false;
      state.espFontSize = 10;
      state.espMaxDist = 1000;

      state.colTextColor = '#ffffff';
      state.colVisibleEnemy = '#a855f7';
      state.colHiddenEnemy = '#888888';
      state.colDownedEnemy = '#ffa500';
      state.colTeammates = '#00bfff';

      state.aimbotEnabled = false;
      state.aimbotInputMode = 'mouse';
      state.aimbotPrimaryKey = 'Mouse Right';
      state.aimbotSecondaryKey = 'Mouse Left';
      state.aimbotBone = 'smart';
      state.aimbotBlockSpectator = false;
      state.aimbotVisibleOnly = true;
      state.aimbotIgnoreDowned = true;
      state.aimbotSmoothness = 0.15;
      state.aimbotMaxDist = 500;
      state.aimbotHumanizer = true;
      state.aimbotFlickIntensity = 1.0;
      state.aimbotPulseIntensity = 1.0;
      state.aimbotShowFov = true;
      state.aimbotFovRadius = 50;

      state.radarEnabled = true;
      state.radarScale = 1.5;
      state.radarRange = 150;
      state.radarMiniUav = true;
      state.radarAdvancedUav = true;
      state.radarShareUav = true;
      state.radarShareId = 'a7soi12AnvZBxO';
      state.radarShape = 'square';
      state.radarPosX = 36;
      state.radarPosY = 19;
      state.radarDrawBackground = true;
      state.radarDrawLines = true;
      state.colRadarBg = '#07080b';
      state.colRadarLines = '#ffffff';
      state.colRadarVisible = '#ff0000';
      state.colRadarHidden = '#00ff00';
      state.lootEnabled = true;
      state.lootLines = false;
      state.lootLineThickness = 2;
      state.lootShowDistance = false;
      state.lootFontSize = 12;
      state.colLootLines = '#ffffff';
      state.colLootText = '#fbbf24';
      state.lootGeneral = false;
      state.lootMoney = false;
      state.lootCashRegister = false;
      state.lootArmorPlate = false;
      state.lootVest = false;
      state.lootArmorVest = false;
      state.lootGasMask = false;
      state.lootArmorBox = false;
      state.lootMunitionBox = false;
      state.lootUtilityBox = false;
      state.lootLegendaryLoot = false;
      state.lootLootBox = false;
      state.lootLootBag = false;
      state.accentColor = '#7c3aed';
      state.language = 'english';
      state.pulsePreview = true;

      syncFieldsFromState();
      setThemeAccent('#7c3aed');
      showToast('Parameters reset to default values.');
    });
  }

  // Player search input filter
  const searchInput = document.getElementById('txt-player-search');
  searchInput.addEventListener('input', (e) => {
    renderPlayersTable(e.target.value);
  });
}

// Keybinding interceptor helper
function setupKeybind(btnId, stateKey) {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  
  btn.innerText = state[stateKey];

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (btn.classList.contains('waiting')) return;
    
    // Reset any other buttons from waiting state
    document.querySelectorAll('.keybind-btn').forEach(b => {
      if (b !== btn) {
        b.classList.remove('waiting');
        const key = b.id === 'btn-aimbot-primary-key' ? 'aimbotPrimaryKey' : 'aimbotSecondaryKey';
        b.innerText = state[key];
      }
    });

    btn.classList.add('waiting');
    btn.innerText = 'Press key...';

    const handleKeyDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
      let keyName = event.key;
      if (keyName === ' ') keyName = 'Space';
      else if (keyName.length === 1) keyName = keyName.toUpperCase();
      saveKey(keyName);
    };

    const handleMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
      let keyName = '';
      if (event.button === 0) keyName = 'Mouse Left';
      else if (event.button === 1) keyName = 'Mouse Middle';
      else if (event.button === 2) keyName = 'Mouse Right';
      else keyName = `Mouse ${event.button}`;
      saveKey(keyName);
    };

    const saveKey = (keyName) => {
      state[stateKey] = keyName;
      btn.innerText = keyName;
      btn.classList.remove('waiting');
      
      window.removeEventListener('keydown', handleKeyDown, true);
      window.removeEventListener('mousedown', handleMouseDown, true);
      
      showToast(`Keybind updated to: ${keyName}`);
    };

    window.addEventListener('keydown', handleKeyDown, true);
    window.addEventListener('mousedown', handleMouseDown, true);
  });
}

// Utility to bind UI input change directly to JS state object
function bindInput(id, stateKey, propType, defaultValue = null, extraCallback = null) {
  const el = document.getElementById(id);
  if (!el) return;
  
  if (defaultValue !== null && state[stateKey] === undefined) {
    state[stateKey] = defaultValue;
  }
  
  // Set UI state initially
  if (propType === 'checked') {
    el.checked = state[stateKey];
  } else {
    el.value = state[stateKey];
  }

  if (el.type === 'color') {
    const parent = el.closest('.color-picker-wrapper');
    if (parent) {
      parent.style.backgroundColor = state[stateKey];
    }
  }

  const update = (e) => {
    const val = propType === 'checked' ? e.target.checked : e.target.value;
    state[stateKey] = propType === 'value' && !isNaN(val) ? parseFloat(val) : val;
    if (el.type === 'color') {
      const parent = el.closest('.color-picker-wrapper');
      if (parent) {
        parent.style.backgroundColor = val;
      }
    }
    if (extraCallback) extraCallback(val);
  };

  el.addEventListener('input', update);
  el.addEventListener('change', update);

  if (extraCallback) {
    extraCallback(state[stateKey]);
  }
}

// Synchronize visual state after Loading profile or resetting
function syncFieldsFromState() {
  const map = {
    'chk-enable-esp': ['checked', state.espEnabled],
    'chk-box': ['checked', state.drawBox],
    'chk-skeleton': ['checked', state.drawSkeleton],
    'chk-head-circle': ['checked', state.drawHeadCircle],
    'sld-skeleton-thickness': ['value', state.skeletonThickness],
    'chk-health-bar': ['checked', state.drawHealthBar],
    'chk-ping': ['checked', state.drawPing],
    'chk-rank': ['checked', state.drawRank],
    'chk-prestige': ['checked', state.drawPrestige],
    'chk-name': ['checked', state.drawName],
    'chk-team-id': ['checked', state.drawTeamId],
    'chk-colored-names': ['checked', state.coloredNames],
    'chk-weapon': ['checked', state.drawWeapon],
    'chk-distance': ['checked', state.drawDistance],
    'chk-teammates': ['checked', state.drawTeammates],
    'chk-spectators': ['checked', state.drawSpectators],
    'sld-spectator-pos-x': ['value', state.spectatorPosX],
    'sld-spectator-pos-y': ['value', state.spectatorPosY],
    'chk-input-device': ['checked', state.drawInputDevice],
    'chk-offscreen-arrow': ['checked', state.drawOffscreenArrow],
    'sld-arrow-radius': ['value', state.arrowRadius],
    'chk-snaplines': ['checked', state.drawSnaplines],
    'sld-esp-font-size': ['value', state.espFontSize],
    'sld-esp-max-dist': ['value', state.espMaxDist],
    
    'col-text-color': ['value', state.colTextColor],
    'col-visible-enemy': ['value', state.colVisibleEnemy],
    'col-hidden-enemy': ['value', state.colHiddenEnemy],
    'col-downed-enemy': ['value', state.colDownedEnemy],
    'col-teammates': ['value', state.colTeammates],

    'chk-enable-aimbot': ['checked', state.aimbotEnabled],
    'sel-aimbot-input-mode': ['value', state.aimbotInputMode],
    'sel-aimbot-bone': ['value', state.aimbotBone],
    'chk-aimbot-block-spectator': ['checked', state.aimbotBlockSpectator],
    'chk-aimbot-visible-only': ['checked', state.aimbotVisibleOnly],
    'chk-aimbot-ignore-downed': ['checked', state.aimbotIgnoreDowned],
    'sld-aimbot-smoothness': ['value', state.aimbotSmoothness],
    'sld-aimbot-max-dist': ['value', state.aimbotMaxDist],
    'chk-aimbot-humanizer': ['checked', state.aimbotHumanizer],
    'sld-aimbot-flick-intensity': ['value', state.aimbotFlickIntensity],
    'sld-aimbot-pulse-intensity': ['value', state.aimbotPulseIntensity],
    'chk-aimbot-show-fov': ['checked', state.aimbotShowFov],
    'sld-aimbot-fov-radius': ['value', state.aimbotFovRadius],

    'chk-enable-radar': ['checked', state.radarEnabled],
    'chk-mini-uav': ['checked', state.radarMiniUav],
    'chk-advanced-uav': ['checked', state.radarAdvancedUav],
    'chk-share-uav': ['checked', state.radarShareUav],
    'sel-radar-shape': ['value', state.radarShape],
    'sld-radar-pos-x': ['value', state.radarPosX],
    'sld-radar-pos-y': ['value', state.radarPosY],
    'chk-radar-background': ['checked', state.radarDrawBackground],
    'chk-radar-lines': ['checked', state.radarDrawLines],
    'col-radar-bg': ['value', state.colRadarBg],
    'col-radar-lines': ['value', state.colRadarLines],
    'col-radar-visible': ['value', state.colRadarVisible],
    'col-radar-hidden': ['value', state.colRadarHidden],
    'chk-enable-loot': ['checked', state.lootEnabled],
    'chk-loot-lines': ['checked', state.lootLines],
    'sld-loot-line-thickness': ['value', state.lootLineThickness],
    'chk-loot-show-distance': ['checked', state.lootShowDistance],
    'sld-loot-font-size': ['value', state.lootFontSize],
    'col-loot-lines-color': ['value', state.colLootLines],
    'col-loot-text-color': ['value', state.colLootText],
    'chk-loot-general': ['checked', state.lootGeneral],
    'chk-loot-money': ['checked', state.lootMoney],
    'chk-loot-cash-register': ['checked', state.lootCashRegister],
    'chk-loot-armor-plate': ['checked', state.lootArmorPlate],
    'chk-loot-vest': ['checked', state.lootVest],
    'chk-loot-armor-vest': ['checked', state.lootArmorVest],
    'chk-loot-gas-mask': ['checked', state.lootGasMask],
    'chk-loot-armor-box': ['checked', state.lootArmorBox],
    'chk-loot-munition-box': ['checked', state.lootMunitionBox],
    'chk-loot-utility-box': ['checked', state.lootUtilityBox],
    'chk-loot-legendary-loot': ['checked', state.lootLegendaryLoot],
    'chk-loot-loot-box': ['checked', state.lootLootBox],
    'chk-loot-loot-bag': ['checked', state.lootLootBag],
    'sel-language': ['value', state.language],
    'col-accent-color': ['value', state.accentColor]
  };

  for (const id in map) {
    const el = document.getElementById(id);
    if (!el) continue;
    
    const [prop, val] = map[id];
    if (prop === 'checked') {
      el.checked = val;
    } else {
      el.value = val;
    }
    
    el.dispatchEvent(new Event('input'));
  }

  const btnPrimary = document.getElementById('btn-aimbot-primary-key');
  if (btnPrimary) btnPrimary.innerText = state.aimbotPrimaryKey;
  const btnSecondary = document.getElementById('btn-aimbot-secondary-key');
  if (btnSecondary) btnSecondary.innerText = state.aimbotSecondaryKey;
  initQRCode();
}

// Dynamically sets the primary theme variables across CSS rules
function setThemeAccent(val) {
  let hexColor, rgbStr, hexDark, hexLight;

  if (themes[val]) {
    // If it's a theme name (backward compatibility)
    state.accentColor = themes[val].hex;
    hexColor = themes[val].hex;
    rgbStr = themes[val].rgb;
    hexDark = themes[val].dark;
    hexLight = themes[val].light;
  } else {
    // If it's a custom hex color picker value
    state.accentColor = val;
    hexColor = val;
    
    // Parse hex
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(val);
    if (!result) return;
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    rgbStr = `${r}, ${g}, ${b}`;

    // Compute dark and light variants mathematically
    const rDark = Math.floor(r * 0.6);
    const gDark = Math.floor(g * 0.6);
    const bDark = Math.floor(b * 0.6);
    
    const rLight = Math.floor(r + (255 - r) * 0.35);
    const gLight = Math.floor(g + (255 - g) * 0.35);
    const bLight = Math.floor(b + (255 - b) * 0.35);

    hexDark = "#" + ((1 << 24) + (rDark << 16) + (gDark << 8) + bDark).toString(16).slice(1);
    hexLight = "#" + ((1 << 24) + (rLight << 16) + (gLight << 8) + bLight).toString(16).slice(1);
  }
  
  const root = document.documentElement;
  root.style.setProperty('--accent-color', hexColor);
  root.style.setProperty('--accent-color-rgb', rgbStr);
  root.style.setProperty('--accent-glow', `rgba(${rgbStr}, 0.35)`);
  root.style.setProperty('--accent-dark', hexDark);
  root.style.setProperty('--accent-light', hexLight);
  
  // Keep color input wrapper background matched
  const wrapper = document.getElementById('color-wrapper-accent');
  if (wrapper) {
    wrapper.style.backgroundColor = hexColor;
  }
}

/* ==========================================================================
   TOAST HELPER SYSTEM
   ========================================================================== */
let toastTimeout;
function showToast(msg, isError = false) {
  const toast = document.getElementById('toast-notification');
  toast.innerText = msg;
  toast.style.borderColor = isError ? '#f43f5e' : 'var(--accent-color)';
  toast.style.boxShadow = isError ? '0 0 15px rgba(244,63,94,0.3)' : '0 0 15px var(--accent-glow)';
  
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2200);
}

/* ==========================================================================
   PLAYERS LOBBY DATA POPULATOR
   ========================================================================== */
function renderPlayersTable(filterName = '') {
  const tbody = document.getElementById('players-list-body');
  tbody.innerHTML = '';
  
  const filtered = players.filter(p => 
    p.name.toLowerCase().includes(filterName.toLowerCase())
  );
  
  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted); font-size: 10px; padding: 20px;">No players found</td></tr>`;
    return;
  }
  
  filtered.forEach(p => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="player-name-cell">${p.name}</td>
      <td><span class="badge-team ${p.team}">${p.team}</span></td>
      <td class="distance-cell">${p.distance}m</td>
      <td class="weapon-cell">${p.weapon}</td>
      <td class="action-cell">
        <button class="player-action-btn" data-player="${p.name}">
          ${p.team === 'enemy' ? 'Prioritize' : 'Whistle'}
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
  
  // Bind simple priority/mute click toggle on button
  tbody.querySelectorAll('.player-action-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const pName = btn.getAttribute('data-player');
      if (btn.classList.contains('active-action')) {
        btn.classList.remove('active-action');
        btn.innerText = btn.getAttribute('data-action-orig') || 'Prioritize';
        btn.style.backgroundColor = '';
        showToast(`Cleared focus on player: ${pName}`);
      } else {
        btn.classList.add('active-action');
        btn.setAttribute('data-action-orig', btn.innerText);
        btn.innerText = 'Active';
        btn.style.backgroundColor = 'var(--accent-color)';
        btn.style.color = '#fff';
        showToast(`Targeting prioritized: ${pName}`);
      }
    });
  });
}

/* ==========================================================================
   ANIMATION & RENDERING TIMERS
   ========================================================================== */
function startAnimationLoop() {
  function loop() {
    state.ticks++;
    
    // Draw Preview frame
    drawPreview();
    
    // Draw Radar screen if enabled
    if (state.radarEnabled) {
      drawRadar();
    }
    
    // Fluctuar el FPS de diagnósticos cada 12 ticks
    if (state.ticks % 12 === 0) {
      const diagFps = document.getElementById('diag-fps-value');
      if (diagFps) {
        const randomFps = Math.floor(2450 + Math.random() * 45);
        diagFps.textContent = `${randomFps} fps`;
      }
    }
    
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}

/* ==========================================================================
   HUD LIVE RENDERING (PREVIEW SCREEN CANVAS)
   ========================================================================== */
function drawPreview() {
  if (!previewCanvas || !previewCtx) return;
  
  const ctx = previewCtx;
  const cw = previewCanvas.width;
  const ch = previewCanvas.height;
  
  // SI LA PESTAÑA ACTIVA ES RADAR, RENDERIZAMOS LA SIMULACIÓN COMPLETA DEL MOTOR VISUAL
  if (state.activeTab === 'radar') {
    drawRadarPreview(ctx, cw, ch);
    return;
  }
  
  // Clear Frame
  ctx.clearRect(0, 0, cw, ch);
  
  // Draw blueprint overlay lines inside viewport
  ctx.strokeStyle = 'rgba(255,255,255,0.015)';
  ctx.lineWidth = 1;
  const gridSize = 20;
  for(let x = 0; x < cw; x += gridSize) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, ch); ctx.stroke();
  }
  for(let y = 0; y < ch; y += gridSize) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(cw, y); ctx.stroke();
  }

  // Draw Vignette gradient
  const vignette = ctx.createRadialGradient(cw/2, ch/2, ch/4, cw/2, ch/2, ch/2);
  vignette.addColorStop(0, 'rgba(11, 12, 16, 0)');
  vignette.addColorStop(1, 'rgba(7, 8, 11, 0.85)');
  
  if (!soldierImg.complete) {
    ctx.font = '10px Orbitron';
    ctx.fillStyle = 'var(--text-secondary)';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText('LOADING MODEL DATABASE...', cw / 2, ch / 2);
    return;
  }
  
  const imgWidth = soldierImg.width || 400;
  const imgHeight = soldierImg.height || 800;
  
  const targetScale = Math.min((cw * 0.76) / imgWidth, (ch * 0.82) / imgHeight);
  const w = imgWidth * targetScale;
  const h = imgHeight * targetScale;
  const x = (cw - w) / 2;
  const y = (ch - h) / 2 + 15; 
  
  const centerX = cw / 2;
  const centerY = ch / 2;
  const scaleFactor = 1.0;

  ctx.save();
  ctx.drawImage(soldierImg, x, y, w, h);
  ctx.restore();
  
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, cw, ch);

  if (!state.espEnabled) return;
  
  const accentHex = getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim() || '#7c3aed';
  const rgbPart = getComputedStyle(document.documentElement).getPropertyValue('--accent-color-rgb').trim() || '124, 58, 237';
  const breathingAlpha = 1.0;
  
  const canvasJoints = {};
  for (const name in joints) {
    const j = joints[name];
    const px = x + j.x * w;
    const py = y + j.y * h;
    canvasJoints[name] = {
      x: centerX + (px - centerX) * scaleFactor,
      y: centerY + (py - centerY) * scaleFactor
    };
  }

  let boxX = x + 0.12 * w;
  let boxY = y + 0.10 * h;
  let boxW = w * 0.76;
  let boxH = h * 0.82;
  
  const screenBoxX = centerX + (boxX - centerX) * scaleFactor;
  const screenBoxY = centerY + (boxY - centerY) * scaleFactor;
  const screenBoxW = boxW * scaleFactor;
  const screenBoxH = boxH * scaleFactor;

  if (state.drawBox) {
    ctx.save();
    ctx.strokeStyle = state.colVisibleEnemy;
    ctx.shadowColor = state.colVisibleEnemy;
    ctx.shadowBlur = 8;
    ctx.lineWidth = 1.2;
    ctx.globalAlpha = breathingAlpha;
    
    const bracketSize = Math.max(12, screenBoxW * 0.15);
    
    ctx.beginPath();
    ctx.moveTo(screenBoxX, screenBoxY + bracketSize);
    ctx.lineTo(screenBoxX, screenBoxY);
    ctx.lineTo(screenBoxX + bracketSize, screenBoxY);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(screenBoxX + screenBoxW - bracketSize, screenBoxY);
    ctx.lineTo(screenBoxX + screenBoxW, screenBoxY);
    ctx.lineTo(screenBoxX + screenBoxW, screenBoxY + bracketSize);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(screenBoxX, screenBoxY + screenBoxH - bracketSize);
    ctx.lineTo(screenBoxX, screenBoxY + screenBoxH);
    ctx.lineTo(screenBoxX + bracketSize, screenBoxY + screenBoxH);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(screenBoxX + screenBoxW - bracketSize, screenBoxY + screenBoxH);
    ctx.lineTo(screenBoxX + screenBoxW, screenBoxY + screenBoxH);
    ctx.lineTo(screenBoxX + screenBoxW, screenBoxY + screenBoxH - bracketSize);
    ctx.stroke();
    
    ctx.shadowBlur = 0;
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.strokeRect(screenBoxX - 1, screenBoxY - 1, screenBoxW + 2, screenBoxH + 2);
    ctx.restore();
  }

  if (state.drawHealthBar) {
    ctx.save();
    ctx.beginPath();
    const barX = cw - 8;
    ctx.moveTo(barX, ch * 0.15);
    ctx.lineTo(barX, ch * 0.85);
    ctx.strokeStyle = '#22c55e';
    ctx.shadowColor = '#22c55e';
    ctx.shadowBlur = 8;
    ctx.lineWidth = 2 * window.devicePixelRatio;
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.restore();
  }

  if (state.drawSkeleton) {
    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    const baseWidth = state.skeletonThickness * window.devicePixelRatio;
    
    const bones = [
      ['head', 'neck'], ['neck', 'pelvis'], ['neck', 'lShoulder'], ['lShoulder', 'lElbow'], ['lElbow', 'lWrist'],
      ['neck', 'rShoulder'], ['rShoulder', 'rElbow'], ['rElbow', 'rWrist'], ['pelvis', 'lHip'],
      ['lHip', 'lKnee'], ['lKnee', 'lAnkle'], ['pelvis', 'rHip'], ['rHip', 'rKnee'], ['rKnee', 'rAnkle']
    ];
    
    ctx.strokeStyle = state.colVisibleEnemy;
    ctx.shadowColor = state.colVisibleEnemy;
    ctx.shadowBlur = 15;
    ctx.lineWidth = baseWidth * 12.0;
    ctx.globalAlpha = breathingAlpha;
    
    bones.forEach(([start, end]) => {
      const p1 = canvasJoints[start];
      const p2 = canvasJoints[end];
      if (p1 && p2) {
        ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
      }
    });
    
    // Calculate light core color from state.colVisibleEnemy dynamically
    let coreColor = state.colVisibleEnemy;
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(state.colVisibleEnemy);
    if (result) {
      const r = parseInt(result[1], 16);
      const g = parseInt(result[2], 16);
      const b = parseInt(result[3], 16);
      // Blend 80% with white to get a very bright glowing core matching the theme color
      const rLight = Math.floor(r + (255 - r) * 0.8);
      const gLight = Math.floor(g + (255 - g) * 0.8);
      const bLight = Math.floor(b + (255 - b) * 0.8);
      coreColor = "#" + ((1 << 24) + (rLight << 16) + (gLight << 8) + bLight).toString(16).slice(1);
    }
    
    ctx.shadowBlur = 0;
    ctx.strokeStyle = coreColor;
    ctx.lineWidth = baseWidth * 3.5;
    
    bones.forEach(([start, end]) => {
      const p1 = canvasJoints[start];
      const p2 = canvasJoints[end];
      if (p1 && p2) {
        ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
      }
    });
    ctx.restore();
  }

  ctx.save();
  ctx.textAlign = 'left';
  ctx.font = `${state.espFontSize * window.devicePixelRatio}px 'Plus Jakarta Sans', sans-serif`;
  ctx.shadowColor = 'rgba(0,0,0,0.9)';
  ctx.shadowBlur = 4;
  
  const tags = [];
  if (state.drawRank) tags.push({ text: '[48] ', color: 'rgba(255,255,255,0.6)' });
  if (state.drawPrestige) tags.push({ text: '[P3] ', color: '#fbbf24' });
  if (state.drawName) {
    const nameColor = state.coloredNames ? state.colVisibleEnemy : state.colTextColor;
    tags.push({ text: 'xX_Ghost_Xx ', color: nameColor });
  }
  if (state.drawTeamId) tags.push({ text: '[T1] ', color: 'rgba(255,255,255,0.6)' });
  if (state.drawInputDevice) tags.push({ text: '[KBM] ', color: 'rgba(255,255,255,0.6)' });
  if (state.drawPing) tags.push({ text: '[24ms] ', color: '#22c55e' });

  if (tags.length > 0) {
    let totalWidth = 0;
    tags.forEach(t => { totalWidth += ctx.measureText(t.text).width; });
    
    let currentX = centerX - totalWidth / 2;
    const drawY = screenBoxY - 8 * window.devicePixelRatio;
    tags.forEach(t => {
      ctx.fillStyle = t.color;
      ctx.fillText(t.text, currentX, drawY);
      currentX += ctx.measureText(t.text).width;
    });
  }
  ctx.restore();

  ctx.save();
  let currentBottomY = screenBoxY + screenBoxH + 14 * window.devicePixelRatio;
  ctx.textAlign = 'center';
  ctx.shadowColor = 'rgba(0,0,0,0.9)';
  ctx.shadowBlur = 4;

  if (state.drawDistance) {
    ctx.fillStyle = state.colTextColor;
    ctx.font = `${state.espFontSize * window.devicePixelRatio}px 'Plus Jakarta Sans', sans-serif`;
    ctx.fillText('100m', centerX, currentBottomY);
    currentBottomY += 12 * window.devicePixelRatio;
  }
  if (state.drawWeapon) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.font = `${(state.espFontSize - 2) * window.devicePixelRatio}px 'Plus Jakarta Sans', sans-serif`;
    ctx.fillText('KASTOV 762', centerX, currentBottomY);
  }
  ctx.restore();}

/* ==========================================================================
   INTERACTIVE ADVANCED 2D RADAR ENGINE SIMULATION (PREVIEW PANEL VIEWPORT)
   ========================================================================== */
function drawRadarPreview(ctx, cw, ch) {
  // Limpiamos el viewport por completo
  ctx.clearRect(0, 0, cw, ch);

  if (!state.radarEnabled) {
    ctx.font = "11px Orbitron";
    ctx.fillStyle = "var(--text-muted)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("RADAR ENGINE DISABLED", cw / 2, ch / 2);
    return;
  }

  // Definir dimensiones de la caja del Radar según configuraciones
  const radarSize = Math.min(cw * 0.82, ch * 0.82);
  const cx = cw / 2;
  const cy = ch / 2;
  const half = radarSize / 2;

  // 1. Dibujar el fondo del Radar (Custom Background Color)
  if (state.radarDrawBackground) {
    ctx.save();
    ctx.fillStyle = state.colRadarBg;
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    ctx.shadowBlur = 20;

    ctx.beginPath();
    if (state.radarShape === 'circle') {
      ctx.arc(cx, cy, half, 0, 2 * Math.PI);
    } else {
      // Cuadrado con esquinas ligeramente suavizadas para look premium
      if (ctx.roundRect) {
        ctx.roundRect(cx - half, cy - half, radarSize, radarSize, 12 * window.devicePixelRatio);
      } else {
        ctx.rect(cx - half, cy - half, radarSize, radarSize);
      }
    }
    ctx.fill();
    ctx.restore();
  }

  // Clip para asegurar que nada se pinte por fuera de los bordes del radar geométrico
  ctx.save();
  ctx.beginPath();
  if (state.radarShape === 'circle') {
    ctx.arc(cx, cy, half, 0, 2 * Math.PI);
  } else {
    if (ctx.roundRect) {
      ctx.roundRect(cx - half, cy - half, radarSize, radarSize, 12 * window.devicePixelRatio);
    } else {
      ctx.rect(cx - half, cy - half, radarSize, radarSize);
    }
  }
  ctx.clip();

  // 2. Dibujar líneas de guía del radar y ejes centrales (Lines Color)
  if (state.radarDrawLines) {
    ctx.save();
    ctx.strokeStyle = state.colRadarLines;
    ctx.globalAlpha = 0.08; // Transparencia sutil tipo HUD militar
    ctx.lineWidth = 1;

    // Círculos o cuadrados concéntricos de rango según la forma seleccionada
    ctx.beginPath();
    if (state.radarShape === 'circle') {
      ctx.arc(cx, cy, half * 0.35, 0, 2 * Math.PI);
      ctx.arc(cx, cy, half * 0.70, 0, 2 * Math.PI);
      ctx.arc(cx, cy, half, 0, 2 * Math.PI);
    } else {
      if (ctx.roundRect) {
        ctx.roundRect(cx - half * 0.35, cy - half * 0.35, radarSize * 0.35, radarSize * 0.35, 4 * window.devicePixelRatio);
        ctx.roundRect(cx - half * 0.70, cy - half * 0.70, radarSize * 0.70, radarSize * 0.70, 8 * window.devicePixelRatio);
        ctx.roundRect(cx - half, cy - half, radarSize, radarSize, 12 * window.devicePixelRatio);
      } else {
        ctx.rect(cx - half * 0.35, cy - half * 0.35, radarSize * 0.35, radarSize * 0.35);
        ctx.rect(cx - half * 0.70, cy - half * 0.70, radarSize * 0.70, radarSize * 0.70);
        ctx.rect(cx - half, cy - half, radarSize, radarSize);
      }
    }
    ctx.stroke();

    // Ejes de cruz central
    ctx.beginPath(); ctx.moveTo(cx - half, cy); ctx.lineTo(cx + half, cy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, cy - half); ctx.lineTo(cx, cy + half); ctx.stroke();
    ctx.restore();
  }

  // 3. Renderizar el haz de barrido de radar avanzado (Sweep Cone)
  sweepAngle = (sweepAngle + 0.012) % (Math.PI * 2);
  
  if (state.radarAdvancedUav) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(sweepAngle - Math.PI / 2);

    // Cono de desvanecimiento
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, half * 1.5);
    gradient.addColorStop(0, 'rgba(124, 58, 237, 0.01)');
    gradient.addColorStop(1, 'rgba(124, 58, 237, 0.12)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, half * 1.5, 0, Math.PI / 3); // haz de 60 grados
    ctx.closePath();
    ctx.fill();

    // Línea de barrido brillante frontal
    ctx.strokeStyle = 'rgba(167, 139, 250, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(half * 1.5, 0); ctx.stroke();
    ctx.restore();
  }

  // Update mock blips positions dynamically for a live feel
  previewRadarBlips.forEach(blip => {
    // Add random path variation
    blip.angle += (Math.random() - 0.5) * 0.02 + blip.turnSpeed;
    
    // Move along angle
    blip.x += Math.cos(blip.angle) * blip.speed;
    blip.y += Math.sin(blip.angle) * blip.speed;
    
    // Bounce or redirect if going too far from center (steer back smoothly without teleporting)
    const dist = Math.sqrt(blip.x * blip.x + blip.y * blip.y);
    if (dist > 0.42) {
      // Keep it at the edge of the boundary (do not teleport to the opposite side)
      blip.x = (blip.x / dist) * 0.41;
      blip.y = (blip.y / dist) * 0.41;
      // Direct it back towards center with a small random variation
      const angleToCenter = Math.atan2(-blip.y, -blip.x);
      blip.angle = angleToCenter + (Math.random() - 0.5) * 0.5;
    }
  });

  // 4. Dibujar Blips/Entidades complejas idénticas a las imágenes (Polígonos direccionales con números)
  previewRadarBlips.forEach(blip => {
    // Convertir de coordenadas normalizadas relativas al centro a píxeles
    const bx = cx + blip.x * radarSize;
    const by = cy + blip.y * radarSize;

    // Checar el color mapeado (usar el color individual de la imagen por prioridad)
    const color = blip.color || (blip.type === 'visible' ? state.colRadarVisible : state.colRadarHidden);

    ctx.save();
    ctx.translate(bx, by);
    ctx.rotate(blip.angle);

    // Dibujar el polígono en forma de flecha/triángulo de dirección HUD que se ve en la foto
    ctx.fillStyle = 'rgba(11, 12, 16, 0.85)'; // Relleno oscuro transparente inside
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5 * window.devicePixelRatio;
    ctx.shadowColor = color;
    ctx.shadowBlur = 6;

    ctx.beginPath();
    ctx.moveTo(0, -10 * window.devicePixelRatio);  // Punta
    ctx.lineTo(8 * window.devicePixelRatio, 8 * window.devicePixelRatio);   // Ala derecha
    ctx.lineTo(3 * window.devicePixelRatio, 5 * window.devicePixelRatio);   // Hendidura central interna
    ctx.lineTo(-3 * window.devicePixelRatio, 5 * window.devicePixelRatio);  // Hendidura central interna
    ctx.lineTo(-8 * window.devicePixelRatio, 8 * window.devicePixelRatio);  // Ala izquierda
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Dibujar el número identificador del jugador en el centro del blip táctico
    ctx.restore();
    ctx.save();
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold ${8 * window.devicePixelRatio}px 'Orbitron', sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(blip.id, bx, by + (blip.angle > 0 ? 1 : 0)); // Ajuste mínimo de lectura
    ctx.restore();

    // Si es "Advanced UAV" pintamos líneas de campo de visión sutiles frente a ellos
    if (state.radarAdvancedUav && blip.type === 'visible') {
      ctx.save();
      ctx.strokeStyle = color;
      ctx.globalAlpha = 0.2;
      ctx.lineWidth = 0.5;
      ctx.setLineDash([2, 4]);
      ctx.beginPath();
      ctx.moveTo(bx, by);
      ctx.lineTo(bx + Math.cos(blip.angle - 0.3) * 40, by + Math.sin(blip.angle - 0.3) * 40);
      ctx.moveTo(bx, by);
      ctx.lineTo(bx + Math.cos(blip.angle + 0.3) * 40, by + Math.sin(blip.angle + 0.3) * 40);
      ctx.stroke();
      ctx.restore();
    }
  });

  // 5. Dibujar indicador central del Jugador Local (Flecha blanca brillante apuntando al frente)
  ctx.save();
  ctx.translate(cx, cy);
  ctx.fillStyle = '#ffffff';
  ctx.shadowColor = '#ffffff';
  ctx.shadowBlur = 10;

  ctx.beginPath();
  ctx.moveTo(0, -8 * window.devicePixelRatio);
  ctx.lineTo(6 * window.devicePixelRatio, 6 * window.devicePixelRatio);
  ctx.lineTo(0, 2 * window.devicePixelRatio);
  ctx.lineTo(-6 * window.devicePixelRatio, 6 * window.devicePixelRatio);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Restauramos el recorte del clip geométrico
  ctx.restore();
}

/* ==========================================================================
   2D HUD RADAR CANVAS DRAWING
   ========================================================================== */
function drawRadar() {
  if (!radarCanvas || !radarCtx) return;
  
  const ctx = radarCtx;
  const w = radarCanvas.width;
  const h = radarCanvas.height;
  const cx = w / 2;
  const cy = h / 2;
  const radius = w / 2 - 8;
  
  ctx.clearRect(0, 0, w, h);
  
  // 1. Draw circular grids
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.lineWidth = 1;
  
  // Circles
  ctx.beginPath(); ctx.arc(cx, cy, radius, 0, 2 * Math.PI); ctx.stroke();
  ctx.beginPath(); ctx.arc(cx, cy, radius * 0.66, 0, 2 * Math.PI); ctx.stroke();
  ctx.beginPath(); ctx.arc(cx, cy, radius * 0.33, 0, 2 * Math.PI); ctx.stroke();
  
  // Crosshairs
  ctx.beginPath(); ctx.moveTo(cx - radius, cy); ctx.lineTo(cx + radius, cy); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx, cy - radius); ctx.lineTo(cx, cy + radius); ctx.stroke();
  
  // 2. Animate Sweep Sweep Angle
  sweepAngle = (sweepAngle + 0.02) % (Math.PI * 2);
  
  // Draw Sweep cone gradient
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(sweepAngle - Math.PI / 2); // Rotate sweep cone
  
  const sweepGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
  const accentHex = getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim() || '#7c3aed';
  const rgbPart = getComputedStyle(document.documentElement).getPropertyValue('--accent-color-rgb').trim() || '124, 58, 237';
  
  // Draw a wedge sweep using alpha gradient
  ctx.fillStyle = `rgba(${rgbPart}, 0.06)`;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.arc(0, 0, radius, 0, Math.PI / 4);
  ctx.closePath();
  ctx.fill();
  
  // Glowing front edge line
  ctx.strokeStyle = `rgba(${rgbPart}, 0.6)`;
  ctx.shadowColor = accentHex;
  ctx.shadowBlur = 6;
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(radius, 0);
  ctx.stroke();
  ctx.restore();
  
  // 3. Draw Radar Entities (Blips)
  radarBlips.forEach(blip => {
    // Slowly update position for dynamic moving feel
    blip.angle += blip.speed;
    
    // Scale distance based on state.radarScale
    const scaledDistance = (blip.dist / state.radarRange) * radius * state.radarScale;
    
    // Check bounding distance
    if (scaledDistance > radius) return;
    
    // Resolve entity coordinate
    const bx = cx + Math.cos(blip.angle) * scaledDistance;
    const by = cy + Math.sin(blip.angle) * scaledDistance;
    
    // Check if sweep line passed over this blip coordinate
    // The sweep angle is relative. Let's calculate angle difference
    let diff = (sweepAngle - blip.angle) % (Math.PI * 2);
    if (diff < 0) diff += Math.PI * 2;
    
    // Phosphor fade-out calculation (intensity decreases as sweep moves further away)
    let intensity = 0.15;
    if (diff < Math.PI / 3) {
      intensity = 1.0 - (diff / (Math.PI / 3)) * 0.85; // Fades from 1.0 down to 0.15
    }
    
    // Draw blip circle
    ctx.save();
    let blipColor = '#f43f5e'; // default enemy
    if (blip.type === 'friendly') blipColor = '#3b82f6';
    if (blip.type === 'loot') blipColor = '#10b981';
    
    ctx.fillStyle = blipColor;
    ctx.shadowColor = blipColor;
    ctx.shadowBlur = 8 * intensity;
    ctx.globalAlpha = intensity;
    
    ctx.beginPath();
    ctx.arc(bx, by, 3, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
  });
  
  // 4. Draw Center Indicator (Me player dot)
  ctx.save();
  ctx.fillStyle = '#ffffff';
  ctx.shadowColor = '#ffffff';
  ctx.shadowBlur = 4;
  ctx.beginPath();
  ctx.arc(cx, cy, 2.5, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();
}
