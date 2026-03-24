document.addEventListener('DOMContentLoaded', () => {
    // --- Tab Navigation ---
    const navItems = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            const title = item.querySelector('.nav-title').textContent.toLowerCase();
            
            tabContents.forEach(tab => tab.classList.remove('active'));
            
            const targetTab = document.getElementById(`tab-${title}`);
            if(targetTab) {
                targetTab.classList.add('active');
            }
        });
    });

    // --- Custom Sliders Track Progress ---
    const sliders = document.querySelectorAll('input[type="range"]');
    
    const updateSliderTrack = (slider) => {
        const val = (slider.value - slider.min) / (slider.max - slider.min) * 100;
        slider.style.background = `linear-gradient(to right, #ff3333 ${val}%, #1a1b22 ${val}%)`;
    };

    sliders.forEach(slider => {
        updateSliderTrack(slider);
        slider.addEventListener('input', (e) => {
            updateSliderTrack(e.target);
            
            // Update the display value
            const id = e.target.id.replace('slider-', 'val-');
            const display = document.getElementById(id);
            if (display) {
                let valStr = e.target.value;
                if (e.target.id === 'slider-fontsize') {
                    valStr = parseFloat(valStr).toFixed(1);
                } else if (e.target.id === 'slider-distance' || e.target.id === 'slider-aim-distance') {
                    valStr += 'm';
                }
                display.textContent = valStr;
            }

            // Real-time preview updates for sliders
            if (e.target.id === 'slider-thickness') {
                const bones = document.getElementById('esp-bones');
                if (bones) {
                    bones.setAttribute('stroke-width', e.target.value);
                }
            } else if (e.target.id === 'slider-fontsize') {
                const name = document.getElementById('preview-name');
                if (name) {
                    // scale 8-24 to actual px sizes in preview roughly
                    name.style.fontSize = Math.max(8, e.target.value * 0.8) + 'px';
                }
            }
        });
    });

    // --- Checkbox Real-time Preview ---
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    
    // Elements to toggle
    const masterToggle = document.querySelector('input[data-preview="esp"]');
    const previewBox = document.getElementById('esp-box');
    const previewName = document.getElementById('preview-name');
    const previewHealth = document.getElementById('preview-health');
    const previewSkeleton = document.getElementById('esp-bones');
    const previewHead = document.getElementById('esp-head');

    // Helper to get checked state
    const isChecked = (attr) => {
        const cb = document.querySelector(`input[data-preview="${attr}"]`);
        return cb ? cb.checked : false;
    };

    const updatePreview = () => {
        const isMasterOn = masterToggle ? masterToggle.checked : true;

        if (previewBox) previewBox.style.display = (isMasterOn && isChecked('box')) ? 'block' : 'none';
        if (previewName) previewName.style.display = (isMasterOn && isChecked('name')) ? 'block' : 'none';
        if (previewHealth) previewHealth.style.display = (isMasterOn && isChecked('healthbar')) ? 'block' : 'none';
        
        if (previewSkeleton) {
            previewSkeleton.style.display = (isMasterOn && isChecked('skeleton')) ? 'block' : 'none';
            // Head visibility (depends on skeleton)
            if (previewHead) {
                previewHead.style.display = isChecked('head') ? 'block' : 'none';
            }
        }
    };

    checkboxes.forEach(cb => {
        cb.addEventListener('change', updatePreview);
    });

    // Initial run
    updatePreview();

    // --- Custom Dropdowns Interaction ---
    const dropdowns = document.querySelectorAll('.custom-dropdown');
    
    dropdowns.forEach(dropdown => {
        const selected = dropdown.querySelector('.dropdown-selected');
        if (!selected) return; // Skip if not converted to new structure yet
        const selectedText = selected.querySelector('span:first-child');
        const options = dropdown.querySelectorAll('.dropdown-options li');
        
        selected.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdowns.forEach(d => {
                if (d !== dropdown) d.classList.remove('open');
            });
            dropdown.classList.toggle('open');
        });
        
        options.forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                options.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                selectedText.textContent = option.textContent;
                dropdown.classList.remove('open');
            });
        });
    });

    document.addEventListener('click', () => {
        dropdowns.forEach(d => d.classList.remove('open'));
    });
});
