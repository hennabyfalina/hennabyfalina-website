// =========================================
// MOODBOARD CREATOR LOGIC
// =========================================

class MoodboardCreator {
    constructor() {
        this.designs = [];
        this.canvasElements = [];
        this.selectedElement = null;
        this.history = [];
        this.historyIndex = -1;
        this.init();
    }

    init() {
        this.loadDesigns();
        this.setupDragAndDrop();
        this.attachEventListeners();
    }

    loadDesigns() {
        // Load sample designs
        this.designs = [
            { id: 1, url: 'https://images.unsplash.com/photo-1596236569689-090527b79092?w=300', category: 'bridal' },
            { id: 2, url: 'https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=300', category: 'modern' },
            { id: 3, url: 'https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?w=300', category: 'arabic' },
            { id: 4, url: 'https://images.unsplash.com/photo-1610522108748-0d1c9bc700f9?w=300', category: 'minimal' },
            { id: 5, url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=300', category: 'traditional' },
            { id: 6, url: 'https://images.unsplash.com/photo-1550614000-4b9519e02a29?w=300', category: 'floral' },
        ];
        
        this.renderDesignLibrary();
    }

    renderDesignLibrary() {
        const library = document.getElementById('designLibrary');
        library.innerHTML = this.designs.map(design => `
            <div class="design-thumbnail" draggable="true" data-id="${design.id}" data-url="${design.url}">
                <img src="${design.url}" alt="Design ${design.id}">
            </div>
        `).join('');
    }

    setupDragAndDrop() {
        const canvas = document.getElementById('moodboardCanvas');
        
        // Make thumbnails draggable
        document.addEventListener('dragstart', (e) => {
            if (e.target.classList.contains('design-thumbnail')) {
                e.dataTransfer.setData('text/plain', e.target.dataset.url);
                e.target.style.opacity = '0.5';
            }
        });
        
        document.addEventListener('dragend', (e) => {
            if (e.target.classList.contains('design-thumbnail')) {
                e.target.style.opacity = '1';
            }
        });
        
        // Canvas drop zone
        canvas.addEventListener('dragover', (e) => {
            e.preventDefault();
            canvas.classList.add('drag-over');
        });
        
        canvas.addEventListener('dragleave', () => {
            canvas.classList.remove('drag-over');
        });
        
        canvas.addEventListener('drop', (e) => {
            e.preventDefault();
            canvas.classList.remove('drag-over');
            
            const imageUrl = e.dataTransfer.getData('text/plain');
            const x = e.offsetX;
            const y = e.offsetY;
            
            this.addImageToCanvas(imageUrl, x, y);
        });
        
        // Setup interact.js for dragging and resizing
        interact('.canvas-element')
            .draggable({
                listeners: {
                    move: (event) => {
                        const target = event.target;
                        const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                        const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
                        
                        target.style.transform = `translate(${x}px, ${y}px)`;
                        target.setAttribute('data-x', x);
                        target.setAttribute('data-y', y);
                    }
                }
            })
            .resizable({
                edges: { left: true, right: true, bottom: true, top: true },
                listeners: {
                    move: (event) => {
                        const target = event.target;
                        let x = (parseFloat(target.getAttribute('data-x')) || 0);
                        let y = (parseFloat(target.getAttribute('data-y')) || 0);
                        
                        target.style.width = event.rect.width + 'px';
                        target.style.height = event.rect.height + 'px';
                        
                        x += event.deltaRect.left;
                        y += event.deltaRect.top;
                        
                        target.style.transform = `translate(${x}px, ${y}px)`;
                        target.setAttribute('data-x', x);
                        target.setAttribute('data-y', y);
                    }
                }
            });
    }

    addImageToCanvas(imageUrl, x, y) {
        const canvas = document.getElementById('moodboardCanvas');
        const placeholder = canvas.querySelector('.canvas-placeholder');
        if (placeholder) placeholder.remove();
        
        const element = document.createElement('div');
        element.className = 'canvas-element canvas-image';
        element.innerHTML = `
            <img src="${imageUrl}" alt="Design">
            <div class="element-controls">
                <button class="element-btn" onclick="moodboard.rotateElement(this)">
                    <i class="ri-refresh-line"></i>
                </button>
                <button class="element-btn" onclick="moodboard.duplicateElement(this)">
                    <i class="ri-file-copy-line"></i>
                </button>
                <button class="element-btn" onclick="moodboard.deleteElement(this)">
                    <i class="ri-delete-bin-line"></i>
                </button>
            </div>
        `;
        
        element.style.left = x + 'px';
        element.style.top = y + 'px';
        element.setAttribute('data-x', 0);
        element.setAttribute('data-y', 0);
        
        canvas.appendChild(element);
        this.canvasElements.push(element);
        
        this.saveHistory();
    }

    rotateElement(btn) {
        const element = btn.closest('.canvas-element');
        const currentRotation = parseInt(element.dataset.rotation || 0);
        const newRotation = currentRotation + 45;
        element.dataset.rotation = newRotation;
        element.style.transform += ` rotate(${newRotation}deg)`;
    }

    duplicateElement(btn) {
        const element = btn.closest('.canvas-element');
        const clone = element.cloneNode(true);
        const x = parseFloat(element.getAttribute('data-x') || 0) + 20;
        const y = parseFloat(element.getAttribute('data-y') || 0) + 20;
        clone.setAttribute('data-x', x);
        clone.setAttribute('data-y', y);
        clone.style.transform = `translate(${x}px, ${y}px)`;
        document.getElementById('moodboardCanvas').appendChild(clone);
        this.setupDragAndDrop();
    }

    deleteElement(btn) {
        const element = btn.closest('.canvas-element');
        element.remove();
        this.saveHistory();
    }

    saveHistory() {
        const canvas = document.getElementById('moodboardCanvas');
        this.history = this.history.slice(0, this.historyIndex + 1);
        this.history.push(canvas.innerHTML);
        this.historyIndex++;
    }

    attachEventListeners() {
        // Undo/Redo
        document.getElementById('undoBtn').addEventListener('click', () => this.undo());
        document.getElementById('redoBtn').addEventListener('click', () => this.redo());
        
        // Export
        document.getElementById('exportBtn').addEventListener('click', () => this.exportMoodboard());
        
        // Clear
        document.getElementById('clearBtn').addEventListener('click', () => {
            if (confirm('Clear entire moodboard?')) {
                document.getElementById('moodboardCanvas').innerHTML = '<div class="canvas-placeholder"><p>Canvas cleared</p></div>';
            }
        });
        
        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            if (isDark) {
                document.documentElement.removeAttribute('data-theme');
                document.querySelector('.theme-icon').className = 'ri-moon-line theme-icon';
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                document.querySelector('.theme-icon').className = 'ri-sun-line theme-icon';
            }
        });
    }

    undo() {
        if (this.historyIndex > 0) {
            this.historyIndex--;
            document.getElementById('moodboardCanvas').innerHTML = this.history[this.historyIndex];
        }
    }

    redo() {
        if (this.historyIndex < this.history.length - 1) {
            this.historyIndex++;
            document.getElementById('moodboardCanvas').innerHTML = this.history[this.historyIndex];
        }
    }

    async exportMoodboard() {
        const canvas = document.getElementById('moodboardCanvas');
        
        // Use html2canvas for export (add library in HTML)
        alert('📸 Moodboard Export\n\nYour moodboard will be saved as PNG.\n\nIntegrate html2canvas library for full functionality.');
        
        // Production code:
        // const canvasImage = await html2canvas(canvas);
        // const link = document.createElement('a');
        // link.download = `henna-moodboard-${Date.now()}.png`;
        // link.href = canvasImage.toDataURL();
        // link.click();
    }
}

// Initialize
const moodboard = new MoodboardCreator();
window.moodboard = moodboard;
